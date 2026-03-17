/**
 * Configuration Tab Component
 */

import { testConnection as testApiConnection, clearDatabase as clearApiDatabase } from '@/api';
import { updateStats } from '@/components/StatsCard';
import { getElement, setVisible, setHTML } from '@/utils/dom';
import { cancelActiveQuery } from '@/stores/appStore';

/**
 * Initialize config tab
 */
export function initConfigTab(): void {
  getElement('testConnectionBtn')?.addEventListener('click', handleTestConnection);
  getElement('refreshConnectionBtn')?.addEventListener('click', handleRefreshConnection);
  getElement('clearDatabaseBtn')?.addEventListener('click', handleClearDatabase);
}

/**
 * Handle test connection
 */
async function handleTestConnection(): Promise<void> {
  const statusEl = getElement('configStatus');
  const systemInfoEl = getElement('systemInfo');
  
  statusEl!.textContent = 'Testing...';
  
  try {
    const data = await testApiConnection();
    
    setHTML('configStatus', '<span class="success">✅ Connected!</span>');
    setVisible('systemInfo', true);
    systemInfoEl!.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    setHTML('configStatus', `<span class="error">❌ Connection failed: ${message}</span>`);
  }
}

/**
 * Handle refresh connection
 */
function handleRefreshConnection(): void {
  // Cancel any active requests
  cancelActiveQuery();
  
  // Reset UI
  const runBtn = getElement<HTMLButtonElement>('runQueryBtn');
  if (runBtn) {
    runBtn.disabled = false;
    runBtn.textContent = '🔍 Ask Question';
  }
  
  setHTML('configStatus', '<span class="success">✅ Connection state refreshed.</span>');
}

/**
 * Handle clear database
 */
async function handleClearDatabase(): Promise<void> {
  const statusEl = getElement('clearStatus');
  
  if (!confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
    return;
  }
  
  statusEl!.textContent = 'Clearing database...';
  
  try {
    await clearApiDatabase();
    await updateStats();
    setHTML('clearStatus', '<span class="success">✅ Database cleared!</span>');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    setHTML('clearStatus', `<span class="error">❌ Error: ${message}</span>`);
  }
}

/**
 * Get tab HTML
 */
export function getConfigTabHTML(): string {
  return `
    <div id="config" class="tab-content card" role="tabpanel" aria-labelledby="tab-config">
      <h2>⚙️ Configuration</h2>
      <p><strong>API URL:</strong> <span id="apiUrlDisplay">http://localhost:8002</span></p>
      
      <button id="testConnectionBtn" class="btn" aria-label="Test API connection">🔍 Test Connection</button>
      <button id="refreshConnectionBtn" class="btn" aria-label="Refresh connection state">🔄 Refresh Connection</button>
      <div id="configStatus" role="status" aria-live="polite"></div>
      
      <h3 style="margin-top: 30px;">📊 System Information</h3>
      <div id="systemInfo" class="result-box" style="display: none;" aria-label="System information"></div>
      
      <h3 style="margin-top: 30px;">🗑️ Database Management</h3>
      <button id="clearDatabaseBtn" class="btn danger" aria-label="Clear all database data">🗑️ Clear All Data</button>
      <div id="clearStatus" role="status" aria-live="polite"></div>
    </div>
  `;
}
