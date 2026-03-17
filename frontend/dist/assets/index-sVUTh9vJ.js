(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const j={},M=(j==null?void 0:j.VITE_API_URL)||"http://localhost:8002",B=(j==null?void 0:j.VITE_API_KEY)||"static-internal-key",ht=1e4;function l(e){return document.getElementById(e)}function Q(e,t){const n=l(e);n&&(n.textContent=t)}function X(e,t){const n=l(e);n&&(n.innerHTML=t)}function N(e,t){const n=l(e);n&&(n.style.display=t?"block":"none")}function L(e,t){const n=l(e);n&&(n.disabled=t)}function gt(e,t){var n,s;document.querySelectorAll(".tab").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(a=>a.classList.remove("active")),(n=document.querySelector(`[data-tab="${e}"]`))==null||n.classList.add("active"),(s=l(e))==null||s.classList.add("active")}const g={kgStats:null,docStats:null,lastStatsUpdate:null,selectedFiles:[],folderFiles:[],selectedQueryFiles:[],isUploading:!1,activeQueryController:null,isQuerying:!1,statsInterval:null},He=new Set;function S(){He.forEach(e=>e())}const oe=()=>[...g.selectedFiles],bt=()=>[...g.folderFiles],Ne=()=>[...g.selectedQueryFiles],yt=()=>g.isQuerying;function vt(e){g.kgStats=e,g.lastStatsUpdate=Date.now(),S()}function wt(e){g.docStats=e,S()}function Oe(e){g.selectedFiles.some(n=>n.name===e.name&&n.size===e.size)||(g.selectedFiles.push(e),S())}function kt(e){g.selectedFiles.splice(e,1),S()}function ze(){g.selectedFiles=[],S()}function xt(e){g.folderFiles=[...e],S()}function $t(e){g.selectedQueryFiles.some(n=>n.name===e.name&&n.size===e.size)||(g.selectedQueryFiles.push(e),S())}function Et(e){g.selectedQueryFiles.splice(e,1),S()}function Pe(){g.selectedQueryFiles=[],S()}function K(e){g.isUploading=e,S()}function Be(e){g.activeQueryController=e,S()}function xe(){g.activeQueryController&&(g.activeQueryController.abort(),g.activeQueryController=null,g.isQuerying=!1,S())}function U(e){g.isQuerying=e,S()}function Ft(e){g.statsInterval&&clearInterval(g.statsInterval),g.statsInterval=e}function Tt(){g.statsInterval&&(clearInterval(g.statsInterval),g.statsInterval=null),xe()}function St(){Tt(),He.clear()}const Lt=`
  .skeleton {
    background: linear-gradient(90deg, 
      rgba(255,255,255,0.05) 25%, 
      rgba(255,255,255,0.1) 50%, 
      rgba(255,255,255,0.05) 75%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s ease-in-out infinite;
    border-radius: var(--border-radius-sm);
  }
  
  @keyframes skeleton-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  .skeleton-text {
    height: 16px;
    width: 60%;
    margin: 8px 0;
  }
  
  .skeleton-text-sm {
    height: 12px;
    width: 40%;
    margin: 6px 0;
  }
  
  .skeleton-number {
    height: 32px;
    width: 50px;
    margin: 0 auto 8px;
  }
  
  .skeleton-box {
    height: 80px;
    width: 100%;
  }
  
  .skeleton-btn {
    height: 40px;
    width: 120px;
    margin-top: 15px;
  }
  
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 26, 46, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top-color: var(--accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .loading-message {
    color: var(--text-primary);
    margin-top: 15px;
    font-size: 16px;
  }
`;function je(){if(document.getElementById("loading-styles"))return;const e=document.createElement("style");e.id="loading-styles",e.textContent=Lt,document.head.appendChild(e)}function Ct(){je();const e=l("stats-container");e&&(e.innerHTML=`
    <div class="card">
      <h2>📊 Knowledge Graph Stats</h2>
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-number" id="statDocs"><span class="skeleton skeleton-number"></span></div>
          <div class="stat-label">Documents</div>
        </div>
        <div class="stat-box">
          <div class="stat-number" id="statEntities"><span class="skeleton skeleton-number"></span></div>
          <div class="stat-label">Entities</div>
        </div>
        <div class="stat-box">
          <div class="stat-number" id="statRelations"><span class="skeleton skeleton-number"></span></div>
          <div class="stat-label">Relationships</div>
        </div>
        <div class="stat-box">
          <div class="stat-number" id="statChunks"><span class="skeleton skeleton-number"></span></div>
          <div class="stat-label">Chunks</div>
        </div>
      </div>
      <button id="refreshStatsBtn" class="btn">🔄 Refresh Stats</button>
    </div>
  `)}const At="http://localhost:8002",It="http://localhost:8012",ne={entities:45578,relationships:115308,chunks:368407,documents:1970};async function Pt(){try{const e=await fetch(`${At}/health`,{signal:AbortSignal.timeout(3e3)});if(!e.ok)return null;const t=await e.json();return{kg:{entities:t.entities_count??0,relationships:t.relationships_count??0,chunks:t.chunks_count??0},docs:{total_documents:t.documents_count??0}}}catch{return console.log("Port 8002 API not available"),null}}async function Bt(){try{const e=await fetch(`${It}/stats`,{signal:AbortSignal.timeout(3e3)});if(!e.ok)return null;const t=await e.json();return{kg:{entities:t.entities??0,relationships:t.relationships??0,chunks:t.chunks??0},docs:{total_documents:t.documents??0}}}catch{return console.log("Port 8012 proxy not available"),null}}async function Rt(){const e=await Pt();if(e)return console.log("✅ Stats from port 8002:",{docs:e.docs.total_documents,entities:e.kg.entities,rels:e.kg.relationships,chunks:e.kg.chunks}),{...e,source:"pgvector-api:8002"};const t=await Bt();return t?(console.log("✅ Stats from port 8012:",{docs:t.docs.total_documents,entities:t.kg.entities,rels:t.kg.relationships,chunks:t.kg.chunks}),{...t,source:"proxy:8012"}):(console.warn("⚠️ Using fallback hardcoded stats - API may be down"),{kg:{entities:ne.entities,relationships:ne.relationships,chunks:ne.chunks},docs:{total_documents:ne.documents},source:"fallback"})}function qt(){je(),Ct();const e=l("refreshStatsBtn");e==null||e.addEventListener("click",P),P()}async function P(){try{console.log("[Stats] Fetching pgvector stats...");const{kg:e,docs:t,source:n}=await Rt();console.log(`[Stats] From ${n}:`,{docs:(t==null?void 0:t.total_documents)??0,entities:(e==null?void 0:e.entities)??0,relations:(e==null?void 0:e.relationships)??0,chunks:(e==null?void 0:e.chunks)??0}),vt(e),wt(t),Dt(e,t)}catch(e){console.error("[Stats] Failed to fetch:",e),Q("statDocs","❌"),Q("statEntities","❌"),Q("statRelations","❌"),Q("statChunks","❌")}}function Dt(e,t){const n=(t==null?void 0:t.total_documents)??0,s=(e==null?void 0:e.entities)??(e==null?void 0:e.total_entities)??0,a=(e==null?void 0:e.relationships)??(e==null?void 0:e.total_relations)??0,o=(e==null?void 0:e.chunks)??0;console.log("Rendering stats:",{docs:n,entities:s,relations:a,chunks:o}),Q("statDocs",String(n)),Q("statEntities",String(s)),Q("statRelations",String(a)),Q("statChunks",String(o))}let V={percent:0,status:"",isActive:!1};function _t(e){const t=l(e);t&&(t.innerHTML=`
    <div class="progress-container" style="display: none;">
      <div class="progress-bar">
        <div class="progress-fill" style="width: 0%"></div>
      </div>
      <div class="progress-status"></div>
    </div>
  `)}function $e(e){const t=l(e),n=t==null?void 0:t.querySelector(".progress-container");n&&(n.style.display="block",V.isActive=!0)}function ie(e,t,n){const s=l(e),a=s==null?void 0:s.querySelector(".progress-fill"),o=s==null?void 0:s.querySelector(".progress-status");a&&(a.style.width=`${t}%`),o&&n!==void 0&&(o.innerHTML=n),V.percent=t,n!==void 0&&(V.status=n)}function w(e,t,n=!0){const s=n?'<span class="spinner"></span>':"";ie(e,V.percent,`${s}<span style="color: #00d4ff;">${t}</span>`)}function Ut(){return V.isActive}async function Ee(){try{return(await fetch(`${M}/health`,{method:"GET",headers:{"X-API-Key":B},signal:AbortSignal.timeout(5e3)})).ok}catch{return!1}}function Qt(e){return new Promise(t=>setTimeout(t,e))}async function R(e,t={},n=3e5,s=3){const a=new AbortController,o=setTimeout(()=>a.abort(),n);try{const r=await fetch(e,{...t,signal:a.signal});return clearTimeout(o),r}catch(r){if(clearTimeout(o),r instanceof Error&&r.name==="AbortError"){const i=new Error(`Request timeout after ${n/1e3}s`);throw i.name="TimeoutError",i}if(s>0&&r instanceof TypeError)return console.log(`Network error, retrying... (${s} attempts left)`),await Qt(1e3*(4-s)),R(e,t,n,s-1);throw r}}function Ke(e){const t=e.includes("?")?"&":"?";return`${M}${e}${t}_=${Date.now()}`}async function Fe(e=1e3){const t=await R(`${M}/api/v1/documents?limit=${e}`,{headers:{"X-API-Key":B}});if(!t.ok)throw new Error(`Failed to fetch documents: ${t.status}`);return t.json()}function Mt(e){return new Promise((t,n)=>{const s=new FileReader;s.onload=()=>{const o=s.result.split(",")[1];t(o)},s.onerror=()=>{n(new Error(`Failed to read file: ${e.name}`))},s.readAsDataURL(e)})}async function ce(e){const t=await Mt(e),n=e.type||"application/octet-stream",s=n.startsWith("text/")||e.name.match(/\.(txt|md|csv|json|html|xml|js|ts|py|css)$/i),a=await R(`${M}/api/v1/documents/upload/json`,{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":B},body:JSON.stringify({content:t,id:e.name,content_type:s?"text/plain":n})},12e4);if(!a.ok)throw new Error(`Upload failed: ${a.status}`);return a.json()}async function We(e){try{const t=await R(`${M}/api/v1/documents/${e}/status`,{headers:{"X-API-Key":B}},1e4);return t.ok?t.json():null}catch{return null}}const Ge=`You are a knowledgeable research assistant with access to a document database.

Your task is to provide comprehensive, detailed answers based on the retrieved context. Follow these guidelines:

1. **Be thorough**: Provide detailed explanations with specific examples, data points, and relationships found in the context.

2. **Structure your answer**: Use clear headings (# for main sections, ## for subsections) and organize information logically.

3. **Synthesize information**: Don't just list facts—connect ideas, explain relationships, and provide insights that demonstrate deep understanding.

4. **Include specifics**: Cite specific entities, metrics, dates, or technical details when available in the context.

5. **Explain relevance**: Briefly explain why the information matters or how concepts relate to each other.

6. **No unnecessary disclaimers**: If the context provides relevant information, answer confidently without apologizing for "limited context."

7. **Expand on concepts**: When discussing technical topics, explain underlying principles and mechanisms, not just surface-level facts.`;async function Ye(e,t){const n=e.ultra_comprehensive,s=n||e.detailed||e.message.toLowerCase().includes("explain")||e.message.toLowerCase().includes("detail")||e.message.toLowerCase().includes("comprehensive"),a={...e,top_k:n?40:e.top_k??20,rerank:e.rerank??!0,rerank_method:e.rerank_method??"hybrid",system_prompt:e.system_prompt??Ge,detailed:s,ultra_comprehensive:n,temperature:n?.4:e.temperature??.3,max_tokens:n||s?8192:4096,message:s||n?e.message:`${e.message}

Please provide a comprehensive answer with detailed explanations, specific examples from the context, and insights about relationships between concepts.`};let o;n?o=9e5:s?o=3e5:e.top_k&&e.top_k>=20?o=24e4:o=18e4;const r=await R(Ke("/api/v1/chat"),{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":B},body:JSON.stringify(a),signal:t},o);if(!r.ok)throw new Error(`Query failed: ${r.status}`);return r.json()}async function Je(e,t){const n=e.ultra_comprehensive,s=e.detailed,a={...e,top_k:e.top_k??20,system_prompt:n||s?Ge:void 0,detailed:s,ultra_comprehensive:n,temperature:n?.4:.3,max_tokens:n||s?8192:4096,message:n||s?e.message:`${e.message}

Please provide a comprehensive answer with detailed explanations and specific examples.`},o=n?6e5:s?3e5:18e4,r=await R(Ke("/api/v1/chat/with-doc"),{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":B},body:JSON.stringify(a),signal:t},o);if(!r.ok)throw new Error(`Query with files failed: ${r.status}`);return r.json()}async function Xe(e){const t=await R(`${M}/api/v1/documents/upload/folder/json`,{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":B},body:JSON.stringify(e)},3e5);if(!t.ok)throw new Error(`Folder upload failed: ${t.status}`);return t.json()}async function Ve(){const e=await R(`${M}/health`,{headers:{"X-API-Key":B}},1e4);if(!e.ok)throw new Error(`Health check failed: ${e.status}`);return e.json()}async function Ze(){const e=await R(`${M}/api/v1/clear`,{method:"DELETE",headers:{"X-API-Key":B}},6e4);if(!e.ok)throw new Error(`Clear database failed: ${e.status}`)}const Ht=Object.freeze(Object.defineProperty({__proto__:null,clearDatabase:Ze,fetchDocuments:Fe,getDocumentStatus:We,isBackendHealthy:Ee,sendQuery:Ye,sendQueryWithFiles:Je,testConnection:Ve,uploadDocument:ce,uploadFolder:Xe},Symbol.toStringTag,{value:"Module"}));function k(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Nt(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function Ot(e,t=1e3,n=5e3){return Math.min(t*Math.pow(1.5,e),n)}function de(e,t){const n=document.getElementById(t.containerId);if(!n)return;if(e.length===0){n.style.display="none";return}n.style.display="block";const s=e.map((a,o)=>`
    <div class="file-item" data-index="${o}">
      <span class="file-name">${k(a.name)}</span>
      <span class="file-size">${Nt(a.size)}</span>
      ${t.onRemove?`
        <button class="btn-remove" data-index="${o}" title="Remove">✕</button>
      `:""}
    </div>
  `).join("");n.innerHTML=`
    <strong>${t.emptyText||"Selected files:"}</strong>
    <div class="file-list-content">${s}</div>
  `,t.onRemove&&n.querySelectorAll(".btn-remove").forEach(a=>{a.addEventListener("click",o=>{var i;o.stopPropagation();const r=parseInt(a.dataset.index||"0",10);(i=t.onRemove)==null||i.call(t,r)})})}const et="http://localhost:8013";async function Y(e,t){try{const n=await fetch(`${et}${e}`,{...t,headers:{"Content-Type":"application/json",...t==null?void 0:t.headers}});if(!n.ok){const s=await n.json().catch(()=>({error:`HTTP ${n.status}`}));throw new Error(s.error||`HTTP ${n.status}`)}return n.json()}catch(n){throw n instanceof Error&&n.name==="TypeError"?new Error("Database Management API not running. Start it with: npm run db:api"):n}}async function zt(){return Y("/stats")}async function jt(){return(await Y("/backups")).backups}async function se(){return Y("/backup",{method:"POST"})}async function Kt(){return Y("/cleanup",{method:"POST"})}async function Wt(e){return Y("/restore",{method:"POST",body:JSON.stringify({backupName:e})})}async function Gt(e){return Y("/backup",{method:"DELETE",body:JSON.stringify({backupName:e})})}async function Yt(){const e=await fetch("http://localhost:8002/api/v1/upload-failures");if(!e.ok)throw new Error(`Failed to fetch upload failures: ${e.status}`);return e.json()}async function Jt(){try{return(await fetch(`${et}/health`,{method:"GET",signal:AbortSignal.timeout(2e3)})).ok}catch{return!1}}let _=null,H=[],I=!1,W=null,ge=[],be=[];function Xt(){nn(),Vt(),Zt(),en()}async function Vt(){I=await Jt(),tt(),I&&(await Z(),await ee(),await st())}function tt(){const e=l("databasePanel"),t=l("dbApiWarning");e&&(e.style.opacity=I?"1":"0.5"),t&&(N("dbApiWarning",!I),I||(t.innerHTML=`
        <div class="warning-box">
          <strong>⚠️ Database Management API Not Running</strong><br>
          Start it with: <code>node scripts/db-management-api.cjs</code><br>
          Or: <code>npm run db:api</code>
        </div>
      `))}function Zt(){var e,t,n,s;(e=l("btnCreateBackup"))==null||e.addEventListener("click",sn),(t=l("btnCleanupDB"))==null||t.addEventListener("click",an),(n=l("btnRefreshDBStats"))==null||n.addEventListener("click",()=>{Z(),ee()}),(s=l("btnRefreshUploadHistory"))==null||s.addEventListener("click",st)}function en(){W&&clearInterval(W),W=window.setInterval(()=>{I&&Z()},3e4)}async function Z(){if(I)try{_=await zt(),tn()}catch(e){console.error("Failed to refresh stats:",e),I=!1,tt()}}async function ee(){if(I)try{H=await jt(),nt()}catch(e){console.error("Failed to refresh backups:",e)}}function tn(){var n,s,a,o;if(!_)return;const e=`
    <div class="db-stats-grid">
      <div class="db-stat-item">
        <span class="db-stat-value">${((n=_.counts.documents)==null?void 0:n.toLocaleString())||0}</span>
        <span class="db-stat-label">Documents</span>
      </div>
      <div class="db-stat-item">
        <span class="db-stat-value">${((s=_.counts.chunks)==null?void 0:s.toLocaleString())||0}</span>
        <span class="db-stat-label">Chunks</span>
      </div>
      <div class="db-stat-item">
        <span class="db-stat-value">${((a=_.counts.entities)==null?void 0:a.toLocaleString())||0}</span>
        <span class="db-stat-label">Entities</span>
      </div>
      <div class="db-stat-item">
        <span class="db-stat-value">${((o=_.counts.relationships)==null?void 0:o.toLocaleString())||0}</span>
        <span class="db-stat-label">Relationships</span>
      </div>
    </div>
    <div class="db-size-info">
      <strong>Total Database Size:</strong> ${_.totalSizeFormatted}
      <span class="db-last-updated">Updated: ${new Date(_.timestamp).toLocaleTimeString()}</span>
    </div>
  `,t=l("dbStatsContainer");t&&(t.innerHTML=e)}function nn(){const e=l("dbBackupsContainer");e&&(e.removeEventListener("click",Re),e.addEventListener("click",Re))}function Re(e){const t=e.target,n=t.closest(".btn-restore"),s=t.closest(".btn-delete");if(!n&&!s)return;const a=t.closest(".backup-item");if(!a)return;const o=a.getAttribute("data-backup-name");if(o){if(n){on(o);return}if(s){if(s.disabled)return;rn(o,s)}}}function nt(){const e=l("dbBackupsContainer");if(!e)return;if(H.length===0){e.innerHTML='<p class="empty-text">No backups yet. Create your first backup below.</p>';return}const t=H.slice(0,5).map(n=>{var r,i;const s=new Date(n.created).toLocaleString(),a=((i=(r=n.metadata)==null?void 0:r.stats)==null?void 0:i.documents)||"?",o=a==="?"||n.size==="160 B";return`
      <div class="backup-item ${o?"backup-outdated":""}" data-backup-name="${k(n.name)}">
        <div class="backup-info">
          <div class="backup-name">${k(n.name)} ${o?'<span class="outdated-badge">outdated</span>':""}</div>
          <div class="backup-meta">
            ${s} • ${n.size} • ${a} docs
          </div>
        </div>
        <div class="backup-actions">
          <button class="btn-small btn-restore" title="Restore (metadata only)">
            ↩️ Restore
          </button>
          <button class="btn-small btn-delete" title="Delete this backup">
            🗑️ Delete
          </button>
        </div>
      </div>
    `}).join("");e.innerHTML=`
    <div class="backup-list">
      ${t}
    </div>
    ${H.length>5?`<p class="backup-more">+ ${H.length-5} more backups</p>`:""}
  `}async function sn(){const e=l("btnCreateBackup");if(!e)return;const t=e.innerHTML;e.innerHTML="⏳ Creating...",L("btnCreateBackup",!0);try{const n=await se();T(`✅ Backup created: ${n.result.backupPath}`,"success"),await ee()}catch(n){T(`❌ Backup failed: ${n instanceof Error?n.message:"Unknown error"}`,"error")}finally{e.innerHTML=t,L("btnCreateBackup",!1)}}async function an(){if(!confirm(`⚠️ WARNING: This will DELETE all data in the database!

Make sure you have created a backup first.

This action cannot be undone.

Are you sure you want to continue?`))return;const t=l("btnCleanupDB");if(!t)return;const n=t.innerHTML;t.innerHTML="⏳ Cleaning...",L("btnCleanupDB",!0);try{await Kt(),T("✅ Database cleaned successfully","success"),await Z(),await ee(),localStorage.removeItem("lightrag_upload_tracker"),localStorage.removeItem("lightrag_uploaded_files"),T("📝 Upload tracker history cleared","info")}catch(s){T(`❌ Cleanup failed: ${s instanceof Error?s.message:"Unknown error"}`,"error")}finally{t.innerHTML=n,L("btnCleanupDB",!1)}}async function on(e){if(confirm(`⚠️ Restore from "${e}"?

This will OVERWRITE current database metadata.

Note: You will need to re-upload the original files to restore full content.

Continue?`))try{const n=await Wt(e);T(`✅ ${n.message}`,"success"),await Z()}catch(n){T(`❌ Restore failed: ${n instanceof Error?n.message:"Unknown error"}`,"error")}}async function rn(e,t){if(console.log("Delete requested for backup:",e),!confirm(`🗑️ Delete backup "${e}"?

This backup will be permanently removed.

This action cannot be undone!`))return;t&&(t.disabled=!0,t.textContent="⏳...");const s=document.querySelectorAll(".btn-delete");s.forEach(a=>{a!==t&&(a.disabled=!0)});try{console.log("Calling deleteBackup API for:",e);const a=await Gt(e);console.log("Delete result:",a),T(`✅ ${a.message}`,"success"),H=H.filter(o=>o.name!==e),nt(),await ee()}catch(a){console.error("Delete error:",a),T(`❌ Delete failed: ${a instanceof Error?a.message:"Unknown error"}`,"error"),s.forEach(o=>{o.disabled=!1,o===t&&(o.textContent="🗑️ Delete")})}}async function st(){try{const e=await Yt();ge=e.failures,be=e.successes,ln()}catch(e){console.error("Failed to fetch upload history:",e);const t=l("uploadHistoryContainer");t&&(t.innerHTML='<p class="error-text">Failed to load upload history</p>')}}function ln(){const e=l("uploadHistoryContainer");if(!e)return;const t=ge.length,n=be.length;let s="";t>0&&(s+='<div class="upload-failures-section">',s+=`<h4 class="upload-section-title error">❌ Recent Failures (${t})</h4>`,s+='<div class="upload-list">',ge.slice(-10).reverse().forEach(a=>{const o=a.error.length>60?a.error.substring(0,60)+"...":a.error;s+=`
        <div class="upload-item failure">
          <div class="upload-filename" title="${k(a.filename)}">${k(a.filename)}</div>
          <div class="upload-meta">
            <span class="upload-error">${k(o)}</span>
            <span class="upload-time">${new Date(a.timestamp).toLocaleString()}</span>
          </div>
        </div>
      `}),s+="</div></div>"),n>0&&(s+='<div class="upload-successes-section">',s+=`<h4 class="upload-section-title success">✅ Recent Successes (${n} total)</h4>`,s+='<div class="upload-list">',be.slice(-5).reverse().forEach(a=>{s+=`
        <div class="upload-item success">
          <div class="upload-filename" title="${k(a.filename)}">${k(a.filename)}</div>
          <div class="upload-meta">
            <span class="upload-chunks">${a.chunks} chunks</span>
            <span class="upload-time">${new Date(a.timestamp).toLocaleString()}</span>
          </div>
        </div>
      `}),s+="</div></div>"),t===0&&n===0&&(s='<p class="empty-text">No upload history available yet. Upload some files to see the history.</p>'),e.innerHTML=s}function T(e,t="info"){const n=l("dbNotification");if(!n)return;const s=t==="success"?"notification-success":t==="error"?"notification-error":"notification-info";n.innerHTML=`<div class="notification ${s}">${k(e)}</div>`,setTimeout(()=>{n.innerHTML=""},5e3)}function cn(){return`
    <div id="databasePanel" class="database-panel card">
      <h2>🗄️ Database Management</h2>
      
      <div id="dbApiWarning"></div>
      
      <div class="db-section">
        <h3>📊 Current Statistics</h3>
        <div id="dbStatsContainer">
          <p class="loading-text">Loading stats...</p>
        </div>
      </div>
      
      <div class="db-section">
        <h3>💾 Backups</h3>
        <div id="dbBackupsContainer">
          <p class="loading-text">Loading backups...</p>
        </div>
        <div class="db-actions">
          <button id="btnCreateBackup" class="btn-primary">
            💾 Create Backup
          </button>
          <button id="btnRefreshDBStats" class="btn-secondary">
            🔄 Refresh
          </button>
        </div>
      </div>
      
      <div class="db-section">
        <h3>📋 Upload History</h3>
        <div id="uploadHistoryContainer">
          <p class="loading-text">Loading upload history...</p>
        </div>
        <div class="db-actions">
          <button id="btnRefreshUploadHistory" class="btn-secondary">
            🔄 Refresh
          </button>
        </div>
      </div>
      
      <div class="db-section db-danger-zone">
        <h3>⚠️ Danger Zone</h3>
        <p class="hint-text">
          Clean up the database to free space. <strong>Create a backup first!</strong>
        </p>
        <button id="btnCleanupDB" class="btn-danger">
          🗑️ Clean Database
        </button>
      </div>
      
      <div id="dbNotification"></div>
    </div>
  `}function dn(){W&&(clearInterval(W),W=null)}const Te="lightrag_upload_tracker",at="lightrag_uploaded_files";function un(){return`session_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function ue(){try{const e=localStorage.getItem(Te);return e?JSON.parse(e):null}catch{return null}}function G(e){try{localStorage.setItem(Te,JSON.stringify(e))}catch(t){console.error("Failed to save upload session:",t)}}function ot(){localStorage.removeItem(Te)}function pn(e,t){const n={id:un(),folderPath:e,startedAt:Date.now(),lastUpdated:Date.now(),totalFiles:t,processedFiles:0,uploadedFileIds:[],status:"in_progress"};return G(n),n}function fn(e,t){const n=ue();n&&(n.uploadedFileIds.includes(e)||n.uploadedFileIds.push(e),n.processedFiles=n.uploadedFileIds.length,n.lastUpdated=Date.now(),G(n),mn(e,t))}function pe(){try{const e=localStorage.getItem(at);return e?JSON.parse(e):[]}catch{return[]}}function mn(e,t){try{const s=pe().filter(o=>o.filename!==e);s.push({filename:e,docId:t,uploadedAt:Date.now(),size:0});const a=s.slice(-1e4);localStorage.setItem(at,JSON.stringify(a))}catch(n){console.error("Failed to save to uploaded files list:",n)}}function hn(e){return pe().some(n=>n.filename===e)}async function gn(){const e=ue();if(!e)return{hasSession:!1};if(e.status==="completed")return ot(),{hasSession:!1};try{const t=await Fe(1e4),n=new Set(t.map(o=>o.filename)),s=e.uploadedFileIds.filter(o=>n.has(o)),a=e.uploadedFileIds.filter(o=>!n.has(o));return a.length>0&&(console.warn(`${a.length} files from session not found on server`),e.uploadedFileIds=s,e.processedFiles=s.length,G(e)),s.length>=e.totalFiles?(e.status="completed",G(e),{hasSession:!0,session:e,message:`Previous upload completed (${s.length}/${e.totalFiles} files)`}):{hasSession:!0,session:e,message:`Found interrupted upload: ${s.length}/${e.totalFiles} files processed`}}catch{return{hasSession:!0,session:e,message:`Found previous upload session: ${e.processedFiles}/${e.totalFiles} files (server verification failed)`}}}function bn(){const e=ue();e&&(e.status="completed",e.lastUpdated=Date.now(),G(e))}function yn(){const e=ue();e&&e.status!=="completed"&&(e.status="interrupted",e.lastUpdated=Date.now(),G(e))}function it(e){const t=pe(),n=new Set(t.map(o=>o.filename)),s=[],a=[];for(const o of e)n.has(o.name)?a.push(o.name):s.push(o);return{newFiles:s,skippedFiles:a,count:{new:s.length,skipped:a.length}}}function vn(){const e=pe(),t=e.length>0?Math.max(...e.map(n=>n.uploadedAt)):null;return{totalUploaded:e.length,lastUpload:t}}let C=null;const rt="lightrag_auto_backup_enabled",ye=10;function ve(){return localStorage.getItem(rt)==="true"}function qe(e){localStorage.setItem(rt,String(e))}function wn(){var n,s,a,o,r,i,c,u,h,v,$;(n=l("btnMethodFiles"))==null||n.addEventListener("click",()=>De("files")),(s=l("btnMethodFolder"))==null||s.addEventListener("click",()=>De("folder")),(a=l("fileInput"))==null||a.addEventListener("change",kn),(o=l("clearFilesBtn"))==null||o.addEventListener("click",lt),(r=l("ingestFilesBtn"))==null||r.addEventListener("click",xn),(i=l("folderInput"))==null||i.addEventListener("change",$n),(c=l("browseFolderBtn"))==null||c.addEventListener("click",()=>{var m;(m=l("folderInput"))==null||m.click()}),(u=l("ingestFolderBtn"))==null||u.addEventListener("click",En);const e=l("autoBackup"),t=l("autoBackupFiles");e==null||e.addEventListener("change",m=>{const f=m.target.checked;qe(f),t&&(t.checked=f),console.log(`Auto-backup ${f?"enabled":"disabled"}`)}),t==null||t.addEventListener("change",m=>{const f=m.target.checked;qe(f),e&&(e.checked=f),console.log(`Auto-backup ${f?"enabled":"disabled"}`)}),(h=l("resumeUploadBtn"))==null||h.addEventListener("click",Ln),(v=l("discardSessionBtn"))==null||v.addEventListener("click",Cn),($=l("clearUploadHistoryBtn"))==null||$.addEventListener("click",An),Tn(),dt(),Xt()}function De(e){N("methodFiles",e==="files"),N("methodFolder",e==="folder");const t=l("btnMethodFiles"),n=l("btnMethodFolder");t==null||t.classList.toggle("active",e==="files"),t==null||t.classList.toggle("inactive",e!=="files"),t==null||t.setAttribute("aria-pressed",String(e==="files")),n==null||n.classList.toggle("active",e==="folder"),n==null||n.classList.toggle("inactive",e!=="folder"),n==null||n.setAttribute("aria-pressed",String(e==="folder"))}function kn(){var t;const e=l("fileInput");(t=e==null?void 0:e.files)!=null&&t.length&&(Array.from(e.files).forEach(n=>Oe(n)),de(oe(),{containerId:"selectedFilesList",onRemove:Se,emptyText:"Selected files:"}),e.value="")}function Se(e){kt(e),de(oe(),{containerId:"selectedFilesList",onRemove:Se,emptyText:"Selected files:"})}function lt(){ze(),de([],{containerId:"selectedFilesList",onRemove:Se}),l("fileInput").value=""}async function Le(e){const t=await Fe(1e3),n=new Set(t.map(o=>o.filename)),s=[],a=[];for(const o of e)n.has(o.name)?s.push(o.name):a.push(o);return{duplicates:s,newFiles:a}}function ct(e,t,n="files"){const s=e.slice(0,5).join(", ")+(e.length>5?"...":"");return t>0?confirm(`Found ${e.length} existing ${n}:
${s}

Click OK to upload all (overwrite duplicates), Cancel to skip duplicates.`):confirm(`All ${e.length} ${n} already exist. Click OK to overwrite all, Cancel to skip.`)}async function xn(){const e=oe();if(e.length===0){alert("Please select files first");return}K(!0),L("ingestFilesBtn",!0),$e("ingestProgress"),w("ingestProgress","Checking for existing files...");try{const{duplicates:t,newFiles:n}=await Le(e);if(t.length>0&&!ct(t,n.length,"file(s)")){if(n.length===0){w("ingestProgress","⏭️ All files already exist. Skipped.",!1),L("ingestFilesBtn",!1),K(!1);return}ze(),n.forEach(c=>Oe(c))}const s=oe();let a=0,o=0;const r=[];for(let i=0;i<s.length;i++){const c=s[i],u=(i+1)/s.length*100;w("ingestProgress",`📄 Processing ${i+1}/${s.length}: <strong>${k(c.name)}</strong>`),ie("ingestProgress",u);try{await ce(c),a++,await P()}catch(h){console.error(`Failed to upload ${c.name}:`,h);const v=h instanceof Error?h.message:String(h),m=h instanceof Error&&(h.name==="TimeoutError"||v.includes("timeout")||v.includes("Abort"))?"Upload timeout - file too large or backend busy":v;r.push({file:c.name,error:m}),o++}}w("ingestProgress",`✅ Processed ${a} files${o>0?`, ${o} errors`:""}`,!1),o>0&&r.length>0&&we(r),lt(),await P()}catch(t){console.error("Ingest failed:",t),w("ingestProgress",`❌ Error: ${t instanceof Error?t.message:"Unknown error"}`,!1)}finally{L("ingestFilesBtn",!1),K(!1)}}function we(e){const t=l("uploadErrorLog");if(!t)return;const n=new Map;e.forEach(({file:a,error:o})=>{const r=n.get(o)||[];r.push(a),n.set(o,r)});let s='<div class="error-log"><h4>⚠️ Error Details:</h4>';Array.from(n.entries()).slice(0,5).forEach(([a,o])=>{s+=`<div class="error-item"><strong>${o.length} files:</strong> ${k(a)}`,o.length<=3&&(s+=`<br><small>${o.map(k).join(", ")}</small>`),s+="</div>"}),n.size>5&&(s+=`<p><em>... and ${n.size-5} more error types</em></p>`),s+="</div>",t.innerHTML=s,t.style.display="block"}function $n(){var o,r;const e=l("folderInput");if(!((o=e==null?void 0:e.files)!=null&&o.length))return;let t=Array.from(e.files);const s=((r=t[0].webkitRelativePath)==null?void 0:r.split("/")[0])||"/",a=it(t);if(a.skippedFiles.length>0){console.log(`${a.skippedFiles.length} files already uploaded, skipping`);const i=l("duplicateNotification");i&&(i.innerHTML=`
        <div class="notification info">
          📋 <strong>${a.skippedFiles.length}</strong> files already uploaded (skipped)<br>
          <strong>${a.newFiles.length}</strong> new files to upload
        </div>
      `,i.style.display="block"),t=a.newFiles}xt(t),l("folderPath").value=s,l("folderFileCount").textContent=`${t.length} files selected`,N("folderFiles",!0)}async function En(){var o,r;const e=((o=l("folderPath"))==null?void 0:o.value)??"",t=((r=l("recursive"))==null?void 0:r.checked)??!0;let n=bt();if(!e&&n.length===0){alert("Please select a folder first");return}const s=it(n),a=s.skippedFiles.length;if(a>0&&(console.log(`📋 Pre-filtered ${a} already uploaded files`),T(`📋 ${a} files already uploaded, will be skipped`,"info")),n=s.newFiles,n.length===0){w("ingestProgress","✅ All files already uploaded! Nothing to upload.",!1);return}console.log(`📤 Starting upload of ${n.length} new files (${a} already uploaded)`),C=pn(e,n.length),K(!0),L("ingestFolderBtn",!0),$e("ingestProgress"),w("ingestProgress",`Starting upload of ${n.length} new files...`);try{if(n.length>0){const{duplicates:i,newFiles:c}=await Le(n);if(i.length>0){const u=ct(i,c.length,"file(s) in folder");if(!u&&c.length===0){w("ingestProgress","⏭️ All files already exist in database. Skipped.",!1),L("ingestFolderBtn",!1),K(!1);return}await _e(u?n:c)}else await _e(n)}else{const i=await Xe({folder_path:e,recursive:t});w("ingestProgress",`✅ Processed ${i.total_files} files`,!1),await P().catch(console.error)}}catch(i){console.error("Folder ingest failed:",i),w("ingestProgress",`❌ Error: ${i instanceof Error?i.message:"Unknown error"}`,!1)}finally{L("ingestFolderBtn",!1),K(!1)}}let D=[];function ae(e){return new Promise(t=>setTimeout(t,e))}async function Fn(e=3,t=2e3){for(let n=0;n<e;n++){if(await Ee())return!0;if(n<e-1){const a=t*Math.pow(2,n);console.log(`Health check failed, retrying in ${a}ms... (attempt ${n+1}/${e})`),await ae(a)}}return!1}async function _e(e){let t=0,n=0,s=0,a=0,o=0;D=[];const r=5,i=300,c=2e3,u=5,h=5,v=ve(),$=ye,m=e.filter(d=>d.size<50?(s++,!1):!0),f=Math.ceil(m.length/r);if(v&&m.length>$)try{w("ingestProgress","💾 Creating initial backup before upload...",!1),await se(),o=0,T("✅ Initial backup created","success")}catch(d){console.error("Initial backup failed:",d),T("⚠️ Initial backup failed, continuing anyway","error")}for(let d=0;d<f;d++){const b=d*r,x=m.slice(b,b+r),p=d===f-1;if(!await Fn(3,2e3)){console.error(`Backend health check failed before batch ${d+1} after retries`);const F=m.slice(b);F.forEach(E=>{D.push({file:E.name,error:"Backend unavailable - upload stopped"})}),n+=F.length,w("ingestProgress",`❌ Backend unavailable after ${t} files. ${F.length} files not processed.`,!1);break}for(let F=0;F<x.length;F++){const E=x[F],te=b+F+1,Ae=te/m.length*100;if(hn(E.name)){console.log(`⏭️ Skipping already uploaded: ${E.name}`),s++,t++,w("ingestProgress",`⏭️ Skipping ${s} already uploaded... (${te}/${m.length})<br><strong>${k(E.name.substring(0,50))}${E.name.length>50?"...":""}</strong>`),ie("ingestProgress",Ae);continue}w("ingestProgress",`📂 Batch ${d+1}/${f}: ${F+1}/${x.length} (${te}/${m.length})<br><strong>${k(E.name.substring(0,50))}${E.name.length>50?"...":""}</strong>`),ie("ingestProgress",Ae);try{const q=await ce(E);t++,a=0,fn(E.name,q.doc_id||E.name),C&&C.processedFiles++,t%h===0&&(console.log(`[Upload] Updating stats after ${t} files...`),P().catch(z=>console.error("[Upload] Stats update failed:",z))),F<x.length-1&&await ae(i)}catch(q){n++,a++;const z=q instanceof Error?q.message:String(q);if(q instanceof Error&&(q.name==="TimeoutError"||z.includes("timeout")||z.includes("Abort"))?(console.warn(`⏱️ Timeout uploading ${E.name}: ${z}`),D.push({file:E.name,error:"Upload timeout (file too large or backend busy)"})):D.push({file:E.name,error:z}),console.error(`Failed to upload ${E.name}:`,q),a>=u){if(console.warn(`Too many consecutive errors (${a}), checking backend health...`),!await Ee()){const Ie=m.slice(te);Ie.forEach(mt=>{D.push({file:mt.name,error:"Backend crashed - upload stopped"})}),n+=Ie.length,w("ingestProgress",`❌ Backend crashed after ${t} files. Stopping upload.`,!1),we(D);return}a=0}await ae(i*2)}}if(v&&t-o>=$)try{console.log(`💾 Auto-creating backup after ${t} files...`),w("ingestProgress",`💾 Creating backup after ${t} files...`,!1),await se(),o=t,T(`✅ Backup created after ${t} files`,"success")}catch(F){console.error("Auto-backup failed:",F)}p||(w("ingestProgress",`⏳ Cooling down... (${d+1}/${f} batches complete)`,!1),await ae(c))}if(v&&t>0)try{console.log("💾 Creating final backup after upload..."),w("ingestProgress","💾 Creating final backup...",!1),await se(),T("✅ Final backup created","success")}catch(d){console.error("Final backup failed:",d)}const y=[`✅ Processed ${t} files`];s>0&&y.push(`skipped ${s} already uploaded`),n>0&&y.push(`${n} errors`),w("ingestProgress",y.join(", "),!1),n>0&&D.length>0&&we(D),console.log("[Upload] Final stats update..."),await P().catch(d=>console.error("[Upload] Final stats update failed:",d)),n===0&&t+s===e.length?(bn(),w("ingestProgress",`✅ Upload completed! ${t} new files uploaded (${s} skipped).`,!1)):n>0&&yn()}async function Tn(){const e=await gn();e.hasSession&&e.session?(C=e.session,Sn(e.message||"Found previous upload session")):Ce()}function Sn(e){const t=l("resumeDialog"),n=l("resumeMessage");t&&n&&(n.textContent=e,t.style.display="block")}function Ce(){const e=l("resumeDialog");e&&(e.style.display="none")}async function Ln(){if(!C){alert("No session to resume");return}Ce(),w("ingestProgress",`🔄 Resuming upload: ${C.processedFiles}/${C.totalFiles} files already processed`,!1),$e("ingestProgress"),alert(`Please select the same folder again to resume upload.

Already uploaded: ${C.processedFiles}/${C.totalFiles} files`)}function Cn(){confirm("Are you sure you want to discard the previous upload session?")&&(ot(),C=null,Ce(),w("ingestProgress","Previous session discarded. Ready to start new upload.",!1))}function dt(){const e=vn(),t=l("uploadStats");if(t&&e.totalUploaded>0){const n=e.lastUpload?new Date(e.lastUpload).toLocaleDateString():"Unknown";t.innerHTML=`📊 Total files uploaded: <strong>${e.totalUploaded}</strong> (last: ${n})`,t.style.display="block"}}function An(){confirm(`⚠️ WARNING: This will clear ALL upload history!

Files already in the database will remain, but the system will not remember which files were uploaded.

Are you sure?`)&&(In(),dt(),alert("Upload history cleared."))}function In(){localStorage.removeItem("lightrag_upload_tracker"),localStorage.removeItem("lightrag_uploaded_files"),C=null}function Pn(){return`
    <div id="ingest" class="tab-content card active" role="tabpanel" aria-labelledby="tab-ingest">
      <h2>📥 Ingest Documents</h2>
      
      <!-- Resume Dialog -->
      <div id="resumeDialog" class="resume-dialog" style="display: none;">
        <div class="resume-content">
          <h3>🔄 Resume Previous Upload?</h3>
          <p id="resumeMessage">Found previous upload session</p>
          <div class="resume-actions">
            <button id="resumeUploadBtn" class="btn">🔄 Resume Upload</button>
            <button id="discardSessionBtn" class="btn danger">🗑️ Discard & Start New</button>
          </div>
        </div>
      </div>
      
      <!-- Upload Stats -->
      <div id="uploadStats" class="upload-stats" style="display: none;"></div>
      
      <!-- Duplicate Notification -->
      <div id="duplicateNotification" class="notification-container" style="display: none;"></div>
      
      <div class="method-toggle" role="group" aria-label="Upload method selection">
        <button class="active" id="btnMethodFiles" aria-pressed="true">📄 Upload Files</button>
        <button class="inactive" id="btnMethodFolder" aria-pressed="false">📂 Select Folder</button>
      </div>
      
      <div id="methodFiles">
        <h3>📄 Upload Files</h3>
        <label for="fileInput" class="sr-only">Select files to upload</label>
        <input type="file" id="fileInput" multiple accept=".txt,.md,.pdf,.doc,.docx,.csv,.json,.html,.xml" aria-describedby="fileInput-hint">
        <p id="fileInput-hint" class="hint">Select multiple files to upload to the knowledge base</p>
        <div id="selectedFilesList" class="file-list" style="display: none;"></div>
        
        <div class="checkbox-wrapper auto-backup-wrapper" style="margin: 15px 0; padding: 10px; background: rgba(0, 212, 255, 0.05); border-radius: 8px;">
          <input type="checkbox" id="autoBackupFiles" ${ve()?"checked":""}>
          <label for="autoBackupFiles" style="font-weight: 500;">
            💾 Auto-backup during upload
            <span style="display: block; font-size: 12px; font-weight: normal; color: var(--text-secondary); margin-top: 4px;">
              Creates backups every ${ye} files and at completion
            </span>
          </label>
        </div>
        
        <button id="ingestFilesBtn" class="btn" aria-label="Start ingesting selected files">📥 Ingest Files</button>
        <button id="clearFilesBtn" class="btn danger" aria-label="Clear all selected files">🗑️ Clear All</button>
      </div>
      
      <div id="methodFolder" style="display: none;">
        <h3>📂 Select Folder</h3>
        <div class="folder-input-wrapper">
          <label for="folderPath" class="sr-only">Folder path</label>
          <input type="text" id="folderPath" placeholder="Select or enter folder path...">
          <button class="folder-btn" id="browseFolderBtn" aria-label="Browse for folder">📂 Browse</button>
          <input type="file" id="folderInput" webkitdirectory style="display: none;" aria-label="Select folder">
        </div>
        
        <div id="folderFiles" class="file-list" style="display: none;">
          <strong>Files to ingest:</strong>
          <div id="folderFileCount"></div>
        </div>
        
        <div class="checkbox-wrapper">
          <input type="checkbox" id="recursive" checked>
          <label for="recursive">Scan subfolders recursively</label>
        </div>
        
        <div class="checkbox-wrapper auto-backup-wrapper" style="margin-top: 10px; padding: 10px; background: rgba(0, 212, 255, 0.05); border-radius: 8px;">
          <input type="checkbox" id="autoBackup" ${ve()?"checked":""}>
          <label for="autoBackup" style="font-weight: 500;">
            💾 Auto-backup during upload
            <span style="display: block; font-size: 12px; font-weight: normal; color: var(--text-secondary); margin-top: 4px;">
              Creates backups every ${ye} files and at completion
            </span>
          </label>
        </div>
        
        <button id="ingestFolderBtn" class="btn" aria-label="Start ingesting folder" style="margin-top: 15px;">📥 Ingest Folder</button>
      </div>
      
      <div id="ingestProgress"></div>
      <div id="uploadErrorLog" class="error-log-container" style="display: none;"></div>
      
      <!-- Management Actions -->
      <div class="management-actions" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
        <button id="clearUploadHistoryBtn" class="btn" style="background: rgba(255,255,255,0.1); font-size: 12px;">
          🗑️ Clear Upload History
        </button>
        <p class="hint" style="margin-top: 5px;">This will reset the list of previously uploaded files</p>
      </div>
      
      <!-- Database Management Panel -->
      ${cn()}
    </div>
  `}let ke="",A=[];function Bn(e){if(e==null||e.preventDefault(),e==null||e.stopPropagation(),!ke){alert("No answer to print. Please run a query first.");return}const n=`<!DOCTYPE html>
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
      strong { font-weight: bold; }
    }
  </style>
</head>
<body>
  <div class="answer">${ke.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/^# (.+)$/gm,'<div class="h1-bold">$1</div>').replace(/^## (.+)$/gm,'<div class="h2-bold">$1</div>').replace(/\n/g,"<br>")}</div>
</body>
</html>`,s=new Blob([n],{type:"text/html"}),a=URL.createObjectURL(s);if(!window.open(a,"_blank")){alert("Please allow popups to print the answer."),URL.revokeObjectURL(a);return}}function Rn(){var e,t,n,s,a,o;(e=l("runQueryBtn"))==null||e.addEventListener("click",fe),(t=l("printQueryBtn"))==null||t.addEventListener("click",r=>Bn(r)),(n=l("queryText"))==null||n.addEventListener("input",()=>{const r=l("printQueryBtn");r&&(r.style.display="none")}),(s=l("testQueryCompanies"))==null||s.addEventListener("click",()=>me("What companies are mentioned?")),(a=l("testQueryRelations"))==null||a.addEventListener("click",()=>me("What relationships exist?")),(o=l("testQueryOverview"))==null||o.addEventListener("click",()=>me("Give me an overview"))}function me(e){const t=l("queryText");t&&(t.value=e),fe()}function qn(){const e=document.querySelector('input[name="queryMode"]:checked');return(e==null?void 0:e.value)||"hybrid"}function Dn(){const e=document.querySelector('input[name="queryDetail"]:checked');switch((e==null?void 0:e.value)||"balanced"){case"quick":return{top_k:10,ultra_comprehensive:!1,detailed:!1,label:"Quick"};case"ultra":return{top_k:40,ultra_comprehensive:!0,detailed:!0,label:"Ultra Deep"};case"comprehensive":return{top_k:30,ultra_comprehensive:!1,detailed:!0,label:"Comprehensive"};case"balanced":default:return{top_k:20,ultra_comprehensive:!1,detailed:!1,label:"Balanced"}}}async function fe(){var m;const e=(m=l("queryText"))==null?void 0:m.value.trim();if(!e){alert("Please enter a question");return}yt()&&xe();const t=qn(),n=Dn(),s=l("answerText"),a=l("sourcesText"),o=l("runQueryBtn"),r=l("printQueryBtn");U(!0),L("runQueryBtn",!0),r&&(r.style.display="none");const i=n.ultra_comprehensive,c=i?"3-5 min":n.detailed?"2-4 min":"30-60 sec";o&&(o.textContent=`⏳ ${n.label} Mode (${c})...`),N("queryResult",!0);const u=i?"ultra-extensive (3000+ words)":n.detailed?"comprehensive (2000+ words)":"standard";s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>Retrieving ${n.top_k} chunks + Generating ${u} answer...<br>Estimated time: ${c}<br><small>Please wait, do not close or refresh the page</small>`,a.textContent="";const h=new AbortController;Be(h);let v;i?v=9e5:n.detailed?v=3e5:n.top_k>=20?v=24e4:v=18e4;const $=setTimeout(()=>h.abort(),v);try{const f=await Ye({message:e,mode:t,top_k:n.top_k,ultra_comprehensive:n.ultra_comprehensive,detailed:n.detailed},h.signal);clearTimeout($);const y=f.response||f.answer||JSON.stringify(f,null,2);console.log("[Query] Full result:",f),console.log("[Query] Result keys:",Object.keys(f));const d=f.sources||f.source_documents||f.source||f.chunks;console.log("[Query] Raw sources:",d),console.log("[Query] sources type:",typeof d),console.log("[Query] sources isArray:",Array.isArray(d)),typeof d=="number"&&console.warn("[Query] Backend returned source COUNT instead of source filenames. References cannot be displayed."),Array.isArray(d)?A=d.map(p=>typeof p=="string"?p:p&&typeof p=="object"?p.filename||p.doc_id||p.name||JSON.stringify(p):String(p)):A=[],console.log("[Query] Processed sources:",A);let b=y;if(A.length>0?(b+=`


## References

`,A.forEach((p,O)=>{b+=`${O+1}. ${p}
`})):typeof d=="number"&&d>0&&(b+=`


## References

`,b+=`This answer was generated from ${d} source documents.
`,b+="(Source filenames not available from backend API.)"),ke=b,r&&(r.style.display="inline-block"),y.startsWith("Found")&&y.includes("relevant chunks"))Un(y,s);else{let p=y;A.length>0?p+=`


## References

`+A.map((O,F)=>`${F+1}. ${O}`).join(`
`):typeof d=="number"&&d>0&&(p+=`


## References

`,p+=`This answer was generated from ${d} source documents.
`,p+="(Source filenames not available from backend API.)"),s.innerHTML=_n(p),setTimeout(()=>ut(s),100)}const x=f.sources||f.source_documents;A.length>0?a.innerHTML=A.map(p=>`<div class="source-item">${k(p)}</div>`).join(""):typeof x=="number"?a.innerHTML=`<div class="source-item">Found ${x} sources (filenames not available - backend config issue)</div>`:a.textContent="No sources available"}catch(f){clearTimeout($),Qn(f,s)}finally{U(!1),Be(null),L("runQueryBtn",!1),o&&(o.textContent="🔍 Ask Question")}}function _n(e){if(!e)return"";let t=e;t=t.replace(/Note on Context[\s\S]*?I will answer[^.]*\./gi,""),t=t.replace(/Context Note[\s\S]*?general knowledge[^.]*\./gi,""),t=t.replace(/The provided context discusses[\s\S]*?unrelated to[\s\S]*?\./gi,""),t=t.replace(/The (?:provided |available |indexed )?context (?:does not contain|lacks|is (?:unrelated|irrelevant))[\s\S]*?\./gi,""),t=t.replace(/I will answer your question based on (?:general |my )?knowledge[^.]*\./gi,""),t=t.replace(/Based on (?:general |my )?knowledge,?[^.]*\./gi,""),t=t.replace(/\(Remove this[^)]*\)/gi,""),t=t.replace(/\[Remove this[^\]]*\]/gi,""),[/I couldn't find any information[^.]*\./gi,/Please try a different search term[^.]*\./gi,/The indexed data may contain formatting issues[^.]*\./gi,/Note: This response is based on[^.]*\./gi,/Disclaimer:[^.]*\./gi,/I apologize, but[^.]*\./gi,/I don't see any information[^.]*\./gi,/There is no information[^.]*\./gi,/The context provided (?:does not|doesn't) (?:contain|have|discuss)[^.]*\./gi].forEach(i=>{t=t.replace(i,"")}),t=t.replace(/\n{3,}/g,`

`),t=t.replace(/^\s*\([^)]+\)\s*$/gmi,""),t=t.replace(/^# (.+)$/gm,'<strong class="query-h1">$1</strong>'),t=t.replace(/^## (.+)$/gm,'<strong class="query-h2">$1</strong>'),t=t.replace(/^### (.+)$/gm,'<strong class="query-h3">$1</strong>'),t=t.replace(/^#### (.+)$/gm,'<strong class="query-h4">$1</strong>'),t=t.replace(/(<strong class="query-h[1234]">[^<]+<\/strong>)(?:\s|<br>)*\1/gi,"$1");const s=t.split(`
`);let a=!1,o="";const r=[];for(let i=0;i<s.length;i++){const c=s[i],u=c.includes("|")&&(c.match(/\|/g)||[]).length>=2,h=/^\s*\|?[-:\s\|]+\|?\s*$/.test(c);if(u&&!h){a||(a=!0,o='<div class="query-table-container"><table class="query-table">');const v=c.split("|").map($=>$.trim()).filter($=>$);if(v.length>0){const $=i===0||i>0&&h&&i===1,m=$?"th":"td";o+=`<tr class="${$?"query-table-header":""}">${v.map(y=>`<${m}>${k(y)}</${m}>`).join("")}</tr>`}}else{if(h)continue;a&&(a=!1,o+="</table></div>",r.push(o),o=""),r.push(c)}}return a&&(o+="</table></div>",r.push(o)),t=r.join(`
`),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(/\*([^*]+)\*/g,"<em>$1</em>"),t=t.replace(/^- (.+)$/gm,"• $1"),t=t.replace(/^\* (.+)$/gm,"• $1"),t=t.replace(/^(\d+)\. (.+)$/gm,"$1. $2"),t=t.replace(/\n/g,"<br>"),t=t.replace(/(<br>){3,}/g,"<br><br>"),t}function ut(e){if(window.katex&&window.renderMathInElement)try{window.renderMathInElement(e,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1},{left:"\\[",right:"\\]",display:!0},{left:"\\(",right:"\\)",display:!1},{left:"\\begin{equation}",right:"\\end{equation}",display:!0},{left:"\\begin{align}",right:"\\end{align}",display:!0},{left:"\\begin{matrix}",right:"\\end{matrix}",display:!0}],throwOnError:!1,errorColor:"#cc0000",macros:{"\\RR":"\\mathbb{R}","\\NN":"\\mathbb{N}","\\ZZ":"\\mathbb{Z}"}})}catch(t){console.error("KaTeX rendering error:",t)}else setTimeout(()=>ut(e),500)}function Un(e,t){var r;const n=e.match(/Found (\d+) relevant chunks/),s=n?n[1]:"some";let a="<h3>⚠️ LLM Processing Timed Out</h3>";a+=`<p>The AI processing timed out after 25 seconds. Showing ${s} raw text chunks instead:</p><hr>`;const o=e.indexOf(`

`);o>0?e.substring(o+2).split(`

`).forEach((u,h)=>{u.trim()&&(a+=`<h4>Chunk ${h+1}</h4><pre>${k(u)}</pre><hr>`)}):a+=`<pre>${k(e)}</pre>`,a+='<button id="retryQueryBtn" class="btn">🔄 Retry with Simpler Query</button>',t.innerHTML=a,(r=l("retryQueryBtn"))==null||r.addEventListener("click",()=>{var u;const i=((u=l("queryText"))==null?void 0:u.value)||"",c=i.replace(/explain|in detail|with examples|comprehensive|detailed/gi,"").trim();c&&c!==i?(l("queryText").value=c,fe()):alert('Try a simpler, more specific query. Example: "What is Bayesian probability?"')})}function Qn(e,t){var n;console.error("Query error:",e),e instanceof Error?e.name==="AbortError"?t.textContent="⏰ Query was cancelled or timed out after 5 minutes.":e.message.includes("network")||e.message.includes("fetch")?(t.innerHTML='❌ Network error. <button id="retryErrorBtn" class="btn">Retry</button>',(n=l("retryErrorBtn"))==null||n.addEventListener("click",fe)):t.textContent=`❌ Error: ${e.message}`:t.textContent="❌ Unknown error occurred"}function Mn(){return`
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
      <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"><\/script>
      <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"><\/script>
      
      <style>
        /* Query Response Formatting */
        .query-answer {
          line-height: 1.7;
        }
        
        .query-answer .query-h1 {
          display: block;
          font-size: 1.4em;
          font-weight: 700;
          color: var(--primary-color, #4CAF50);
          margin-top: 20px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--primary-color, #4CAF50);
        }
        
        .query-answer .query-h2 {
          display: block;
          font-size: 1.2em;
          font-weight: 600;
          color: var(--text-primary, #e0e0e0);
          margin-top: 16px;
          margin-bottom: 10px;
          padding-left: 12px;
          border-left: 3px solid var(--primary-color, #4CAF50);
        }
        
        .query-answer .query-h3 {
          display: block;
          font-size: 1.05em;
          font-weight: 600;
          color: var(--text-secondary, #b0b0b0);
          margin-top: 14px;
          margin-bottom: 8px;
        }
        
        .query-answer .query-h4 {
          display: block;
          font-size: 1em;
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
  `}const Hn="modulepreload",Nn=function(e,t){return new URL(e,t).href},Ue={},On=function(t,n,s){let a=Promise.resolve();if(n&&n.length>0){const r=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),c=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));a=Promise.allSettled(n.map(u=>{if(u=Nn(u,s),u in Ue)return;Ue[u]=!0;const h=u.endsWith(".css"),v=h?'[rel="stylesheet"]':"";if(!!s)for(let f=r.length-1;f>=0;f--){const y=r[f];if(y.href===u&&(!h||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${v}`))return;const m=document.createElement("link");if(m.rel=h?"stylesheet":Hn,h||(m.as="script"),m.crossOrigin="",m.href=u,c&&m.setAttribute("nonce",c),document.head.appendChild(m),h)return new Promise((f,y)=>{m.addEventListener("load",f),m.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return a.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return t().catch(o)})};let re="",J=[];function pt(){const e=document.querySelector('input[name="queryFileDetail"]:checked');switch((e==null?void 0:e.value)||"balanced"){case"quick":return{top_k:10,ultra_comprehensive:!1,detailed:!1,label:"Quick"};case"ultra":return{top_k:40,ultra_comprehensive:!0,detailed:!0,label:"Ultra Deep"};case"comprehensive":return{top_k:30,ultra_comprehensive:!1,detailed:!0,label:"Comprehensive"};case"balanced":default:return{top_k:20,ultra_comprehensive:!1,detailed:!1,label:"Balanced"}}}function zn(e){if(e==null||e.preventDefault(),e==null||e.stopPropagation(),!re){alert("No answer to print. Please run a query first.");return}const n=`<!DOCTYPE html>
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
      strong { font-weight: bold; }
    }
  </style>
</head>
<body>
  <div class="answer">${re.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/^# (.+)$/gm,'<div class="h1-bold">$1</div>').replace(/^## (.+)$/gm,'<div class="h2-bold">$1</div>').replace(/\n/g,"<br>")}</div>
</body>
</html>`,s=new Blob([n],{type:"text/html"}),a=URL.createObjectURL(s);if(!window.open(a,"_blank")){alert("Please allow popups to print the answer."),URL.revokeObjectURL(a);return}}function jn(){var e,t,n,s;(e=l("queryFileInput"))==null||e.addEventListener("change",Kn),(t=l("runQueryFileBtn"))==null||t.addEventListener("click",Wn),(n=l("exportQueryFilePdfBtn"))==null||n.addEventListener("click",a=>zn(a)),(s=l("queryFileText"))==null||s.addEventListener("input",()=>{const a=l("exportQueryFilePdfBtn");a&&(a.style.display="none")})}function Kn(){var t;const e=l("queryFileInput");(t=e==null?void 0:e.files)!=null&&t.length&&(Array.from(e.files).forEach(n=>$t(n)),ft(),e.value="")}function ft(){de(Ne(),{containerId:"querySelectedFilesList",onRemove:e=>{Et(e),ft()},emptyText:"Selected files:"})}async function he(e,t=pt()){const{sendQuery:n}=await On(async()=>{const{sendQuery:i}=await Promise.resolve().then(()=>Ht);return{sendQuery:i}},void 0,import.meta.url),s=new AbortController,o=t.ultra_comprehensive?6e5:t.detailed?3e5:18e4,r=setTimeout(()=>s.abort(),o);try{const i=await n({message:e,top_k:t.top_k,detailed:t.detailed,ultra_comprehensive:t.ultra_comprehensive},s.signal);clearTimeout(r);const c=i.response||i.answer||JSON.stringify(i);return re=c,c}catch(i){return clearTimeout(r),i instanceof Error&&i.name==="AbortError"?"⏰ Query timed out. The LLM is taking too long.":`❌ Error: ${i instanceof Error?i.message:"Unknown error"}`}}async function Wn(){var i;const e=(i=l("queryFileText"))==null?void 0:i.value.trim();let t=Ne();if(!t.length||!e){alert("Please upload file(s) and enter a question");return}const n=pt();U(!0);const s=l("queryFileAnswer"),a=l("exportQueryFilePdfBtn");console.log("[QueryFile] Starting query, exportBtn:",a),N("queryFileResult",!0),a&&(a.style.display="none",console.log("[QueryFile] Button hidden"));const o=n.ultra_comprehensive,r=o?"5-8 min":n.detailed?"3-5 min":"2-3 min";s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>Processing with ${n.top_k} chunks...<br>Estimated time: ${r}`;try{const{duplicates:c,newFiles:u}=await Le(t);if(c.length>0)if(t.length===1){if(!confirm(`File "${k(c[0])}" already exists. Click OK to overwrite, Cancel to skip.`)){s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>⏭️ Skipped file. Searching database...`,Pe();const b=await he(e,n);s.textContent=b,a&&(a.style.display="inline-block"),U(!1);return}}else{const d=k(c.join(", ")),b=k(u.map(p=>p.name).join(", "));if(!(u.length>0?confirm(`Found ${c.length} existing: ${d}

New: ${b}

Click OK to upload all, Cancel to skip duplicates.`):confirm(`All ${c.length} exist: ${d}

Click OK to overwrite all, Cancel to skip.`))){if(u.length===0){s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>⏭️ Skipped all files. Searching database...`,Pe();const p=await he(e,n);s.textContent=p,a&&(a.style.display="inline-block"),U(!1);return}t=u}}if(t.length===0){const d=await he(e,n);s.textContent=d,a&&(a.style.display="inline-block"),U(!1);return}const h=[];for(let d=0;d<t.length;d++){const b=t[d];s.textContent=`📤 Uploading ${d+1}/${t.length}: ${k(b.name)}...`;try{const x=await ce(b);x.doc_id&&h.push({filename:b.name,doc_id:x.doc_id})}catch(x){console.error(`Upload failed for ${b.name}:`,x)}}if(h.length===0){s.textContent="❌ Upload failed. No files were uploaded.",U(!1);return}await Gn(h,s);const v=h.map(d=>d.filename);s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>Querying with ${v.length} file(s)...`;const $=new AbortController,m=o?6e5:n.detailed?3e5:18e4,f=setTimeout(()=>$.abort(),m),y=await Je({message:e,filenames:v,top_k:n.top_k,detailed:n.detailed,ultra_comprehensive:n.ultra_comprehensive},$.signal);if(clearTimeout(f),y.response||y.answer){const d=y.response||y.answer||"",b=y.sources||y.source_documents;console.log("[QueryFile] Raw sources:",b),Array.isArray(b)?J=b.map(p=>typeof p=="string"?p:p&&typeof p=="object"?p.filename||p.doc_id||p.name||JSON.stringify(p):String(p)):J=[],console.log("[QueryFile] Processed sources:",J);let x=d;J.length>0?(x+=`


## References

`,J.forEach((p,O)=>{x+=`${O+1}. ${p}
`})):typeof b=="number"&&b>0&&(x+=`


## References

`,x+=`This answer was generated from ${b} source documents.
`,x+="(Source filenames not available from backend API.)"),re=x,s.textContent=x,a&&(a.style.display="inline-block",console.log("[QueryFile] Button shown"))}else y.detail?s.textContent=`❌ Error: ${y.detail}`:s.textContent=JSON.stringify(y,null,2)}catch(c){console.error("Query with file failed:",c),c instanceof Error&&c.name==="AbortError"?s.textContent="⏰ Query timed out after 5 minutes.":s.textContent=`❌ Error: ${c instanceof Error?c.message:"Unknown error"}`}finally{U(!1)}}async function Gn(e,t){let n=!1,s=0;for(;!n&&s<30;){const a=Ot(s,1e3,5e3);await new Promise(r=>setTimeout(r,a)),s++;let o=0;for(const r of e){const i=await We(r.doc_id);(i!=null&&i.indexed||i!=null&&i.ready||i!=null&&i.chunks&&i.chunks>0)&&o++}if(t.textContent=`⏳ Indexing... (${s}s) - ${o}/${e.length} ready`,o===e.length){n=!0;break}}n?t.textContent="✅ Files indexed! Now querying...":t.textContent="⚠️ Indexing in progress, but proceeding with query..."}function Yn(){return`
    <div id="queryfile" class="tab-content card" role="tabpanel" aria-labelledby="tab-queryfile">
      <h2>🔗 Query with File(s)</h2>
      
      <div class="query-info-banner" style="background: rgba(0, 212, 255, 0.1); border-left: 3px solid var(--accent-primary); padding: 12px 16px; margin-bottom: 15px; border-radius: 0 8px 8px 0; font-size: 13px;">
        <strong>💡 Tip:</strong> You can use this tab while bulk uploads are in progress! 
        New files uploaded here will be immediately indexed and queried.
      </div>
      
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
  `}function Jn(){var e,t,n;(e=l("testConnectionBtn"))==null||e.addEventListener("click",Xn),(t=l("refreshConnectionBtn"))==null||t.addEventListener("click",Vn),(n=l("clearDatabaseBtn"))==null||n.addEventListener("click",Zn)}async function Xn(){const e=l("configStatus"),t=l("systemInfo");e.textContent="Testing...";try{const n=await Ve();X("configStatus",'<span class="success">✅ Connected!</span>'),N("systemInfo",!0),t.textContent=JSON.stringify(n,null,2)}catch(n){const s=n instanceof Error?n.message:"Unknown error";X("configStatus",`<span class="error">❌ Connection failed: ${s}</span>`)}}function Vn(){xe();const e=l("runQueryBtn");e&&(e.disabled=!1,e.textContent="🔍 Ask Question"),X("configStatus",'<span class="success">✅ Connection state refreshed.</span>')}async function Zn(){const e=l("clearStatus");if(confirm("Are you sure you want to clear ALL data? This cannot be undone!")){e.textContent="Clearing database...";try{await Ze(),await P(),X("clearStatus",'<span class="success">✅ Database cleared!</span>')}catch(t){const n=t instanceof Error?t.message:"Unknown error";X("clearStatus",`<span class="error">❌ Error: ${n}</span>`)}}}function es(){return`
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
  `}function ts(e,t="info",n={}){const{duration:s=4e3,dismissible:a=!0}=n;document.querySelectorAll(`.toast-container .toast.${t}`).forEach(u=>u.remove());let r=document.querySelector(".toast-container");r||(r=document.createElement("div"),r.className="toast-container",r.setAttribute("role","region"),r.setAttribute("aria-label","Notifications"),r.setAttribute("aria-live","polite"),document.body.appendChild(r));const i=document.createElement("div");i.className=`toast toast-${t}`,i.setAttribute("role","alert"),i.setAttribute("aria-live","assertive");const c={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"};if(i.innerHTML=`
    <span class="toast-icon">${c[t]}</span>
    <span class="toast-message">${ns(e)}</span>
    ${a?'<button class="toast-close" aria-label="Dismiss notification">×</button>':""}
  `,a){const u=i.querySelector(".toast-close");u==null||u.addEventListener("click",()=>Qe(i))}return r.appendChild(i),requestAnimationFrame(()=>{i.classList.add("toast-show")}),s>0&&setTimeout(()=>Qe(i),s),i.setAttribute("tabindex","-1"),i.focus(),i}function Qe(e){e.classList.remove("toast-show"),e.classList.add("toast-hide"),e.addEventListener("transitionend",()=>{e.remove();const t=document.querySelector(".toast-container");t&&t.children.length===0&&t.remove()},{once:!0})}function Me(e,t){ts(e,"error",t)}function ns(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function ss(){window.onerror=(e,t,n,s,a)=>{const o=a instanceof Error?`${a.message}
${a.stack}`:String(e);console.error("🚨 Global Error:",{message:o,source:t,lineno:n,colno:s,error:a});const r=a instanceof Error?a.message:"An unexpected error occurred";return Me(`Error: ${r}`,{duration:6e3}),!1},window.onunhandledrejection=e=>{const t=e.reason,n=t instanceof Error?`${t.message}
${t.stack}`:String(t);console.error("🚨 Unhandled Promise Rejection:",{reason:n,promise:e.promise});const s=t instanceof Error?t.message:"An unexpected error occurred";Me(`Async Error: ${s}`,{duration:6e3})},console.log("✅ Global error handlers initialized")}function as(){if(document.getElementById("toast-styles"))return;const e=document.createElement("style");e.id="toast-styles",e.textContent=`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      border-radius: 8px;
      background: rgba(30, 30, 40, 0.95);
      color: #fff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      opacity: 0;
      transform: translateX(100%);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .toast.toast-show {
      opacity: 1;
      transform: translateX(0);
    }
    
    .toast.toast-hide {
      opacity: 0;
      transform: translateX(100%);
    }
    
    .toast-icon {
      font-size: 18px;
      flex-shrink: 0;
    }
    
    .toast-message {
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
      word-break: break-word;
    }
    
    .toast-close {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      font-size: 20px;
      cursor: pointer;
      padding: 0 4px;
      line-height: 1;
      transition: color 0.2s;
      flex-shrink: 0;
    }
    
    .toast-close:hover {
      color: #fff;
    }
    
    .toast-success {
      border-left: 4px solid #4caf50;
    }
    
    .toast-error {
      border-left: 4px solid #f44336;
    }
    
    .toast-warning {
      border-left: 4px solid #ff9800;
    }
    
    .toast-info {
      border-left: 4px solid #00d4ff;
    }
    
    @media (max-width: 480px) {
      .toast-container {
        left: 10px;
        right: 10px;
        max-width: none;
      }
    }
  `,document.head.appendChild(e)}function os(){as(),ss()}function is(){const e=l("uploadActivityIndicator");if(!e)return;const t=Ut();e.style.display=t?"flex":"none"}let le=null;function rs(){le||(le=window.setInterval(is,1e3))}function ls(){console.log("🧠 LightRAG WebUI initializing..."),os(),cs(),qt(),_t("ingestProgress"),wn(),Rn(),jn(),Jn(),ds(),us(),Ft(setInterval(P,ht)),rs(),window.addEventListener("beforeunload",()=>{St(),dn(),le&&clearInterval(le)}),console.log("✅ LightRAG WebUI ready")}function cs(){const e=l("app");e&&(e.innerHTML=`
    <div class="header">
      <div class="header-main">
        <h1>🧠 LightRAG Knowledge Graph</h1>
        <div id="uploadActivityIndicator" class="upload-activity" style="display: none;">
          <span class="upload-spinner">⏳</span>
          <span class="upload-text">Uploading...</span>
          <span class="upload-hint">(Query available but may be slower)</span>
        </div>
      </div>
      <p class="header-hint">
        💡 If queries fail, try refreshing the page (F5) or check browser console (F12).
      </p>
    </div>
    
    <div id="stats-container"></div>
    
    <nav class="tabs" role="tablist" aria-label="Main navigation">
      <button class="tab active" data-tab="ingest" role="tab" aria-selected="true" aria-controls="ingest" id="tab-ingest">📥 Ingest</button>
      <button class="tab" data-tab="query" role="tab" aria-selected="false" aria-controls="query" id="tab-query">🔍 Query</button>
      <button class="tab" data-tab="queryfile" role="tab" aria-selected="false" aria-controls="queryfile" id="tab-queryfile">🔗 Query+File</button>
      <button class="tab" data-tab="config" role="tab" aria-selected="false" aria-controls="config" id="tab-config">⚙️ Config</button>
    </nav>
    
    <main id="tab-content">
      ${Pn()}
      ${Mn()}
      ${Yn()}
      ${es()}
    </main>
  `,l("stats-container").innerHTML=`
    <div class="card">
      <h2>📊 Knowledge Graph Stats</h2>
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-number" id="statDocs">0</div>
          <div class="stat-label">Documents</div>
        </div>
        <div class="stat-box">
          <div class="stat-number" id="statEntities">0</div>
          <div class="stat-label">Entities</div>
        </div>
        <div class="stat-box">
          <div class="stat-number" id="statRelations">0</div>
          <div class="stat-label">Relationships</div>
        </div>
        <div class="stat-box">
          <div class="stat-number" id="statChunks">0</div>
          <div class="stat-label">Chunks</div>
        </div>
      </div>
      <button id="refreshStatsBtn" class="btn" aria-label="Refresh statistics">🔄 Refresh Stats</button>
    </div>
  `)}function ds(){const e=document.querySelectorAll(".tab");e.forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");n&&(e.forEach(s=>{s.classList.remove("active"),s.setAttribute("aria-selected","false")}),t.classList.add("active"),t.setAttribute("aria-selected","true"),gt(n))})})}function us(){document.addEventListener("keydown",e=>{var t;if(e.key==="Tab"&&document.body.classList.add("keyboard-mode"),e.key==="Escape"&&document.activeElement instanceof HTMLElement&&document.activeElement.blur(),(e.key==="Enter"||e.key===" ")&&((t=document.activeElement)!=null&&t.matches('button, [role="button"]'))){const n=document.activeElement;n.disabled||(n.classList.add("keyboard-activated"),setTimeout(()=>n.classList.remove("keyboard-activated"),150))}}),document.addEventListener("mousedown",()=>{document.body.classList.remove("keyboard-mode")}),document.addEventListener("click",e=>{var n;const t=e.target;t.classList.contains("toast-close")&&((n=t.closest(".toast"))==null||n.remove())},{capture:!0}),console.log("✅ Keyboard navigation initialized")}document.addEventListener("DOMContentLoaded",ls);
//# sourceMappingURL=index-sVUTh9vJ.js.map
