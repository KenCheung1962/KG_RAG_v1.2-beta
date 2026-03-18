/**
 * Query Tab Component
 */

import { sendQuery } from '@/api';
import type { QueryMode } from '@/config';
import { getElement, setVisible, setDisabled } from '@/utils/dom';
import { escapeHtml } from '@/utils/helpers';
import {
  setActiveQueryController, setIsQuerying, cancelActiveQuery, isQuerying
} from '@/stores/appStore';

// Store last query and answer for printing
let lastQueryText = '';
let lastAnswerText = '';
let lastSources: string[] = [];

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
      h1 { font-size: 18pt; border-bottom: 2px solid #333; padding-bottom: 0.3cm; margin-top: 1cm; }
      h2 { font-size: 14pt; margin-top: 0.8cm; color: #333; }
      h3 { font-size: 12pt; margin-top: 0.6cm; color: #555; }
      .no-print { display: none; }
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
      .print-button:hover { background: #45a049; }
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
 * Initialize query tab
 */
export function initQueryTab(): void {
  getElement('runQueryBtn')?.addEventListener('click', handleRunQuery);
  getElement('printQueryBtn')?.addEventListener('click', (e) => printAnswer(e));
  
  // Clear previous answer when user starts typing a new query
  getElement('queryText')?.addEventListener('input', () => {
    const printBtn = getElement('printQueryBtn');
    if (printBtn) printBtn.style.display = 'none';
    // Don't clear the answer text - let user see it until new query is submitted
  });
  
  // Test query buttons
  getElement('testQueryCompanies')?.addEventListener('click', () => setTestQuery('What companies are mentioned?'));
  getElement('testQueryRelations')?.addEventListener('click', () => setTestQuery('What relationships exist?'));
  getElement('testQueryOverview')?.addEventListener('click', () => setTestQuery('Give me an overview'));
}

/**
 * Set test query text
 */
function setTestQuery(query: string): void {
  const textarea = getElement<HTMLTextAreaElement>('queryText');
  if (textarea) textarea.value = query;
  handleRunQuery();
}

/**
 * Get selected query mode
 */
function getQueryMode(): QueryMode {
  const radio = document.querySelector('input[name="queryMode"]:checked') as HTMLInputElement;
  return (radio?.value as QueryMode) || 'hybrid';
}

/**
 * Get selected query detail level
 */
function getQueryDetail(): { 
  top_k: number; 
  ultra_comprehensive: boolean;
  detailed: boolean;
  label: string;
} {
  const radio = document.querySelector('input[name="queryDetail"]:checked') as HTMLInputElement;
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
 * Handle run query
 */
async function handleRunQuery(): Promise<void> {
  const queryText = getElement<HTMLTextAreaElement>('queryText')?.value.trim();
  
  if (!queryText) {
    alert('Please enter a question');
    return;
  }
  
  // Store query for printing
  lastQueryText = queryText;
  
  // Cancel any existing query
  if (isQuerying()) {
    cancelActiveQuery();
  }
  
  const mode = getQueryMode();
  const detail = getQueryDetail();
  const answerText = getElement('answerText');
  const sourcesText = getElement('sourcesText');
  const runBtn = getElement('runQueryBtn');
  const printBtn = getElement('printQueryBtn');
  
  setIsQuerying(true);
  setDisabled('runQueryBtn', true);
  if (printBtn) printBtn.style.display = 'none';
  
  // Update button text based on mode
  const isUltra = detail.ultra_comprehensive;
  const estimatedTime = isUltra ? '3-5 min' : (detail.detailed ? '2-4 min' : '30-60 sec');
  if (runBtn) runBtn.textContent = `⏳ ${detail.label} Mode (${estimatedTime})...`;
  
  setVisible('queryResult', true);
  const modeDescription = isUltra ? 'ultra-extensive (3000+ words)' : (detail.detailed ? 'comprehensive (2000+ words)' : 'standard');
  answerText!.innerHTML = `<span class="spinner"></span> <strong>${detail.label} Mode</strong><br>Retrieving ${detail.top_k} chunks + Generating ${modeDescription} answer...<br>Estimated time: ${estimatedTime}<br><small>Please wait, do not close or refresh the page</small>`;
  sourcesText!.textContent = '';
  
  const controller = new AbortController();
  setActiveQueryController(controller);
  
  // Set timeout based on mode
  let timeoutMs: number;
  if (isUltra) {
    timeoutMs = 900000;  // 15 min for ultra
  } else if (detail.detailed) {
    timeoutMs = 300000;  // 5 min for comprehensive
  } else if (detail.top_k >= 20) {
    timeoutMs = 240000;  // 4 min for balanced
  } else {
    timeoutMs = 180000;  // 3 min for quick
  }
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const result = await sendQuery({ 
      message: queryText, 
      mode,
      top_k: detail.top_k,
      ultra_comprehensive: detail.ultra_comprehensive,
      detailed: detail.detailed
    }, controller.signal);
    clearTimeout(timeoutId);
    
    const responseText = result.response || result.answer || JSON.stringify(result, null, 2);
    
    // Debug: log full result to see what fields are returned
    console.log('[Query] Full result:', result);
    console.log('[Query] Result keys:', Object.keys(result));
    
    // Store sources and build answer with references for printing
    // Check multiple possible source field names
    const sources = result.sources || result.source_documents || (result as Record<string, unknown>).source || (result as Record<string, unknown>).chunks;
    console.log('[Query] Raw sources:', sources);
    console.log('[Query] sources type:', typeof sources);
    console.log('[Query] sources isArray:', Array.isArray(sources));
    
    // TEMPORARY: If backend returns number instead of array, log the issue
    if (typeof sources === 'number') {
      console.warn('[Query] Backend returned source COUNT instead of source filenames. References cannot be displayed.');
    }
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
    console.log('[Query] Processed sources:', lastSources);
    
    // Extract which sources are actually CITED in the response text
    const citedSourceNumbers = new Set<number>();
    const sourceCitations = responseText.match(/Source\s+(\d+)/gi);
    if (sourceCitations) {
      sourceCitations.forEach(citation => {
        const match = citation.match(/\d+/);
        if (match) {
          citedSourceNumbers.add(parseInt(match[0], 10));
        }
      });
    }
    console.log('[Query] Sources cited in text:', Array.from(citedSourceNumbers));
    
    // Build answer with reference section for print output
    // ONLY include references that are actually CITED in the text
    let answerWithRefs = responseText;
    if (citedSourceNumbers.size > 0 && lastSources.length > 0) {
      // Filter to only cited sources
      const citedSources = Array.from(citedSourceNumbers)
        .sort((a, b) => a - b)
        .map(num => lastSources[num - 1])  // Source 1 = index 0
        .filter(src => src !== undefined);  // Remove undefined
      
      if (citedSources.length > 0) {
        answerWithRefs += '\n\n\n## References\n\n';
        citedSources.forEach((src, idx) => {
          answerWithRefs += `${idx + 1}. ${src}\n`;
        });
      }
    }
    // Note removed - response shown as-is from backend
    lastAnswerText = answerWithRefs;
    
    if (printBtn) printBtn.style.display = 'inline-block';
    
    // Check if LLM timed out
    if (responseText.startsWith('Found') && responseText.includes('relevant chunks')) {
      renderTimeoutResponse(responseText, answerText!);
    } else {
      // Format the response with improved styling - include ONLY cited references
      let displayText = responseText;
      if (citedSourceNumbers.size > 0 && lastSources.length > 0) {
        // Filter to only cited sources
        const citedSources = Array.from(citedSourceNumbers)
          .sort((a, b) => a - b)
          .map(num => lastSources[num - 1])
          .filter(src => src !== undefined);
        
        if (citedSources.length > 0) {
          displayText += '\n\n\n## References\n\n' + citedSources.map((src, idx) => `${idx + 1}. ${src}`).join('\n');
        }
      }
      // Note removed - response shown as-is from backend
      answerText!.innerHTML = formatQueryResponse(displayText);
      
      // Render math formulas using KaTeX
      setTimeout(() => renderMathInElement(answerText!), 100);
    }
    
    // Show sources - ONLY those that are CITED in the answer text
    const rawSources = result.sources || result.source_documents;
    if (citedSourceNumbers.size > 0 && lastSources.length > 0) {
      // Filter to only cited sources
      const citedSources = Array.from(citedSourceNumbers)
        .sort((a, b) => a - b)
        .map(num => lastSources[num - 1])
        .filter(src => src !== undefined);
      
      if (citedSources.length > 0) {
        sourcesText!.innerHTML = citedSources
          .map(s => `<div class="source-item">${escapeHtml(s)}</div>`)
          .join('');
      } else {
        sourcesText!.textContent = 'No specific sources cited in the answer.';
      }
    } else if (lastSources.length > 0) {
      sourcesText!.innerHTML = `<div class="source-item">Sources available but not cited in answer</div>`;
    } else if (typeof rawSources === 'number') {
      sourcesText!.innerHTML = `<div class="source-item">Found ${rawSources} sources (filenames not available - backend config issue)</div>`;
    } else {
      sourcesText!.textContent = 'No sources available';
    }
    
  } catch (error) {
    clearTimeout(timeoutId);
    handleQueryError(error, answerText!);
  } finally {
    setIsQuerying(false);
    setActiveQueryController(null);
    setDisabled('runQueryBtn', false);
    if (runBtn) runBtn.textContent = '🔍 Ask Question';
  }
}

/**
 * Format query response with improved styling
 * 1. Remove irrelevant disclaimers
 * 2. Add bold hierarchical headings
 * 3. Format tables with proper boundaries
 * 4. Clean up excessive newlines
 */
export function formatQueryResponse(text: string): string {
  if (!text) return '';
  
  let cleaned = text;
  
  // Remove "Note on Context" / "Context Note" sections entirely (multi-line)
  // Matches sections like: "Note on Context\n\nThe provided context discusses..."
  cleaned = cleaned.replace(/Note on Context[\s\S]*?I will answer[^.]*\./gi, '');
  cleaned = cleaned.replace(/Context Note[\s\S]*?general knowledge[^.]*\./gi, '');
  
  // Remove standalone irrelevant context explanations
  cleaned = cleaned.replace(/The provided context discusses[\s\S]*?unrelated to[\s\S]*?\./gi, '');
  cleaned = cleaned.replace(/The (?:provided |available |indexed )?context (?:does not contain|lacks|is (?:unrelated|irrelevant))[\s\S]*?\./gi, '');
  
  // Remove "I will answer based on general knowledge" statements
  cleaned = cleaned.replace(/I will answer your question based on (?:general |my )?knowledge[^.]*\./gi, '');
  cleaned = cleaned.replace(/Based on (?:general |my )?knowledge,?[^.]*\./gi, '');
  
  // Remove editor notes like "(Remove this gap)"
  cleaned = cleaned.replace(/\(Remove this[^)]*\)/gi, '');
  cleaned = cleaned.replace(/\[Remove this[^\]]*\]/gi, '');
  
  // Remove common disclaimers and irrelevant context
  const disclaimersToRemove = [
    /I couldn't find any information[^.]*\./gi,
    /Please try a different search term[^.]*\./gi,
    /The indexed data may contain formatting issues[^.]*\./gi,
    /Note: This response is based on[^.]*\./gi,
    /Disclaimer:[^.]*\./gi,
    /I apologize, but[^.]*\./gi,
    /I don't see any information[^.]*\./gi,
    /There is no information[^.]*\./gi,
    /The context provided (?:does not|doesn't) (?:contain|have|discuss)[^.]*\./gi,
  ];
  
  disclaimersToRemove.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });
  
  // Clean up excessive newlines (more than 2 consecutive)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  // Remove standalone parentheses with instructions
  cleaned = cleaned.replace(/^\s*\([^)]+\)\s*$/gmi, '');
  
  // Fix math equation spacing issues
  // Remove tabs and excessive spaces around math symbols
  cleaned = cleaned.replace(/([A-Za-z])(\t+|\s{2,})([|⟨⟩])/g, '$1 $3');  // H|0⟩ not H   |0⟩
  cleaned = cleaned.replace(/(\))\t+|\s{2,}([|⟨⟩])/g, '$1 $2');  // (|0⟩ + |1⟩) not (  |0⟩
  cleaned = cleaned.replace(/([|⟨⟩][^|⟨⟩]*?)(\t+|\s{2,})(?=\))/g, '$1');  // Fix spaces before closing paren
  cleaned = cleaned.replace(/\t+/g, ' ');  // Replace all tabs with single space
  cleaned = cleaned.replace(/\s{3,}/g, ' ');  // Replace 3+ spaces with single space
  
  // Format markdown headings with bold styling
  // # Heading → <strong class="h1">Heading</strong>
  cleaned = cleaned.replace(/^# (.+)$/gm, '<strong class="query-h1">$1</strong>');
  cleaned = cleaned.replace(/^## (.+)$/gm, '<strong class="query-h2">$1</strong>');
  cleaned = cleaned.replace(/^### (.+)$/gm, '<strong class="query-h3">$1</strong>');
  cleaned = cleaned.replace(/^#### (.+)$/gm, '<strong class="query-h4">$1</strong>');
  
  // Remove empty headings (headings with no content after them)
  // This pattern removes a heading if it's immediately followed by another heading
  cleaned = cleaned.replace(/(<strong class="query-h[1234]">[^<]+<\/strong>)(?:\s|<br>)*\1/gi, '$1');
  
  // Format tables with proper boundaries
  // Detect markdown tables (lines with | )
  const lines = cleaned.split('\n');
  let inTable = false;
  let tableHtml = '';
  const formattedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isTableLine = line.includes('|') && (line.match(/\|/g) || []).length >= 2;
    const isSeparatorLine = /^\s*\|?[-:\s\|]+\|?\s*$/.test(line);
    
    if (isTableLine && !isSeparatorLine) {
      if (!inTable) {
        inTable = true;
        tableHtml = '<div class="query-table-container"><table class="query-table">';
      }
      
      // Parse table row
      const cells = line.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length > 0) {
        const isHeader = i === 0 || (i > 0 && isSeparatorLine && i === 1);
        const cellTag = isHeader ? 'th' : 'td';
        const rowClass = isHeader ? 'query-table-header' : '';
        tableHtml += `<tr class="${rowClass}">${cells.map(c => `<${cellTag}>${escapeHtml(c)}</${cellTag}>`).join('')}</tr>`;
      }
    } else if (isSeparatorLine) {
      // Skip separator lines in markdown tables
      continue;
    } else {
      if (inTable) {
        inTable = false;
        tableHtml += '</table></div>';
        formattedLines.push(tableHtml);
        tableHtml = '';
      }
      formattedLines.push(line);
    }
  }
  
  // Close any open table
  if (inTable) {
    tableHtml += '</table></div>';
    formattedLines.push(tableHtml);
  }
  
  cleaned = formattedLines.join('\n');
  
  // Format bold and italic text
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  cleaned = cleaned.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Format bullet points
  cleaned = cleaned.replace(/^- (.+)$/gm, '• $1');
  cleaned = cleaned.replace(/^\* (.+)$/gm, '• $1');
  cleaned = cleaned.replace(/^(\d+)\. (.+)$/gm, '$1. $2');
  
  // Convert newlines to <br> for HTML display
  cleaned = cleaned.replace(/\n/g, '<br>');
  
  // Clean up empty <br> sequences
  cleaned = cleaned.replace(/(<br>){3,}/g, '<br><br>');
  
  return cleaned;
}

/**
 * Render math formulas using KaTeX after content is inserted
 * This should be called after setting innerHTML
 */
function renderMathInElement(element: HTMLElement): void {
  // Check if KaTeX is loaded
  if ((window as any).katex && (window as any).renderMathInElement) {
    try {
      (window as any).renderMathInElement(element, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\[', right: '\\]', display: true},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\begin{equation}', right: '\\end{equation}', display: true},
          {left: '\\begin{align}', right: '\\end{align}', display: true},
          {left: '\\begin{matrix}', right: '\\end{matrix}', display: true},
        ],
        throwOnError: false,
        errorColor: '#cc0000',
        macros: {
          '\\RR': '\\mathbb{R}',
          '\\NN': '\\mathbb{N}',
          '\\ZZ': '\\mathbb{Z}',
        }
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
    }
  } else {
    // KaTeX not loaded yet, retry after a short delay
    setTimeout(() => renderMathInElement(element), 500);
  }
}

/**
 * Render timeout response with formatted chunks
 */
function renderTimeoutResponse(responseText: string, container: HTMLElement): void {
  const chunkMatch = responseText.match(/Found (\d+) relevant chunks/);
  const chunkCount = chunkMatch ? chunkMatch[1] : 'some';
  
  let html = `<h3>⚠️ LLM Processing Timed Out</h3>`;
  html += `<p>The AI processing timed out after 25 seconds. Showing ${chunkCount} raw text chunks instead:</p><hr>`;
  
  const chunksStart = responseText.indexOf('\n\n');
  if (chunksStart > 0) {
    const chunks = responseText.substring(chunksStart + 2);
    const chunkLines = chunks.split('\n\n');
    
    chunkLines.forEach((chunk, index) => {
      if (chunk.trim()) {
        html += `<h4>Chunk ${index + 1}</h4><pre>${escapeHtml(chunk)}</pre><hr>`;
      }
    });
  } else {
    html += `<pre>${escapeHtml(responseText)}</pre>`;
  }
  
  // Add retry button
  html += `<button id="retryQueryBtn" class="btn">🔄 Retry with Simpler Query</button>`;
  container.innerHTML = html;
  
  getElement('retryQueryBtn')?.addEventListener('click', () => {
    const currentQuery = getElement<HTMLTextAreaElement>('queryText')?.value || '';
    const simplerQuery = currentQuery.replace(/explain|in detail|with examples|comprehensive|detailed/gi, '').trim();
    if (simplerQuery && simplerQuery !== currentQuery) {
      getElement<HTMLTextAreaElement>('queryText')!.value = simplerQuery;
      handleRunQuery();
    } else {
      alert('Try a simpler, more specific query. Example: "What is Bayesian probability?"');
    }
  });
}

/**
 * Handle query errors
 */
function handleQueryError(error: unknown, container: HTMLElement): void {
  console.error('Query error:', error);
  
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      container.textContent = '⏰ Query was cancelled or timed out after 5 minutes.';
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      container.innerHTML = `❌ Network error. <button id="retryErrorBtn" class="btn">Retry</button>`;
      getElement('retryErrorBtn')?.addEventListener('click', handleRunQuery);
    } else {
      container.textContent = `❌ Error: ${error.message}`;
    }
  } else {
    container.textContent = '❌ Unknown error occurred';
  }
}

/**
 * Get tab HTML
 */
export function getQueryTabHTML(): string {
  return `
    <div id="query" class="tab-content card" role="tabpanel" aria-labelledby="tab-query">
      <h2>🔍 Query Knowledge Graph</h2>
      
      <div class="query-info-banner" style="background: rgba(0, 212, 255, 0.1); border-left: 3px solid var(--accent-primary); padding: 12px 16px; margin-bottom: 15px; border-radius: 0 8px 8px 0; font-size: 13px;">
        <strong>💡 Tip:</strong> You can query while files are uploading! Queries may be slower during heavy uploads.
        Newly uploaded files become searchable after processing completes.
      </div>
      
      <h3 id="queryModeLabel">Query Mode</h3>
      <div class="radio-group" role="radiogroup" aria-labelledby="queryModeLabel">
        <label class="radio-option">
          <input type="radio" name="queryMode" value="hybrid" checked> Hybrid
        </label>
        <label class="radio-option">
          <input type="radio" name="queryMode" value="local"> Local
        </label>
        <label class="radio-option">
          <input type="radio" name="queryMode" value="global"> Global
        </label>
      </div>
      
      <h3 id="queryDetailLabel">Answer Detail Level</h3>
      <div class="radio-group" role="radiogroup" aria-labelledby="queryDetailLabel">
        <label class="radio-option" title="Quick answer using 10 chunks">
          <input type="radio" name="queryDetail" value="quick"> ⚡ Quick
        </label>
        <label class="radio-option" title="Balanced answer using 20 chunks">
          <input type="radio" name="queryDetail" value="balanced" checked> 📊 Balanced
        </label>
        <label class="radio-option" title="Comprehensive answer (2000+ words)">
          <input type="radio" name="queryDetail" value="comprehensive"> 📚 Comprehensive
        </label>
        <label class="radio-option" title="Ultra comprehensive (3000-4000 words) - Extended wait">
          <input type="radio" name="queryDetail" value="ultra"> 🎓 Ultra Deep
        </label>
      </div>
      
      <label for="queryText" class="sr-only">Enter your question</label>
      <textarea id="queryText" placeholder="Ask a question about your knowledge graph...&#10;Example: What do you know about Alibaba?&#10;&#10;Tip: For complex queries, the AI may time out after 25 seconds.&#10;Try simpler, more specific questions for better results." rows="6" aria-describedby="queryText-hint"></textarea>
      <p id="queryText-hint" class="hint">Type your question about the knowledge graph</p>
      
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button id="runQueryBtn" class="btn" aria-label="Submit query">🔍 Ask Question</button>
        <button type="button" id="printQueryBtn" class="btn" style="padding: 6px 12px; font-size: 13px; display: none;" aria-label="Print answer">🖨️ Print</button>
      </div>
      
      <div id="queryResult" style="display: none;" aria-live="polite">
        <h3>Answer:</h3>
        <div id="answerText" class="result-box query-answer"></div>
        
        <h3>Sources:</h3>
        <div id="sourcesText" class="sources-box"></div>
      </div>
      
      <!-- KaTeX for math rendering -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
      <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
      <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
      
      <style>
        /* Query Response Formatting */
        .query-answer {
          line-height: 1.7;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        /* Keep math equations on single line */
        .query-answer .math-inline {
          white-space: nowrap;
          display: inline-block;
        }
        
        /* H1 - Biggest, boldest */
        .query-answer .query-h1 {
          display: block;
          font-size: 1.8em;
          font-weight: 800;
          color: var(--primary-color, #4CAF50);
          margin-top: 24px;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 3px solid var(--primary-color, #4CAF50);
        }
        
        /* H2 - Bigger, bold */
        .query-answer .query-h2 {
          display: block;
          font-size: 1.4em;
          font-weight: 700;
          color: var(--text-primary, #e0e0e0);
          margin-top: 20px;
          margin-bottom: 12px;
          padding-left: 12px;
          border-left: 4px solid var(--primary-color, #4CAF50);
        }
        
        /* H3 - Big, bold */
        .query-answer .query-h3 {
          display: block;
          font-size: 1.2em;
          font-weight: 600;
          color: var(--text-primary, #e0e0e0);
          margin-top: 16px;
          margin-bottom: 10px;
          border-left: 3px solid var(--accent-secondary, #64b5f6);
          padding-left: 10px;
        }
        
        /* H4 - Medium, semi-bold */
        .query-answer .query-h4 {
          display: block;
          font-size: 1.1em;
          font-weight: 600;
          color: var(--text-secondary, #b0b0b0);
          margin-top: 12px;
          margin-bottom: 6px;
          font-style: italic;
        }
        
        .query-answer br + br {
          content: "";
          display: block;
          margin-top: 8px;
        }
        
        /* Bold text **text** */
        .query-answer strong {
          font-weight: 600;
          color: var(--text-primary, #e0e0e0);
        }
        
        /* Table Styling */
        .query-table-container {
          overflow-x: auto;
          margin: 16px 0;
          border-radius: 8px;
          border: 1px solid var(--border-color, #333);
        }
        
        .query-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9em;
        }
        
        .query-table th,
        .query-table td {
          padding: 10px 12px;
          text-align: left;
          border-bottom: 1px solid var(--border-color, #333);
        }
        
        .query-table th {
          background: rgba(76, 175, 80, 0.15);
          font-weight: 600;
          color: var(--primary-color, #4CAF50);
        }
        
        .query-table tr:hover {
          background: rgba(255, 255, 255, 0.03);
        }
        
        .query-table tr:last-child td {
          border-bottom: none;
        }
        
        .query-table-container + br {
          display: none;
        }
        
        /* Math Formula Styling */
        .query-answer .katex {
          font-size: 1.1em;
          color: var(--text-primary, #e0e0e0);
        }
        
        .query-answer .katex-display {
          margin: 1.5em 0;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 1em;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          border-left: 3px solid var(--primary-color, #4CAF50);
        }
        
        .query-answer .katex-display .katex {
          font-size: 1.2em;
        }
        
        /* Inline math */
        .query-answer .katex-inline {
          padding: 0 0.2em;
        }
        
        /* Math error coloring */
        .query-answer .katex-error {
          color: #ff6b6b;
          border-bottom: 1px dashed #ff6b6b;
        }
      </style>
      
      <h3>Test Queries</h3>
      <button id="testQueryCompanies" class="btn" aria-label="Run test query for companies">Companies</button>
      <button id="testQueryRelations" class="btn" aria-label="Run test query for relationships">Relationships</button>
      <button id="testQueryOverview" class="btn" aria-label="Run test query for overview">Overview</button>
    </div>
  `;
}
