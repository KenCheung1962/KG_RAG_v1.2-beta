/**
 * Query + File Tab Component
 */

import { uploadDocument, sendQueryWithFiles, getDocumentStatus } from '@/api';
import { renderFileList } from '@/components/FileList';
import { showProgress, hideProgress, setProgressStatus } from '@/components/ProgressBar';
import { getElement, setVisible } from '@/utils/dom';
import { checkDuplicates } from './IngestTab';
import { escapeHtml, exponentialBackoff } from '@/utils/helpers';
import { formatQueryResponse } from './QueryTab';
import {
  getSelectedQueryFiles, addSelectedQueryFile, removeSelectedQueryFile,
  clearSelectedQueryFiles, setIsQuerying
} from '@/stores/appStore';
import type { QueryMode } from '@/config';

// Store the last answer for PDF export
let lastAnswerText = '';
let lastQueryText = '';
let lastSources: string[] = [];


/**
 * Get selected query detail level for file query
 */
function getQueryFileDetail(): { 
  top_k: number; 
  ultra_comprehensive: boolean;
  detailed: boolean;
  label: string;
} {
  const radio = document.querySelector('input[name="queryFileDetail"]:checked') as HTMLInputElement;
  const level = radio?.value || 'balanced';
  
  switch (level) {
    case 'quick':
      return { 
        top_k: 10, 
        ultra_comprehensive: false,
        detailed: false,
        label: 'Quick'
      };
    case 'ultra':
      return {
        top_k: 40,
        ultra_comprehensive: true,
        detailed: true,
        label: 'Ultra Deep'
      };
    case 'comprehensive':
      return { 
        top_k: 30, 
        ultra_comprehensive: false,
        detailed: true,
        label: 'Comprehensive'
      };
    case 'balanced':
    default:
      return { 
        top_k: 20, 
        ultra_comprehensive: false,
        detailed: false,
        label: 'Balanced'
      };
  }
}

/**
 * Print the answer
 */
function printAnswer(event?: Event): void {
  // Prevent any default behavior that might clear the form
  event?.preventDefault();
  event?.stopPropagation();
  
  if (!lastAnswerText) {
    alert('No answer to print. Please run a query first.');
    return;
  }

  // Format markdown-style headings and bold text
  let formattedAnswer = lastAnswerText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Convert **text** to bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Convert # text to bold h1 style
    .replace(/^# (.+)$/gm, '<div class="h1-bold">$1</div>')
    // Convert ## text to bold h2 style
    .replace(/^## (.+)$/gm, '<div class="h2-bold">$1</div>')
    // Convert ### text to bold h3 style
    .replace(/^### (.+)$/gm, '<div class="h3-bold">$1</div>')
    .replace(/\n/g, '<br>');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Query Result</title>
  <style>
    @media print {
      body { 
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 12pt;
        line-height: 1.6;
        margin: 2cm;
        color: #000;
      }
      h1 { 
        font-size: 18pt; 
        border-bottom: 2px solid #333;
        padding-bottom: 0.3cm;
        margin-top: 1cm;
      }
      h2 { 
        font-size: 14pt; 
        margin-top: 0.8cm;
        color: #333;
      }
      h3 { 
        font-size: 12pt; 
        margin-top: 0.6cm;
        color: #555;
      }
      .no-print {
        display: none;
      }
      .h1-bold { 
        font-size: 18pt; 
        font-weight: bold; 
        margin-top: 0.8cm; 
        margin-bottom: 0.4cm;
        color: #000;
      }
      .h2-bold { 
        font-size: 14pt; 
        font-weight: bold; 
        margin-top: 0.6cm; 
        margin-bottom: 0.3cm;
        color: #333;
      }
      .h3-bold { 
        font-size: 12pt; 
        font-weight: bold; 
        margin-top: 0.5cm; 
        margin-bottom: 0.2cm;
        color: #555;
      }
      strong { font-weight: bold; }
    }
    @media screen {
      body { 
        font-family: Georgia, 'Times New Roman', serif;
        max-width: 800px;
        margin: 2cm auto;
        padding: 1cm;
        line-height: 1.6;
      }
      .print-button {
        display: block;
        margin: 1cm auto;
        padding: 10px 30px;
        font-size: 14pt;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .print-button:hover {
        background: #45a049;
      }
      .h1-bold { 
        font-size: 20pt; 
        font-weight: bold; 
        margin-top: 20px; 
        margin-bottom: 10px;
        color: #000;
      }
      .h2-bold { 
        font-size: 16pt; 
        font-weight: bold; 
        margin-top: 15px; 
        margin-bottom: 8px;
        color: #333;
      }
      .h3-bold { 
        font-size: 14pt; 
        font-weight: bold; 
        margin-top: 12px; 
        margin-bottom: 6px;
        color: #444;
      }
      strong { font-weight: bold; }
    }
  </style>
</head>
<body>
  <div class="answer">${formattedAnswer}</div>
</body>
</html>`;

  // Use Blob URL for more reliable rendering
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, '_blank');
  
  if (!printWindow) {
    alert('Please allow popups to print the answer.');
    URL.revokeObjectURL(url);
    return;
  }
}

/**
 * Initialize query file tab
 */
export function initQueryFileTab(): void {
  getElement('queryFileInput')?.addEventListener('change', handleFileSelect);
  getElement('runQueryFileBtn')?.addEventListener('click', handleRunQueryWithFile);
  getElement('exportQueryFilePdfBtn')?.addEventListener('click', (e) => printAnswer(e));
  
  // Clear previous answer when user starts typing a new query
  getElement('queryFileText')?.addEventListener('input', () => {
    const printBtn = getElement('exportQueryFilePdfBtn');
    if (printBtn) printBtn.style.display = 'none';
  });
}

/**
 * Handle file selection
 */
function handleFileSelect(): void {
  const input = getElement<HTMLInputElement>('queryFileInput');
  if (!input?.files?.length) return;
  
  Array.from(input.files).forEach(file => addSelectedQueryFile(file));
  renderQueryFiles();
  input.value = '';
}

/**
 * Render query file list
 */
function renderQueryFiles(): void {
  renderFileList(getSelectedQueryFiles(), {
    containerId: 'querySelectedFilesList',
    onRemove: (index) => {
      removeSelectedQueryFile(index);
      renderQueryFiles();
    },
    emptyText: 'Selected files:'
  });
}

/**
 * Query database only (no files)
 */
/**
 * Query database only (no files)
 */
async function queryDatabaseOnly(
  queryText: string, 
  detail = getQueryFileDetail(),
  answerDiv?: HTMLElement | null,
  exportBtn?: HTMLButtonElement | null
): Promise<void> {
  const { sendQuery } = await import('@/api');
  const controller = new AbortController();
  
  // Set timeout based on mode
  const isUltra = detail.ultra_comprehensive;
  const timeoutMs = isUltra ? 600000 : (detail.detailed ? 300000 : 180000);
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const result = await sendQuery({ 
      message: queryText,
      top_k: detail.top_k,
      detailed: detail.detailed,
      ultra_comprehensive: detail.ultra_comprehensive
    }, controller.signal);
    clearTimeout(timeoutId);
    
    const responseText = result.response || result.answer || JSON.stringify(result);
    lastAnswerText = responseText;
    
    // Use innerHTML with formatQueryResponse for proper formatting
    if (answerDiv) {
      answerDiv.innerHTML = formatQueryResponse(responseText);
    }
    
    // Show print button
    if (exportBtn) {
      exportBtn.style.display = 'inline-block';
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      if (answerDiv) answerDiv.textContent = '⏰ Query timed out. The LLM is taking too long.';
    } else {
      if (answerDiv) answerDiv.textContent = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }
}

/**
 * Query with existing (already uploaded) files + database
 */
async function queryWithExistingFiles(
  queryText: string,
  filenames: string[],
  detail = getQueryFileDetail(),
  answerDiv?: HTMLElement | null,
  exportBtn?: HTMLButtonElement | null
): Promise<void> {
  const controller = new AbortController();
  
  // Set timeout based on mode
  const isUltra = detail.ultra_comprehensive;
  const timeoutMs = isUltra ? 600000 : (detail.detailed ? 300000 : 180000);
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    if (answerDiv) {
      answerDiv.innerHTML = `<span class="spinner"></span> <strong>${detail.label} Mode</strong><br>Querying with ${filenames.length} existing file(s)...`;
    }
    
    const result = await sendQueryWithFiles({ 
      message: queryText,
      filenames,
      top_k: detail.top_k,
      detailed: detail.detailed,
      ultra_comprehensive: detail.ultra_comprehensive
    }, controller.signal);
    
    clearTimeout(timeoutId);
    
    if (result.response || result.answer) {
      const responseText = result.response || result.answer || '';
      
      // Store sources and build answer with references for printing
      const sources = result.sources || result.source_documents;
      if (Array.isArray(sources)) {
        lastSources = sources.map((s: unknown): string => {
          if (typeof s === 'string') return s;
          if (s && typeof s === 'object') {
            return ((s as Record<string, unknown>).filename as string) || 
                   ((s as Record<string, unknown>).doc_id as string) || 
                   ((s as Record<string, unknown>).name as string) || 
                   JSON.stringify(s);
          }
          return String(s);
        });
      } else {
        lastSources = [];
      }
      
      // Build answer with reference section for print output
      let answerWithRefs = responseText;
      if (lastSources.length > 0) {
        answerWithRefs += '\n\n\n## References\n\n';
        lastSources.forEach((src, idx) => {
          answerWithRefs += `${idx + 1}. ${src}\n`;
        });
      }
      lastAnswerText = answerWithRefs;
      
      // Display with proper formatting
      if (answerDiv) {
        answerDiv.innerHTML = formatQueryResponse(answerWithRefs);
      }
      if (exportBtn) {
        exportBtn.style.display = 'inline-block';
      }
    } else if (result.detail) {
      if (answerDiv) answerDiv.textContent = `❌ Error: ${result.detail}`;
    } else {
      if (answerDiv) answerDiv.textContent = JSON.stringify(result, null, 2);
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      if (answerDiv) answerDiv.textContent = '⏰ Query timed out after 5 minutes.';
    } else {
      if (answerDiv) answerDiv.textContent = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }
}

/**
 * Handle run query with file
 */
async function handleRunQueryWithFile(): Promise<void> {
  const queryText = getElement<HTMLTextAreaElement>('queryFileText')?.value.trim();
  let files = getSelectedQueryFiles();
  
  if (!files.length || !queryText) {
    alert('Please upload file(s) and enter a question');
    return;
  }
  
  // Store query for export
  lastQueryText = queryText;
  
  // Get query detail level
  const detail = getQueryFileDetail();
  
  setIsQuerying(true);
  const answerDiv = getElement('queryFileAnswer');
  const exportBtn = getElement('exportQueryFilePdfBtn') as HTMLButtonElement | null;
  
  console.log('[QueryFile] Starting query, exportBtn:', exportBtn);
  
  setVisible('queryFileResult', true);
  if (exportBtn) {
    exportBtn.style.display = 'none';
    console.log('[QueryFile] Button hidden');
  }
  
  const isUltra = detail.ultra_comprehensive;
  const estimatedTime = isUltra ? '5-8 min' : (detail.detailed ? '3-5 min' : '2-3 min');
  answerDiv!.innerHTML = `<span class="spinner"></span> <strong>${detail.label} Mode</strong><br>Processing with ${detail.top_k} chunks...<br>Estimated time: ${estimatedTime}`;
  
  try {
    // Check for duplicates
    const { duplicates, newFiles, duplicateDocIds } = await checkDuplicates(files);
    
    if (duplicates.length > 0) {
      if (files.length === 1) {
        const action = confirm(`File "${escapeHtml(duplicates[0])}" already exists. Click OK to overwrite, Cancel to use existing file.`);
        if (!action) {
          // User chose to skip upload - query with the existing file
          answerDiv!.innerHTML = `<span class="spinner"></span> <strong>${detail.label} Mode</strong><br>📄 Using existing file...`;
          clearSelectedQueryFiles();
          await queryWithExistingFiles(queryText, duplicates, detail, answerDiv, exportBtn);
          setIsQuerying(false);
          return;
        }
      } else {
        const dupList = escapeHtml(duplicates.join(', '));
        const newList = escapeHtml(newFiles.map(f => f.name).join(', '));
        
        const action = newFiles.length > 0
          ? confirm(`Found ${duplicates.length} existing: ${dupList}\n\nNew: ${newList}\n\nClick OK to upload all, Cancel to skip duplicates and use existing files.`)
          : confirm(`All ${duplicates.length} exist: ${dupList}\n\nClick OK to overwrite all, Cancel to use existing files.`);
        
        if (!action) {
          if (newFiles.length === 0) {
            // All files exist, user wants to use existing files
            answerDiv!.innerHTML = `<span class="spinner"></span> <strong>${detail.label} Mode</strong><br>📄 Using ${duplicates.length} existing file(s)...`;
            clearSelectedQueryFiles();
            await queryWithExistingFiles(queryText, duplicates, detail, answerDiv, exportBtn);
            setIsQuerying(false);
            return;
          }
          // Some new, some existing - user wants to skip duplicates, only upload new ones
          files = newFiles;
          // We'll still query with all files (new + existing duplicates) after upload
        }
      }
    }
    
    if (files.length === 0 && duplicates.length === 0) {
      // No files at all - query database only
      await queryDatabaseOnly(queryText, detail, answerDiv, exportBtn);
      setIsQuerying(false);
      return;
    }
    
    // Upload files
    const uploadedDocs: { filename: string; doc_id: string }[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      answerDiv!.textContent = `📤 Uploading ${i + 1}/${files.length}: ${escapeHtml(file.name)}...`;
      
      try {
        const result = await uploadDocument(file);
        if (result.doc_id) {
          uploadedDocs.push({ filename: file.name, doc_id: result.doc_id });
        }
      } catch (error) {
        console.error(`Upload failed for ${file.name}:`, error);
      }
    }
    
    if (uploadedDocs.length === 0) {
      answerDiv!.textContent = '❌ Upload failed. No files were uploaded.';
      setIsQuerying(false);
      return;
    }
    
    // Wait for indexing
    await waitForIndexing(uploadedDocs, answerDiv!);
    
    // Query with files (including both newly uploaded and existing duplicates if user skipped them)
    const uploadedFilenames = uploadedDocs.map(d => d.filename);
    // If user skipped duplicates, include them in the query
    const skippedDuplicates = (duplicateDocIds && files.length < getSelectedQueryFiles().length) 
      ? duplicates.filter(d => !uploadedFilenames.includes(d))
      : [];
    const filenames = [...uploadedFilenames, ...skippedDuplicates];
    answerDiv!.innerHTML = `<span class="spinner"></span> <strong>${detail.label} Mode</strong><br>Querying with ${filenames.length} file(s)...`;
    
    const controller = new AbortController();
    
    // Set timeout based on mode
    const timeoutMs = isUltra ? 600000 : (detail.detailed ? 300000 : 180000);
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    const result = await sendQueryWithFiles({ 
      message: queryText, 
      filenames,
      top_k: detail.top_k,
      detailed: detail.detailed,
      ultra_comprehensive: detail.ultra_comprehensive
    }, controller.signal);
    clearTimeout(timeoutId);
    
    if (result.response || result.answer) {
      const responseText = result.response || result.answer || '';
      
      // Store sources and build answer with references for printing
      const sources = result.sources || result.source_documents;
      console.log('[QueryFile] Raw sources:', sources);
      if (Array.isArray(sources)) {
        // Handle both string array and object array
        lastSources = sources.map((s: unknown): string => {
          if (typeof s === 'string') return s;
          // If source is an object with filename or doc_id, extract it
          if (s && typeof s === 'object') {
            return ((s as Record<string, unknown>).filename as string) || 
                   ((s as Record<string, unknown>).doc_id as string) || 
                   ((s as Record<string, unknown>).name as string) || 
                   JSON.stringify(s);
          }
          return String(s);
        });
      } else {
        lastSources = [];
      }
      console.log('[QueryFile] Processed sources:', lastSources);
      
      // Build answer with reference section for print output
      let answerWithRefs = responseText;
      if (lastSources.length > 0) {
        // We have actual source filenames
        answerWithRefs += '\n\n\n## References\n\n';
        lastSources.forEach((src, idx) => {
          answerWithRefs += `${idx + 1}. ${src}\n`;
        });
      } else if (typeof sources === 'number' && sources > 0) {
        // Backend only returned a count - show that
        answerWithRefs += '\n\n\n## References\n\n';
        answerWithRefs += `This answer was generated from ${sources} source documents.\n`;
        answerWithRefs += '(Source filenames not available from backend API.)';
      }
      lastAnswerText = answerWithRefs;
      
      // Display answer with references in UI (formatted with HTML)
      answerDiv!.innerHTML = formatQueryResponse(answerWithRefs);
      if (exportBtn) {
        exportBtn.style.display = 'inline-block';
        console.log('[QueryFile] Button shown');
      }
    } else if (result.detail) {
      answerDiv!.textContent = `❌ Error: ${result.detail}`;
    } else {
      answerDiv!.textContent = JSON.stringify(result, null, 2);
    }
    
  } catch (error) {
    console.error('Query with file failed:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      answerDiv!.textContent = '⏰ Query timed out after 5 minutes.';
    } else {
      answerDiv!.textContent = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  } finally {
    setIsQuerying(false);
  }
}

/**
 * Wait for documents to be indexed
 */
async function waitForIndexing(
  docs: { doc_id: string }[],
  statusEl: HTMLElement
): Promise<void> {
  let allIndexed = false;
  let pollCount = 0;
  
  while (!allIndexed && pollCount < 30) {
    const delay = exponentialBackoff(pollCount, 1000, 5000);
    await new Promise(r => setTimeout(r, delay));
    pollCount++;
    
    let indexedCount = 0;
    
    for (const doc of docs) {
      const status = await getDocumentStatus(doc.doc_id);
      if (status?.indexed || status?.ready || (status?.chunks && status.chunks > 0)) {
        indexedCount++;
      }
    }
    
    statusEl.textContent = `⏳ Indexing... (${pollCount}s) - ${indexedCount}/${docs.length} ready`;
    
    if (indexedCount === docs.length) {
      allIndexed = true;
      break;
    }
  }
  
  if (!allIndexed) {
    statusEl.textContent = '⚠️ Indexing in progress, but proceeding with query...';
  } else {
    statusEl.textContent = '✅ Files indexed! Now querying...';
  }
}

/**
 * Get tab HTML
 */
export function getQueryFileTabHTML(): string {
  return `
    <div id="queryfile" class="tab-content card" role="tabpanel" aria-labelledby="tab-queryfile">
      <h2>🔗 Query with File(s)</h2>
      
      
      <h3>Upload Document(s)</h3>
      <label for="queryFileInput" class="sr-only">Select files to upload</label>
      <input type="file" id="queryFileInput" accept=".txt,.md,.pdf,.doc,.docx" multiple aria-describedby="queryFileInput-hint">
      <p id="queryFileInput-hint" class="hint">You can select multiple files (Ctrl+Click or Cmd+Click)</p>
      
      <div id="querySelectedFilesList" class="file-list" style="display: none;"></div>
      
      <h3>Question</h3>
      <label for="queryFileText" class="sr-only">Enter your question about the uploaded file</label>
      <textarea id="queryFileText" placeholder="Ask a question about the uploaded file and knowledge graph..." rows="3" aria-describedby="queryFileText-hint"></textarea>
      <p id="queryFileText-hint" class="hint">Type your question about the uploaded document</p>
      
      <h3 id="queryFileDetailLabel">Answer Detail Level</h3>
      <div class="radio-group" role="radiogroup" aria-labelledby="queryFileDetailLabel">
        <label class="radio-option" title="Quick answer using 10 chunks">
          <input type="radio" name="queryFileDetail" value="quick"> ⚡ Quick
        </label>
        <label class="radio-option" title="Balanced answer using 20 chunks">
          <input type="radio" name="queryFileDetail" value="balanced" checked> 📊 Balanced
        </label>
        <label class="radio-option" title="Comprehensive answer">
          <input type="radio" name="queryFileDetail" value="comprehensive"> 📚 Comprehensive
        </label>
        <label class="radio-option" title="Ultra comprehensive - Extended wait">
          <input type="radio" name="queryFileDetail" value="ultra"> 🎓 Ultra Deep
        </label>
      </div>
      
      <button id="runQueryFileBtn" class="btn" aria-label="Submit query with uploaded files">🔍 Query with File</button>
      
      <div id="queryFileResult" style="display: none;" aria-live="polite">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h3 style="margin: 0;">Answer:</h3>
          <button type="button" id="exportQueryFilePdfBtn" class="btn" style="padding: 6px 12px; font-size: 13px; background: var(--bg-tertiary, #333); border: 1px solid var(--border-color, #444); display: none;">
            🖨️ Print
          </button>
        </div>
        <div id="queryFileAnswer" class="result-box"></div>
      </div>
    </div>
  `;
}
