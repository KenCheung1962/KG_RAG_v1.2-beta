(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const G={},z=(G==null?void 0:G.VITE_API_URL)||"http://localhost:8002",_=(G==null?void 0:G.VITE_API_KEY)||"static-internal-key",ht=1e4;function l(e){return document.getElementById(e)}function N(e,t){const n=l(e);n&&(n.textContent=t)}function Z(e,t){const n=l(e);n&&(n.innerHTML=t)}function j(e,t){const n=l(e);n&&(n.style.display=t?"block":"none")}function A(e,t){const n=l(e);n&&(n.disabled=t)}function bt(e,t){var n,s;document.querySelectorAll(".tab").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(o=>o.classList.remove("active")),(n=document.querySelector(`[data-tab="${e}"]`))==null||n.classList.add("active"),(s=l(e))==null||s.classList.add("active")}const b={kgStats:null,docStats:null,lastStatsUpdate:null,selectedFiles:[],folderFiles:[],selectedQueryFiles:[],isUploading:!1,activeQueryController:null,isQuerying:!1,statsInterval:null},je=new Set;function C(){je.forEach(e=>e())}const re=()=>[...b.selectedFiles],yt=()=>[...b.folderFiles],be=()=>[...b.selectedQueryFiles],vt=()=>b.isQuerying;function wt(e){b.kgStats=e,b.lastStatsUpdate=Date.now(),C()}function kt(e){b.docStats=e,C()}function Ke(e){b.selectedFiles.some(n=>n.name===e.name&&n.size===e.size)||(b.selectedFiles.push(e),C())}function xt(e){b.selectedFiles.splice(e,1),C()}function We(){b.selectedFiles=[],C()}function $t(e){b.folderFiles=[...e],C()}function Et(e){b.selectedQueryFiles.some(n=>n.name===e.name&&n.size===e.size)||(b.selectedQueryFiles.push(e),C())}function Tt(e){b.selectedQueryFiles.splice(e,1),C()}function qe(){b.selectedQueryFiles=[],C()}function J(e){b.isUploading=e,C()}function _e(e){b.activeQueryController=e,C()}function Ee(){b.activeQueryController&&(b.activeQueryController.abort(),b.activeQueryController=null,b.isQuerying=!1,C())}function H(e){b.isQuerying=e,C()}function Ft(e){b.statsInterval&&clearInterval(b.statsInterval),b.statsInterval=e}function St(){b.statsInterval&&(clearInterval(b.statsInterval),b.statsInterval=null),Ee()}function Lt(){St(),je.clear()}const Ct=`
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
`;function Ge(){if(document.getElementById("loading-styles"))return;const e=document.createElement("style");e.id="loading-styles",e.textContent=Ct,document.head.appendChild(e)}function At(){Ge();const e=l("stats-container");e&&(e.innerHTML=`
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
  `)}const It="http://localhost:8002",Pt="http://localhost:8012",oe={entities:45578,relationships:115308,chunks:368407,documents:1970};async function Bt(){try{const e=await fetch(`${It}/health`,{signal:AbortSignal.timeout(3e3)});if(!e.ok)return null;const t=await e.json();return{kg:{entities:t.entities_count??0,relationships:t.relationships_count??0,chunks:t.chunks_count??0},docs:{total_documents:t.documents_count??0}}}catch{return console.log("Port 8002 API not available"),null}}async function Rt(){try{const e=await fetch(`${Pt}/stats`,{signal:AbortSignal.timeout(3e3)});if(!e.ok)return null;const t=await e.json();return{kg:{entities:t.entities??0,relationships:t.relationships??0,chunks:t.chunks??0},docs:{total_documents:t.documents??0}}}catch{return console.log("Port 8012 proxy not available"),null}}async function qt(){const e=await Bt();if(e)return console.log("✅ Stats from port 8002:",{docs:e.docs.total_documents,entities:e.kg.entities,rels:e.kg.relationships,chunks:e.kg.chunks}),{...e,source:"pgvector-api:8002"};const t=await Rt();return t?(console.log("✅ Stats from port 8012:",{docs:t.docs.total_documents,entities:t.kg.entities,rels:t.kg.relationships,chunks:t.kg.chunks}),{...t,source:"proxy:8012"}):(console.warn("⚠️ Using fallback hardcoded stats - API may be down"),{kg:{entities:oe.entities,relationships:oe.relationships,chunks:oe.chunks},docs:{total_documents:oe.documents},source:"fallback"})}function _t(){Ge(),At();const e=l("refreshStatsBtn");e==null||e.addEventListener("click",q),q()}async function q(){try{console.log("[Stats] Fetching pgvector stats...");const{kg:e,docs:t,source:n}=await qt();console.log(`[Stats] From ${n}:`,{docs:(t==null?void 0:t.total_documents)??0,entities:(e==null?void 0:e.entities)??0,relations:(e==null?void 0:e.relationships)??0,chunks:(e==null?void 0:e.chunks)??0}),wt(e),kt(t),Ut(e,t)}catch(e){console.error("[Stats] Failed to fetch:",e),N("statDocs","❌"),N("statEntities","❌"),N("statRelations","❌"),N("statChunks","❌")}}function Ut(e,t){const n=(t==null?void 0:t.total_documents)??0,s=(e==null?void 0:e.entities)??(e==null?void 0:e.total_entities)??0,o=(e==null?void 0:e.relationships)??(e==null?void 0:e.total_relations)??0,a=(e==null?void 0:e.chunks)??0;console.log("Rendering stats:",{docs:n,entities:s,relations:o,chunks:a}),N("statDocs",String(n)),N("statEntities",String(s)),N("statRelations",String(o)),N("statChunks",String(a))}let ee={percent:0,status:"",isActive:!1};function Dt(e){const t=l(e);t&&(t.innerHTML=`
    <div class="progress-container" style="display: none;">
      <div class="progress-bar">
        <div class="progress-fill" style="width: 0%"></div>
      </div>
      <div class="progress-status"></div>
    </div>
  `)}function Te(e){const t=l(e),n=t==null?void 0:t.querySelector(".progress-container");n&&(n.style.display="block",ee.isActive=!0)}function le(e,t,n){const s=l(e),o=s==null?void 0:s.querySelector(".progress-fill"),a=s==null?void 0:s.querySelector(".progress-status");o&&(o.style.width=`${t}%`),a&&n!==void 0&&(a.innerHTML=n),ee.percent=t,n!==void 0&&(ee.status=n)}function w(e,t,n=!0){const s=n?'<span class="spinner"></span>':"";le(e,ee.percent,`${s}<span style="color: #00d4ff;">${t}</span>`)}function Mt(){return ee.isActive}async function Fe(){try{return(await fetch(`${z}/health`,{method:"GET",headers:{"X-API-Key":_},signal:AbortSignal.timeout(5e3)})).ok}catch{return!1}}function Qt(e){return new Promise(t=>setTimeout(t,e))}async function U(e,t={},n=3e5,s=3){const o=new AbortController,a=setTimeout(()=>o.abort(),n);try{const r=await fetch(e,{...t,signal:o.signal});return clearTimeout(a),r}catch(r){if(clearTimeout(a),r instanceof Error&&r.name==="AbortError"){const i=new Error(`Request timeout after ${n/1e3}s`);throw i.name="TimeoutError",i}if(s>0&&r instanceof TypeError)return console.log(`Network error, retrying... (${s} attempts left)`),await Qt(1e3*(4-s)),U(e,t,n,s-1);throw r}}function Je(e){const t=e.includes("?")?"&":"?";return`${z}${e}${t}_=${Date.now()}`}async function Se(e=1e3){const t=await U(`${z}/api/v1/documents?limit=${e}`,{headers:{"X-API-Key":_}});if(!t.ok)throw new Error(`Failed to fetch documents: ${t.status}`);return t.json()}function Ht(e){return new Promise((t,n)=>{const s=new FileReader;s.onload=()=>{const a=s.result.split(",")[1];t(a)},s.onerror=()=>{n(new Error(`Failed to read file: ${e.name}`))},s.readAsDataURL(e)})}async function de(e){const t=await Ht(e),n=e.type||"application/octet-stream",s=n.startsWith("text/")||e.name.match(/\.(txt|md|csv|json|html|xml|js|ts|py|css)$/i),o=await U(`${z}/api/v1/documents/upload/json`,{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":_},body:JSON.stringify({content:t,id:e.name,content_type:s?"text/plain":n})},12e4);if(!o.ok)throw new Error(`Upload failed: ${o.status}`);return o.json()}async function Ye(e){try{const t=await U(`${z}/api/v1/documents/${e}/status`,{headers:{"X-API-Key":_}},1e4);return t.ok?t.json():null}catch{return null}}const Xe=`You are a knowledgeable research assistant with access to a document database.

Your task is to provide comprehensive, detailed answers based on the retrieved context. Follow these guidelines:

1. **Be thorough**: Provide detailed explanations with specific examples, data points, and relationships found in the context.

2. **Structure your answer**: Use clear headings (# for main sections, ## for subsections) and organize information logically.

3. **Synthesize information**: Don't just list facts—connect ideas, explain relationships, and provide insights that demonstrate deep understanding.

4. **Include specifics**: Cite specific entities, metrics, dates, or technical details when available in the context.

5. **Explain relevance**: Briefly explain why the information matters or how concepts relate to each other.

6. **No unnecessary disclaimers**: If the context provides relevant information, answer confidently without apologizing for "limited context."

7. **Expand on concepts**: When discussing technical topics, explain underlying principles and mechanisms, not just surface-level facts.`;async function Ve(e,t){const n=e.ultra_comprehensive,s=n||e.detailed||e.message.toLowerCase().includes("explain")||e.message.toLowerCase().includes("detail")||e.message.toLowerCase().includes("comprehensive"),o={...e,top_k:n?40:e.top_k??20,rerank:e.rerank??!0,rerank_method:e.rerank_method??"hybrid",system_prompt:e.system_prompt??Xe,detailed:s,ultra_comprehensive:n,temperature:n?.4:e.temperature??.3,max_tokens:n||s?8192:4096,message:e.message};let a;n?a=9e5:s?a=3e5:e.top_k&&e.top_k>=20?a=24e4:a=18e4;const r=await U(Je("/api/v1/chat"),{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":_},body:JSON.stringify(o),signal:t},a);if(!r.ok)throw new Error(`Query failed: ${r.status}`);return r.json()}async function Le(e,t){const n=e.ultra_comprehensive,s=e.detailed,o={...e,top_k:e.top_k??20,system_prompt:n||s?Xe:void 0,detailed:s,ultra_comprehensive:n,temperature:n?.4:.3,max_tokens:n||s?8192:4096,message:e.message},a=n?6e5:s?3e5:18e4,r=await U(Je("/api/v1/chat/with-doc"),{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":_},body:JSON.stringify(o),signal:t},a);if(!r.ok)throw new Error(`Query with files failed: ${r.status}`);return r.json()}async function Ze(e){const t=await U(`${z}/api/v1/documents/upload/folder/json`,{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":_},body:JSON.stringify(e)},3e5);if(!t.ok)throw new Error(`Folder upload failed: ${t.status}`);return t.json()}async function et(){const e=await U(`${z}/health`,{headers:{"X-API-Key":_}},1e4);if(!e.ok)throw new Error(`Health check failed: ${e.status}`);return e.json()}async function tt(){const e=await U(`${z}/api/v1/clear`,{method:"DELETE",headers:{"X-API-Key":_}},6e4);if(!e.ok)throw new Error(`Clear database failed: ${e.status}`)}const Nt=Object.freeze(Object.defineProperty({__proto__:null,clearDatabase:tt,fetchDocuments:Se,getDocumentStatus:Ye,isBackendHealthy:Fe,sendQuery:Ve,sendQueryWithFiles:Le,testConnection:et,uploadDocument:de,uploadFolder:Ze},Symbol.toStringTag,{value:"Module"}));function k(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function zt(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function Ot(e,t=1e3,n=5e3){return Math.min(t*Math.pow(1.5,e),n)}function ue(e,t){const n=document.getElementById(t.containerId);if(!n)return;if(e.length===0){n.style.display="none";return}n.style.display="block";const s=e.map((o,a)=>`
    <div class="file-item" data-index="${a}">
      <span class="file-name">${k(o.name)}</span>
      <span class="file-size">${zt(o.size)}</span>
      ${t.onRemove?`
        <button class="btn-remove" data-index="${a}" title="Remove">✕</button>
      `:""}
    </div>
  `).join("");n.innerHTML=`
    <strong>${t.emptyText||"Selected files:"}</strong>
    <div class="file-list-content">${s}</div>
  `,t.onRemove&&n.querySelectorAll(".btn-remove").forEach(o=>{o.addEventListener("click",a=>{var i;a.stopPropagation();const r=parseInt(o.dataset.index||"0",10);(i=t.onRemove)==null||i.call(t,r)})})}const nt="http://localhost:8013";async function V(e,t){try{const n=await fetch(`${nt}${e}`,{...t,headers:{"Content-Type":"application/json",...t==null?void 0:t.headers}});if(!n.ok){const s=await n.json().catch(()=>({error:`HTTP ${n.status}`}));throw new Error(s.error||`HTTP ${n.status}`)}return n.json()}catch(n){throw n instanceof Error&&n.name==="TypeError"?new Error("Database Management API not running. Start it with: npm run db:api"):n}}async function jt(){return V("/stats")}async function Kt(){return(await V("/backups")).backups}async function ae(){return V("/backup",{method:"POST"})}async function Wt(){return V("/cleanup",{method:"POST"})}async function Gt(e){return V("/restore",{method:"POST",body:JSON.stringify({backupName:e})})}async function Jt(e){return V("/backup",{method:"DELETE",body:JSON.stringify({backupName:e})})}async function Yt(){const e=await fetch("http://localhost:8002/api/v1/upload-failures");if(!e.ok)throw new Error(`Failed to fetch upload failures: ${e.status}`);return e.json()}async function Xt(){try{return(await fetch(`${nt}/health`,{method:"GET",signal:AbortSignal.timeout(2e3)})).ok}catch{return!1}}let Q=null,O=[],R=!1,Y=null,ye=[],ve=[];function Vt(){sn(),Zt(),en(),tn()}async function Zt(){R=await Xt(),st(),R&&(await ne(),await se(),await at())}function st(){const e=l("databasePanel"),t=l("dbApiWarning");e&&(e.style.opacity=R?"1":"0.5"),t&&(j("dbApiWarning",!R),R||(t.innerHTML=`
        <div class="warning-box">
          <strong>⚠️ Database Management API Not Running</strong><br>
          Start it with: <code>node scripts/db-management-api.cjs</code><br>
          Or: <code>npm run db:api</code>
        </div>
      `))}function en(){var e,t,n,s;(e=l("btnCreateBackup"))==null||e.addEventListener("click",on),(t=l("btnCleanupDB"))==null||t.addEventListener("click",an),(n=l("btnRefreshDBStats"))==null||n.addEventListener("click",()=>{ne(),se()}),(s=l("btnRefreshUploadHistory"))==null||s.addEventListener("click",at)}function tn(){Y&&clearInterval(Y),Y=window.setInterval(()=>{R&&ne()},3e4)}async function ne(){if(R)try{Q=await jt(),nn()}catch(e){console.error("Failed to refresh stats:",e),R=!1,st()}}async function se(){if(R)try{O=await Kt(),ot()}catch(e){console.error("Failed to refresh backups:",e)}}function nn(){var n,s,o,a;if(!Q)return;const e=`
    <div class="db-stats-grid">
      <div class="db-stat-item">
        <span class="db-stat-value">${((n=Q.counts.documents)==null?void 0:n.toLocaleString())||0}</span>
        <span class="db-stat-label">Documents</span>
      </div>
      <div class="db-stat-item">
        <span class="db-stat-value">${((s=Q.counts.chunks)==null?void 0:s.toLocaleString())||0}</span>
        <span class="db-stat-label">Chunks</span>
      </div>
      <div class="db-stat-item">
        <span class="db-stat-value">${((o=Q.counts.entities)==null?void 0:o.toLocaleString())||0}</span>
        <span class="db-stat-label">Entities</span>
      </div>
      <div class="db-stat-item">
        <span class="db-stat-value">${((a=Q.counts.relationships)==null?void 0:a.toLocaleString())||0}</span>
        <span class="db-stat-label">Relationships</span>
      </div>
    </div>
    <div class="db-size-info">
      <strong>Total Database Size:</strong> ${Q.totalSizeFormatted}
      <span class="db-last-updated">Updated: ${new Date(Q.timestamp).toLocaleTimeString()}</span>
    </div>
  `,t=l("dbStatsContainer");t&&(t.innerHTML=e)}function sn(){const e=l("dbBackupsContainer");e&&(e.removeEventListener("click",Ue),e.addEventListener("click",Ue))}function Ue(e){const t=e.target,n=t.closest(".btn-restore"),s=t.closest(".btn-delete");if(!n&&!s)return;const o=t.closest(".backup-item");if(!o)return;const a=o.getAttribute("data-backup-name");if(a){if(n){rn(a);return}if(s){if(s.disabled)return;ln(a,s)}}}function ot(){const e=l("dbBackupsContainer");if(!e)return;if(O.length===0){e.innerHTML='<p class="empty-text">No backups yet. Create your first backup below.</p>';return}const t=O.slice(0,5).map(n=>{var r,i;const s=new Date(n.created).toLocaleString(),o=((i=(r=n.metadata)==null?void 0:r.stats)==null?void 0:i.documents)||"?",a=o==="?"||n.size==="160 B";return`
      <div class="backup-item ${a?"backup-outdated":""}" data-backup-name="${k(n.name)}">
        <div class="backup-info">
          <div class="backup-name">${k(n.name)} ${a?'<span class="outdated-badge">outdated</span>':""}</div>
          <div class="backup-meta">
            ${s} • ${n.size} • ${o} docs
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
    ${O.length>5?`<p class="backup-more">+ ${O.length-5} more backups</p>`:""}
  `}async function on(){const e=l("btnCreateBackup");if(!e)return;const t=e.innerHTML;e.innerHTML="⏳ Creating...",A("btnCreateBackup",!0);try{const n=await ae();L(`✅ Backup created: ${n.result.backupPath}`,"success"),await se()}catch(n){L(`❌ Backup failed: ${n instanceof Error?n.message:"Unknown error"}`,"error")}finally{e.innerHTML=t,A("btnCreateBackup",!1)}}async function an(){if(!confirm(`⚠️ WARNING: This will DELETE all data in the database!

Make sure you have created a backup first.

This action cannot be undone.

Are you sure you want to continue?`))return;const t=l("btnCleanupDB");if(!t)return;const n=t.innerHTML;t.innerHTML="⏳ Cleaning...",A("btnCleanupDB",!0);try{await Wt(),L("✅ Database cleaned successfully","success"),await ne(),await se(),localStorage.removeItem("lightrag_upload_tracker"),localStorage.removeItem("lightrag_uploaded_files"),L("📝 Upload tracker history cleared","info")}catch(s){L(`❌ Cleanup failed: ${s instanceof Error?s.message:"Unknown error"}`,"error")}finally{t.innerHTML=n,A("btnCleanupDB",!1)}}async function rn(e){if(confirm(`⚠️ Restore from "${e}"?

This will OVERWRITE current database metadata.

Note: You will need to re-upload the original files to restore full content.

Continue?`))try{const n=await Gt(e);L(`✅ ${n.message}`,"success"),await ne()}catch(n){L(`❌ Restore failed: ${n instanceof Error?n.message:"Unknown error"}`,"error")}}async function ln(e,t){if(console.log("Delete requested for backup:",e),!confirm(`🗑️ Delete backup "${e}"?

This backup will be permanently removed.

This action cannot be undone!`))return;t&&(t.disabled=!0,t.textContent="⏳...");const s=document.querySelectorAll(".btn-delete");s.forEach(o=>{o!==t&&(o.disabled=!0)});try{console.log("Calling deleteBackup API for:",e);const o=await Jt(e);console.log("Delete result:",o),L(`✅ ${o.message}`,"success"),O=O.filter(a=>a.name!==e),ot(),await se()}catch(o){console.error("Delete error:",o),L(`❌ Delete failed: ${o instanceof Error?o.message:"Unknown error"}`,"error"),s.forEach(a=>{a.disabled=!1,a===t&&(a.textContent="🗑️ Delete")})}}async function at(){try{const e=await Yt();ye=e.failures,ve=e.successes,cn()}catch(e){console.error("Failed to fetch upload history:",e);const t=l("uploadHistoryContainer");t&&(t.innerHTML='<p class="error-text">Failed to load upload history</p>')}}function cn(){const e=l("uploadHistoryContainer");if(!e)return;const t=ye.length,n=ve.length;let s="";t>0&&(s+='<div class="upload-failures-section">',s+=`<h4 class="upload-section-title error">❌ Recent Failures (${t})</h4>`,s+='<div class="upload-list">',ye.slice(-10).reverse().forEach(o=>{const a=o.error.length>60?o.error.substring(0,60)+"...":o.error;s+=`
        <div class="upload-item failure">
          <div class="upload-filename" title="${k(o.filename)}">${k(o.filename)}</div>
          <div class="upload-meta">
            <span class="upload-error">${k(a)}</span>
            <span class="upload-time">${new Date(o.timestamp).toLocaleString()}</span>
          </div>
        </div>
      `}),s+="</div></div>"),n>0&&(s+='<div class="upload-successes-section">',s+=`<h4 class="upload-section-title success">✅ Recent Successes (${n} total)</h4>`,s+='<div class="upload-list">',ve.slice(-5).reverse().forEach(o=>{s+=`
        <div class="upload-item success">
          <div class="upload-filename" title="${k(o.filename)}">${k(o.filename)}</div>
          <div class="upload-meta">
            <span class="upload-chunks">${o.chunks} chunks</span>
            <span class="upload-time">${new Date(o.timestamp).toLocaleString()}</span>
          </div>
        </div>
      `}),s+="</div></div>"),t===0&&n===0&&(s='<p class="empty-text">No upload history available yet. Upload some files to see the history.</p>'),e.innerHTML=s}function L(e,t="info"){const n=l("dbNotification");if(!n)return;const s=t==="success"?"notification-success":t==="error"?"notification-error":"notification-info";n.innerHTML=`<div class="notification ${s}">${k(e)}</div>`,setTimeout(()=>{n.innerHTML=""},5e3)}function dn(){return`
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
  `}function un(){Y&&(clearInterval(Y),Y=null)}const Ce="lightrag_upload_tracker",it="lightrag_uploaded_files";function pn(){return`session_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function pe(){try{const e=localStorage.getItem(Ce);return e?JSON.parse(e):null}catch{return null}}function X(e){try{localStorage.setItem(Ce,JSON.stringify(e))}catch(t){console.error("Failed to save upload session:",t)}}function rt(){localStorage.removeItem(Ce)}function fn(e,t){const n={id:pn(),folderPath:e,startedAt:Date.now(),lastUpdated:Date.now(),totalFiles:t,processedFiles:0,uploadedFileIds:[],status:"in_progress"};return X(n),n}function mn(e,t){const n=pe();n&&(n.uploadedFileIds.includes(e)||n.uploadedFileIds.push(e),n.processedFiles=n.uploadedFileIds.length,n.lastUpdated=Date.now(),X(n),gn(e,t))}function fe(){try{const e=localStorage.getItem(it);return e?JSON.parse(e):[]}catch{return[]}}function gn(e,t){try{const s=fe().filter(a=>a.filename!==e);s.push({filename:e,docId:t,uploadedAt:Date.now(),size:0});const o=s.slice(-1e4);localStorage.setItem(it,JSON.stringify(o))}catch(n){console.error("Failed to save to uploaded files list:",n)}}function hn(e){return fe().some(n=>n.filename===e)}async function bn(){const e=pe();if(!e)return{hasSession:!1};if(e.status==="completed")return rt(),{hasSession:!1};try{const t=await Se(1e4),n=new Set(t.map(a=>a.filename)),s=e.uploadedFileIds.filter(a=>n.has(a)),o=e.uploadedFileIds.filter(a=>!n.has(a));return o.length>0&&(console.warn(`${o.length} files from session not found on server`),e.uploadedFileIds=s,e.processedFiles=s.length,X(e)),s.length>=e.totalFiles?(e.status="completed",X(e),{hasSession:!0,session:e,message:`Previous upload completed (${s.length}/${e.totalFiles} files)`}):{hasSession:!0,session:e,message:`Found interrupted upload: ${s.length}/${e.totalFiles} files processed`}}catch{return{hasSession:!0,session:e,message:`Found previous upload session: ${e.processedFiles}/${e.totalFiles} files (server verification failed)`}}}function yn(){const e=pe();e&&(e.status="completed",e.lastUpdated=Date.now(),X(e))}function vn(){const e=pe();e&&e.status!=="completed"&&(e.status="interrupted",e.lastUpdated=Date.now(),X(e))}function lt(e){const t=fe(),n=new Set(t.map(a=>a.filename)),s=[],o=[];for(const a of e)n.has(a.name)?o.push(a.name):s.push(a);return{newFiles:s,skippedFiles:o,count:{new:s.length,skipped:o.length}}}function wn(){const e=fe(),t=e.length>0?Math.max(...e.map(n=>n.uploadedAt)):null;return{totalUploaded:e.length,lastUpload:t}}let I=null;const ct="lightrag_auto_backup_enabled",we=10;function ke(){return localStorage.getItem(ct)==="true"}function De(e){localStorage.setItem(ct,String(e))}function kn(){var n,s,o,a,r,i,d,c,g,h,y;(n=l("btnMethodFiles"))==null||n.addEventListener("click",()=>Me("files")),(s=l("btnMethodFolder"))==null||s.addEventListener("click",()=>Me("folder")),(o=l("fileInput"))==null||o.addEventListener("change",xn),(a=l("clearFilesBtn"))==null||a.addEventListener("click",dt),(r=l("ingestFilesBtn"))==null||r.addEventListener("click",$n),(i=l("folderInput"))==null||i.addEventListener("change",En),(d=l("browseFolderBtn"))==null||d.addEventListener("click",()=>{var f;(f=l("folderInput"))==null||f.click()}),(c=l("ingestFolderBtn"))==null||c.addEventListener("click",Tn);const e=l("autoBackup"),t=l("autoBackupFiles");e==null||e.addEventListener("change",f=>{const m=f.target.checked;De(m),t&&(t.checked=m),console.log(`Auto-backup ${m?"enabled":"disabled"}`)}),t==null||t.addEventListener("change",f=>{const m=f.target.checked;De(m),e&&(e.checked=m),console.log(`Auto-backup ${m?"enabled":"disabled"}`)}),(g=l("resumeUploadBtn"))==null||g.addEventListener("click",Cn),(h=l("discardSessionBtn"))==null||h.addEventListener("click",An),(y=l("clearUploadHistoryBtn"))==null||y.addEventListener("click",In),Sn(),pt(),Vt()}function Me(e){j("methodFiles",e==="files"),j("methodFolder",e==="folder");const t=l("btnMethodFiles"),n=l("btnMethodFolder");t==null||t.classList.toggle("active",e==="files"),t==null||t.classList.toggle("inactive",e!=="files"),t==null||t.setAttribute("aria-pressed",String(e==="files")),n==null||n.classList.toggle("active",e==="folder"),n==null||n.classList.toggle("inactive",e!=="folder"),n==null||n.setAttribute("aria-pressed",String(e==="folder"))}function xn(){var t;const e=l("fileInput");(t=e==null?void 0:e.files)!=null&&t.length&&(Array.from(e.files).forEach(n=>Ke(n)),ue(re(),{containerId:"selectedFilesList",onRemove:Ae,emptyText:"Selected files:"}),e.value="")}function Ae(e){xt(e),ue(re(),{containerId:"selectedFilesList",onRemove:Ae,emptyText:"Selected files:"})}function dt(){We(),ue([],{containerId:"selectedFilesList",onRemove:Ae}),l("fileInput").value=""}async function Ie(e){const t=await Se(1e3),n=new Set(t.map(i=>i.filename)),s=new Map(t.map(i=>[i.filename,i.doc_id])),o=[],a=[];for(const i of e)n.has(i.name)?o.push(i.name):a.push(i);const r=new Map;for(const i of o){const d=s.get(i);d&&r.set(i,d)}return{duplicates:o,newFiles:a,duplicateDocIds:r}}function ut(e,t,n="files"){const s=e.slice(0,5).join(", ")+(e.length>5?"...":"");return t>0?confirm(`Found ${e.length} existing ${n}:
${s}

Click OK to upload all (overwrite duplicates), Cancel to skip duplicates.`):confirm(`All ${e.length} ${n} already exist. Click OK to overwrite all, Cancel to skip.`)}async function $n(){const e=re();if(e.length===0){alert("Please select files first");return}J(!0),A("ingestFilesBtn",!0),Te("ingestProgress"),w("ingestProgress","Checking for existing files...");try{const{duplicates:t,newFiles:n}=await Ie(e);if(t.length>0&&!ut(t,n.length,"file(s)")){if(n.length===0){w("ingestProgress","⏭️ All files already exist. Skipped.",!1),A("ingestFilesBtn",!1),J(!1);return}We(),n.forEach(d=>Ke(d))}const s=re();let o=0,a=0;const r=[];for(let i=0;i<s.length;i++){const d=s[i],c=(i+1)/s.length*100;w("ingestProgress",`📄 Processing ${i+1}/${s.length}: <strong>${k(d.name)}</strong>`),le("ingestProgress",c);try{await de(d),o++,await q()}catch(g){console.error(`Failed to upload ${d.name}:`,g);const h=g instanceof Error?g.message:String(g),f=g instanceof Error&&(g.name==="TimeoutError"||h.includes("timeout")||h.includes("Abort"))?"Upload timeout - file too large or backend busy":h;r.push({file:d.name,error:f}),a++}}w("ingestProgress",`✅ Processed ${o} files${a>0?`, ${a} errors`:""}`,!1),a>0&&r.length>0&&xe(r),dt(),await q()}catch(t){console.error("Ingest failed:",t),w("ingestProgress",`❌ Error: ${t instanceof Error?t.message:"Unknown error"}`,!1)}finally{A("ingestFilesBtn",!1),J(!1)}}function xe(e){const t=l("uploadErrorLog");if(!t)return;const n=new Map;e.forEach(({file:o,error:a})=>{const r=n.get(a)||[];r.push(o),n.set(a,r)});let s='<div class="error-log"><h4>⚠️ Error Details:</h4>';Array.from(n.entries()).slice(0,5).forEach(([o,a])=>{s+=`<div class="error-item"><strong>${a.length} files:</strong> ${k(o)}`,a.length<=3&&(s+=`<br><small>${a.map(k).join(", ")}</small>`),s+="</div>"}),n.size>5&&(s+=`<p><em>... and ${n.size-5} more error types</em></p>`),s+="</div>",t.innerHTML=s,t.style.display="block"}function En(){var a,r;const e=l("folderInput");if(!((a=e==null?void 0:e.files)!=null&&a.length))return;let t=Array.from(e.files);const s=((r=t[0].webkitRelativePath)==null?void 0:r.split("/")[0])||"/",o=lt(t);if(o.skippedFiles.length>0){console.log(`${o.skippedFiles.length} files already uploaded, skipping`);const i=l("duplicateNotification");i&&(i.innerHTML=`
        <div class="notification info">
          📋 <strong>${o.skippedFiles.length}</strong> files already uploaded (skipped)<br>
          <strong>${o.newFiles.length}</strong> new files to upload
        </div>
      `,i.style.display="block"),t=o.newFiles}$t(t),l("folderPath").value=s,l("folderFileCount").textContent=`${t.length} files selected`,j("folderFiles",!0)}async function Tn(){var a,r;const e=((a=l("folderPath"))==null?void 0:a.value)??"",t=((r=l("recursive"))==null?void 0:r.checked)??!0;let n=yt();if(!e&&n.length===0){alert("Please select a folder first");return}const s=lt(n),o=s.skippedFiles.length;if(o>0&&(console.log(`📋 Pre-filtered ${o} already uploaded files`),L(`📋 ${o} files already uploaded, will be skipped`,"info")),n=s.newFiles,n.length===0){w("ingestProgress","✅ All files already uploaded! Nothing to upload.",!1);return}console.log(`📤 Starting upload of ${n.length} new files (${o} already uploaded)`),I=fn(e,n.length),J(!0),A("ingestFolderBtn",!0),Te("ingestProgress"),w("ingestProgress",`Starting upload of ${n.length} new files...`);try{if(n.length>0){const{duplicates:i,newFiles:d}=await Ie(n);if(i.length>0){const c=ut(i,d.length,"file(s) in folder");if(!c&&d.length===0){w("ingestProgress","⏭️ All files already exist in database. Skipped.",!1),A("ingestFolderBtn",!1),J(!1);return}await Qe(c?n:d)}else await Qe(n)}else{const i=await Ze({folder_path:e,recursive:t});w("ingestProgress",`✅ Processed ${i.total_files} files`,!1),await q().catch(console.error)}}catch(i){console.error("Folder ingest failed:",i),w("ingestProgress",`❌ Error: ${i instanceof Error?i.message:"Unknown error"}`,!1)}finally{A("ingestFolderBtn",!1),J(!1)}}let M=[];function ie(e){return new Promise(t=>setTimeout(t,e))}async function Fn(e=3,t=2e3){for(let n=0;n<e;n++){if(await Fe())return!0;if(n<e-1){const o=t*Math.pow(2,n);console.log(`Health check failed, retrying in ${o}ms... (attempt ${n+1}/${e})`),await ie(o)}}return!1}async function Qe(e){let t=0,n=0,s=0,o=0,a=0;M=[];const r=5,i=300,d=2e3,c=5,g=5,h=ke(),y=we,f=e.filter(v=>v.size<50?(s++,!1):!0),m=Math.ceil(f.length/r);if(h&&f.length>y)try{w("ingestProgress","💾 Creating initial backup before upload...",!1),await ae(),a=0,L("✅ Initial backup created","success")}catch(v){console.error("Initial backup failed:",v),L("⚠️ Initial backup failed, continuing anyway","error")}for(let v=0;v<m;v++){const S=v*r,T=f.slice(S,S+r),$=v===m-1;if(!await Fn(3,2e3)){console.error(`Backend health check failed before batch ${v+1} after retries`);const p=f.slice(S);p.forEach(u=>{M.push({file:u.name,error:"Backend unavailable - upload stopped"})}),n+=p.length,w("ingestProgress",`❌ Backend unavailable after ${t} files. ${p.length} files not processed.`,!1);break}for(let p=0;p<T.length;p++){const u=T[p],E=S+p+1,K=E/f.length*100;if(hn(u.name)){console.log(`⏭️ Skipping already uploaded: ${u.name}`),s++,t++,w("ingestProgress",`⏭️ Skipping ${s} already uploaded... (${E}/${f.length})<br><strong>${k(u.name.substring(0,50))}${u.name.length>50?"...":""}</strong>`),le("ingestProgress",K);continue}w("ingestProgress",`📂 Batch ${v+1}/${m}: ${p+1}/${T.length} (${E}/${f.length})<br><strong>${k(u.name.substring(0,50))}${u.name.length>50?"...":""}</strong>`),le("ingestProgress",K);try{const D=await de(u);t++,o=0,mn(u.name,D.doc_id||u.name),I&&I.processedFiles++,t%g===0&&(console.log(`[Upload] Updating stats after ${t} files...`),q().catch(W=>console.error("[Upload] Stats update failed:",W))),p<T.length-1&&await ie(i)}catch(D){n++,o++;const W=D instanceof Error?D.message:String(D);if(D instanceof Error&&(D.name==="TimeoutError"||W.includes("timeout")||W.includes("Abort"))?(console.warn(`⏱️ Timeout uploading ${u.name}: ${W}`),M.push({file:u.name,error:"Upload timeout (file too large or backend busy)"})):M.push({file:u.name,error:W}),console.error(`Failed to upload ${u.name}:`,D),o>=c){if(console.warn(`Too many consecutive errors (${o}), checking backend health...`),!await Fe()){const Re=f.slice(E);Re.forEach(gt=>{M.push({file:gt.name,error:"Backend crashed - upload stopped"})}),n+=Re.length,w("ingestProgress",`❌ Backend crashed after ${t} files. Stopping upload.`,!1),xe(M);return}o=0}await ie(i*2)}}if(h&&t-a>=y)try{console.log(`💾 Auto-creating backup after ${t} files...`),w("ingestProgress",`💾 Creating backup after ${t} files...`,!1),await ae(),a=t,L(`✅ Backup created after ${t} files`,"success")}catch(p){console.error("Auto-backup failed:",p)}$||(w("ingestProgress",`⏳ Cooling down... (${v+1}/${m} batches complete)`,!1),await ie(d))}if(h&&t>0)try{console.log("💾 Creating final backup after upload..."),w("ingestProgress","💾 Creating final backup...",!1),await ae(),L("✅ Final backup created","success")}catch(v){console.error("Final backup failed:",v)}const x=[`✅ Processed ${t} files`];s>0&&x.push(`skipped ${s} already uploaded`),n>0&&x.push(`${n} errors`),w("ingestProgress",x.join(", "),!1),n>0&&M.length>0&&xe(M),console.log("[Upload] Final stats update..."),await q().catch(v=>console.error("[Upload] Final stats update failed:",v)),n===0&&t+s===e.length?(yn(),w("ingestProgress",`✅ Upload completed! ${t} new files uploaded (${s} skipped).`,!1)):n>0&&vn()}async function Sn(){const e=await bn();e.hasSession&&e.session?(I=e.session,Ln(e.message||"Found previous upload session")):Pe()}function Ln(e){const t=l("resumeDialog"),n=l("resumeMessage");t&&n&&(n.textContent=e,t.style.display="block")}function Pe(){const e=l("resumeDialog");e&&(e.style.display="none")}async function Cn(){if(!I){alert("No session to resume");return}Pe(),w("ingestProgress",`🔄 Resuming upload: ${I.processedFiles}/${I.totalFiles} files already processed`,!1),Te("ingestProgress"),alert(`Please select the same folder again to resume upload.

Already uploaded: ${I.processedFiles}/${I.totalFiles} files`)}function An(){confirm("Are you sure you want to discard the previous upload session?")&&(rt(),I=null,Pe(),w("ingestProgress","Previous session discarded. Ready to start new upload.",!1))}function pt(){const e=wn(),t=l("uploadStats");if(t&&e.totalUploaded>0){const n=e.lastUpload?new Date(e.lastUpload).toLocaleDateString():"Unknown";t.innerHTML=`📊 Total files uploaded: <strong>${e.totalUploaded}</strong> (last: ${n})`,t.style.display="block"}}function In(){confirm(`⚠️ WARNING: This will clear ALL upload history!

Files already in the database will remain, but the system will not remember which files were uploaded.

Are you sure?`)&&(Pn(),pt(),alert("Upload history cleared."))}function Pn(){localStorage.removeItem("lightrag_upload_tracker"),localStorage.removeItem("lightrag_uploaded_files"),I=null}function Bn(){return`
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
          <input type="checkbox" id="autoBackupFiles" ${ke()?"checked":""}>
          <label for="autoBackupFiles" style="font-weight: 500;">
            💾 Auto-backup during upload
            <span style="display: block; font-size: 12px; font-weight: normal; color: var(--text-secondary); margin-top: 4px;">
              Creates backups every ${we} files and at completion
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
          <input type="checkbox" id="autoBackup" ${ke()?"checked":""}>
          <label for="autoBackup" style="font-weight: 500;">
            💾 Auto-backup during upload
            <span style="display: block; font-size: 12px; font-weight: normal; color: var(--text-secondary); margin-top: 4px;">
              Creates backups every ${we} files and at completion
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
      ${dn()}
    </div>
  `}let $e="",P=[];function Rn(e){if(e==null||e.preventDefault(),e==null||e.stopPropagation(),!$e){alert("No answer to print. Please run a query first.");return}const n=`<!DOCTYPE html>
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
  <div class="answer">${$e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/^# (.+)$/gm,'<div class="h1-bold">$1</div>').replace(/^## (.+)$/gm,'<div class="h2-bold">$1</div>').replace(/^### (.+)$/gm,'<div class="h3-bold">$1</div>').replace(/\n/g,"<br>")}</div>
</body>
</html>`,s=new Blob([n],{type:"text/html"}),o=URL.createObjectURL(s);if(!window.open(o,"_blank")){alert("Please allow popups to print the answer."),URL.revokeObjectURL(o);return}}function qn(){var e,t,n,s,o,a;(e=l("runQueryBtn"))==null||e.addEventListener("click",me),(t=l("printQueryBtn"))==null||t.addEventListener("click",r=>Rn(r)),(n=l("queryText"))==null||n.addEventListener("input",()=>{const r=l("printQueryBtn");r&&(r.style.display="none")}),(s=l("testQueryCompanies"))==null||s.addEventListener("click",()=>he("What companies are mentioned?")),(o=l("testQueryRelations"))==null||o.addEventListener("click",()=>he("What relationships exist?")),(a=l("testQueryOverview"))==null||a.addEventListener("click",()=>he("Give me an overview"))}function he(e){const t=l("queryText");t&&(t.value=e),me()}function _n(){const e=document.querySelector('input[name="queryMode"]:checked');return(e==null?void 0:e.value)||"hybrid"}function Un(){const e=document.querySelector('input[name="queryDetail"]:checked');switch((e==null?void 0:e.value)||"balanced"){case"quick":return{top_k:10,ultra_comprehensive:!1,detailed:!1,label:"Quick"};case"ultra":return{top_k:40,ultra_comprehensive:!0,detailed:!0,label:"Ultra Deep"};case"comprehensive":return{top_k:30,ultra_comprehensive:!1,detailed:!0,label:"Comprehensive"};case"balanced":default:return{top_k:20,ultra_comprehensive:!1,detailed:!1,label:"Balanced"}}}async function me(){var f;const e=(f=l("queryText"))==null?void 0:f.value.trim();if(!e){alert("Please enter a question");return}vt()&&Ee();const t=_n(),n=Un(),s=l("answerText"),o=l("sourcesText"),a=l("runQueryBtn"),r=l("printQueryBtn");H(!0),A("runQueryBtn",!0),r&&(r.style.display="none");const i=n.ultra_comprehensive,d=i?"3-5 min":n.detailed?"2-4 min":"30-60 sec";a&&(a.textContent=`⏳ ${n.label} Mode (${d})...`),j("queryResult",!0);const c=i?"ultra-extensive (3000+ words)":n.detailed?"comprehensive (2000+ words)":"standard";s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>Retrieving ${n.top_k} chunks + Generating ${c} answer...<br>Estimated time: ${d}<br><small>Please wait, do not close or refresh the page</small>`,o.textContent="";const g=new AbortController;_e(g);let h;i?h=9e5:n.detailed?h=3e5:n.top_k>=20?h=24e4:h=18e4;const y=setTimeout(()=>g.abort(),h);try{const m=await Ve({message:e,mode:t,top_k:n.top_k,ultra_comprehensive:n.ultra_comprehensive,detailed:n.detailed},g.signal);clearTimeout(y);const x=m.response||m.answer||JSON.stringify(m,null,2);console.log("[Query] Full result:",m),console.log("[Query] Result keys:",Object.keys(m));const v=m.sources||m.source_documents||m.source||m.chunks;console.log("[Query] Raw sources:",v),console.log("[Query] sources type:",typeof v),console.log("[Query] sources isArray:",Array.isArray(v)),typeof v=="number"&&console.warn("[Query] Backend returned source COUNT instead of source filenames. References cannot be displayed."),Array.isArray(v)?P=v.map(p=>typeof p=="string"?p:p&&typeof p=="object"?p.filename||p.doc_id||p.name||JSON.stringify(p):String(p)):P=[],console.log("[Query] Processed sources:",P);const S=new Set,T=x.match(/Source\s+(\d+)/gi);T&&T.forEach(p=>{const u=p.match(/\d+/);u&&S.add(parseInt(u[0],10))}),console.log("[Query] Sources cited in text:",Array.from(S));let $=x;if(S.size>0&&P.length>0){const p=Array.from(S).sort((u,E)=>u-E).map(u=>P[u-1]).filter(u=>u!==void 0);p.length>0&&($+=`


## References

`,p.forEach((u,E)=>{$+=`${E+1}. ${u}
`}))}if($e=$,r&&(r.style.display="inline-block"),x.startsWith("Found")&&x.includes("relevant chunks"))Dn(x,s);else{let p=x;if(S.size>0&&P.length>0){const u=Array.from(S).sort((E,K)=>E-K).map(E=>P[E-1]).filter(E=>E!==void 0);u.length>0&&(p+=`


## References

`+u.map((E,K)=>`${K+1}. ${E}`).join(`
`))}s.innerHTML=ge(p),setTimeout(()=>ft(s),100)}const F=m.sources||m.source_documents;if(S.size>0&&P.length>0){const p=Array.from(S).sort((u,E)=>u-E).map(u=>P[u-1]).filter(u=>u!==void 0);p.length>0?o.innerHTML=p.map(u=>`<div class="source-item">${k(u)}</div>`).join(""):o.textContent="No specific sources cited in the answer."}else P.length>0?o.innerHTML='<div class="source-item">Sources available but not cited in answer</div>':typeof F=="number"?o.innerHTML=`<div class="source-item">Found ${F} sources (filenames not available - backend config issue)</div>`:o.textContent="No sources available"}catch(m){clearTimeout(y),Mn(m,s)}finally{H(!1),_e(null),A("runQueryBtn",!1),a&&(a.textContent="🔍 Ask Question")}}function ge(e){if(!e)return"";let t=e;t=t.replace(/Note on Context[\s\S]*?I will answer[^.]*\./gi,""),t=t.replace(/Context Note[\s\S]*?general knowledge[^.]*\./gi,""),t=t.replace(/The provided context discusses[\s\S]*?unrelated to[\s\S]*?\./gi,""),t=t.replace(/The (?:provided |available |indexed )?context (?:does not contain|lacks|is (?:unrelated|irrelevant))[\s\S]*?\./gi,""),t=t.replace(/I will answer your question based on (?:general |my )?knowledge[^.]*\./gi,""),t=t.replace(/Based on (?:general |my )?knowledge,?[^.]*\./gi,""),t=t.replace(/\(Remove this[^)]*\)/gi,""),t=t.replace(/\[Remove this[^\]]*\]/gi,""),[/I couldn't find any information[^.]*\./gi,/Please try a different search term[^.]*\./gi,/The indexed data may contain formatting issues[^.]*\./gi,/Note: This response is based on[^.]*\./gi,/Disclaimer:[^.]*\./gi,/I apologize, but[^.]*\./gi,/I don't see any information[^.]*\./gi,/There is no information[^.]*\./gi,/The context provided (?:does not|doesn't) (?:contain|have|discuss)[^.]*\./gi].forEach(i=>{t=t.replace(i,"")}),t=t.replace(/\n{3,}/g,`

`),t=t.replace(/^\s*\([^)]+\)\s*$/gmi,""),t=t.replace(/([A-Za-z])(\t+|\s{2,})([|⟨⟩])/g,"$1 $3"),t=t.replace(/(\))\t+|\s{2,}([|⟨⟩])/g,"$1 $2"),t=t.replace(/([|⟨⟩][^|⟨⟩]*?)(\t+|\s{2,})(?=\))/g,"$1"),t=t.replace(/\t+/g," "),t=t.replace(/\s{3,}/g," "),t=t.replace(/^# (.+)$/gm,'<strong class="query-h1">$1</strong>'),t=t.replace(/^## (.+)$/gm,'<strong class="query-h2">$1</strong>'),t=t.replace(/^### (.+)$/gm,'<strong class="query-h3">$1</strong>'),t=t.replace(/^#### (.+)$/gm,'<strong class="query-h4">$1</strong>'),t=t.replace(/(<strong class="query-h[1234]">[^<]+<\/strong>)(?:\s|<br>)*\1/gi,"$1");const s=t.split(`
`);let o=!1,a="";const r=[];for(let i=0;i<s.length;i++){const d=s[i],c=d.includes("|")&&(d.match(/\|/g)||[]).length>=2,g=/^\s*\|?[-:\s\|]+\|?\s*$/.test(d);if(c&&!g){o||(o=!0,a='<div class="query-table-container"><table class="query-table">');const h=d.split("|").map(y=>y.trim()).filter(y=>y);if(h.length>0){const y=i===0||i>0&&g&&i===1,f=y?"th":"td";a+=`<tr class="${y?"query-table-header":""}">${h.map(x=>`<${f}>${k(x)}</${f}>`).join("")}</tr>`}}else{if(g)continue;o&&(o=!1,a+="</table></div>",r.push(a),a=""),r.push(d)}}return o&&(a+="</table></div>",r.push(a)),t=r.join(`
`),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(/\*([^*]+)\*/g,"<em>$1</em>"),t=t.replace(/^- (.+)$/gm,"• $1"),t=t.replace(/^\* (.+)$/gm,"• $1"),t=t.replace(/^(\d+)\. (.+)$/gm,"$1. $2"),t=t.replace(/\n/g,"<br>"),t=t.replace(/(<br>){3,}/g,"<br><br>"),t}function ft(e){if(window.katex&&window.renderMathInElement)try{window.renderMathInElement(e,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1},{left:"\\[",right:"\\]",display:!0},{left:"\\(",right:"\\)",display:!1},{left:"\\begin{equation}",right:"\\end{equation}",display:!0},{left:"\\begin{align}",right:"\\end{align}",display:!0},{left:"\\begin{matrix}",right:"\\end{matrix}",display:!0}],throwOnError:!1,errorColor:"#cc0000",macros:{"\\RR":"\\mathbb{R}","\\NN":"\\mathbb{N}","\\ZZ":"\\mathbb{Z}"}})}catch(t){console.error("KaTeX rendering error:",t)}else setTimeout(()=>ft(e),500)}function Dn(e,t){var r;const n=e.match(/Found (\d+) relevant chunks/),s=n?n[1]:"some";let o="<h3>⚠️ LLM Processing Timed Out</h3>";o+=`<p>The AI processing timed out after 25 seconds. Showing ${s} raw text chunks instead:</p><hr>`;const a=e.indexOf(`

`);a>0?e.substring(a+2).split(`

`).forEach((c,g)=>{c.trim()&&(o+=`<h4>Chunk ${g+1}</h4><pre>${k(c)}</pre><hr>`)}):o+=`<pre>${k(e)}</pre>`,o+='<button id="retryQueryBtn" class="btn">🔄 Retry with Simpler Query</button>',t.innerHTML=o,(r=l("retryQueryBtn"))==null||r.addEventListener("click",()=>{var c;const i=((c=l("queryText"))==null?void 0:c.value)||"",d=i.replace(/explain|in detail|with examples|comprehensive|detailed/gi,"").trim();d&&d!==i?(l("queryText").value=d,me()):alert('Try a simpler, more specific query. Example: "What is Bayesian probability?"')})}function Mn(e,t){var n;console.error("Query error:",e),e instanceof Error?e.name==="AbortError"?t.textContent="⏰ Query was cancelled or timed out after 5 minutes.":e.message.includes("network")||e.message.includes("fetch")?(t.innerHTML='❌ Network error. <button id="retryErrorBtn" class="btn">Retry</button>',(n=l("retryErrorBtn"))==null||n.addEventListener("click",me)):t.textContent=`❌ Error: ${e.message}`:t.textContent="❌ Unknown error occurred"}function Qn(){return`
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
  `}const Hn="modulepreload",Nn=function(e,t){return new URL(e,t).href},He={},zn=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){const r=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),d=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=Promise.allSettled(n.map(c=>{if(c=Nn(c,s),c in He)return;He[c]=!0;const g=c.endsWith(".css"),h=g?'[rel="stylesheet"]':"";if(!!s)for(let m=r.length-1;m>=0;m--){const x=r[m];if(x.href===c&&(!g||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${h}`))return;const f=document.createElement("link");if(f.rel=g?"stylesheet":Hn,g||(f.as="script"),f.crossOrigin="",f.href=c,d&&f.setAttribute("nonce",d),document.head.appendChild(f),g)return new Promise((m,x)=>{f.addEventListener("load",m),f.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${c}`)))})}))}function a(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return o.then(r=>{for(const i of r||[])i.status==="rejected"&&a(i.reason);return t().catch(a)})};let te="",B=[];function Be(){const e=document.querySelector('input[name="queryFileDetail"]:checked');switch((e==null?void 0:e.value)||"balanced"){case"quick":return{top_k:10,ultra_comprehensive:!1,detailed:!1,label:"Quick"};case"ultra":return{top_k:40,ultra_comprehensive:!0,detailed:!0,label:"Ultra Deep"};case"comprehensive":return{top_k:30,ultra_comprehensive:!1,detailed:!0,label:"Comprehensive"};case"balanced":default:return{top_k:20,ultra_comprehensive:!1,detailed:!1,label:"Balanced"}}}function On(e){if(e==null||e.preventDefault(),e==null||e.stopPropagation(),!te){alert("No answer to print. Please run a query first.");return}const n=`<!DOCTYPE html>
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
  <div class="answer">${te.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/^# (.+)$/gm,'<div class="h1-bold">$1</div>').replace(/^## (.+)$/gm,'<div class="h2-bold">$1</div>').replace(/^### (.+)$/gm,'<div class="h3-bold">$1</div>').replace(/\n/g,"<br>")}</div>
</body>
</html>`,s=new Blob([n],{type:"text/html"}),o=URL.createObjectURL(s);if(!window.open(o,"_blank")){alert("Please allow popups to print the answer."),URL.revokeObjectURL(o);return}}function jn(){var e,t,n,s;(e=l("queryFileInput"))==null||e.addEventListener("change",Kn),(t=l("runQueryFileBtn"))==null||t.addEventListener("click",Gn),(n=l("exportQueryFilePdfBtn"))==null||n.addEventListener("click",o=>On(o)),(s=l("queryFileText"))==null||s.addEventListener("input",()=>{const o=l("exportQueryFilePdfBtn");o&&(o.style.display="none")})}function Kn(){var t;const e=l("queryFileInput");(t=e==null?void 0:e.files)!=null&&t.length&&(Array.from(e.files).forEach(n=>Et(n)),mt(),e.value="")}function mt(){ue(be(),{containerId:"querySelectedFilesList",onRemove:e=>{Tt(e),mt()},emptyText:"Selected files:"})}async function Wn(e,t=Be(),n,s){const{sendQuery:o}=await zn(async()=>{const{sendQuery:c}=await Promise.resolve().then(()=>Nt);return{sendQuery:c}},void 0,import.meta.url),a=new AbortController,i=t.ultra_comprehensive?6e5:t.detailed?3e5:18e4,d=setTimeout(()=>a.abort(),i);try{const c=await o({message:e,top_k:t.top_k,detailed:t.detailed,ultra_comprehensive:t.ultra_comprehensive},a.signal);clearTimeout(d);const g=c.response||c.answer||JSON.stringify(c);te=g,n&&(n.innerHTML=ge(g)),s&&(s.style.display="inline-block")}catch(c){clearTimeout(d),c instanceof Error&&c.name==="AbortError"?n&&(n.textContent="⏰ Query timed out. The LLM is taking too long."):n&&(n.textContent=`❌ Error: ${c instanceof Error?c.message:"Unknown error"}`)}}async function Ne(e,t,n=Be(),s,o){const a=new AbortController,i=n.ultra_comprehensive?6e5:n.detailed?3e5:18e4,d=setTimeout(()=>a.abort(),i);try{s&&(s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>Querying with ${t.length} existing file(s)...`);const c=await Le({message:e,filenames:t,top_k:n.top_k,detailed:n.detailed,ultra_comprehensive:n.ultra_comprehensive},a.signal);if(clearTimeout(d),c.response||c.answer){const g=c.response||c.answer||"",h=c.sources||c.source_documents;Array.isArray(h)?B=h.map(f=>typeof f=="string"?f:f&&typeof f=="object"?f.filename||f.doc_id||f.name||JSON.stringify(f):String(f)):B=[];let y=g;B.length>0&&(y+=`


## References

`,B.forEach((f,m)=>{y+=`${m+1}. ${f}
`})),te=y,s&&(s.innerHTML=ge(y)),o&&(o.style.display="inline-block")}else c.detail?s&&(s.textContent=`❌ Error: ${c.detail}`):s&&(s.textContent=JSON.stringify(c,null,2))}catch(c){clearTimeout(d),c instanceof Error&&c.name==="AbortError"?s&&(s.textContent="⏰ Query timed out after 5 minutes."):s&&(s.textContent=`❌ Error: ${c instanceof Error?c.message:"Unknown error"}`)}}async function Gn(){var i;const e=(i=l("queryFileText"))==null?void 0:i.value.trim();let t=be();if(!t.length||!e){alert("Please upload file(s) and enter a question");return}const n=Be();H(!0);const s=l("queryFileAnswer"),o=l("exportQueryFilePdfBtn");console.log("[QueryFile] Starting query, exportBtn:",o),j("queryFileResult",!0),o&&(o.style.display="none",console.log("[QueryFile] Button hidden"));const a=n.ultra_comprehensive,r=a?"5-8 min":n.detailed?"3-5 min":"2-3 min";s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>Processing with ${n.top_k} chunks...<br>Estimated time: ${r}`;try{const{duplicates:d,newFiles:c,duplicateDocIds:g}=await Ie(t);if(d.length>0)if(t.length===1){if(!confirm(`File "${k(d[0])}" already exists. Click OK to overwrite, Cancel to use existing file.`)){s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>📄 Using existing file...`,qe(),await Ne(e,d,n,s,o),H(!1);return}}else{const $=k(d.join(", ")),F=k(c.map(u=>u.name).join(", "));if(!(c.length>0?confirm(`Found ${d.length} existing: ${$}

New: ${F}

Click OK to upload all, Cancel to skip duplicates and use existing files.`):confirm(`All ${d.length} exist: ${$}

Click OK to overwrite all, Cancel to use existing files.`))){if(c.length===0){s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>📄 Using ${d.length} existing file(s)...`,qe(),await Ne(e,d,n,s,o),H(!1);return}t=c}}if(t.length===0&&d.length===0){await Wn(e,n,s,o),H(!1);return}const h=[];for(let $=0;$<t.length;$++){const F=t[$];s.textContent=`📤 Uploading ${$+1}/${t.length}: ${k(F.name)}...`;try{const p=await de(F);p.doc_id&&h.push({filename:F.name,doc_id:p.doc_id})}catch(p){console.error(`Upload failed for ${F.name}:`,p)}}if(h.length===0){s.textContent="❌ Upload failed. No files were uploaded.",H(!1);return}await Jn(h,s);const y=h.map($=>$.filename),f=g&&t.length<be().length?d.filter($=>!y.includes($)):[],m=[...y,...f];s.innerHTML=`<span class="spinner"></span> <strong>${n.label} Mode</strong><br>Querying with ${m.length} file(s)...`;const x=new AbortController,v=a?6e5:n.detailed?3e5:18e4,S=setTimeout(()=>x.abort(),v),T=await Le({message:e,filenames:m,top_k:n.top_k,detailed:n.detailed,ultra_comprehensive:n.ultra_comprehensive},x.signal);if(clearTimeout(S),T.response||T.answer){const $=T.response||T.answer||"",F=T.sources||T.source_documents;console.log("[QueryFile] Raw sources:",F),Array.isArray(F)?B=F.map(u=>typeof u=="string"?u:u&&typeof u=="object"?u.filename||u.doc_id||u.name||JSON.stringify(u):String(u)):B=[],console.log("[QueryFile] Processed sources:",B);let p=$;B.length>0?(p+=`


## References

`,B.forEach((u,E)=>{p+=`${E+1}. ${u}
`})):typeof F=="number"&&F>0&&(p+=`


## References

`,p+=`This answer was generated from ${F} source documents.
`,p+="(Source filenames not available from backend API.)"),te=p,s.innerHTML=ge(p),o&&(o.style.display="inline-block",console.log("[QueryFile] Button shown"))}else T.detail?s.textContent=`❌ Error: ${T.detail}`:s.textContent=JSON.stringify(T,null,2)}catch(d){console.error("Query with file failed:",d),d instanceof Error&&d.name==="AbortError"?s.textContent="⏰ Query timed out after 5 minutes.":s.textContent=`❌ Error: ${d instanceof Error?d.message:"Unknown error"}`}finally{H(!1)}}async function Jn(e,t){let n=!1,s=0;for(;!n&&s<30;){const o=Ot(s,1e3,5e3);await new Promise(r=>setTimeout(r,o)),s++;let a=0;for(const r of e){const i=await Ye(r.doc_id);(i!=null&&i.indexed||i!=null&&i.ready||i!=null&&i.chunks&&i.chunks>0)&&a++}if(t.textContent=`⏳ Indexing... (${s}s) - ${a}/${e.length} ready`,a===e.length){n=!0;break}}n?t.textContent="✅ Files indexed! Now querying...":t.textContent="⚠️ Indexing in progress, but proceeding with query..."}function Yn(){return`
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
  `}function Xn(){var e,t,n;(e=l("testConnectionBtn"))==null||e.addEventListener("click",Vn),(t=l("refreshConnectionBtn"))==null||t.addEventListener("click",Zn),(n=l("clearDatabaseBtn"))==null||n.addEventListener("click",es)}async function Vn(){const e=l("configStatus"),t=l("systemInfo");e.textContent="Testing...";try{const n=await et();Z("configStatus",'<span class="success">✅ Connected!</span>'),j("systemInfo",!0),t.textContent=JSON.stringify(n,null,2)}catch(n){const s=n instanceof Error?n.message:"Unknown error";Z("configStatus",`<span class="error">❌ Connection failed: ${s}</span>`)}}function Zn(){Ee();const e=l("runQueryBtn");e&&(e.disabled=!1,e.textContent="🔍 Ask Question"),Z("configStatus",'<span class="success">✅ Connection state refreshed.</span>')}async function es(){const e=l("clearStatus");if(confirm("Are you sure you want to clear ALL data? This cannot be undone!")){e.textContent="Clearing database...";try{await tt(),await q(),Z("clearStatus",'<span class="success">✅ Database cleared!</span>')}catch(t){const n=t instanceof Error?t.message:"Unknown error";Z("clearStatus",`<span class="error">❌ Error: ${n}</span>`)}}}function ts(){return`
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
  `}function ns(e,t="info",n={}){const{duration:s=4e3,dismissible:o=!0}=n;document.querySelectorAll(`.toast-container .toast.${t}`).forEach(c=>c.remove());let r=document.querySelector(".toast-container");r||(r=document.createElement("div"),r.className="toast-container",r.setAttribute("role","region"),r.setAttribute("aria-label","Notifications"),r.setAttribute("aria-live","polite"),document.body.appendChild(r));const i=document.createElement("div");i.className=`toast toast-${t}`,i.setAttribute("role","alert"),i.setAttribute("aria-live","assertive");const d={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"};if(i.innerHTML=`
    <span class="toast-icon">${d[t]}</span>
    <span class="toast-message">${ss(e)}</span>
    ${o?'<button class="toast-close" aria-label="Dismiss notification">×</button>':""}
  `,o){const c=i.querySelector(".toast-close");c==null||c.addEventListener("click",()=>ze(i))}return r.appendChild(i),requestAnimationFrame(()=>{i.classList.add("toast-show")}),s>0&&setTimeout(()=>ze(i),s),i.setAttribute("tabindex","-1"),i.focus(),i}function ze(e){e.classList.remove("toast-show"),e.classList.add("toast-hide"),e.addEventListener("transitionend",()=>{e.remove();const t=document.querySelector(".toast-container");t&&t.children.length===0&&t.remove()},{once:!0})}function Oe(e,t){ns(e,"error",t)}function ss(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function os(){window.onerror=(e,t,n,s,o)=>{const a=o instanceof Error?`${o.message}
${o.stack}`:String(e);console.error("🚨 Global Error:",{message:a,source:t,lineno:n,colno:s,error:o});const r=o instanceof Error?o.message:"An unexpected error occurred";return Oe(`Error: ${r}`,{duration:6e3}),!1},window.onunhandledrejection=e=>{const t=e.reason,n=t instanceof Error?`${t.message}
${t.stack}`:String(t);console.error("🚨 Unhandled Promise Rejection:",{reason:n,promise:e.promise});const s=t instanceof Error?t.message:"An unexpected error occurred";Oe(`Async Error: ${s}`,{duration:6e3})},console.log("✅ Global error handlers initialized")}function as(){if(document.getElementById("toast-styles"))return;const e=document.createElement("style");e.id="toast-styles",e.textContent=`
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
  `,document.head.appendChild(e)}function is(){as(),os()}function rs(){const e=l("uploadActivityIndicator");if(!e)return;const t=Mt();e.style.display=t?"flex":"none"}let ce=null;function ls(){ce||(ce=window.setInterval(rs,1e3))}function cs(){console.log("🧠 LightRAG WebUI initializing..."),is(),ds(),_t(),Dt("ingestProgress"),kn(),qn(),jn(),Xn(),us(),ps(),Ft(setInterval(q,ht)),ls(),window.addEventListener("beforeunload",()=>{Lt(),un(),ce&&clearInterval(ce)}),console.log("✅ LightRAG WebUI ready")}function ds(){const e=l("app");e&&(e.innerHTML=`
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
      ${Bn()}
      ${Qn()}
      ${Yn()}
      ${ts()}
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
  `)}function us(){const e=document.querySelectorAll(".tab");e.forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-tab");n&&(e.forEach(s=>{s.classList.remove("active"),s.setAttribute("aria-selected","false")}),t.classList.add("active"),t.setAttribute("aria-selected","true"),bt(n))})})}function ps(){document.addEventListener("keydown",e=>{var t;if(e.key==="Tab"&&document.body.classList.add("keyboard-mode"),e.key==="Escape"&&document.activeElement instanceof HTMLElement&&document.activeElement.blur(),(e.key==="Enter"||e.key===" ")&&((t=document.activeElement)!=null&&t.matches('button, [role="button"]'))){const n=document.activeElement;n.disabled||(n.classList.add("keyboard-activated"),setTimeout(()=>n.classList.remove("keyboard-activated"),150))}}),document.addEventListener("mousedown",()=>{document.body.classList.remove("keyboard-mode")}),document.addEventListener("click",e=>{var n;const t=e.target;t.classList.contains("toast-close")&&((n=t.closest(".toast"))==null||n.remove())},{capture:!0}),console.log("✅ Keyboard navigation initialized")}document.addEventListener("DOMContentLoaded",cs);
//# sourceMappingURL=index-mFr59C7j.js.map
