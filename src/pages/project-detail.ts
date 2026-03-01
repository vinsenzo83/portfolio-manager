const PROJECTS: Record<string, any> = {
  ailink: {
    id: 'ailink', name: 'AILINK', codename: 'ailink-web', version: 'v2.0.0', status: 'active',
    chain: 'BNB Chain', token: 'ALINK', supply: '20,000,000,000', tge: 'Q4 2025',
    description: 'AI-powered blockchain ecosystem with DeFi, Gaming, and Social features',
    category: 'DeFi + AI', color: '#3b82f6',
    contractAddress: '0x33c5502261c589a2EC4B1a6C4350aBF60ef47254',
    tokenKey: 'd0c65aaa3ff528bb9c649b71b37d74691b7d283efbce04e7390df101a5709e20',
    sourceCodeUrl: 'https://github.com/vinsenzo83/ailink-web/archive/refs/heads/main.zip',
    urls: { production: 'https://aichainlabs.xyz', pages: 'https://ailink-web.pages.dev', github: 'https://github.com/vinsenzo83/ailink-web', bscscan: 'https://bscscan.com/token/0x33c5502261c589a2EC4B1a6C4350aBF60ef47254', twitter: 'https://x.com/AiLink_Official', telegram: 'https://t.me/AiLink_Official' },
    team: [{ name: 'Alex Kim', role: 'CEO' }, { name: 'Sophia Nguyen', role: 'CTO' }, { name: 'Daniel Park', role: 'CMO' }],
    tokenomics: [
      { name: 'Ecosystem Rewards', pct: 45, cliff: 0, vesting: 36 },
      { name: 'Team & Advisors', pct: 15, cliff: 12, vesting: 36 },
      { name: 'Partnerships', pct: 15, cliff: 3, vesting: 30 },
      { name: 'Private Sale', pct: 15, cliff: 6, vesting: 18 },
      { name: 'Protocol Reserve', pct: 10, cliff: 0, vesting: 48 }
    ],
    pages: [
      { path: '/', name: 'Home', status: 'done' }, { path: '/login', name: 'Login', status: 'done' },
      { path: '/signup', name: 'Sign Up', status: 'done' }, { path: '/mypage', name: 'My Dashboard', status: 'done' },
      { path: '/vesting', name: 'Vesting', status: 'done' }, { path: '/whitepaper', name: 'Whitepaper', status: 'done' },
      { path: '/legal/privacy', name: 'Privacy', status: 'done' }, { path: '/legal/terms', name: 'Terms', status: 'done' },
      { path: '/legal/disclaimer', name: 'Disclaimer', status: 'done' }
    ],
    roadmap: [
      { phase: 'Phase 1', period: 'Q3 2025', status: 'completed', items: ['Website Launch', 'Token Contract', 'Community'] },
      { phase: 'Phase 2', period: 'Q4 2025', status: 'in-progress', items: ['TGE', 'PancakeSwap', 'Mini-Games'] },
      { phase: 'Phase 3', period: '2026', status: 'upcoming', items: ['AI Media Suite', 'DAO', 'Cross-chain'] },
      { phase: 'Phase 4', period: '2027+', status: 'future', items: ['Multichain', 'Mobile App', 'L2'] }
    ],
    partners: ['BNB Chain', 'Chainlink', 'OKX Web3', 'Google Cloud AI', 'CertiK'],
    progress: 72
  },
  davinci: {
    id: 'davinci', name: 'DaVinci AI', codename: 'davinci-ai', version: 'v3.5.0', status: 'active',
    chain: 'BNB Chain', token: 'DAVINCI', supply: '8,888,888,888', tge: 'Q4 2025',
    description: 'Web3-native AI agent creative platform with NFT Marketplace and DAO governance',
    category: 'AI + NFT', color: '#8b5cf6',
    urls: { production: 'https://davinciai.io', pages: 'https://davinci-ai.pages.dev', github: 'https://github.com/vinsenzo83/davinci-ai', twitter: 'https://x.com/DaVinciAiZ', telegram: 'https://t.me/DaVinciAiZ' },
    team: [{ name: 'Leonardo Chen', role: 'CEO' }, { name: 'Aria Nakamoto', role: 'CTO' }, { name: 'Marcus Rivera', role: 'CCO' }, { name: 'Yuki Tanaka', role: 'Head of Partnerships' }],
    tokenomics: [
      { name: 'Community Rewards', pct: 45, cliff: 0, vesting: 36 },
      { name: 'Strategic', pct: 15, cliff: 6, vesting: 24 },
      { name: 'Ecosystem', pct: 13, cliff: 3, vesting: 24 },
      { name: 'Team', pct: 12, cliff: 12, vesting: 36 },
      { name: 'Treasury', pct: 10, cliff: 0, vesting: 48 },
      { name: 'Artist Fund', pct: 5, cliff: 1, vesting: 12 }
    ],
    pages: [
      { path: '/', name: 'Home', status: 'done' }, { path: '/login', name: 'Login', status: 'done' },
      { path: '/agents', name: 'AI Agents', status: 'done' }, { path: '/create/image', name: 'Image Studio', status: 'done' },
      { path: '/create/video', name: 'Video Lab', status: 'done' }, { path: '/mypage', name: 'My Page', status: 'done' },
      { path: '/whitepaper', name: 'Whitepaper', status: 'done' }, { path: '/nft', name: 'NFT Market', status: 'planned' },
      { path: '/dao', name: 'DAO', status: 'planned' }
    ],
    roadmap: [
      { phase: 'Phase 1', period: 'Q1-Q2 2025', status: 'completed', items: ['Architecture', 'AI Framework', 'Launch'] },
      { phase: 'Phase 2', period: 'Q3-Q4 2025', status: 'in-progress', items: ['TGE', 'NFT Beta', '15+ Agents'] },
      { phase: 'Phase 3', period: 'Q1-Q2 2026', status: 'upcoming', items: ['DAO', 'Cross-chain NFT', 'Mobile'] },
      { phase: 'Phase 4', period: 'Q3-Q4 2026', status: 'future', items: ['AI SDK', 'Creator Monetization', 'L2'] },
      { phase: 'Phase 5', period: '2027+', status: 'future', items: ['Multichain', 'AI-Native L1', 'Global'] }
    ],
    partners: ['OpenAI', 'BNB Chain', 'PancakeSwap', 'Chainlink', 'IPFS', 'MetaMask', 'WalletConnect'],
    progress: 68
  }
}

export function projectDetailPage(id: string): string {
  const p = PROJECTS[id]
  if (!p) return `<html><body><h1>Project not found</h1><a href="/">Back</a></body></html>`

  const statusColors: Record<string, string> = {
    'completed': '#22c55e', 'in-progress': '#fbbf24', 'upcoming': '#3b82f6', 'future': '#64748b'
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.name} — Project Detail</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * { box-sizing: border-box; }
    body { background: #0a0a1a; color: #e2e8f0; font-family: system-ui, sans-serif; margin: 0; padding: 0; }
    .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 1.5rem; }
    .badge { padding: 2px 10px; border-radius: 999px; font-size: 0.7rem; font-weight: 600; }
    .status-done { background: rgba(34,197,94,0.15); color: #22c55e; }
    .status-planned { background: rgba(148,163,184,0.15); color: #94a3b8; }
    a { text-decoration: none; }
  </style>
</head>
<body>
<!-- Nav -->
<nav style="background: rgba(10,10,26,0.95); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0 1.5rem; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px);">
  <div style="display: flex; align-items: center; gap: 1rem;">
    <a href="/" style="color: #64748b; font-size: 0.875rem;"><i class="fas fa-arrow-left"></i> Back</a>
    <span style="color: #334155;">|</span>
    <span style="font-weight: 700; color: white;">${p.name}</span>
    <span style="background: rgba(255,255,255,0.1); color: #94a3b8; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem;">${p.version}</span>
  </div>
  <div style="display: flex; gap: 0.75rem;">
    <a href="${p.urls.github}" target="_blank" style="color: #94a3b8; font-size: 0.875rem;"><i class="fab fa-github"></i> GitHub</a>
    <a href="${p.urls.production}" target="_blank" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 0.35rem 1rem; border-radius: 0.5rem; font-size: 0.8rem; font-weight: 600;"><i class="fas fa-external-link-alt"></i> Live Site</a>
  </div>
</nav>

<!-- Hero -->
<div style="background: linear-gradient(135deg, ${p.color}20, #0a0a1a); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 2.5rem 2rem;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap;">
      <div style="width: 56px; height: 56px; background: ${p.color}30; border: 2px solid ${p.color}60; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: ${p.color};">
        <i class="fas fa-${id === 'ailink' ? 'link' : 'palette'}"></i>
      </div>
      <div>
        <h1 style="font-size: 2rem; font-weight: 800; color: white; margin: 0;">${p.name}</h1>
        <div style="color: #64748b; font-size: 0.875rem;">${p.codename} · ${p.category} · ${p.chain}</div>
      </div>
      <span style="background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); padding: 4px 12px; border-radius: 999px; font-size: 0.8rem; font-weight: 600; margin-left: auto;"><span style="width:8px;height:8px;background:#22c55e;border-radius:50%;display:inline-block;margin-right:6px;"></span>Active</span>
    </div>
    <p style="color: #94a3b8; max-width: 600px; line-height: 1.6;">${p.description}</p>
    <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem; flex-wrap: wrap;">
      ${Object.entries(p.urls).map(([key, url]) => `<a href="${url}" target="_blank" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; padding: 0.4rem 0.875rem; border-radius: 0.5rem; font-size: 0.8rem; display: flex; align-items: center; gap: 0.4rem; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">
        <i class="fas fa-${key === 'github' ? 'code-branch' : key === 'twitter' ? 'bird' : key === 'telegram' ? 'paper-plane' : key === 'bscscan' ? 'search' : 'globe'}"></i> ${key}
      </a>`).join('')}
    </div>
  </div>
</div>

<!-- Content -->
<div style="max-width: 1200px; margin: 0 auto; padding: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">

  <!-- Token Info -->
  <div class="card">
    <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-coins" style="color: #fbbf24;"></i> Token Information</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
      ${[['Symbol', p.token], ['Chain', p.chain], ['Total Supply', p.supply], ['TGE', p.tge], ['Standard', 'BEP-20'], ['Category', p.category]].map(([k, v]) => `
      <div style="background: rgba(255,255,255,0.03); border-radius: 0.5rem; padding: 0.75rem;">
        <div style="font-size: 0.7rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">${k}</div>
        <div style="font-size: 0.95rem; font-weight: 600; color: white; margin-top: 0.25rem;">${v}</div>
      </div>`).join('')}
    </div>
    ${p.contractAddress ? `
    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06);">
      <div style="font-size: 0.7rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Contract Address</div>
      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
        <code style="font-size: 0.72rem; color: #93c5fd; background: rgba(59,130,246,0.1); padding: 0.35rem 0.6rem; border-radius: 0.4rem; word-break: break-all; flex: 1;">${p.contractAddress}</code>
        <a href="https://bscscan.com/token/${p.contractAddress}" target="_blank" style="background: rgba(34,197,94,0.15); color: #4ade80; border: 1px solid rgba(34,197,94,0.3); padding: 0.3rem 0.6rem; border-radius: 0.4rem; font-size: 0.75rem; white-space: nowrap;"><i class="fas fa-external-link-alt"></i> BSCScan</a>
        <button onclick="copyToClipboard('${p.contractAddress}', this)" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; padding: 0.3rem 0.6rem; border-radius: 0.4rem; font-size: 0.75rem; cursor: pointer; white-space: nowrap;"><i class="fas fa-copy"></i> Copy</button>
      </div>
    </div>` : ''}
    ${p.tokenKey ? `
    <div style="margin-top: 0.75rem;">
      <div style="font-size: 0.7rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Private Key (Token)</div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <code id="token-key-display" style="font-size: 0.72rem; color: #f87171; background: rgba(239,68,68,0.08); padding: 0.35rem 0.6rem; border-radius: 0.4rem; flex: 1; letter-spacing: 0.08em;">&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;</code>
        <button onclick="toggleTokenKey(this)" data-key="${p.tokenKey}" style="background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3); color: #f87171; padding: 0.3rem 0.6rem; border-radius: 0.4rem; font-size: 0.75rem; cursor: pointer; white-space: nowrap;"><i class="fas fa-eye"></i> Show</button>
        <button onclick="copyToClipboard('${p.tokenKey}', this)" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; padding: 0.3rem 0.6rem; border-radius: 0.4rem; font-size: 0.75rem; cursor: pointer; white-space: nowrap;"><i class="fas fa-copy"></i> Copy</button>
      </div>
      <div style="font-size: 0.7rem; color: #ef4444; margin-top: 0.35rem;"><i class="fas fa-exclamation-triangle"></i> 절대 외부에 노출하지 마세요</div>
    </div>` : ''}
  </div>

  <!-- Tokenomics Chart -->
  <div class="card">
    <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-chart-pie" style="color: #8b5cf6;"></i> Token Allocation</h3>
    <canvas id="tokenChart" width="200" height="200" style="max-height: 180px;"></canvas>
  </div>

  <!-- Pages -->
  <div class="card">
    <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-file-alt" style="color: #22c55e;"></i> Pages (${p.pages.length})</h3>
    <div style="display: flex; flex-direction: column; gap: 0.4rem;">
      ${p.pages.map((pg: any) => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.02); border-radius: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <code style="color: #22c55e; font-size: 0.75rem; background: rgba(34,197,94,0.1); padding: 1px 6px; border-radius: 4px;">${pg.path}</code>
          <span style="font-size: 0.85rem; color: #cbd5e1;">${pg.name}</span>
        </div>
        <span class="badge ${pg.status === 'done' ? 'status-done' : 'status-planned'}">${pg.status}</span>
      </div>`).join('')}
    </div>
  </div>

  <!-- Roadmap -->
  <div class="card">
    <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-road" style="color: #f97316;"></i> Roadmap</h3>
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      ${p.roadmap.map((r: any) => `
      <div style="padding: 0.75rem; background: rgba(255,255,255,0.02); border-radius: 0.5rem; border-left: 3px solid ${statusColors[r.status] || '#64748b'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-weight: 600; color: white; font-size: 0.875rem;">${r.phase}: ${r.period}</span>
          <span style="background: ${statusColors[r.status]}20; color: ${statusColors[r.status]}; border: 1px solid ${statusColors[r.status]}40; padding: 1px 8px; border-radius: 999px; font-size: 0.7rem;">${r.status}</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${r.items.map((item: string) => `<span style="background: rgba(255,255,255,0.06); color: #94a3b8; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem;">${item}</span>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Team -->
  <div class="card">
    <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-users" style="color: #ec4899;"></i> Core Team</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.75rem;">
      ${p.team.map((m: any, i: number) => `
      <div style="text-align: center; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 0.75rem;">
        <div style="width: 44px; height: 44px; background: linear-gradient(135deg, ${p.color}, ${p.color}80); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem; font-size: 1rem; color: white;">${m.name[0]}</div>
        <div style="font-size: 0.85rem; font-weight: 600; color: white;">${m.name}</div>
        <div style="font-size: 0.75rem; color: #64748b;">${m.role}</div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Partners -->
  <div class="card">
    <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-handshake" style="color: #06b6d4;"></i> Partners</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
      ${p.partners.map((partner: string) => `<span style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); color: #cbd5e1; padding: 0.4rem 0.875rem; border-radius: 0.5rem; font-size: 0.8rem;">${partner}</span>`).join('')}
    </div>
  </div>

  <!-- Source Code & Assets Download -->
  ${p.sourceCodeUrl || p.contractAddress ? `
  <div class="card" style="grid-column: 1 / -1;">
    <h3 style="font-size: 1rem; font-weight: 700; color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-download" style="color: #a78bfa;"></i> Downloads & Assets</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
      ${p.sourceCodeUrl ? `
      <a href="${p.sourceCodeUrl}" target="_blank" style="display: flex; align-items: center; gap: 0.6rem; background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15)); border: 1px solid rgba(139,92,246,0.35); color: #c4b5fd; padding: 0.75rem 1.25rem; border-radius: 0.6rem; font-size: 0.875rem; font-weight: 600; transition: all 0.2s;" onmouseover="this.style.background='linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))'" onmouseout="this.style.background='linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))'">
        <i class="fab fa-github" style="font-size: 1.2rem;"></i>
        <div>
          <div>Source Code</div>
          <div style="font-size: 0.72rem; color: #94a3b8; font-weight: 400;">ZIP (main branch)</div>
        </div>
        <i class="fas fa-download" style="margin-left: 0.25rem; font-size: 0.8rem;"></i>
      </a>` : ''}
      ${p.contractAddress ? `
      <a href="https://bscscan.com/token/${p.contractAddress}" target="_blank" style="display: flex; align-items: center; gap: 0.6rem; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); color: #4ade80; padding: 0.75rem 1.25rem; border-radius: 0.6rem; font-size: 0.875rem; font-weight: 600; transition: all 0.2s;" onmouseover="this.style.background='rgba(34,197,94,0.2)'" onmouseout="this.style.background='rgba(34,197,94,0.1)'">
        <i class="fas fa-cube" style="font-size: 1.2rem;"></i>
        <div>
          <div>Token Contract</div>
          <div style="font-size: 0.72rem; color: #94a3b8; font-weight: 400;">${p.contractAddress.slice(0,18)}...</div>
        </div>
        <i class="fas fa-external-link-alt" style="margin-left: 0.25rem; font-size: 0.8rem;"></i>
      </a>
      <button onclick="copyToClipboard('${p.contractAddress}', this)" style="display: flex; align-items: center; gap: 0.6rem; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); color: #93c5fd; padding: 0.75rem 1.25rem; border-radius: 0.6rem; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(59,130,246,0.2)'" onmouseout="this.style.background='rgba(59,130,246,0.1)'">
        <i class="fas fa-copy" style="font-size: 1.2rem;"></i>
        <div>
          <div>Copy Address</div>
          <div style="font-size: 0.72rem; color: #94a3b8; font-weight: 400;">Contract Address</div>
        </div>
      </button>` : ''}
    </div>
  </div>` : ''}

</div>

<script>
const colors = ['#3b82f6','#8b5cf6','#22c55e','#fbbf24','#ec4899','#06b6d4','#f97316'];
const tokenomics = ${JSON.stringify(p.tokenomics)};
const ctx = document.getElementById('tokenChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: tokenomics.map(t => t.name + ' ' + t.pct + '%'),
    datasets: [{ data: tokenomics.map(t => t.pct), backgroundColor: colors, borderWidth: 2, borderColor: '#0a0a1a' }]
  },
  options: {
    responsive: true, maintainAspectRatio: true,
    plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 10 }, padding: 8 } } }
  }
});

var _tkShown = false;
function toggleTokenKey(btn) {
  var disp = document.getElementById('token-key-display');
  if (!disp) return;
  if (_tkShown) {
    disp.innerHTML = '&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;';
    btn.innerHTML = '<i class="fas fa-eye"></i> Show';
    _tkShown = false;
  } else {
    disp.textContent = btn.dataset.key;
    btn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide';
    _tkShown = true;
    setTimeout(function(){
      disp.innerHTML = '&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;';
      btn.innerHTML = '<i class="fas fa-eye"></i> Show';
      _tkShown = false;
    }, 10000);
  }
}
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(function() {
    var orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    btn.style.color = '#4ade80';
    setTimeout(function(){ btn.innerHTML = orig; btn.style.color = ''; }, 2000);
  });
}
</script>
</body>
</html>`
}
