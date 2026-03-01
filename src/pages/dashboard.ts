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
    <button class="tab-btn active" onclick="showTab('tree')"><i class="fas fa-sitemap mr-1"></i> Tree View</button>
    <button class="tab-btn" onclick="showTab('grid')"><i class="fas fa-th-large mr-1"></i> Grid View</button>
    <button class="tab-btn" onclick="showTab('common')"><i class="fas fa-layer-group mr-1"></i> Common Features</button>
    <button class="tab-btn" onclick="showTab('required')"><i class="fas fa-clipboard-check mr-1"></i> Required Fields</button>
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

<script>
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  const tab = document.getElementById('tab-' + name);
  if (tab) tab.style.display = 'block';
  event.target.classList.add('active');
}
</script>
</body>
</html>`
}
