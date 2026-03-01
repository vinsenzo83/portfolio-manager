export function dashboardPage(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blockchain Portfolio Manager</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0a1a; color: #e2e8f0; font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; }
    
    /* Tree structure */
    .tree-container { position: relative; }
    .tree-root { display: flex; flex-direction: column; align-items: center; }
    .tree-node { position: relative; }
    .tree-children { display: flex; gap: 2rem; justify-content: center; position: relative; }
    .tree-children::before {
      content: '';
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 8rem);
      height: 2px;
      background: linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent);
    }
    .tree-connector {
      width: 2px;
      height: 2rem;
      background: linear-gradient(180deg, #3b82f6, #8b5cf6);
      margin: 0 auto;
    }
    .tree-branch {
      position: relative;
    }
    .tree-branch::before {
      content: '';
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 1rem;
      background: linear-gradient(180deg, #3b82f6, #8b5cf6);
    }

    /* Cards */
    .root-card {
      background: linear-gradient(135deg, #1e1b4b, #312e81);
      border: 2px solid rgba(139,92,246,0.5);
      border-radius: 1rem;
      padding: 1.5rem 3rem;
      text-align: center;
      position: relative;
      box-shadow: 0 0 30px rgba(139,92,246,0.3);
    }
    .project-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 1rem;
      padding: 1.5rem;
      transition: all 0.3s ease;
      cursor: pointer;
      width: 320px;
      position: relative;
      overflow: hidden;
    }
    .project-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--card-color, #3b82f6);
    }
    .project-card:hover {
      transform: translateY(-4px);
      border-color: rgba(255,255,255,0.2);
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .status-active { background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
    .status-dev { background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
    .status-planned { background: rgba(148,163,184,0.15); color: #94a3b8; border: 1px solid rgba(148,163,184,0.3); }

    .progress-bar { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.1); overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }

    /* Stats */
    .stat-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 0.75rem;
      padding: 1.25rem;
      text-align: center;
    }

    /* Sidebar */
    .sidebar { background: rgba(255,255,255,0.03); border-right: 1px solid rgba(255,255,255,0.08); }
    
    /* Common features badge */
    .feature-tag {
      display: inline-block;
      padding: 3px 10px;
      background: rgba(59,130,246,0.15);
      border: 1px solid rgba(59,130,246,0.3);
      border-radius: 999px;
      font-size: 0.72rem;
      color: #93c5fd;
      margin: 2px;
    }

    /* Glow effect */
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.3); }
      50% { box-shadow: 0 0 40px rgba(139,92,246,0.6); }
    }
    .root-card { animation: pulse-glow 3s ease-in-out infinite; }

    /* Nav */
    .nav-link { transition: all 0.2s; padding: 0.5rem 1rem; border-radius: 0.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #94a3b8; }
    .nav-link:hover, .nav-link.active { background: rgba(255,255,255,0.08); color: #e2e8f0; }

    /* Template section */
    .required-field {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1rem;
      border-radius: 0.5rem;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      font-size: 0.85rem;
      color: #cbd5e1;
    }
    .required-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

    /* Responsive */
    @media (max-width: 768px) {
      .tree-children { flex-direction: column; align-items: center; gap: 1rem; }
      .tree-children::before { width: 2px; height: calc(100% - 2rem); top: 1rem; left: 50%; transform: none; }
      .project-card { width: 100%; max-width: 360px; }
    }

    .tab-btn { padding: 0.5rem 1.25rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; color: #94a3b8; border: 1px solid transparent; cursor: pointer; }
    .tab-btn.active { background: rgba(59,130,246,0.2); border-color: rgba(59,130,246,0.4); color: #93c5fd; }

    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    @media (max-width: 900px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .grid-3 { grid-template-columns: 1fr; } }

    /* ══ SHEET STYLES ══ */
    .sh-toolbar {
      display: flex; align-items: center; gap: .6rem; flex-wrap: wrap;
      padding: .75rem 1rem; background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.07); border-radius: .6rem;
      margin-bottom: .75rem;
    }
    .sh-search {
      display: flex; align-items: center; gap: .4rem;
      background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
      border-radius: .4rem; padding: .3rem .7rem; flex: 1; min-width: 200px; max-width: 280px;
    }
    .sh-search input { background: none; border: none; outline: none; color: #e2e8f0; font-size: .8rem; width: 100%; }
    .sh-search input::placeholder { color: #475569; }
    .sh-search i { color: #475569; font-size: .75rem; }
    .sh-sel {
      background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
      border-radius: .4rem; padding: .3rem .6rem; color: #e2e8f0; font-size: .78rem; outline: none; cursor: pointer;
    }
    .sh-btn-primary {
      background: linear-gradient(135deg,#6366f1,#8b5cf6); color: white;
      padding: .32rem .9rem; border-radius: .4rem; font-size: .78rem; font-weight: 600;
      border: none; cursor: pointer; display: flex; align-items: center; gap: .35rem;
    }
    .sh-btn-ghost {
      background: rgba(255,255,255,.06); color: #e2e8f0;
      border: 1px solid rgba(255,255,255,.1);
      padding: .32rem .9rem; border-radius: .4rem; font-size: .78rem; cursor: pointer;
      display: flex; align-items: center; gap: .35rem;
    }
    .sh-stats { display: flex; gap: 1rem; margin-left: auto; flex-wrap: wrap; }
    .sh-stat { text-align: center; }
    .sh-sn { font-size: .95rem; font-weight: 700; }
    .sh-sl { font-size: .62rem; color: #64748b; text-transform: uppercase; letter-spacing: .04em; }

    .sh-wrap { overflow-x: auto; overflow-y: auto; max-height: calc(100vh - 180px); border-radius: .5rem; border: 1px solid rgba(255,255,255,.07); }
    .sh-table { border-collapse: collapse; width: 100%; }
    .sh-table thead { position: sticky; top: 0; z-index: 10; }
    .sh-grp th {
      background: #0d0d20; padding: .35rem .6rem; font-size: .67rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .06em; text-align: center;
      border: 1px solid rgba(255,255,255,.06);
    }
    .sh-table thead tr:last-child th {
      background: #111124; padding: .4rem .6rem; font-size: .69rem; font-weight: 600;
      white-space: nowrap; border: 1px solid rgba(255,255,255,.06); color: #94a3b8;
    }
    .sh-tr td {
      padding: .38rem .6rem; font-size: .75rem; border: 1px solid rgba(255,255,255,.05);
      white-space: nowrap; background: #0a0a1a; color: #e2e8f0;
    }
    .sh-tr:hover td { background: rgba(99,102,241,.06); }
    .sh-sold-r td { opacity: .55; }
    .sh-badge {
      display: inline-block; padding: 2px 8px; border-radius: 99px;
      font-size: .65rem; font-weight: 700; border: 1px solid transparent;
    }
    .sh-green { background: rgba(34,197,94,.15); color: #4ade80; border-color: rgba(34,197,94,.3); }
    .sh-red   { background: rgba(239,68,68,.15);  color: #f87171; border-color: rgba(239,68,68,.3); }
    .sh-link  { color: #93c5fd; text-decoration: none; font-size: .73rem; }
    .sh-link:hover { text-decoration: underline; }
    .sh-pw {
      cursor: pointer; font-family: monospace; font-size: .75rem;
      color: #6366f1; border-bottom: 1px dashed #6366f150;
    }
    .sh-act { display: flex; gap: .3rem; }
    .sh-btn-e, .sh-btn-d {
      padding: .22rem .5rem; border-radius: .3rem; border: 1px solid transparent;
      font-size: .7rem; cursor: pointer; line-height: 1;
    }
    .sh-btn-e { background: rgba(99,102,241,.15); color: #a5b4fc; border-color: rgba(99,102,241,.3); }
    .sh-btn-d { background: rgba(239,68,68,.12);  color: #f87171; border-color: rgba(239,68,68,.25); }
    .sh-btn-e:hover { background: rgba(99,102,241,.3); }
    .sh-btn-d:hover { background: rgba(239,68,68,.3); }

    /* ── MODAL ── */
    .sh-modal-bg {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,.75);
      z-index: 9000; align-items: center; justify-content: center;
    }
    .sh-modal-bg.open { display: flex; }
    .sh-modal-box {
      background: #131326; border: 1px solid rgba(255,255,255,.12); border-radius: .75rem;
      width: 96%; max-width: 700px; max-height: 90vh;
      display: flex; flex-direction: column; box-shadow: 0 30px 80px rgba(0,0,0,.6);
    }
    .sh-modal-head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .sh-modal-body {
      padding: 1rem 1.25rem; overflow-y: auto; flex: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: .65rem;
    }
    .sh-field label { display: block; font-size: .72rem; color: #94a3b8; margin-bottom: .25rem; font-weight: 500; }
    .sh-field-group-head {
      grid-column: 1/-1; font-size: .7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: .08em; padding: .4rem 0 .2rem; border-bottom: 1px solid rgba(255,255,255,.07);
      margin-top: .3rem;
    }
    .sh-field input, .sh-field select {
      width: 100%; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
      border-radius: .35rem; padding: .35rem .6rem; color: #e2e8f0; font-size: .8rem; outline: none;
    }
    .sh-field input:focus, .sh-field select:focus { border-color: #6366f1; }
    .sh-modal-foot {
      display: flex; justify-content: flex-end; gap: .5rem;
      padding: .85rem 1.25rem; border-top: 1px solid rgba(255,255,255,.08);
    }

    /* ── TOAST ── */
    .sh-toast {
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(20px);
      background: #1e1e38; border: 1px solid rgba(99,102,241,.4); color: #e2e8f0;
      padding: .6rem 1.4rem; border-radius: .5rem; font-size: .82rem; font-weight: 500;
      opacity: 0; transition: all .3s; pointer-events: none; z-index: 9999; white-space: nowrap;
    }
    .sh-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
    .sh-toast.err  { border-color: rgba(239,68,68,.4); color: #f87171; }
  </style>
</head>
<body>

<!-- ====== PASSWORD GATE ====== -->
<div id="pw-gate" style="display:none;position:fixed;inset:0;background:#0a0a1a;z-index:99999;display:flex;align-items:center;justify-content:center;">
  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(139,92,246,0.4);border-radius:1.25rem;padding:2.5rem 2rem;width:100%;max-width:380px;text-align:center;box-shadow:0 0 60px rgba(139,92,246,0.2);">
    <div style="width:56px;height:56px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;">
      <i class="fas fa-lock" style="color:white;font-size:1.4rem;"></i>
    </div>
    <div style="font-size:1.3rem;font-weight:800;color:white;margin-bottom:0.4rem;">Blockchain Portfolio</div>
    <div style="font-size:0.85rem;color:#64748b;margin-bottom:1.75rem;">비밀번호를 입력하세요</div>
    <input id="pw-input" type="password" placeholder="Password"
      style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:0.6rem;padding:0.7rem 1rem;color:#e2e8f0;font-size:0.95rem;outline:none;margin-bottom:0.75rem;text-align:center;letter-spacing:0.15em;"
      onkeydown="if(event.key==='Enter')pwLogin()">
    <div id="pw-err" style="display:none;color:#f87171;font-size:0.8rem;margin-bottom:0.6rem;"><i class="fas fa-exclamation-circle"></i> 비밀번호가 틀렸습니다</div>
    <button onclick="pwLogin()"
      style="width:100%;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:white;border:none;border-radius:0.6rem;padding:0.75rem;font-size:0.95rem;font-weight:700;cursor:pointer;">
      <i class="fas fa-sign-in-alt"></i> 입력
    </button>
  </div>
</div>

<!-- ====== MAIN CONTENT (hidden until login) ====== -->
<div id="main-wrap" style="display:none;">
<nav style="background: rgba(10,10,26,0.95); border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px);">
  <div style="max-width: 100%; margin: 0 auto; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; height: 60px;">
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
        <i class="fas fa-sitemap" style="color: white; font-size: 0.875rem;"></i>
      </div>
      <span style="font-weight: 700; font-size: 1rem; background: linear-gradient(135deg, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Blockchain Portfolio Manager</span>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <span style="font-size: 0.8rem; color: #64748b;">by vinsenzo83</span>
      <a href="/add" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 0.4rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 0.4rem;">
        <i class="fas fa-plus"></i> Add Project
      </a>
    </div>
  </div>
</nav>

<!-- Main Layout -->
<div style="max-width: 100%; margin: 0 auto; padding: 1rem 1rem;">

  <!-- Tab Navigation -->
  <div style="display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap;" id="tab-nav">
    <button class="tab-btn active" id="tbtn-tree" onclick="showTab('tree',this)"><i class="fas fa-sitemap mr-1"></i> Tree View</button>
    <button class="tab-btn" id="tbtn-grid" onclick="showTab('grid',this)"><i class="fas fa-th-large mr-1"></i> Grid View</button>
    <button class="tab-btn" id="tbtn-sheet" onclick="showTab('sheet',this)"><i class="fas fa-table mr-1"></i> Sheet</button>
    <button class="tab-btn" id="tbtn-common" onclick="showTab('common',this)"><i class="fas fa-layer-group mr-1"></i> Common Features</button>
    <button class="tab-btn" id="tbtn-required" onclick="showTab('required',this)"><i class="fas fa-clipboard-check mr-1"></i> Required Fields</button>
    <a href="/template" class="tab-btn" style="text-decoration: none;"><i class="fas fa-file-code mr-1"></i> README Template</a>
  </div>

  <!-- ============ TREE VIEW ============ -->
  <div id="tab-tree" class="tab-content">
    <!-- Overview Stats -->
    <div class="grid-3" style="margin-bottom: 2rem;">
      <div class="stat-card">
        <div style="font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">2</div>
        <div style="color: #94a3b8; font-size: 0.8rem; margin-top: 0.25rem;">Active Projects</div>
      </div>
      <div class="stat-card">
        <div style="font-size: 2rem; font-weight: 800; color: #22c55e;">28.9B</div>
        <div style="color: #94a3b8; font-size: 0.8rem; margin-top: 0.25rem;">Total Token Supply</div>
      </div>
      <div class="stat-card">
        <div style="font-size: 2rem; font-weight: 800; color: #fbbf24;">Q4 2025</div>
        <div style="color: #94a3b8; font-size: 0.8rem; margin-top: 0.25rem;">Next TGE Date</div>
      </div>
    </div>

    <!-- Tree Diagram -->
    <div class="tree-container" style="padding: 2rem 0;">
      
      <!-- Root Node -->
      <div class="tree-root">
        <div class="root-card">
          <div style="font-size: 0.75rem; color: #a78bfa; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">Project Owner</div>
          <div style="font-size: 1.5rem; font-weight: 800; color: white;">vinsenzo83</div>
          <div style="font-size: 0.85rem; color: #a78bfa; margin-top: 0.25rem;">Blockchain Portfolio</div>
          <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 0.75rem; flex-wrap: wrap;">
            <span style="background: rgba(34,197,94,0.15); color: #22c55e; padding: 2px 8px; border-radius: 999px; font-size: 0.7rem;">BNB Chain</span>
            <span style="background: rgba(59,130,246,0.15); color: #93c5fd; padding: 2px 8px; border-radius: 999px; font-size: 0.7rem;">Cloudflare Pages</span>
            <span style="background: rgba(168,85,247,0.15); color: #c4b5fd; padding: 2px 8px; border-radius: 999px; font-size: 0.7rem;">Hono Framework</span>
          </div>
        </div>

        <!-- Connector -->
        <div class="tree-connector"></div>

        <!-- Children -->
        <div class="tree-children">
          
          <!-- AILINK Branch -->
          <div class="tree-branch">
            <a href="/project/ailink" style="text-decoration: none;">
              <div class="project-card" style="--card-color: #3b82f6;" onclick="">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                  <div>
                    <div style="font-size: 1.1rem; font-weight: 700; color: white;">AILINK</div>
                    <div style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">ailink-web · v2.0.0</div>
                  </div>
                  <span class="status-badge status-active">
                    <span style="width: 6px; height: 6px; background: #22c55e; border-radius: 50%;"></span>
                    Active
                  </span>
                </div>
                
                <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 1rem; line-height: 1.5;">AI-powered blockchain ecosystem with DeFi, Gaming, and Social features</div>
                
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                  <span class="feature-tag"><i class="fas fa-coins"></i> ALINK</span>
                  <span class="feature-tag">20B Supply</span>
                  <span class="feature-tag">DeFi + AI</span>
                </div>

                <div style="margin-bottom: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; margin-bottom: 4px;">
                    <span>Progress</span><span>72%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 72%; background: linear-gradient(90deg, #3b82f6, #60a5fa);"></div>
                  </div>
                </div>

                <div style="display: flex; gap: 0.5rem; font-size: 0.75rem;">
                  <a href="https://aichainlabs.xyz" target="_blank" style="color: #3b82f6; text-decoration: none;"><i class="fas fa-globe"></i> aichainlabs.xyz</a>
                  <span style="color: #334155;">·</span>
                  <span style="color: #64748b;">9 pages</span>
                  <span style="color: #334155;">·</span>
                  <span style="color: #64748b;">TGE Q4 2025</span>
                </div>

                <!-- Sub-pages tree -->
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06);">
                  <div style="font-size: 0.7rem; color: #64748b; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Pages</div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px;">
                    ${[['/', 'Home'], ['/login', 'Login'], ['/signup', 'Sign Up'], ['/mypage', 'Dashboard'], ['/vesting', 'Vesting'], ['/whitepaper', 'Whitepaper']].map(([path, name]) => `
                    <div style="font-size: 0.7rem; color: #94a3b8; padding: 2px 4px; display: flex; align-items: center; gap: 4px;">
                      <span style="color: #22c55e; font-size: 0.6rem;">●</span> ${name}
                    </div>`).join('')}
                  </div>
                </div>
              </div>
            </a>
          </div>

          <!-- DaVinci Branch -->
          <div class="tree-branch">
            <a href="/project/davinci" style="text-decoration: none;">
              <div class="project-card" style="--card-color: #8b5cf6;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                  <div>
                    <div style="font-size: 1.1rem; font-weight: 700; color: white;">DaVinci AI</div>
                    <div style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">davinci-ai · v3.5.0</div>
                  </div>
                  <span class="status-badge status-active">
                    <span style="width: 6px; height: 6px; background: #22c55e; border-radius: 50%;"></span>
                    Active
                  </span>
                </div>
                
                <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 1rem; line-height: 1.5;">Web3-native AI agent creative platform with NFT Marketplace and DAO governance</div>
                
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                  <span class="feature-tag"><i class="fas fa-coins"></i> DAVINCI</span>
                  <span class="feature-tag">8.88B Supply</span>
                  <span class="feature-tag">AI + NFT</span>
                </div>

                <div style="margin-bottom: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; margin-bottom: 4px;">
                    <span>Progress</span><span>68%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 68%; background: linear-gradient(90deg, #8b5cf6, #a78bfa);"></div>
                  </div>
                </div>

                <div style="display: flex; gap: 0.5rem; font-size: 0.75rem;">
                  <a href="https://davinciai.io" target="_blank" style="color: #8b5cf6; text-decoration: none;"><i class="fas fa-globe"></i> davinciai.io</a>
                  <span style="color: #334155;">·</span>
                  <span style="color: #64748b;">7 pages</span>
                  <span style="color: #334155;">·</span>
                  <span style="color: #64748b;">TGE Q4 2025</span>
                </div>

                <!-- Sub-pages tree -->
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06);">
                  <div style="font-size: 0.7rem; color: #64748b; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Pages</div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px;">
                    ${[['/', 'Home'], ['/login', 'Login'], ['/agents', 'AI Agents'], ['/create/image', 'Image Studio'], ['/create/video', 'Video Lab'], ['/mypage', 'My Page']].map(([path, name]) => `
                    <div style="font-size: 0.7rem; color: #94a3b8; padding: 2px 4px; display: flex; align-items: center; gap: 4px;">
                      <span style="color: #22c55e; font-size: 0.6rem;">●</span> ${name}
                    </div>`).join('')}
                  </div>
                </div>
              </div>
            </a>
          </div>

        </div><!-- end tree-children -->

        <!-- Future Project slot -->
        <div style="margin-top: 2rem; display: flex; justify-content: center;">
          <a href="/add" style="text-decoration: none;">
            <div style="border: 2px dashed rgba(255,255,255,0.1); border-radius: 1rem; padding: 1.5rem 3rem; text-align: center; color: #475569; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='rgba(139,92,246,0.4)';this.style.color='#a78bfa'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)';this.style.color='#475569'">
              <i class="fas fa-plus-circle" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
              <div style="font-size: 0.85rem; font-weight: 600;">New Project</div>
              <div style="font-size: 0.75rem; margin-top: 0.25rem;">Add to portfolio</div>
            </div>
          </a>
        </div>

      </div><!-- end tree-root -->
    </div><!-- end tree-container -->
  </div>

  <!-- ============ GRID VIEW ============ -->
  <div id="tab-grid" class="tab-content" style="display:none;">
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
      
      <!-- AILINK -->
      <a href="/project/ailink" style="text-decoration: none;">
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(59,130,246,0.2); border-radius: 1rem; padding: 1.5rem; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)';this.style.borderColor='rgba(59,130,246,0.5)'" onmouseout="this.style.transform='';this.style.borderColor='rgba(59,130,246,0.2)'">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #1d4ed8, #3b82f6); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-link" style="color: white;"></i>
            </div>
            <span class="status-badge status-active"><span style="width:6px;height:6px;background:#22c55e;border-radius:50%;"></span> Active</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 700; color: white; margin-bottom: 0.25rem;">AILINK</h3>
          <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 1rem;">codename: ailink-web · v2.0.0</p>
          <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 1rem;">AI-powered blockchain ecosystem</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.75rem;">
            <div><span style="color:#64748b;">Token</span><br><span style="color:#93c5fd;font-weight:600;">ALINK</span></div>
            <div><span style="color:#64748b;">Supply</span><br><span style="color:white;font-weight:600;">20B</span></div>
            <div><span style="color:#64748b;">Chain</span><br><span style="color:white;">BNB Chain</span></div>
            <div><span style="color:#64748b;">TGE</span><br><span style="color:#fbbf24;">Q4 2025</span></div>
          </div>
          <div style="margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #64748b; margin-bottom: 3px;"><span>Completion</span><span>72%</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:72%;background:linear-gradient(90deg,#3b82f6,#60a5fa);"></div></div>
          </div>
        </div>
      </a>

      <!-- DaVinci -->
      <a href="/project/davinci" style="text-decoration: none;">
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(139,92,246,0.2); border-radius: 1rem; padding: 1.5rem; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)';this.style.borderColor='rgba(139,92,246,0.5)'" onmouseout="this.style.transform='';this.style.borderColor='rgba(139,92,246,0.2)'">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #6d28d9, #8b5cf6); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-palette" style="color: white;"></i>
            </div>
            <span class="status-badge status-active"><span style="width:6px;height:6px;background:#22c55e;border-radius:50%;"></span> Active</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 700; color: white; margin-bottom: 0.25rem;">DaVinci AI</h3>
          <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 1rem;">codename: davinci-ai · v3.5.0</p>
          <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 1rem;">Web3-native AI agent creative platform</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.75rem;">
            <div><span style="color:#64748b;">Token</span><br><span style="color:#c4b5fd;font-weight:600;">DAVINCI</span></div>
            <div><span style="color:#64748b;">Supply</span><br><span style="color:white;font-weight:600;">8.88B</span></div>
            <div><span style="color:#64748b;">Chain</span><br><span style="color:white;">BNB Chain</span></div>
            <div><span style="color:#64748b;">TGE</span><br><span style="color:#fbbf24;">Q4 2025</span></div>
          </div>
          <div style="margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #64748b; margin-bottom: 3px;"><span>Completion</span><span>68%</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:68%;background:linear-gradient(90deg,#8b5cf6,#a78bfa);"></div></div>
          </div>
        </div>
      </a>

      <!-- Add New -->
      <a href="/add" style="text-decoration: none;">
        <div style="background: rgba(255,255,255,0.02); border: 2px dashed rgba(255,255,255,0.1); border-radius: 1rem; padding: 1.5rem; transition: all 0.3s; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px;" onmouseover="this.style.borderColor='rgba(139,92,246,0.4)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
          <i class="fas fa-plus-circle" style="font-size: 2rem; color: #475569; margin-bottom: 0.75rem;"></i>
          <div style="font-weight: 600; color: #475569; font-size: 0.9rem;">Add New Project</div>
          <div style="color: #374151; font-size: 0.75rem; margin-top: 0.25rem;">Expand your portfolio</div>
        </div>
      </a>
    </div>
  </div>

  <!-- ============ COMMON FEATURES ============ -->
  <div id="tab-common" class="tab-content" style="display:none;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
      
      <!-- Common Tech Stack -->
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 1.5rem;">
        <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-layer-group" style="color: #3b82f6;"></i> 공통 기술 스택
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${['Cloudflare Pages', 'Hono v4 (TypeScript)', 'Vite v6', 'Wrangler v4', 'BNB Chain (BEP-20)', 'Tailwind CSS CDN', 'Chart.js', 'FontAwesome 6.4', 'MetaMask Integration', 'WalletConnect', 'PancakeSwap', 'Chainlink'].map(t => `<span class="feature-tag">${t}</span>`).join('')}
        </div>
      </div>

      <!-- Common Blockchain Policy -->
      <div style="background: linear-gradient(135deg, rgba(243,186,47,0.08), rgba(243,186,47,0.03)); border: 1px solid rgba(243,186,47,0.3); border-radius: 1rem; padding: 1.5rem; grid-column: 1 / -1;">
        <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-link" style="color: #f3ba2f;"></i> 공통 블록체인 정책 — <span style="color: #f3ba2f; font-weight: 800;">모든 프로젝트 BNB Chain (BEP-20) 발행</span>
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;">
          <div style="background: rgba(243,186,47,0.06); border: 1px solid rgba(243,186,47,0.15); border-radius: 0.75rem; padding: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <img src="https://cryptologos.cc/logos/bnb-bnb-logo.png" style="width:20px;height:20px;border-radius:50%;object-fit:cover;" onerror="this.style.display='none'" />
              <span style="color: #f3ba2f; font-weight: 700; font-size: 0.9rem;">BNB Chain</span>
            </div>
            <div style="font-size: 0.75rem; color: #94a3b8;">공식 발행 네트워크 (BSC Mainnet)</div>
            <div style="font-size: 0.7rem; color: #64748b; margin-top: 0.25rem;">Chain ID: 56</div>
          </div>
          <div style="background: rgba(243,186,47,0.06); border: 1px solid rgba(243,186,47,0.15); border-radius: 0.75rem; padding: 1rem;">
            <i class="fas fa-file-contract" style="color: #f3ba2f; margin-bottom: 0.5rem; display: block;"></i>
            <div style="color: #e2e8f0; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">토큰 표준</div>
            <div style="font-size: 0.75rem; color: #94a3b8;">BEP-20 (ERC-20 호환)</div>
            <div style="font-size: 0.7rem; color: #64748b; margin-top: 0.25rem;">BSCScan 컨트랙트 검증 필수</div>
          </div>
          <div style="background: rgba(243,186,47,0.06); border: 1px solid rgba(243,186,47,0.15); border-radius: 0.75rem; padding: 1rem;">
            <i class="fas fa-exchange-alt" style="color: #f3ba2f; margin-bottom: 0.5rem; display: block;"></i>
            <div style="color: #e2e8f0; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">공통 DEX</div>
            <div style="font-size: 0.75rem; color: #94a3b8;">PancakeSwap (BSC)</div>
            <div style="font-size: 0.7rem; color: #64748b; margin-top: 0.25rem;">초기 유동성 공급 기본 DEX</div>
          </div>
          <div style="background: rgba(243,186,47,0.06); border: 1px solid rgba(243,186,47,0.15); border-radius: 0.75rem; padding: 1rem;">
            <i class="fas fa-wallet" style="color: #f3ba2f; margin-bottom: 0.5rem; display: block;"></i>
            <div style="color: #e2e8f0; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">공통 지갑 연동</div>
            <div style="font-size: 0.75rem; color: #94a3b8;">MetaMask + WalletConnect</div>
            <div style="font-size: 0.7rem; color: #64748b; margin-top: 0.25rem;">BNB Chain 네트워크 자동 추가</div>
          </div>
          <div style="background: rgba(243,186,47,0.06); border: 1px solid rgba(243,186,47,0.15); border-radius: 0.75rem; padding: 1rem;">
            <i class="fas fa-shield-alt" style="color: #f3ba2f; margin-bottom: 0.5rem; display: block;"></i>
            <div style="color: #e2e8f0; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">컨트랙트 보안</div>
            <div style="font-size: 0.75rem; color: #94a3b8;">CertiK / BSCScan Verified</div>
            <div style="font-size: 0.7rem; color: #64748b; margin-top: 0.25rem;">소스코드 공개 검증 필수</div>
          </div>
          <div style="background: rgba(243,186,47,0.06); border: 1px solid rgba(243,186,47,0.15); border-radius: 0.75rem; padding: 1rem;">
            <i class="fas fa-gas-pump" style="color: #f3ba2f; margin-bottom: 0.5rem; display: block;"></i>
            <div style="color: #e2e8f0; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">Gas 비용</div>
            <div style="font-size: 0.75rem; color: #94a3b8;">BNB (저렴한 트랜잭션 수수료)</div>
            <div style="font-size: 0.7rem; color: #64748b; margin-top: 0.25rem;">~$0.01~0.1 per tx (평균)</div>
          </div>
        </div>
        <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(243,186,47,0.08); border-radius: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
          <i class="fas fa-info-circle" style="color: #f3ba2f;"></i>
          <span style="font-size: 0.8rem; color: #94a3b8;"><strong style="color: #f3ba2f;">공통 원칙:</strong> 모든 프로젝트 토큰은 BNB Chain (BSC Mainnet, Chain ID: 56) 에서 BEP-20 표준으로 발행됩니다. 컨트랙트 주소는 BSCScan (bscscan.com)에서 확인 가능합니다.</span>
        </div>
      </div>

      <!-- Common Pages -->
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 1.5rem;">
        <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-file-code" style="color: #8b5cf6;"></i> 공통 페이지
        </h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${[
            ['/', 'Home Page', '14 sections: Hero, Tokenomics, Roadmap, Team, Partners...'],
            ['/login', 'Login / Wallet Connect', 'MetaMask + WalletConnect + Email'],
            ['/mypage', 'My Dashboard', 'User profile, wallet, vesting info'],
            ['/whitepaper', 'Whitepaper', 'Project documentation'],
            ['/legal/*', 'Legal Pages', 'Privacy, Terms, Disclaimer']
          ].map(([path, name, desc]) => `
          <div style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.6rem; background: rgba(255,255,255,0.02); border-radius: 0.5rem;">
            <code style="color: #22c55e; font-size: 0.7rem; background: rgba(34,197,94,0.1); padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${path}</code>
            <div>
              <div style="font-size: 0.85rem; color: #e2e8f0; font-weight: 600;">${name}</div>
              <div style="font-size: 0.75rem; color: #64748b;">${desc}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- ⚡ DESIGN INDEPENDENCE RULE -->
    <div style="background: linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.03)); border: 2px solid rgba(239,68,68,0.5); border-radius: 1rem; padding: 1.75rem; margin-bottom: 1.5rem; position: relative; overflow: hidden;" id="design-rule-banner">
      <div style="position:absolute;top:0;right:0;width:200px;height:200px;background:radial-gradient(circle,rgba(239,68,68,0.08),transparent);pointer-events:none;"></div>
      <!-- 헤더 -->
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.25rem;">
        <div style="width:42px;height:42px;background:rgba(239,68,68,0.15);border:1.5px solid rgba(239,68,68,0.5);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-ban" style="color:#ef4444;font-size:1.1rem;"></i>
        </div>
        <div>
          <h3 style="font-size:1.1rem;font-weight:800;color:#ef4444;margin-bottom:2px;letter-spacing:-0.3px;">⚠️ 핵심 원칙: 절대 같은 디자인은 안된다</h3>
          <p style="font-size:0.78rem;color:#94a3b8;">각 프로젝트는 서로 다른 개발자가 독립적으로 만든 것처럼 보여야 한다</p>
        </div>
      </div>

      <!-- 금지 사항 vs 권장 사항 -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem;">
        <!-- 금지 -->
        <div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.2);border-radius:0.75rem;padding:1rem;">
          <div style="font-size:0.75rem;font-weight:700;color:#ef4444;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.75rem;">
            <i class="fas fa-times-circle"></i> 절대 금지 사항
          </div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;">
            ${[
              '동일한 Hero 레이아웃 구조 (같은 그리드, 같은 타이포그래피)',
              '동일한 색상 팔레트 (blue+mint, purple+pink 등 반복 금지)',
              '동일한 CSS 클래스명 사용 (glass-card, gradient-text 등)',
              '동일한 섹션 순서 & 멘트 (How It Works, Core Features 등)',
              '동일한 카드 컴포넌트 패턴 (rounded glass card 반복)',
              '같은 폰트 조합 (Inter+Manrope를 모든 프로젝트에 사용)',
              '같은 버튼 스타일 (gradient, rounded 반복)',
            ].map(t => `
            <div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.78rem;color:#fca5a5;">
              <i class="fas fa-times" style="color:#ef4444;margin-top:2px;flex-shrink:0;font-size:0.7rem;"></i>
              <span>${t}</span>
            </div>`).join('')}
          </div>
        </div>

        <!-- 권장 -->
        <div style="background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.2);border-radius:0.75rem;padding:1rem;">
          <div style="font-size:0.75rem;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.75rem;">
            <i class="fas fa-check-circle"></i> 필수 차별화 요소
          </div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;">
            ${[
              '완전히 다른 색상 시스템 (primary accent 색상 반드시 상이)',
              '다른 폰트 패밀리 조합 (Space Grotesk, Clash Display, Syne 등)',
              '다른 레이아웃 패턴 (타임라인, 수평스크롤, 스플릿, 터미널)',
              '다른 카드 스타일 (sharp corners, border-only, asymmetric)',
              '다른 섹션 헤드라인 멘트 & 아이코노그래피',
              '다른 애니메이션 방향 (fadeUp vs slideLeft vs zoomIn)',
              '다른 Hero 패턴 (데모패널, 파티클, 3D효과, 터미널)',
            ].map(t => `
            <div style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.78rem;color:#86efac;">
              <i class="fas fa-check" style="color:#22c55e;margin-top:2px;flex-shrink:0;font-size:0.7rem;"></i>
              <span>${t}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- 프로젝트별 디자인 시스템 현황 -->
      <div style="margin-bottom:1.25rem;">
        <div style="font-size:0.75rem;font-weight:700;color:#e2e8f0;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.75rem;">
          <i class="fas fa-palette" style="color:#a78bfa;"></i> 프로젝트별 디자인 시스템 현황
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:0.75rem;">
          ${[
            {
              name:'AILINK', color:'#3b82f6',
              font:'Inter + Manrope', accent:'Blue #3b82f6 + Mint #10b981',
              layout:'Rounded glass cards, gradient hero', style:'Navy dark, smooth curves',
              status:'active', hero:'Animated grid + floating cards'
            },
            {
              name:'ZENTARAI', color:'#10b981',
              font:'Space Grotesk + Space Mono', accent:'Emerald #10b981 + Cyan #06b6d4',
              layout:'Sharp terminal cards, border-only', style:'Pure black, neon signals',
              status:'active', hero:'Live signal terminal demo panel'
            },
            {
              name:'DaVinci AI', color:'#8b5cf6',
              font:'미정 (Clash Display 권장)', accent:'Purple #8b5cf6 (NFT/AI 컨셉)',
              layout:'미정 (Asymmetric grid 권장)', style:'미정',
              status:'planned', hero:'미정 (Canvas/3D 권장)'
            },
          ].map(p => `
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${p.color === '#3b82f6' ? '59,130,246' : p.color === '#10b981' ? '16,185,129' : '139,92,246'},0.25);border-radius:0.75rem;padding:0.875rem;position:relative;overflow:hidden;">
            <div style="position:absolute;top:0;left:0;width:3px;height:100%;background:${p.color};"></div>
            <div style="padding-left:0.625rem;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
                <span style="font-weight:700;color:white;font-size:0.9rem;">${p.name}</span>
                <span style="font-size:0.65rem;padding:2px 8px;border-radius:99px;background:rgba(${p.status === 'active' ? '34,197,94' : '148,163,184'},0.15);color:${p.status === 'active' ? '#22c55e' : '#94a3b8'};border:1px solid rgba(${p.status === 'active' ? '34,197,94' : '148,163,184'},0.3);">${p.status === 'active' ? '✓ 구현완료' : '미정'}</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:3px;">
                <div style="font-size:0.72rem;"><span style="color:#64748b;">폰트: </span><span style="color:#e2e8f0;">${p.font}</span></div>
                <div style="font-size:0.72rem;"><span style="color:#64748b;">Accent: </span><span style="color:${p.color};">${p.accent}</span></div>
                <div style="font-size:0.72rem;"><span style="color:#64748b;">레이아웃: </span><span style="color:#94a3b8;">${p.layout}</span></div>
                <div style="font-size:0.72rem;"><span style="color:#64748b;">Hero: </span><span style="color:#94a3b8;">${p.hero}</span></div>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- 섹션 멘트 차별화 가이드 -->
      <div>
        <div style="font-size:0.75rem;font-weight:700;color:#e2e8f0;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.75rem;">
          <i class="fas fa-font" style="color:#fbbf24;"></i> 섹션별 멘트 차별화 규칙 (같은 표현 재사용 금지)
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;font-size:0.75rem;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                <th style="text-align:left;padding:0.5rem 0.75rem;color:#64748b;font-weight:600;white-space:nowrap;">섹션</th>
                <th style="text-align:left;padding:0.5rem 0.75rem;color:#3b82f6;font-weight:600;white-space:nowrap;"><i class="fas fa-link" style="font-size:0.7rem;"></i> AILINK</th>
                <th style="text-align:left;padding:0.5rem 0.75rem;color:#10b981;font-weight:600;white-space:nowrap;"><i class="fas fa-brain" style="font-size:0.7rem;"></i> ZENTARAI</th>
                <th style="text-align:left;padding:0.5rem 0.75rem;color:#8b5cf6;font-weight:600;white-space:nowrap;"><i class="fas fa-palette" style="font-size:0.7rem;"></i> DaVinci AI</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ['Hero 태그라인', 'Build. Link. Empower.', 'predict outcomes.', '(미정) Create. Imagine. Own.'],
                ['메인 섹션명', 'How It Works', 'System Architecture', '(미정) How Agents Think'],
                ['기능 섹션명', 'Core Features', 'Signal Intelligence', '(미정) AI Studio'],
                ['토큰 섹션명', 'Tokenomics · ALINK Economy', 'utility drives the flywheel.', '(미정) Value Architecture'],
                ['커뮤니티 섹션', 'Community & DAO', 'network nodes', '(미정) Creator Collective'],
                ['CTA 문구', 'Join the Ecosystem', 'init_wallet', '(미정) Start Creating'],
              ].map(([section, ailink, zentarai, davinci]) => `
              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                <td style="padding:0.45rem 0.75rem;color:#94a3b8;white-space:nowrap;">${section}</td>
                <td style="padding:0.45rem 0.75rem;color:#93c5fd;">${ailink}</td>
                <td style="padding:0.45rem 0.75rem;color:#6ee7b7;">${zentarai}</td>
                <td style="padding:0.45rem 0.75rem;color:#c4b5fd;opacity:0.6;">${davinci}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Common Components -->
    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-puzzle-piece" style="color: #fbbf24;"></i> 공통 컴포넌트 & 기능
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
        ${[
          ['fas fa-palette', '#3b82f6', 'Layout System', 'Sticky navbar, footer, responsive breakpoints'],
          ['fas fa-user-circle', '#22c55e', 'Auth System', 'Wallet connect + Email login, localStorage session'],
          ['fas fa-chart-pie', '#8b5cf6', 'Tokenomics Chart', 'Allocation donut chart + vesting schedule'],
          ['fas fa-road', '#fbbf24', 'Roadmap', '4-5 phase roadmap with status indicators'],
          ['fas fa-users', '#ec4899', 'Team Section', 'Core team profiles with roles'],
          ['fas fa-handshake', '#06b6d4', 'Partners', 'Partner logos grid'],
          ['fas fa-question-circle', '#a78bfa', 'FAQ', 'Accordion Q&A section'],
          ['fas fa-share-alt', '#f97316', 'Social Links', 'Twitter, Telegram, GitHub links']
        ].map(([icon, color, title, desc]) => `
        <div style="padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 0.75rem;">
          <i class="${icon}" style="color: ${color}; font-size: 1.25rem; margin-bottom: 0.5rem; display: block;"></i>
          <div style="font-size: 0.875rem; font-weight: 600; color: #e2e8f0; margin-bottom: 0.25rem;">${title}</div>
          <div style="font-size: 0.75rem; color: #64748b;">${desc}</div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Common Deployment -->
    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 1.5rem;">
      <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-rocket" style="color: #ec4899;"></i> 공통 배포 구조
      </h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; font-size: 0.85rem;">
        <div>
          <div style="color: #64748b; font-size: 0.75rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Hosting</div>
          <div style="color: #e2e8f0;">☁️ Cloudflare Pages</div>
          <div style="color: #e2e8f0;">🔧 Wrangler CLI</div>
          <div style="color: #e2e8f0;">🌐 Custom Domain</div>
        </div>
        <div>
          <div style="color: #64748b; font-size: 0.75rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Build</div>
          <div style="color: #e2e8f0;">📦 npm run build</div>
          <div style="color: #e2e8f0;">📁 dist/ output</div>
          <div style="color: #e2e8f0;">🚀 Pages deploy</div>
        </div>
        <div>
          <div style="color: #64748b; font-size: 0.75rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Dev</div>
          <div style="color: #e2e8f0;">⚡ PM2 + wrangler</div>
          <div style="color: #e2e8f0;">🔀 Port 3000/4000</div>
          <div style="color: #e2e8f0;">🐙 GitHub main branch</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ============ REQUIRED FIELDS ============ -->
  <div id="tab-required" class="tab-content" style="display:none;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      
      ${[
        { title: '프로젝트 정체성', icon: 'fas fa-id-card', color: '#3b82f6', fields: [
          ['필수', '#22c55e', 'Project Name', '프로젝트 공식 이름'],
          ['필수', '#22c55e', 'Codename', 'GitHub repo / Cloudflare project 코드명'],
          ['필수', '#22c55e', 'Version', '현재 버전 (v1.0.0)'],
          ['필수', '#22c55e', 'Owner', 'GitHub 계정명'],
          ['필수', '#22c55e', 'Status', 'active / dev / planned'],
          ['필수', '#22c55e', 'Description', '한 줄 설명'],
          ['권장', '#fbbf24', 'Category', '예: DeFi + AI, AI + NFT']
        ]},
        { title: '토큰 정보', icon: 'fas fa-coins', color: '#fbbf24', fields: [
          ['필수', '#22c55e', 'Token Symbol', 'ALINK, DAVINCI 등'],
          ['필수', '#22c55e', 'Total Supply', '총 발행량'],
          ['공통고정', '#f3ba2f', 'Blockchain', '⚠️ 모든 프로젝트: BNB Chain (BSC Mainnet, Chain ID: 56)'],
          ['공통고정', '#f3ba2f', 'Token Standard', '⚠️ 모든 프로젝트: BEP-20 (ERC-20 호환)'],
          ['필수', '#22c55e', 'Contract Address', '배포된 BSCScan 컨트랙트 주소'],
          ['필수', '#22c55e', 'TGE Date', '토큰 발행 예정일'],
          ['공통고정', '#f3ba2f', 'DEX Listing', '⚠️ 공통: PancakeSwap (BSC) 초기 상장']
        ]},
        { title: 'URL & 소셜', icon: 'fas fa-link', color: '#8b5cf6', fields: [
          ['필수', '#22c55e', 'Production URL', '실제 도메인'],
          ['필수', '#22c55e', 'Cloudflare Pages URL', '*.pages.dev URL'],
          ['필수', '#22c55e', 'GitHub Repository', 'github.com/...'],
          ['필수', '#22c55e', 'Twitter/X', 'x.com/...'],
          ['필수', '#22c55e', 'Telegram', 't.me/...'],
          ['권장', '#fbbf24', 'BSCScan Token', 'BSCScan 토큰 페이지'],
          ['권장', '#fbbf24', 'Discord', '커뮤니티 Discord']
        ]},
        { title: '배포 정보', icon: 'fas fa-rocket', color: '#ec4899', fields: [
          ['필수', '#22c55e', 'Deploy Platform', 'Cloudflare Pages'],
          ['필수', '#22c55e', 'Build Command', 'npm run build'],
          ['필수', '#22c55e', 'Output Directory', 'dist/'],
          ['필수', '#22c55e', 'Production Branch', 'main'],
          ['필수', '#22c55e', 'Tech Stack', 'Hono + TypeScript + Vite 등'],
          ['권장', '#fbbf24', 'CF Project Name', 'Cloudflare 프로젝트명'],
          ['권장', '#fbbf24', 'Node Version', '사용 Node.js 버전']
        ]},
        { title: '토큰노믹스', icon: 'fas fa-chart-pie', color: '#06b6d4', fields: [
          ['필수', '#22c55e', 'Allocation Table', '각 카테고리별 % 및 수량'],
          ['필수', '#22c55e', 'Cliff Period', '각 할당별 클리프 기간 (월)'],
          ['필수', '#22c55e', 'Vesting Period', '각 할당별 베스팅 기간 (월)'],
          ['필수', '#22c55e', 'Vesting Chart', '시각적 베스팅 스케줄'],
          ['권장', '#fbbf24', 'Unlock Schedule', '월별 언락 수량 표'],
          ['권장', '#fbbf24', 'Initial Circulating', '초기 유통량']
        ]},
        { title: '팀 & 파트너', icon: 'fas fa-users', color: '#a78bfa', fields: [
          ['필수', '#22c55e', 'Core Team', 'CEO, CTO 등 핵심 구성원'],
          ['필수', '#22c55e', 'Roles', '각 팀원 역할'],
          ['필수', '#22c55e', 'Partners List', '주요 파트너사'],
          ['권장', '#fbbf24', 'Advisors', '자문위원'],
          ['권장', '#fbbf24', 'LinkedIn/Social', '팀원 SNS 링크']
        ]},
        { title: '페이지 목록', icon: 'fas fa-file-alt', color: '#22c55e', fields: [
          ['필수', '#22c55e', 'Home (/)', '홈페이지'],
          ['필수', '#22c55e', 'Login (/login)', '로그인 / 지갑 연결'],
          ['필수', '#22c55e', 'My Page (/mypage)', '사용자 대시보드'],
          ['필수', '#22c55e', 'Whitepaper (/whitepaper)', '프로젝트 문서'],
          ['필수', '#22c55e', 'Vesting (/vesting)', '베스팅 스케줄'],
          ['필수', '#22c55e', 'Legal (/legal/*)', '법적 문서'],
          ['권장', '#fbbf24', 'Sign Up (/signup)', '회원가입']
        ]},
        { title: '로드맵', icon: 'fas fa-road', color: '#f97316', fields: [
          ['필수', '#22c55e', 'Phase List', '모든 개발 단계'],
          ['필수', '#22c55e', 'Period', '각 단계 예상 기간'],
          ['필수', '#22c55e', 'Status', 'completed / in-progress / upcoming / future'],
          ['필수', '#22c55e', 'Key Items', '각 단계 주요 작업'],
          ['권장', '#fbbf24', 'Milestones', '주요 마일스톤']
        ]}
      ].map(section => `
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 1.5rem;">
        <h3 style="font-size: 0.95rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="${section.icon}" style="color: ${section.color};"></i> ${section.title}
        </h3>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${section.fields.map(([badge, badgeColor, name, desc]) => `
          <div class="required-field">
            <span style="background: rgba(0,0,0,0.3); border: 1px solid ${badgeColor}; color: ${badgeColor}; padding: 1px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: 700; flex-shrink: 0;">${badge}</span>
            <div>
              <span style="font-weight: 600; color: #e2e8f0;">${name}</span>
              <span style="color: #64748b; font-size: 0.78rem; margin-left: 0.5rem;">${desc}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ============ SHEET TAB ============ -->
  <div id="tab-sheet" class="tab-content" style="display:none;">
    <div id="sh-col-mgr" style="display:none;background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.25);border-radius:.6rem;padding:.8rem 1rem;margin-bottom:.75rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem;">
        <span style="font-size:.8rem;font-weight:700;color:#a5b4fc;"><i class="fas fa-columns"></i> 카테고리 관리</span>
        <button onclick="shHideMgr()" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:1rem;">&#x2715;</button>
      </div>
      <div id="sh-col-list" style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:.7rem;"></div>
      <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;">
        <input id="sh-new-col-key" placeholder="key (영문)" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:.35rem;padding:.28rem .6rem;color:#e2e8f0;font-size:.78rem;outline:none;width:110px;">
        <input id="sh-new-col-h" placeholder="헤더명" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:.35rem;padding:.28rem .6rem;color:#e2e8f0;font-size:.78rem;outline:none;width:100px;">
        <select id="sh-new-col-g" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:.35rem;padding:.28rem .6rem;color:#e2e8f0;font-size:.78rem;outline:none;"></select>
        <button onclick="shAddCol()" class="sh-btn-primary" style="padding:.28rem .7rem;font-size:.75rem;"><i class="fas fa-plus"></i> 컬럼 추가</button>
        <button onclick="shAddGroup()" class="sh-btn-ghost" style="padding:.28rem .7rem;font-size:.75rem;"><i class="fas fa-folder-plus"></i> 그룹 추가</button>
      </div>
    </div>
    <div id="sh-app"></div>
  </div>

</div><!-- end main content -->

<!-- Footer -->
<footer style="border-top: 1px solid rgba(255,255,255,0.06); padding: 1.5rem; text-align: center; color: #475569; font-size: 0.8rem; margin-top: 3rem;">
  Blockchain Portfolio Manager v3.0.0 · vinsenzo83 · Built with Hono + Cloudflare Pages
</footer>

</div><!-- end main-wrap -->

<!-- ── Sheet: 편집 모달 ── -->
<div id="sh-modal" class="sh-modal-bg">
  <div class="sh-modal-box">
    <div class="sh-modal-head">
      <span id="sh-mt" style="font-weight:700;font-size:1rem;color:#e2e8f0">편집</span>
      <button onclick="shClose()" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:1.2rem;line-height:1">✕</button>
    </div>
    <div class="sh-modal-body" id="sh-modal-fields"></div>
    <div class="sh-modal-foot">
      <button onclick="shClose()" class="sh-btn-ghost">취소</button>
      <button onclick="shSave()" class="sh-btn-primary"><i class="fas fa-save"></i> 저장</button>
    </div>
  </div>
</div>
<div id="sh-toast" class="sh-toast"></div>

<script>
/* ====== PASSWORD GATE ====== */
(function() {
  var PW = 'rhkdtp00!!';
  var SK = 'pm_auth';
  var gate = document.getElementById('pw-gate');
  var wrap = document.getElementById('main-wrap');
  if (sessionStorage.getItem(SK) === '1') {
    gate.style.display = 'none';
    wrap.style.display = 'block';
  } else {
    gate.style.display = 'flex';
    wrap.style.display = 'none';
    setTimeout(function(){ var el=document.getElementById('pw-input'); if(el) el.focus(); }, 100);
  }
})();
function pwLogin() {
  var val = (document.getElementById('pw-input') || {}).value || '';
  var err = document.getElementById('pw-err');
  var gate = document.getElementById('pw-gate');
  var wrap = document.getElementById('main-wrap');
  if (val === 'rhkdtp00!!') {
    sessionStorage.setItem('pm_auth', '1');
    gate.style.display = 'none';
    wrap.style.display = 'block';
  } else {
    if (err) err.style.display = 'block';
    var inp = document.getElementById('pw-input');
    if (inp) { inp.value = ''; inp.focus(); }
  }
}

/* -- TAB SWITCHER -- */
function showTab(name, btn) {
  document.querySelectorAll('.tab-content').forEach(function(el) { el.style.display = 'none'; });
  document.querySelectorAll('.tab-btn').forEach(function(el) { el.classList.remove('active'); });
  var tab = document.getElementById('tab-' + name);
  if (tab) tab.style.display = 'block';
  if (btn) btn.classList.add('active');
  if (name === 'sheet') shRender();
}

/* ========================================
   SHEET  -  22개 프로젝트 관리 시트
======================================== */
var SH_KEY = 'pm_sheet_v1';

/* : key /  /  / width */
var SH_COLS = [
  {k:'sim',       h:'SIM No.',      g:'기본',    w:90},
  {k:'rank',      h:'매각순위',      g:'기본',    w:80},
  {k:'followers', h:'팔로워',        g:'기본',    w:70},
  {k:'devStatus', h:'개발상황',      g:'기본',    w:90},
  {k:'posting',   h:'포스팅',        g:'기본',    w:70},
  {k:'posts',     h:'포스트수',      g:'기본',    w:70},
  {k:'xName',     h:'X 프로젝트명',  g:'X 계정',  w:110},
  {k:'xAcc',      h:'X 계정',        g:'X 계정',  w:130},
  {k:'xPass',     h:'X 비밀번호',    g:'X 계정',  w:100},
  {k:'gName',     h:'G 프로젝트명',  g:'Google', w:110},
  {k:'gAcc',      h:'Gmail',         g:'Google', w:160},
  {k:'gPass',     h:'G 비밀번호',    g:'Google', w:100},
  {k:'tgName',    h:'TG 프로젝트명', g:'Telegram',w:110},
  {k:'tgLink',    h:'TG 링크',       g:'Telegram',w:160},
  {k:'twName',    h:'TW 프로젝트명', g:'Twitter', w:110},
  {k:'twLink',    h:'TW 링크',       g:'Twitter', w:160},
  {k:'site',      h:'사이트',        g:'사이트/토큰',w:140},
  {k:'tokenAddr', h:'Token Address', g:'사이트/토큰',w:160},
  {k:'tokenKey',  h:'Token Key',     g:'사이트/토큰',w:120},
  {k:'domainEmail',h:'도메인이메일', g:'기타',    w:160},
  {k:'devDoc',    h:'개발문서',      g:'기타',    w:100},
  {k:'exchange',  h:'거래소',        g:'거래소/매각',w:80},
  {k:'sold',      h:'매각여부',      g:'거래소/매각',w:90},
];

/* () */
var SH_GCOL = {
  '기본':        '#6366f1',
  'X 계정':      '#3b82f6',
  'Google':      '#22c55e',
  'Telegram':    '#06b6d4',
  'Twitter':     '#8b5cf6',
  '사이트/토큰': '#f59e0b',
  '기타':        '#94a3b8',
  '거래소/매각': '#ef4444',
};

/* 22 */
var SH_DEF = [
  {id:1,  sim:'',              rank:'매각완료', followers:'26k',  devStatus:'매각완료', posting:'',  posts:'',    xName:'mole',       xAcc:'@MoleSmash',       xPass:'rhkdtp00!!',  gName:'mole',       gAcc:'moletaptap@gmail.com',          gPass:'rhkdtp00!!',  tgName:'mole',       tgLink:'https://t.me/MoleOfficialchannel',  twName:'mole',       twLink:'https://x.com/MoleSmash',       site:'molesmash.xyz',    tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'mexc', sold:'매각완료'},
  {id:2,  sim:'880 1601929592',rank:'매각완료', followers:'200',  devStatus:'매각완료', posting:'y', posts:'232', xName:'tonixai',    xAcc:'@TonixAiOfficial', xPass:'Abcd@1233',   gName:'tonnixai',   gAcc:'mrstefan45678@gmail.com',        gPass:'12345@Abcd',  tgName:'tonixai',    tgLink:'https://t.me/tonixaiOfficial',      twName:'tonixai',    twLink:'https://x.com/TonixAiOfficial', site:'tonixai.org',      tokenAddr:'0x91025973e28d2CC43C42A5b1A2308F5Fe4AAf436', tokenKey:'de935095fa09f9e198c6dcd48d72b42fd38db51cbc92013241d96a747afc8ae0', domainEmail:'', devDoc:'',                                                                                                                    exchange:'mexc', sold:'매각완료'},
  {id:3,  sim:'',              rank:'',         followers:'',     devStatus:'완료',     posting:'y', posts:'98',  xName:'DaVinci AI', xAcc:'@DVinciAiZ',       xPass:'Abcd@1233',   gName:'DaVinci AI', gAcc:'davinciai59sala@gmail.com',      gPass:'Abcd@1233',   tgName:'DaVinci AI', tgLink:'https://t.me/DaVinciAiZ',           twName:'DaVinci AI', twLink:'https://x.com/DVinciAiZ',       site:'davinciai.io',     tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'https://docs.google.com/document/d/1tTYRudGDhRK91Mo81uRNdxfD6Mpc4FKWwJU8k8rgpWU/edit', exchange:'mexc', sold:''},
  {id:4,  sim:'',              rank:'',         followers:'',     devStatus:'완료',     posting:'y', posts:'118', xName:'AiLink',     xAcc:'@AiLink_Official', xPass:'Abcd@1233',   gName:'AiLink',     gAcc:'ailinkofficial.net@gmail.com',   gPass:'Abcd@1233',   tgName:'AiLink',     tgLink:'https://t.me/AiLink_Official',      twName:'AiLink',     twLink:'https://x.com/AiLink_Official', site:'aichainlabs.xyz',  tokenAddr:'0x33c5502261c589a2EC4B1a6C4350aBF60ef47254', tokenKey:'d0c65aaa3ff528bb9c649b71b37d74691b7d283efbce04e7390df101a5709e20', domainEmail:'', devDoc:'https://docs.google.com/document/d/1p-Lk94S_KjtVfKo4W1cbqqhdkMkTvxc8JGEd4V-3IAc/edit', exchange:'mexc', sold:''},
  {id:5,  sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'y', posts:'49',  xName:'visixion',   xAcc:'@visixion',        xPass:'Abcd@1234',   gName:'visixion',   gAcc:'mdrazzakcom@gmail.com',          gPass:'Abcd@1234',   tgName:'visixion',   tgLink:'https://t.me/visixion_official',    twName:'visixion',   twLink:'https://x.com/visixion',        site:'visixion.xyz',     tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'https://docs.google.com/document/d/1IWtQEXcwGAlEDDIiVPucllIeVrUAR-nIQ3u5cpwKpfA/edit', exchange:'mexc', sold:''},
  {id:6,  sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'y', posts:'35',  xName:'mynforge',   xAcc:'@mynforge',        xPass:'Abcd@1234',   gName:'mynforge',   gAcc:'mynforge@gmail.com',            gPass:'Abcd@1234',   tgName:'mynforge',   tgLink:'https://t.me/mynforge',             twName:'mynforge',   twLink:'https://x.com/mynforge',        site:'mynforge.xyz',     tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'mexc', sold:''},
  {id:7,  sim:'',              rank:'매각완료', followers:'25k',  devStatus:'매각완료', posting:'y', posts:'98',  xName:'Aivoryn',    xAcc:'@Aivoryn_officia', xPass:'rhkdtp00!!',  gName:'Aivoryn',    gAcc:'meow830417@gmail.com',           gPass:'rhkdtp00!!',  tgName:'Aivoryn',    tgLink:'https://t.me/Aivoryn',              twName:'Aivoryn',    twLink:'https://x.com/Aivoryn_officia', site:'aivoryn.xyz',      tokenAddr:'0xEc24290f0F0C88075558739777090DcB9fef4F04',  tokenKey:'c18dc9089231b08c3c8cc2733ea0826986631a31ca0536d50c1e22cb8054da63', domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:'매각완료'},
  {id:8,  sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'y', posts:'24',  xName:'Synthoryx',  xAcc:'@Synthoryx',       xPass:'Abcd@1234',   gName:'Synthoryx',  gAcc:'synthoryx50@gmail.com',          gPass:'Abcd@1234',   tgName:'Synthoryx',  tgLink:'https://t.me/Synthoryx',            twName:'Synthoryx',  twLink:'https://x.com/Synthoryx',       site:'synthoryx.xyz',    tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:9,  sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'y', posts:'28',  xName:'mindvoria',  xAcc:'@mindvoria',       xPass:'Abcd@1234',   gName:'mindvoria',  gAcc:'mindvoria@gmail.com',            gPass:'Abcd@1234',   tgName:'mindvoria',  tgLink:'https://t.me/mindvoria',            twName:'mindvoria',  twLink:'https://x.com/mindvoria',       site:'mindvoria.org',    tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:10, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'intellora',  xAcc:'@IntelloraAi',     xPass:'Abcd@1234',   gName:'intellora',  gAcc:'intellora3@gmail.com',           gPass:'Abcd@1234',   tgName:'intellora',  tgLink:'https://t.me/intellora_Official',   twName:'intellora',  twLink:'https://x.com/IntelloraAi',     site:'intellora.org',    tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:11, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'Cognarex',   xAcc:'@Cognarex',        xPass:'Abcd@1234',   gName:'Cognarex',   gAcc:'cognarex@gmail.com',             gPass:'Abcd@1234',   tgName:'Cognarex',   tgLink:'https://t.me/Cognarex',             twName:'Cognarex',   twLink:'https://x.com/Cognarex',        site:'cognarex.xyz',     tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:12, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'Neuravix',   xAcc:'@Neuravix',        xPass:'Abcd@1234',   gName:'Neuravix',   gAcc:'neuravix812@gmail.com',          gPass:'Abcd@1234',   tgName:'Neuravix',   tgLink:'https://t.me/Neuravix_Official',    twName:'Neuravix',   twLink:'https://x.com/Neuravix',        site:'neuravix.xyz',     tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:13, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'Omnivora',   xAcc:'@OmnivoraAi',      xPass:'Abcd@1234',   gName:'Omnivora',   gAcc:'omnivora270@gmail.com',          gPass:'Abcd@1244',   tgName:'Omnivora',   tgLink:'https://t.me/OnivoraAi',            twName:'Omnivora',   twLink:'https://x.com/OmnivoraAi',      site:'omnivora.xyz',     tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:14, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'ZENIQA',     xAcc:'@ZeniqaAi',        xPass:'Abcd@1234',   gName:'ZENIQA',     gAcc:'zeniqa3@gmail.com',              gPass:'Abcd@1234',   tgName:'ZENIQA',     tgLink:'https://t.me/ZeniqaAi',             twName:'ZENIQA',     twLink:'https://x.com/ZeniqaAi',        site:'zeniqa.org',       tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:15, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'SYNTRAQ',    xAcc:'@SyntraqAi',       xPass:'Abcd@1234',   gName:'SYNTRAQ',    gAcc:'syntraq592@gmail.com',           gPass:'Abcd@1234',   tgName:'SYNTRAQ',    tgLink:'https://t.me/SyntraqAi',            twName:'SYNTRAQ',    twLink:'https://x.com/SyntraqAi',       site:'syntraq.org',      tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:16, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'ALTRYN',     xAcc:'@AltrynAi',        xPass:'Abcd@1234',   gName:'ALTRYN',     gAcc:'alryn29@gmail.com',              gPass:'Abcd@1234',   tgName:'ALTRYN',     tgLink:'https://t.me/Altryn',               twName:'ALTRYN',     twLink:'https://x.com/AltrynAi',        site:'altryn.xyz',       tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:17, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'TYRIONIX',   xAcc:'@Tyrionix_X',      xPass:'Abcd@1234',   gName:'TYRIONIX',   gAcc:'tyrionix42@gmail.com',           gPass:'Abcd@1234',   tgName:'TYRIONIX',   tgLink:'https://t.me/TYRIONIX',             twName:'TYRIONIX',   twLink:'https://x.com/Tyrionix_X',      site:'tyrionix.xyz',     tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:18, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'Aevyra',     xAcc:'@Aevyra_Official', xPass:'Abcd@1234',   gName:'Aevyra',     gAcc:'aveyra260@gmail.com',            gPass:'Abcd@1234',   tgName:'Aevyra',     tgLink:'https://t.me/Aevyra_official',      twName:'Aevyra',     twLink:'https://x.com/Aevyra_Official', site:'aevyra.xyz',       tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:19, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'Velynx',     xAcc:'@Velynx_Official', xPass:'Abcd@1234',   gName:'Velynx',     gAcc:'Velynx23@gmail.com',             gPass:'Abcd@1234',   tgName:'Velynx',     tgLink:'https://t.me/Velynx_Official',      twName:'Velynx',     twLink:'https://x.com/Velynx_Official', site:'velynx.xyz',       tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:20, sim:'',              rank:'',         followers:'',     devStatus:'',         posting:'',  posts:'',    xName:'Yuvin',      xAcc:'@Yuvin_Official',  xPass:'Abcd@1234',   gName:'Yuvin',      gAcc:'Yuvin957@gmail.com',             gPass:'Abcd@1234',   tgName:'Yuvin',      tgLink:'https://t.me/Yuvin_Official',       twName:'Yuvin',      twLink:'https://x.com/Yuvin_Official',  site:'yuvin.xyz',        tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:21, sim:'',              rank:'',         followers:'7k',   devStatus:'',         posting:'y', posts:'',    xName:'LUMORAI',    xAcc:'@LUMORAI_OP',      xPass:'rhkdtp00!!',  gName:'LUMORAI',    gAcc:'catnipsprint@gmail.com',         gPass:'rhkdtp00!!',  tgName:'LUMORAI',    tgLink:'',                                  twName:'LUMORAI',    twLink:'https://x.com/LUMORAI_OP',      site:'',                 tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
  {id:22, sim:'',              rank:'',         followers:'24k',  devStatus:'',         posting:'y', posts:'',    xName:'ZENTARAI',   xAcc:'@intellora_',      xPass:'rhkdtp00!!',  gName:'ZENTARAI',   gAcc:'moletaptap@gmail.com',           gPass:'rhkdtp00!!',  tgName:'ZENTARAI',   tgLink:'',                                  twName:'ZENTARAI',   twLink:'https://x.com/intellora_',      site:'',                 tokenAddr:'',                                         tokenKey:'',                                                              domainEmail:'', devDoc:'',                                                                                                                    exchange:'',     sold:''},
];

var shData = JSON.parse(localStorage.getItem(SH_KEY) || 'null') || SH_DEF.map(function(d){return Object.assign({},d);});
var shNext = Math.max.apply(null, shData.map(function(p){return p.id;})) + 1;
var shEid  = null;

function shPersist() { localStorage.setItem(SH_KEY, JSON.stringify(shData)); }

/* -- 한 행 HTML 생성 -- */
function shRow(p) {
  var esc = function(v){ return (v||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); };
  var dash = '<span style="color:#475569">-</span>';
  var isSold = p.sold==='매각완료' || p.rank==='매각완료';
  var h = '<tr class="sh-tr' + (isSold?' sh-sold-r':'') + '" data-id="'+p.id+'">';

  /* section */
  h += '<td>'+esc(p.sim||'')+'</td>';
  h += '<td>'+(p.rank==='매각완료'?'<span class="sh-badge sh-red">매각완료</span>':esc(p.rank||''))+'</td>';
  h += '<td>'+(p.followers?'<b style="color:#fbbf24">'+esc(p.followers)+'</b>':dash)+'</td>';
  h += '<td>'+(p.devStatus==='완료'?'<span class="sh-badge sh-green">완료</span>'
              :p.devStatus==='매각완료'?'<span class="sh-badge sh-red">매각완료</span>'
              :esc(p.devStatus||''))+'</td>';
  h += '<td>'+(p.posting==='y'?'<span class="sh-badge sh-green">Y</span>':dash)+'</td>';
  h += '<td>'+(p.posts?'<b>'+esc(p.posts)+'</b>':dash)+'</td>';

  /* X */
  h += '<td style="font-weight:600">'+esc(p.xName||'')+'</td>';
  h += '<td>'+(p.xAcc?'<a class="sh-link" href="https://x.com/'+esc(p.xAcc.replace('@',''))+'" target="_blank"><i class="fab fa-x-twitter"></i> '+esc(p.xAcc)+'</a>':dash)+'</td>';
  h += '<td style="font-family:monospace;font-size:.73rem">'+esc(p.xPass||'')+'</td>';

  /* Google */
  h += '<td>'+esc(p.gName||'')+'</td>';
  h += '<td style="color:#60a5fa">'+esc(p.gAcc||'')+'</td>';
  h += '<td style="font-family:monospace;font-size:.73rem">'+esc(p.gPass||'')+'</td>';

  /* Telegram */
  h += '<td>'+esc(p.tgName||'')+'</td>';
  h += '<td>'+(p.tgLink?'<a class="sh-link" href="'+esc(p.tgLink)+'" target="_blank"><i class="fab fa-telegram"></i> '+esc(p.tgLink.replace('https://t.me/',''))+'</a>':dash)+'</td>';

  /* Twitter */
  h += '<td>'+esc(p.twName||'')+'</td>';
  h += '<td>'+(p.twLink?'<a class="sh-link" href="'+esc(p.twLink)+'" target="_blank"><i class="fab fa-x-twitter"></i> '+esc(p.twLink.replace('https://x.com/','@').split('?')[0])+'</a>':dash)+'</td>';

  /* / */
  h += '<td>'+(p.site?'<a class="sh-link" href="https://'+esc(p.site)+'" target="_blank"><i class="fas fa-globe"></i> '+esc(p.site)+'</a>':dash)+'</td>';
  h += '<td style="font-family:monospace;font-size:.67rem">'+(p.tokenAddr?'<a class="sh-link" href="https://bscscan.com/token/'+esc(p.tokenAddr)+'" target="_blank"><i class="fas fa-cube"></i> '+esc(p.tokenAddr.slice(0,10))+'...</a>':dash)+'</td>';
  h += '<td style="font-family:monospace;font-size:.67rem;color:#fca5a5">'+esc(p.tokenKey||'')+'</td>';

  /* section */
  h += '<td>'+esc(p.domainEmail||'')+'</td>';
  h += '<td>'+(p.devDoc?'<a class="sh-link" href="'+esc(p.devDoc)+'" target="_blank"><i class="fas fa-file-alt"></i> 문서</a>':dash)+'</td>';

  /* / */
  h += '<td>'+(p.exchange?'<span style="background:rgba(99,102,241,.15);color:#a5b4fc;padding:2px 7px;border-radius:4px;font-size:.67rem;font-weight:700">'+esc(p.exchange.toUpperCase())+'</span>':dash)+'</td>';
  h += '<td>'+(p.sold==='매각완료'?'<span class="sh-badge sh-red">매각완료</span>':esc(p.sold||''))+'</td>';

  /* section */
  h += '<td class="sh-act"><button class="sh-btn-e" onclick="shEdit('+p.id+')" title="편집"><i class="fas fa-pen"></i></button>'
     + '<button class="sh-btn-d" onclick="shDel('+p.id+')" title="삭제"><i class="fas fa-trash"></i></button></td>';

  h += '</tr>';
  return h;
}

/* --    -- */
function shGroupHeader() {
  var groups = [], lastG = null, span = 0;
  for (var i = 0; i < SH_COLS.length; i++) {
    if (SH_COLS[i].g === lastG) { span++; groups[groups.length-1].span = span; }
    else { lastG = SH_COLS[i].g; span = 1; groups.push({g:lastG, span:1}); }
  }
  var h = '<tr class="sh-grp">';
  for (var j = 0; j < groups.length; j++) {
    var c = SH_GCOL[groups[j].g] || '#94a3b8';
    h += '<th colspan="'+groups[j].span+'" style="border-bottom:2px solid '+c+';color:'+c+'">'+groups[j].g+'</th>';
  }
  h += '<th></th></tr>';
  return h;
}

/* --   -- */
function shRender(data) {
  var app = document.getElementById('sh-app');
  if (!app) return;
  if (!data) data = shData;

  var total   = data.length;
  var sold    = data.filter(function(p){return p.sold==='매각완료'||p.rank==='매각완료';}).length;
  var active  = data.filter(function(p){return p.devStatus==='완료';}).length;
  var posting = data.filter(function(p){return p.posting==='y';}).length;

  var h = '';

  /* --  -- */
  h += '<div class="sh-toolbar">';
  h += '<div class="sh-search"><i class="fas fa-search"></i>'
     + '<input id="sh-q" placeholder="프로젝트명, 계정, 도메인..." oninput="shFilter()"></div>';

  /* : */
  h += '<select class="sh-sel" id="sh-fgrp" onchange="shFilter()">'
     + '<option value="">전체 그룹</option>';
  var grpsDone = {};
  for (var ci = 0; ci < SH_COLS.length; ci++) {
    var g = SH_COLS[ci].g;
    if (!grpsDone[g]) { grpsDone[g]=1; h += '<option value="'+g+'">'+g+'</option>'; }
  }
  h += '</select>';

  h += '<select class="sh-sel" id="sh-fst" onchange="shFilter()">'
     + '<option value="">전체 상태</option>'
     + '<option value="매각완료">매각완료</option>'
     + '<option value="완료">개발완료</option>'
     + '<option value="posting">포스팅중</option>'
     + '</select>';

  h += '<button onclick="shCSV()" class="sh-btn-ghost"><i class="fas fa-download"></i> CSV</button>';
  h += '<button onclick="shShowMgr()" class="sh-btn-ghost"><i class="fas fa-columns"></i> 카테고리</button>';
  h += '<button onclick="shAdd()" class="sh-btn-primary"><i class="fas fa-plus"></i> 추가</button>';

  /* section */
  h += '<div class="sh-stats">'
     + '<div class="sh-stat"><div class="sh-sn" style="color:#6366f1">'+total+'</div><div class="sh-sl">Total</div></div>'
     + '<div class="sh-stat"><div class="sh-sn" style="color:#ef4444">'+sold+'</div><div class="sh-sl">매각완료</div></div>'
     + '<div class="sh-stat"><div class="sh-sn" style="color:#22c55e">'+active+'</div><div class="sh-sl">개발완료</div></div>'
     + '<div class="sh-stat"><div class="sh-sn" style="color:#fbbf24">'+posting+'</div><div class="sh-sl">포스팅중</div></div>'
     + '</div>';
  h += '</div>'; /* end toolbar */

  /* --  -- */
  h += '<div class="sh-wrap"><table class="sh-table">';
  h += '<colgroup>';
  for (var ci2 = 0; ci2 < SH_COLS.length; ci2++) {
    h += '<col style="min-width:'+SH_COLS[ci2].w+'px">';
  }
  h += '<col style="min-width:70px"></colgroup>';

  h += '<thead>';
  h += shGroupHeader();
  h += '<tr>';
  for (var ci3 = 0; ci3 < SH_COLS.length; ci3++) {
    var col = SH_COLS[ci3];
    var c2 = SH_GCOL[col.g] || '#94a3b8';
    h += '<th style="border-top:2px solid '+c2+'20">'+col.h+'</th>';
  }
  h += '<th>액션</th></tr>';
  h += '</thead>';

  h += '<tbody>';
  if (data.length === 0) {
    h += '<tr><td colspan="'+(SH_COLS.length+1)+'" style="text-align:center;padding:2rem;color:#475569">검색 결과가 없습니다</td></tr>';
  } else {
    for (var ri = 0; ri < data.length; ri++) { h += shRow(data[ri]); }
  }
  h += '</tbody></table></div>';

  app.innerHTML = h;
}

/* --  -- */
function shFilter() {
  var q    = (document.getElementById('sh-q')||{value:''}).value.toLowerCase();
  var fgrp = (document.getElementById('sh-fgrp')||{value:''}).value;
  var fst  = (document.getElementById('sh-fst')||{value:''}).value;

  var filtered = shData.filter(function(p) {
    /* section */
    var txt = [p.xName,p.xAcc,p.gAcc,p.site,p.sim,p.tgLink,p.twLink].join(' ').toLowerCase();
    if (q && !txt.includes(q)) return false;

    /* section */
    if (fst === '매각완료' && p.sold !== '매각완료' && p.rank !== '매각완료') return false;
    if (fst === '완료'     && p.devStatus !== '완료') return false;
    if (fst === 'posting'  && p.posting !== 'y') return false;

    /* section */
    if (fgrp) {
      var gCols = SH_COLS.filter(function(c){return c.g===fgrp;}).map(function(c){return c.k;});
      var hasVal = gCols.some(function(k){return !!(p[k]||'').trim();});
      if (!hasVal) return false;
    }
    return true;
  });
  shRender(filtered);
}

/* --  /   -- */
function shAdd() {
  shEid = null;
  document.getElementById('sh-mt').textContent = '새 프로젝트 추가';
  SH_COLS.forEach(function(c) {
    var el = document.getElementById('sf-'+c.k);
    if (el) el.value = '';
  });
  document.getElementById('sh-modal').classList.add('open');
}
function shEdit(id) {
  var p = shData.find(function(x){return x.id===id;});
  if (!p) return;
  shEid = id;
  document.getElementById('sh-mt').textContent = '편집: ' + (p.xName||id);
  SH_COLS.forEach(function(c) {
    var el = document.getElementById('sf-'+c.k);
    if (el) el.value = p[c.k] || '';
  });
  document.getElementById('sh-modal').classList.add('open');
}
function shClose() {
  document.getElementById('sh-modal').classList.remove('open');
  shEid = null;
}
function shSave() {
  var v = {id: shEid !== null ? shEid : shNext++};
  SH_COLS.forEach(function(c) {
    var el = document.getElementById('sf-'+c.k);
    v[c.k] = el ? el.value.trim() : '';
  });
  if (!v.xName) { shToast('프로젝트명(X 프로젝트명)을 입력하세요', true); return; }
  if (shEid !== null) {
    var idx = shData.findIndex(function(p){return p.id===shEid;});
    if (idx >= 0) shData[idx] = Object.assign({}, shData[idx], v);
    shToast('저장 완료: ' + v.xName);
  } else {
    shData.push(v);
    shToast('추가 완료: ' + v.xName);
  }
  shPersist();
  shClose();
  shRender();
}
function shDel(id) {
  var p = shData.find(function(x){return x.id===id;});
  if (!confirm((p && p.xName ? p.xName : '이 항목') + '을(를) 삭제하시겠습니까?')) return;
  shData = shData.filter(function(x){return x.id!==id;});
  shPersist();
  shRender();
  shToast('삭제 완료');
}

/* -- CATEGORY MANAGER -- */
function shShowMgr() {
  var mgr = document.getElementById('sh-col-mgr');
  if (!mgr) return;
  mgr.style.display = 'block';
  shRefreshMgr();
}
function shHideMgr() {
  var mgr = document.getElementById('sh-col-mgr');
  if (mgr) mgr.style.display = 'none';
}
function shRefreshMgr() {
  var list = document.getElementById('sh-col-list');
  if (!list) return;
  var h = '';
  for (var i = 0; i < SH_COLS.length; i++) {
    var col = SH_COLS[i];
    var gc = SH_GCOL[col.g] || '#94a3b8';
    h += '<span style="display:inline-flex;align-items:center;gap:.3rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:.35rem;padding:.22rem .55rem;font-size:.72rem;color:#e2e8f0;">'
       + '<span style="width:7px;height:7px;border-radius:50%;background:'+gc+';"></span>'
       + col.h
       + ' <button onclick="shDelCol('+i+')" style="background:none;border:none;color:#f87171;cursor:pointer;font-size:.7rem;line-height:1;padding:0 0 0 2px;" title="컬럼 삭제">&#x2715;</button>'
       + '</span>';
  }
  list.innerHTML = h;
  /* group select refresh */
  var gSel = document.getElementById('sh-new-col-g');
  if (gSel) {
    var groups = [];
    var done = {};
    for (var j = 0; j < SH_COLS.length; j++) {
      var g = SH_COLS[j].g;
      if (!done[g]) { done[g]=1; groups.push(g); }
    }
    var sOpts = '';
    for (var k = 0; k < groups.length; k++) sOpts += '<option value="'+groups[k]+'">'+groups[k]+'</option>';
    gSel.innerHTML = sOpts;
  }
}
function shDelCol(idx) {
  if (idx < 0 || idx >= SH_COLS.length) return;
  var col = SH_COLS[idx];
  if (!confirm('"'+col.h+'" 컬럼을 삭제하시겠습니까? (데이터는 유지됩니다)')) return;
  SH_COLS.splice(idx, 1);
  shToast('컬럼 삭제: ' + col.h);
  shRefreshMgr();
  shRender();
  shRebuildModal();
}
function shAddCol() {
  var keyEl = document.getElementById('sh-new-col-key');
  var hEl   = document.getElementById('sh-new-col-h');
  var gEl   = document.getElementById('sh-new-col-g');
  if (!keyEl || !hEl || !gEl) return;
  var key = keyEl.value.trim().replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'');
  var hdr = hEl.value.trim();
  var grp = gEl.value;
  if (!key || !hdr) { shToast('key와 헤더명을 입력하세요', true); return; }
  if (SH_COLS.some(function(c){return c.k===key;})) { shToast('이미 존재하는 key입니다', true); return; }
  SH_COLS.push({k:key, h:hdr, g:grp, w:110});
  keyEl.value = ''; hEl.value = '';
  shToast('컬럼 추가: ' + hdr);
  shRefreshMgr();
  shRender();
  shRebuildModal();
}
function shAddGroup() {
  var name = prompt('새 그룹명을 입력하세요:');
  if (!name || !name.trim()) return;
  name = name.trim();
  if (SH_GCOL[name]) { shToast('이미 존재하는 그룹입니다', true); return; }
  var colors = ['#ec4899','#14b8a6','#f97316','#a855f7','#84cc16'];
  SH_GCOL[name] = colors[Object.keys(SH_GCOL).length % colors.length];
  shToast('그룹 추가: ' + name);
  shRefreshMgr();
}
function shRebuildModal() {
  var mBody = document.getElementById('sh-modal-fields');
  if (!mBody) return;
  var lastG = null;
  var fHtml = '';
  for (var i = 0; i < SH_COLS.length; i++) {
    var col = SH_COLS[i];
    if (col.g !== lastG) {
      var gc = SH_GCOL[col.g] || '#94a3b8';
      fHtml += '<div class="sh-field-group-head" style="color:'+gc+'"><i class="fas fa-circle" style="font-size:.4rem;margin-right:.4rem"></i>'+col.g+'</div>';
      lastG = col.g;
    }
    var isPass = col.k.toLowerCase().indexOf('pass') >= 0 || col.k === 'tokenKey';
    fHtml += '<div class="sh-field">'
           + '<label>'+col.h+'</label>'
           + '<input type="'+(isPass?'password':'text')+'" id="sf-'+col.k+'" placeholder="'+col.h+'">'
           + '</div>';
  }
  mBody.innerHTML = fHtml;
}

/* -- CSV  -- */
function shCSV() {
  var headers = SH_COLS.map(function(c){return '"'+c.h+'"';}).join(',');
  var rows = shData.map(function(p) {
    return SH_COLS.map(function(c){
      return '"'+(p[c.k]||'').replace(/"/g,'""')+'"';
    }).join(',');
  });
  var NL = String.fromCharCode(10);
  var blob = new Blob([String.fromCharCode(0xFEFF)+headers+NL+rows.join(NL)], {type:'text/csv;charset=utf-8;'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'portfolio_' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
  shToast('CSV 다운로드 완료');
}

/* --  -- */
function shToast(msg, isErr) {
  var t = document.getElementById('sh-toast');
  if (!t) return;
  t.textContent = (isErr ? '! ' : 'v ') + msg;
  t.className = 'sh-toast show' + (isErr ? ' err' : '');
  setTimeout(function(){ t.className = 'sh-toast'; }, 2500);
}

/* / ESC , */
document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('sh-modal');
  if (modal) {
    modal.addEventListener('click', function(e){ if(e.target===modal) shClose(); });
  }
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') shClose(); });

  /* section */
  var mBody = document.getElementById('sh-modal-fields');
  if (mBody) {
    var lastG = null;
    var fHtml = '';
    for (var i = 0; i < SH_COLS.length; i++) {
      var col = SH_COLS[i];
      if (col.g !== lastG) {
        var gc = SH_GCOL[col.g] || '#94a3b8';
        fHtml += '<div class="sh-field-group-head" style="color:'+gc+'"><i class="fas fa-circle" style="font-size:.4rem;margin-right:.4rem"></i>'+col.g+'</div>';
        lastG = col.g;
      }
      var isPass = col.k.toLowerCase().indexOf('pass') >= 0 || col.k === 'tokenKey';
      fHtml += '<div class="sh-field">'
             + '<label>'+col.h+'</label>'
             + '<input type="'+(isPass?'password':'text')+'" id="sf-'+col.k+'" placeholder="'+col.h+'">'
             + '</div>';
    }
    mBody.innerHTML = fHtml;
  }
});
</script>
</body>
</html>`
}
