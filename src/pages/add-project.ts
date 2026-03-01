export function addProjectPage(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Add Project — Portfolio Manager</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { background: #0a0a1a; color: #e2e8f0; font-family: system-ui, sans-serif; margin: 0; }
    .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 1.5rem; }
    .form-group { margin-bottom: 1rem; }
    label { display: block; font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.4rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    input, textarea, select {
      width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 0.5rem; padding: 0.6rem 0.875rem; color: #e2e8f0; font-size: 0.875rem; outline: none;
      transition: border-color 0.2s;
    }
    input:focus, textarea:focus, select:focus { border-color: rgba(139,92,246,0.5); }
    .required { color: #ef4444; }
    .section-title { font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
  </style>
</head>
<body>
<nav style="background: rgba(10,10,26,0.95); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0 1.5rem; height: 60px; display: flex; align-items: center; gap: 1rem; position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px);">
  <a href="/" style="color: #64748b; font-size: 0.875rem; text-decoration: none;"><i class="fas fa-arrow-left"></i> Back</a>
  <span style="color: #334155;">|</span>
  <span style="font-weight: 700; color: white;">Add New Project</span>
</nav>

<div style="max-width: 900px; margin: 2rem auto; padding: 0 1.5rem;">
  <div style="margin-bottom: 2rem;">
    <h1 style="font-size: 1.5rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">
      <i class="fas fa-plus-circle" style="color: #8b5cf6;"></i> New Blockchain Project
    </h1>
    <p style="color: #64748b; font-size: 0.875rem;">Fill in the required fields below. Fields marked with <span style="color: #ef4444;">*</span> are mandatory.</p>
  </div>

  <form onsubmit="handleAdd(event)">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
      
      <!-- Identity -->
      <div class="card">
        <div class="section-title"><i class="fas fa-id-card" style="color: #3b82f6;"></i> Project Identity</div>
        <div class="form-group"><label>Project Name <span class="required">*</span></label><input type="text" id="proj-name" placeholder="e.g. AILINK" required></div>
        <div class="form-group"><label>Codename <span class="required">*</span></label><input type="text" id="proj-codename" placeholder="e.g. ailink-web"></div>
        <div class="form-group"><label>Version</label><input type="text" id="proj-version" placeholder="e.g. v1.0.0" value="v1.0.0"></div>
        <div class="form-group"><label>Status <span class="required">*</span></label>
          <select id="proj-status">
            <option value="active">Active</option>
            <option value="dev">In Development</option>
            <option value="planned">Planned</option>
          </select>
        </div>
        <div class="form-group"><label>Category</label><input type="text" id="proj-category" placeholder="e.g. DeFi + AI"></div>
        <div class="form-group"><label>Description <span class="required">*</span></label><textarea id="proj-desc" rows="3" placeholder="One sentence description of your project"></textarea></div>
      </div>

      <!-- Token -->
      <div class="card">
        <div class="section-title"><i class="fas fa-coins" style="color: #fbbf24;"></i> Token Information</div>
        <div class="form-group"><label>Token Symbol <span class="required">*</span></label><input type="text" id="proj-token" placeholder="e.g. ALINK"></div>
        <div class="form-group"><label>Total Supply <span class="required">*</span></label><input type="text" id="proj-supply" placeholder="e.g. 20,000,000,000"></div>
        <div class="form-group"><label>Blockchain <span class="required">*</span></label>
          <select id="proj-chain">
            <option value="BNB Chain">BNB Chain</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
            <option value="Solana">Solana</option>
            <option value="Avalanche">Avalanche</option>
          </select>
        </div>
        <div class="form-group"><label>Contract Address</label><input type="text" id="proj-contract" placeholder="0x..."></div>
        <div class="form-group"><label>TGE Date <span class="required">*</span></label><input type="text" id="proj-tge" placeholder="e.g. Q4 2025"></div>
        <div class="form-group"><label>DEX Listing</label><input type="text" id="proj-dex" placeholder="e.g. PancakeSwap"></div>
      </div>

      <!-- URLs -->
      <div class="card">
        <div class="section-title"><i class="fas fa-link" style="color: #8b5cf6;"></i> URLs & Social</div>
        <div class="form-group"><label>Production URL <span class="required">*</span></label><input type="url" id="proj-url-prod" placeholder="https://yourproject.xyz"></div>
        <div class="form-group"><label>Cloudflare Pages URL</label><input type="url" id="proj-url-pages" placeholder="https://project.pages.dev"></div>
        <div class="form-group"><label>GitHub Repository <span class="required">*</span></label><input type="url" id="proj-url-github" placeholder="https://github.com/..."></div>
        <div class="form-group"><label>Twitter/X</label><input type="url" id="proj-url-twitter" placeholder="https://x.com/..."></div>
        <div class="form-group"><label>Telegram</label><input type="url" id="proj-url-telegram" placeholder="https://t.me/..."></div>
      </div>

      <!-- Deployment -->
      <div class="card">
        <div class="section-title"><i class="fas fa-rocket" style="color: #ec4899;"></i> Deployment</div>
        <div class="form-group"><label>Deploy Platform</label><input type="text" id="proj-platform" value="Cloudflare Pages" readonly style="color: #64748b;"></div>
        <div class="form-group"><label>Build Command</label><input type="text" id="proj-build" value="npm run build"></div>
        <div class="form-group"><label>Output Directory</label><input type="text" id="proj-output" value="dist/"></div>
        <div class="form-group"><label>Cloudflare Project Name</label><input type="text" id="proj-cf-name" placeholder="e.g. my-project"></div>
        <div class="form-group"><label>Completion % <span class="required">*</span></label><input type="range" id="proj-progress" min="0" max="100" value="10" oninput="document.getElementById('pct').textContent=this.value+'%'"><div style="text-align: center; color: #8b5cf6; font-weight: 600; margin-top: 4px;" id="pct">10%</div></div>
        <div class="form-group"><label>Accent Color</label><input type="color" id="proj-color" value="#3b82f6" style="height: 40px; cursor: pointer;"></div>
      </div>
    </div>

    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <a href="/" style="padding: 0.75rem 1.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 0.5rem; color: #94a3b8; font-size: 0.875rem; text-decoration: none;">Cancel</a>
      <button type="submit" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 0.75rem 2rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer;">
        <i class="fas fa-plus"></i> Add Project
      </button>
    </div>
  </form>
</div>

<div id="toast" style="position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px); background: rgba(34,197,94,0.9); color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 600; transition: transform 0.3s; z-index: 1000; pointer-events: none;">
  <i class="fas fa-check"></i> Project template generated!
</div>

<script>
function handleAdd(e) {
  e.preventDefault();
  const name = document.getElementById('proj-name').value;
  const toast = document.getElementById('toast');
  toast.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    // In a real system, this would save to D1 or KV
    alert('프로젝트 "' + name + '" 템플릿이 생성되었습니다.\\n실제 저장 기능은 Cloudflare D1 연동 후 사용 가능합니다.');
  }, 2000);
}
</script>
</body>
</html>`
}
