export function mainPage(): string {
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

    .tab-btn { padding: 0.5rem 1.25rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; color: #94a3b8; border: 1px solid transparent; }
    .tab-btn.active { background: rgba(59,130,246,0.2); border-color: rgba(59,130,246,0.4); color: #93c5fd; }

    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    @media (max-width: 900px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .grid-3 { grid-template-columns: 1fr; } }
  </style>
</head>
<body>

<!-- Top Nav -->
<nav style="background: rgba(10,10,26,0.95); border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px);">
  <div style="max-width: 1400px; margin: 0 auto; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; height: 60px;">
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
<div style="max-width: 1400px; margin: 0 auto; padding: 2rem 1.5rem;">

  <!-- Tab Navigation -->
  <div style="display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap;">
    <button class="tab-btn active" id="tab-btn-sheet" onclick="showTab('sheet',this)"><i class="fas fa-table"></i> 스프레드시트</button>
    <button class="tab-btn" id="tab-btn-tree" onclick="showTab('tree',this)"><i class="fas fa-sitemap"></i> Tree View</button>
    <button class="tab-btn" id="tab-btn-grid" onclick="showTab('grid',this)"><i class="fas fa-th-large"></i> Grid View</button>
    <button class="tab-btn" id="tab-btn-common" onclick="showTab('common',this)"><i class="fas fa-layer-group"></i> Common Features</button>
    <button class="tab-btn" id="tab-btn-required" onclick="showTab('required',this)"><i class="fas fa-clipboard-check"></i> Required Fields</button>
    <a href="/template" class="tab-btn" style="text-decoration: none;"><i class="fas fa-file-code"></i> README Template</a>
  </div>

  <!-- SPREADSHEET TAB -->
  <div id="tab-sheet" class="tab-content">
    <div id="sh-app"></div>
  </div>

  <!-- ============ TREE VIEW ============ -->
  <div id="tab-tree" class="tab-content" style="display:none;">
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
          ['필수', '#22c55e', 'Blockchain', 'BNB Chain, Ethereum 등'],
          ['필수', '#22c55e', 'Token Standard', 'BEP-20, ERC-20 등'],
          ['필수', '#22c55e', 'Contract Address', '배포된 컨트랙트 주소'],
          ['필수', '#22c55e', 'TGE Date', '토큰 발행 예정일'],
          ['필수', '#22c55e', 'DEX Listing', 'PancakeSwap, Uniswap 등']
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

</div><!-- end main content -->

<!-- Footer -->
<footer style="border-top: 1px solid rgba(255,255,255,0.06); padding: 1.5rem; text-align: center; color: #475569; font-size: 0.8rem; margin-top: 3rem;">
  Blockchain Portfolio Manager · vinsenzo83 · Built with Hono + Cloudflare Pages
</footer>

<style>
.sh-tb{display:flex;align-items:center;gap:.55rem;flex-wrap:wrap;margin-bottom:.65rem;}
.sh-srch{display:flex;align-items:center;gap:.3rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:.4rem;padding:.28rem .6rem;flex:1;max-width:250px;}
.sh-srch input{background:none;border:none;outline:none;color:#e2e8f0;font-size:.78rem;width:100%;}
.sh-sel{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:.4rem;padding:.28rem .55rem;color:#e2e8f0;font-size:.75rem;outline:none;cursor:pointer;}
.sh-sts{display:flex;gap:.9rem;margin-left:auto;}
.sh-sn{font-size:.88rem;font-weight:700;}.sh-sl{font-size:.6rem;color:#64748b;text-transform:uppercase;}
.sh-wrap{overflow-x:auto;overflow-y:auto;max-height:calc(100vh - 270px);border:1px solid rgba(255,255,255,.07);border-radius:.45rem;}
.sh-tbl{border-collapse:collapse;width:100%;min-width:2200px;font-size:.73rem;}
.sh-tbl thead th{background:#181830;border:1px solid rgba(255,255,255,.06);padding:.42rem .55rem;font-size:.66rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#64748b;white-space:nowrap;position:sticky;top:0;z-index:10;}
.sh-tbl thead tr.grp th{background:rgba(99,102,241,.07);color:#a78bfa;font-size:.61rem;padding:.25rem .55rem;}
.sh-tbl tbody tr{border-bottom:1px solid rgba(255,255,255,.04);}
.sh-tbl tbody tr:hover{background:rgba(255,255,255,.03);}
.sh-tbl tbody tr.sold-r{opacity:.55;}
.sh-tbl td{border:1px solid rgba(255,255,255,.04);padding:.4rem .55rem;vertical-align:middle;white-space:nowrap;max-width:190px;overflow:hidden;text-overflow:ellipsis;}
.sh-bdg{display:inline-flex;align-items:center;gap:2px;padding:2px 7px;border-radius:999px;font-size:.62rem;font-weight:700;}
.sh-sold{background:rgba(239,68,68,.12);color:#ef4444;border:1px solid rgba(239,68,68,.2);}
.sh-done{background:rgba(34,197,94,.11);color:#22c55e;border:1px solid rgba(34,197,94,.2);}
.sh-prog{background:rgba(251,191,36,.11);color:#fbbf24;border:1px solid rgba(251,191,36,.2);}
.sh-lnk{color:#60a5fa;text-decoration:none;font-size:.7rem;display:inline-flex;align-items:center;gap:2px;}
.sh-lnk:hover{text-decoration:underline;}
.sh-pw{font-family:monospace;color:#64748b;cursor:pointer;font-size:.7rem;}
.sh-pw:hover{color:#e2e8f0;}
.sh-ac{display:flex;gap:.22rem;}
.sh-ab{background:none;border:none;cursor:pointer;padding:.18rem .32rem;border-radius:.28rem;font-size:.68rem;transition:all .14s;}
.sh-ab.e{color:#60a5fa;}.sh-ab.e:hover{background:rgba(96,165,250,.14);}
.sh-ab.d{color:#ef4444;}.sh-ab.d:hover{background:rgba(239,68,68,.14);}
.col-act{position:sticky;right:0;background:#181830;z-index:5;min-width:65px;}
.sh-mb{display:none;position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:500;align-items:center;justify-content:center;}
.sh-mb.open{display:flex;}
.sh-mc{background:#181830;border:1px solid rgba(255,255,255,.1);border-radius:.7rem;padding:1.4rem;width:92%;max-width:660px;max-height:90vh;overflow-y:auto;}
.sh-mc h3{font-size:.9rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:.4rem;}
.sh-mg{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;}
.sh-fl label{display:block;font-size:.65rem;color:#64748b;margin-bottom:.2rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;}
.sh-fl input,.sh-fl select{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:.36rem;padding:.38rem .55rem;color:#e2e8f0;font-size:.77rem;outline:none;}
.sh-fl input:focus{border-color:#6366f1;}
.sh-mf{display:flex;justify-content:flex-end;gap:.4rem;margin-top:.9rem;padding-top:.8rem;border-top:1px solid rgba(255,255,255,.07);}
#sh-toast{position:fixed;bottom:1.4rem;left:50%;transform:translateX(-50%) translateY(80px);background:rgba(34,197,94,.92);color:white;padding:.48rem 1.1rem;border-radius:.42rem;font-size:.77rem;font-weight:600;transition:transform .25s;z-index:999;pointer-events:none;}
#sh-toast.show{transform:translateX(-50%) translateY(0);}
#sh-toast.err{background:rgba(239,68,68,.92);}
</style>

<!-- MODAL -->
<div class="sh-mb" id="sh-modal">
  <div class="sh-mc">
    <h3><i class="fas fa-edit" style="color:#6366f1;"></i> <span id="sh-mt">Edit Project</span></h3>
    <div class="sh-mg">
      <div class="sh-fl"><label>SIM Card No.</label><input id="sf-sim"></div>
      <div class="sh-fl"><label>매각 순위</label><input id="sf-rank"></div>
      <div class="sh-fl"><label>팔로워수</label><input id="sf-followers"></div>
      <div class="sh-fl"><label>개발진행상황</label><select id="sf-devStatus"><option value="">-</option><option value="완료">완료</option><option value="진행중">진행중</option><option value="매각완료">매각완료</option></select></div>
      <div class="sh-fl"><label>포스팅 시작여부</label><select id="sf-posting"><option value="">-</option><option value="y">y</option><option value="n">n</option></select></div>
      <div class="sh-fl"><label>Total Posts</label><input id="sf-posts" type="number"></div>
      <div class="sh-fl"><label>X 프로젝트명</label><input id="sf-xName"></div>
      <div class="sh-fl"><label>X 계정</label><input id="sf-xAcc"></div>
      <div class="sh-fl"><label>X 비밀번호</label><input id="sf-xPass"></div>
      <div class="sh-fl"><label>Google 프로젝트명</label><input id="sf-gName"></div>
      <div class="sh-fl"><label>Gmail</label><input id="sf-gAcc"></div>
      <div class="sh-fl"><label>Google 비밀번호</label><input id="sf-gPass"></div>
      <div class="sh-fl"><label>Telegram 프로젝트명</label><input id="sf-tgName"></div>
      <div class="sh-fl"><label>Telegram 링크</label><input id="sf-tgLink"></div>
      <div class="sh-fl"><label>Twitter 프로젝트명</label><input id="sf-twName"></div>
      <div class="sh-fl"><label>Twitter 링크</label><input id="sf-twLink"></div>
      <div class="sh-fl"><label>사이트</label><input id="sf-site"></div>
      <div class="sh-fl" style="grid-column:1/-1"><label>Token Address</label><input id="sf-tokenAddr"></div>
      <div class="sh-fl" style="grid-column:1/-1"><label>Token Key</label><input id="sf-tokenKey"></div>
      <div class="sh-fl"><label>도메인 이메일</label><input id="sf-domainEmail"></div>
      <div class="sh-fl"><label>개발문서 URL</label><input id="sf-devDoc"></div>
      <div class="sh-fl"><label>진행거래소</label><input id="sf-exchange"></div>
      <div class="sh-fl"><label>매각여부</label><select id="sf-sold"><option value="">-</option><option value="매각완료">매각완료</option><option value="진행중">진행중</option></select></div>
    </div>
    <div class="sh-mf">
      <button class="tab-btn" onclick="shClose()">취소</button>
      <button onclick="shSaveM()" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:.38rem 1rem;border-radius:.4rem;font-size:.78rem;font-weight:600;border:none;cursor:pointer;"><i class="fas fa-save"></i> 저장</button>
    </div>
  </div>
</div>
<div id="sh-toast"></div>

<script>
function showTab(name, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  const tab = document.getElementById('tab-' + name);
  if (tab) tab.style.display = 'block';
  if (btn) btn.classList.add('active');
  if (name === 'sheet') shRender();
}
document.addEventListener('DOMContentLoaded', () => {
  showTab('sheet', document.getElementById('tab-btn-sheet'));
});

// ── DATA ──
const SH_KEY = 'sh_v2';
const SH_DEF = [
  {"id":1,"sim":"","rank":"매각완료","followers":"26k","devStatus":"","posting":"","posts":"","xName":"mole","xAcc":"MoleSmash","xPass":"rhkdtp00!!","gName":"mole","gAcc":"moletaptap@gmail.com","gPass":"rhkdtp00!!","tgName":"mole","tgLink":"https://t.me/MoleOfficialchannel","twName":"mole","twLink":"https://x.com/MoleSmash","site":"molesmash.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"mexc","sold":"매각완료"},
  {"id":2,"sim":"880 1601929592","rank":"매각완료","followers":"200","devStatus":"매각완료","posting":"y","posts":"232","xName":"tonixai","xAcc":"@TonixAiOfficial","xPass":"Abcd@1233","gName":"tonnixai","gAcc":"mrstefan45678@gmail.com","gPass":"12345@Abcd","tgName":"tonixai","tgLink":"https://t.me/tonixaiOfficial","twName":"tonixai","twLink":"https://x.com/TonixAiOfficial","site":"tonixai.org","tokenAddr":"0x91025973e28d2CC43C42A5b1A2308F5Fe4AAf436","tokenKey":"de935095fa09f9e198c6dcd48d72b42fd38db51cbc92013241d96a747afc8ae0","domainEmail":"","devDoc":"","exchange":"mexc","sold":"매각완료"},
  {"id":3,"sim":"","rank":"","followers":"","devStatus":"완료","posting":"y","posts":"98","xName":"DaVinci AI","xAcc":"@DVinciAiZ","xPass":"Abcd@1233","gName":"DaVinci AI","gAcc":"davinciai59sala@gmail.com","gPass":"Abcd@1233","tgName":"DaVinci AI","tgLink":"https://t.me/DaVinciAiZ","twName":"DaVinci AI","twLink":"https://x.com/DVinciAiZ","site":"davinciai.io","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"https://docs.google.com/document/d/1tTYRudGDhRK91Mo81uRNdxfD6Mpc4FKWwJU8k8rgpWU/edit","exchange":"mexc","sold":""},
  {"id":4,"sim":"","rank":"","followers":"","devStatus":"완료","posting":"y","posts":"118","xName":"AiLink","xAcc":"@AiLink_Official","xPass":"Abcd@1233","gName":"AiLink","gAcc":"ailinkofficial.net@gmail.com","gPass":"Abcd@1233","tgName":"AiLink","tgLink":"https://t.me/AiLink_Official","twName":"AiLink","twLink":"https://x.com/AiLink_Official","site":"aichainlabs.xyz","tokenAddr":"0x33c5502261c589a2EC4B1a6C4350aBF60ef47254","tokenKey":"d0c65aaa3ff528bb9c649b71b37d74691b7d283efbce04e7390df101a5709e20","domainEmail":"","devDoc":"https://docs.google.com/document/d/1p-Lk94S_KjtVfKo4W1cbqqhdkMkTvxc8JGEd4V-3IAc/edit","exchange":"mexc","sold":""},
  {"id":5,"sim":"","rank":"","followers":"","devStatus":"","posting":"y","posts":"49","xName":"visixion","xAcc":"@visixion","xPass":"Abcd@1234","gName":"visixion","gAcc":"mdrazzakcom@gmail.com","gPass":"Abcd@1234","tgName":"visixion","tgLink":"https://t.me/visixion_official","twName":"visixion","twLink":"https://x.com/visixion","site":"visixion.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"https://docs.google.com/document/d/1IWtQEXcwGAlEDDIiVPucllIeVrUAR-nIQ3u5cpwKpfA/edit","exchange":"mexc","sold":""},
  {"id":6,"sim":"","rank":"","followers":"","devStatus":"","posting":"y","posts":"35","xName":"mynforge","xAcc":"@mynforge","xPass":"Abcd@1234","gName":"mynforge","gAcc":"mynforge@gmail.com","gPass":"Abcd@1234","tgName":"mynforge","tgLink":"https://t.me/mynforge","twName":"mynforge","twLink":"https://x.com/mynforge","site":"mynforge.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"mexc","sold":""},
  {"id":7,"sim":"","rank":"매각완료","followers":"25k","devStatus":"매각완료","posting":"y","posts":"98","xName":"Aivoryn","xAcc":"@Aivoryn_officia","xPass":"rhkdtp00!!","gName":"Aivoryn","gAcc":"meow830417@gmail.com","gPass":"rhkdtp00!!","tgName":"Aivoryn","tgLink":"https://t.me/Aivoryn","twName":"Aivoryn","twLink":"https://x.com/Aivoryn_officia","site":"aivoryn.xyz","tokenAddr":"0xEc24290f0F0C88075558739777090DcB9fef4F04","tokenKey":"c18dc9089231b08c3c8cc2733ea0826986631a31ca0536d50c1e22cb8054da63","domainEmail":"","devDoc":"","exchange":"","sold":"매각완료"},
  {"id":8,"sim":"","rank":"","followers":"","devStatus":"","posting":"y","posts":"24","xName":"Synthoryx","xAcc":"@Synthoryx","xPass":"Abcd@1234","gName":"Synthoryx","gAcc":"synthoryx50@gmail.com","gPass":"Abcd@1234","tgName":"Synthoryx","tgLink":"https://t.me/Synthoryx","twName":"Synthoryx","twLink":"https://x.com/Synthoryx","site":"synthoryx.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":9,"sim":"","rank":"","followers":"","devStatus":"","posting":"y","posts":"28","xName":"mindvoria","xAcc":"@mindvoria","xPass":"Abcd@1234","gName":"mindvoria","gAcc":"mindvoria@gmail.com","gPass":"Abcd@1234","tgName":"mindvoria","tgLink":"https://t.me/mindvoria","twName":"mindvoria","twLink":"https://x.com/mindvoria","site":"mindvoria.org","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":10,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"intellora","xAcc":"@IntelloraAi","xPass":"Abcd@1234","gName":"intellora","gAcc":"intellora3@gmail.com","gPass":"Abcd@1234","tgName":"intellora","tgLink":"https://t.me/intellora_Official","twName":"intellora","twLink":"https://x.com/IntelloraAi","site":"intellora.org","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":11,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"Cognarex","xAcc":"@Cognarex","xPass":"Abcd@1234","gName":"Cognarex","gAcc":"cognarex@gmail.com","gPass":"Abcd@1234","tgName":"Cognarex","tgLink":"https://t.me/Cognarex","twName":"Cognarex","twLink":"https://x.com/Cognarex","site":"cognarex.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":12,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"Neuravix","xAcc":"@Neuravix","xPass":"Abcd@1234","gName":"Neuravix","gAcc":"neuravix812@gmail.com","gPass":"Abcd@1234","tgName":"Neuravix","tgLink":"https://t.me/Neuravix_Official","twName":"Neuravix","twLink":"https://x.com/Neuravix","site":"neuravix.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":13,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"Omnivora","xAcc":"@OmnivoraAi","xPass":"Abcd@1234","gName":"Omnivora","gAcc":"omnivora270@gmail.com","gPass":"Abcd@1244","tgName":"Omnivora","tgLink":"https://t.me/OnivoraAi","twName":"Omnivora","twLink":"https://x.com/OmnivoraAi","site":"omnivora.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":14,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"ZENIQA","xAcc":"@ZeniqaAi","xPass":"Abcd@1234","gName":"ZENIQA","gAcc":"zeniqa3@gmail.com","gPass":"Abcd@1234","tgName":"ZENIQA","tgLink":"https://t.me/ZeniqaAi","twName":"ZENIQA","twLink":"https://x.com/ZeniqaAi","site":"zeniqa.org","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":15,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"SYNTRAQ","xAcc":"@SyntraqAi","xPass":"Abcd@1234","gName":"SYNTRAQ","gAcc":"syntraq592@gmail.com","gPass":"Abcd@1234","tgName":"SYNTRAQ","tgLink":"https://t.me/SyntraqAi","twName":"SYNTRAQ","twLink":"https://x.com/SyntraqAi","site":"syntraq.org","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":16,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"ALTRYN","xAcc":"@AltrynAi","xPass":"Abcd@1234","gName":"ALTRYN","gAcc":"alryn29@gmail.com","gPass":"Abcd@1234","tgName":"ALTRYN","tgLink":"https://t.me/Altryn","twName":"ALTRYN","twLink":"https://x.com/AltrynAi","site":"altryn.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":17,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"TYRIONIX","xAcc":"@Tyrionix_X","xPass":"Abcd@1234","gName":"TYRIONIX","gAcc":"tyrionix42@gmail.com","gPass":"Abcd@1234","tgName":"TYRIONIX","tgLink":"https://t.me/TYRIONIX","twName":"TYRIONIX","twLink":"https://x.com/Tyrionix_X","site":"tyrionix.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":18,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"Aevyra","xAcc":"@Aevyra_Official","xPass":"Abcd@1234","gName":"Aevyra","gAcc":"aveyra260@gmail.com","gPass":"Abcd@1234","tgName":"Aevyra","tgLink":"https://t.me/Aevyra_official","twName":"Aevyra","twLink":"https://x.com/Aevyra_Official","site":"aevyra.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":19,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"Velynx","xAcc":"@Velynx_Official","xPass":"Abcd@1234","gName":"Velynx","gAcc":"Velynx23@gmail.com","gPass":"Abcd@1234","tgName":"Velynx","tgLink":"https://t.me/Velynx_Official","twName":"Velynx","twLink":"https://x.com/Velynx_Official","site":"velynx.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":20,"sim":"","rank":"","followers":"","devStatus":"","posting":"","posts":"","xName":"Yuvin","xAcc":"@Yuvin_Official","xPass":"Abcd@1234","gName":"Yuvin","gAcc":"Yuvin957@gmail.com","gPass":"Abcd@1234","tgName":"Yuvin","tgLink":"https://t.me/Yuvin_Official","twName":"Yuvin","twLink":"https://x.com/Yuvin_Official","site":"yuvin.xyz","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":21,"sim":"","rank":"","followers":"7k","devStatus":"","posting":"y","posts":"","xName":"LUMORAI","xAcc":"@LUMORAI_OP","xPass":"rhkdtp00!!","gName":"LUMORAI","gAcc":"catnipsprint@gmail.com","gPass":"rhkdtp00!!","tgName":"LUMORAI","tgLink":"","twName":"LUMORAI","twLink":"https://x.com/LUMORAI_OP","site":"","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""},
  {"id":22,"sim":"","rank":"","followers":"24k","devStatus":"","posting":"y","posts":"","xName":"ZENTARAI","xAcc":"@intellora_","xPass":"rhkdtp00!!","gName":"mole","gAcc":"moletaptap@gmail.com","gPass":"rhkdtp00!!","tgName":"ZENTARAI","tgLink":"","twName":"ZENTARAI","twLink":"https://x.com/intellora_","site":"","tokenAddr":"","tokenKey":"","domainEmail":"","devDoc":"","exchange":"","sold":""}
];
let shData = JSON.parse(localStorage.getItem(SH_KEY) || 'null') || SH_DEF.map(d=>({...d}));
let shNext = Math.max(...shData.map(p=>p.id)) + 1;
let shEid = null;
const shKeys = ['sim','rank','followers','devStatus','posting','posts','xName','xAcc','xPass','gName','gAcc','gPass','tgName','tgLink','twName','twLink','site','tokenAddr','tokenKey','domainEmail','devDoc','exchange','sold'];

function shPersist() { localStorage.setItem(SH_KEY, JSON.stringify(shData)); }

function shRow(p) {
  const s = p.sold==='매각완료'||p.rank==='매각완료';
  const e = function(v){return (v||'').replace(/"/g,'&quot;').replace(/</g,'&lt;');};
  const dash = '<span style=color:#475569>-</span>';
  var cells = '';
  cells += '<td>'+(p.sim||dash)+'</td>';
  cells += '<td>'+(p.rank==='매각완료'?'<span class=sh-bdg style="background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3);padding:2px 7px;border-radius:99px;font-size:.67rem;">매각완료</span>':p.rank||dash)+'</td>';
  cells += '<td>'+(p.followers?'<b style=color:#fbbf24>'+p.followers+'</b>':dash)+'</td>';
  cells += '<td>'+(p.devStatus==='완료'?'<span class=sh-bdg style="background:rgba(34,197,94,.15);color:#4ade80;border:1px solid rgba(34,197,94,.3);padding:2px 7px;border-radius:99px;font-size:.67rem;">완료</span>':p.devStatus==='매각완료'?'<span class=sh-bdg style="background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3);padding:2px 7px;border-radius:99px;font-size:.67rem;">매각완료</span>':p.devStatus||dash)+'</td>';
  cells += '<td>'+(p.posting==='y'?'<span style="background:rgba(34,197,94,.15);color:#4ade80;padding:2px 7px;border-radius:99px;font-size:.67rem;">Y</span>':dash)+'</td>';
  cells += '<td>'+(p.posts?'<b>'+p.posts+'</b>':dash)+'</td>';
  cells += '<td style=font-weight:600>'+(p.xName||'')+'</td>';
  cells += '<td>'+(p.xAcc?'<a class=sh-lnk href=https://x.com/'+p.xAcc.replace('@','')+' target=_blank><i class="fab fa-x-twitter"></i> '+p.xAcc+'</a>':'')+'</td>';
  cells += '<td><span class=sh-pw onclick="shPw(this)" data-pw="'+e(p.xPass)+'">••••••</span></td>';
  cells += '<td>'+(p.gName||'')+'</td>';
  cells += '<td style=color:#60a5fa>'+(p.gAcc||'')+'</td>';
  cells += '<td><span class=sh-pw onclick="shPw(this)" data-pw="'+e(p.gPass)+'">••••••</span></td>';
  cells += '<td>'+(p.tgName||'')+'</td>';
  cells += '<td>'+(p.tgLink?'<a class=sh-lnk href='+p.tgLink+' target=_blank><i class="fab fa-telegram"></i> '+p.tgLink.replace('https://t.me/','')+'</a>':'')+'</td>';
  cells += '<td>'+(p.twName||'')+'</td>';
  cells += '<td>'+(p.twLink?'<a class=sh-lnk href='+p.twLink+' target=_blank><i class="fab fa-x-twitter"></i> '+p.twLink.replace('https://x.com/','@').split('?')[0]+'</a>':'')+'</td>';
  cells += '<td>'+(p.site?'<a class=sh-lnk href=https://'+p.site+' target=_blank><i class="fas fa-globe"></i> '+p.site+'</a>':dash)+'</td>';
  cells += '<td style="font-family:monospace;font-size:.67rem">'+(p.tokenAddr?'<a class=sh-lnk href=https://bscscan.com/token/'+p.tokenAddr+' target=_blank><i class="fas fa-cube"></i> '+p.tokenAddr.slice(0,10)+'...</a>':dash)+'</td>';
  cells += '<td>'+(p.tokenKey?'<span class=sh-pw onclick="shPw(this)" data-pw="'+e(p.tokenKey)+'">••••••••••</span>':dash)+'</td>';
  cells += '<td>'+(p.domainEmail||dash)+'</td>';
  cells += '<td>'+(p.devDoc?'<a class=sh-lnk href='+p.devDoc+' target=_blank><i class="fas fa-file-alt"></i> 문서</a>':dash)+'</td>';
  cells += '<td>'+(p.exchange?'<span style="background:rgba(99,102,241,.15);color:#a5b4fc;padding:2px 6px;border-radius:4px;font-size:.66rem;font-weight:700">'+p.exchange.toUpperCase()+'</span>':dash)+'</td>';
  cells += '<td>'+(p.sold==='매각완료'?'<span class=sh-bdg style="background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3);padding:2px 7px;border-radius:99px;font-size:.67rem;">매각완료</span>':p.sold||dash)+'</td>';
  cells += '<td class=col-act><div class=sh-ac><button class="sh-ab e" onclick="shEdit('+p.id+')" title=편집><i class="fas fa-pen"></i></button><button class="sh-ab d" onclick="shDel('+p.id+')" title=삭제><i class="fas fa-trash"></i></button></div></td>';
  return '<tr class="'+(s?'sold-r':'')+'">'+cells+'</tr>';
}
function shRender(data) {
  var app = document.getElementById('sh-app'); if(!app) return;
  if(!data) data = shData;
  var total=data.length, sold=data.filter(function(p){return p.sold==='매각완료'||p.rank==='매각완료';}).length,
      active=data.filter(function(p){return p.devStatus==='완료';}).length,
      posting=data.filter(function(p){return p.posting==='y';}).length;
  var html = '';
  html += '<div class="sh-tb">';
  html += '<div class="sh-srch"><i class="fas fa-search" style="color:#64748b;font-size:.7rem;"></i><input id="sh-q" placeholder="프로젝트명, 계정, 도메인..." oninput="shFilter()"></div>';
  html += '<select class="sh-sel" id="sh-sf" onchange="shFilter()"><option value="">전체 상태</option><option value="매각완료">매각완료</option><option value="완료">개발완료</option><option value="y">포스팅중</option></select>';
  html += '<select class="sh-sel" id="sh-ef" onchange="shFilter()"><option value="">전체 거래소</option><option value="mexc">MEXC</option><option value="gate">Gate.io</option></select>';
  html += '<button onclick="shCSV()" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#e2e8f0;padding:.28rem .72rem;border-radius:.38rem;font-size:.73rem;cursor:pointer;"><i class="fas fa-download"></i> CSV</button>';
  html += '<button onclick="shAdd()" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:.28rem .82rem;border-radius:.38rem;font-size:.73rem;font-weight:600;border:none;cursor:pointer;"><i class="fas fa-plus"></i> 추가</button>';
  html += '<div class="sh-sts">';
  html += '<div><div class="sh-sn" style="color:#6366f1;">'+total+'</div><div class="sh-sl">Total</div></div>';
  html += '<div><div class="sh-sn" style="color:#ef4444;">'+sold+'</div><div class="sh-sl">매각완료</div></div>';
  html += '<div><div class="sh-sn" style="color:#22c55e;">'+active+'</div><div class="sh-sl">개발완료</div></div>';
  html += '<div><div class="sh-sn" style="color:#fbbf24;">'+posting+'</div><div class="sh-sl">포스팅중</div></div>';
  html += '</div></div>';
  html += '<div class="sh-wrap"><table class="sh-tbl"><thead>';
  html += '<tr class="grp">';
  html += '<th colspan="6" style="border-right:2px solid rgba(99,102,241,.2);">기본 정보</th>';
  html += '<th colspan="3" style="border-right:2px solid rgba(59,130,246,.2);">X (Twitter) 계정</th>';
  html += '<th colspan="3" style="border-right:2px solid rgba(34,197,94,.2);">Google 이메일</th>';
  html += '<th colspan="2" style="border-right:2px solid rgba(251,191,36,.2);">Telegram</th>';
  html += '<th colspan="2" style="border-right:2px solid rgba(168,85,247,.2);">Twitter</th>';
  html += '<th style="border-right:2px solid rgba(239,68,68,.2);">사이트</th>';
  html += '<th colspan="2" style="border-right:2px solid rgba(100,116,139,.2);">토큰</th>';
  html += '<th colspan="2" style="border-right:2px solid rgba(100,116,139,.2);">기타</th>';
  html += '<th colspan="2" style="border-right:2px solid rgba(100,116,139,.2);">거래소/매각</th>';
  html += '<th class="col-act"></th></tr>';
  html += '<tr><th>SIM No.</th><th>매각순위</th><th>팔로워수</th><th>개발상황</th><th>포스팅</th><th>포스트수</th>';
  html += '<th>X 프로젝트명</th><th>X 계정</th><th>X 비번</th>';
  html += '<th>G 프로젝트명</th><th>Gmail</th><th>G 비번</th>';
  html += '<th>TG 프로젝트명</th><th>TG 링크</th>';
  html += '<th>TW 프로젝트명</th><th>TW 링크</th>';
  html += '<th>사이트</th><th>Token Address</th><th>Token Key</th>';
  html += '<th>도메인이메일</th><th>개발문서</th><th>거래소</th><th>매각여부</th>';
  html += '<th class="col-act">액션</th></tr></thead><tbody>';
  html += data.map(shRow).join('');
  html += '</tbody></table></div>';
  app.innerHTML = html;
}

function shPw(el){if(el.textContent.includes('•')){el.textContent=el.dataset.pw;el.style.color='#e2e8f0';setTimeout(()=>{el.textContent='••••••';el.style.color='';},5000);}else{el.textContent='••••••';el.style.color='';}}
function shFilter(){const q=(document.getElementById('sh-q')||{value:''}).value.toLowerCase(),sf=(document.getElementById('sh-sf')||{value:''}).value,ef=(document.getElementById('sh-ef')||{value:''}).value;shRender(shData.filter(p=>{const s=[p.xName,p.xAcc,p.gAcc,p.site,p.sim].join(' ').toLowerCase();return(!q||s.includes(q))&&(!sf||p.devStatus===sf||p.rank===sf||p.posting===sf)&&(!ef||(p.exchange||'').toLowerCase().includes(ef));}));}
function shAdd(){shEid=null;document.getElementById('sh-mt').textContent='New Project';shKeys.forEach(k=>{const el=document.getElementById('sf-'+k);if(el)el.value='';});document.getElementById('sh-modal').classList.add('open');}
function shEdit(id){const p=shData.find(x=>x.id===id);if(!p)return;shEid=id;document.getElementById('sh-mt').textContent='Edit: '+(p.xName||id);shKeys.forEach(k=>{const el=document.getElementById('sf-'+k);if(el)el.value=p[k]||'';});document.getElementById('sh-modal').classList.add('open');}
function shClose(){document.getElementById('sh-modal').classList.remove('open');shEid=null;}
function shSaveM(){const v={};shKeys.forEach(k=>{const el=document.getElementById('sf-'+k);v[k]=el?el.value.trim():'';});if(!v.xName){shToast('프로젝트명을 입력하세요',true);return;}if(shEid!==null){const i=shData.findIndex(p=>p.id===shEid);if(i>=0)shData[i]={...shData[i],...v};shToast('저장: '+v.xName);}else{shData.push({id:shNext++,...v});shToast('추가: '+v.xName);}shPersist();shClose();shRender();}
function shDel(id){const p=shData.find(x=>x.id===id);if(!confirm((p?.xName||'이 항목')+'을 삭제?'))return;shData=shData.filter(x=>x.id!==id);shPersist();shRender();shToast('삭제 완료');}
function shToast(msg,err=false){const t=document.getElementById('sh-toast');t.textContent=(err?'⚠ ':'✓ ')+msg;t.className='show'+(err?' err':'');setTimeout(()=>t.className='',2500);}
function shCSV(){const h=['SIM','매각순위','팔로워수','개발상황','포스팅','포스트수','X프로젝트명','X계정','X비번','G프로젝트명','Gmail','G비번','TG프로젝트명','TG링크','TW프로젝트명','TW링크','사이트','토큰주소','토큰키','도메인이메일','개발문서','거래소','매각여부'];const rows=[h.join(','),...shData.map(p=>shKeys.map(k=>'"'+(p[k]||'').replace(/"/g,'""')+'"').join(','))];const b=new Blob([rows.join('\n')],{type:'text/csv;charset=utf-8;'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='portfolio_'+new Date().toISOString().slice(0,10)+'.csv';a.click();shToast('CSV 다운로드');}
document.getElementById('sh-modal').addEventListener('click',e=>{if(e.target.id==='sh-modal')shClose();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')shClose();});
</script>
</body>
</html>`
}
