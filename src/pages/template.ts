export function templatePage(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>README Standard Template — Portfolio Manager</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { background: #0a0a1a; color: #e2e8f0; font-family: system-ui, sans-serif; margin: 0; }
    pre { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 0.75rem; padding: 1.5rem; overflow-x: auto; font-size: 0.8rem; line-height: 1.7; color: #cbd5e1; }
    .btn-copy { background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); color: #c4b5fd; padding: 0.4rem 0.875rem; border-radius: 0.5rem; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
    .btn-copy:hover { background: rgba(139,92,246,0.3); }
    .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem; }
  </style>
</head>
<body>
<nav style="background: rgba(10,10,26,0.95); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0 1.5rem; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px);">
  <div style="display: flex; align-items: center; gap: 1rem;">
    <a href="/" style="color: #64748b; font-size: 0.875rem; text-decoration: none;"><i class="fas fa-arrow-left"></i> Back</a>
    <span style="color: #334155;">|</span>
    <span style="font-weight: 700; color: white;">README Standard Template</span>
  </div>
  <button class="btn-copy" onclick="copyAll()"><i class="fas fa-copy"></i> Copy Template</button>
</nav>

<div style="max-width: 1000px; margin: 2rem auto; padding: 0 1.5rem;">
  
  <div style="background: linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1)); border: 1px solid rgba(139,92,246,0.2); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem;">
    <h1 style="font-size: 1.5rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">
      <i class="fas fa-file-code" style="color: #8b5cf6;"></i> Blockchain Project README Standard Template
    </h1>
    <p style="color: #94a3b8; font-size: 0.875rem;">두 프로젝트(AILINK, DaVinci AI)의 공통 구조를 분석하여 만든 표준 README 템플릿입니다. 모든 신규 블록체인 프로젝트에 이 구조를 적용하세요.</p>
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
      <span style="background: rgba(34,197,94,0.15); color: #22c55e; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; border: 1px solid rgba(34,197,94,0.3);">AILINK 분석</span>
      <span style="background: rgba(139,92,246,0.15); color: #c4b5fd; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; border: 1px solid rgba(139,92,246,0.3);">DaVinci AI 분석</span>
      <span style="background: rgba(59,130,246,0.15); color: #93c5fd; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; border: 1px solid rgba(59,130,246,0.3);">표준화 완료</span>
    </div>
  </div>

  <div class="card">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h2 style="font-size: 1rem; font-weight: 700; color: white;"><i class="fas fa-file-alt" style="color: #3b82f6; margin-right: 0.5rem;"></i> README.md Standard Template</h2>
      <button class="btn-copy" onclick="copyTemplate()"><i class="fas fa-copy"></i> Copy</button>
    </div>
    <pre id="readme-template"># [PROJECT_NAME]

> [TAGLINE — One sentence that captures the project essence]

---

## 📌 Project Overview

| Field | Value |
|-------|-------|
| **Name** | [PROJECT_NAME] |
| **Codename** | [CODENAME] |
| **Version** | [v1.0.0] |
| **Owner** | [GITHUB_USERNAME] |
| **Status** | 🟢 Active / 🟡 Development / 🔵 Planned |
| **Category** | [e.g. DeFi + AI / AI + NFT] |
| **Created** | [YYYY-MM-DD] |
| **Last Updated** | [YYYY-MM-DD] |

---

## 🌐 Live URLs

| Type | URL |
|------|-----|
| **Production** | https://[DOMAIN.xyz] |
| **Cloudflare Pages** | https://[CODENAME].pages.dev |
| **GitHub** | https://github.com/[OWNER]/[CODENAME] |
| **Twitter/X** | https://x.com/[HANDLE] |
| **Telegram** | https://t.me/[HANDLE] |
| **BSCScan** | https://bscscan.com/token/[CONTRACT] |

---

## 🪙 Token Information

| Field | Value |
|-------|-------|
| **Token Symbol** | $[SYMBOL] |
| **Total Supply** | [X,XXX,XXX,XXX] |
| **Blockchain** | BNB Chain (BEP-20) |
| **Contract Address** | \`0x...\` |
| **TGE Date** | [Q4 2025] |
| **DEX Listing** | PancakeSwap |

### Token Allocation

| Category | % | Amount | Cliff | Vesting |
|----------|---|--------|-------|---------|
| [Category 1] | 45% | [X,XXX,XXX,XXX] | 0 months | 36 months |
| [Category 2] | 15% | [X,XXX,XXX,XXX] | 12 months | 36 months |
| [Category 3] | 15% | [X,XXX,XXX,XXX] | 3 months | 30 months |
| [Category 4] | 15% | [X,XXX,XXX,XXX] | 6 months | 18 months |
| [Category 5] | 10% | [X,XXX,XXX,XXX] | 0 months | 48 months |

---

## 📄 Completed Pages

| Path | Page Name | Status |
|------|-----------|--------|
| \`/\` | Home | ✅ Done |
| \`/login\` | Login / Wallet Connect | ✅ Done |
| \`/signup\` | Sign Up | ✅ Done |
| \`/mypage\` | My Dashboard | ✅ Done |
| \`/vesting\` | Vesting Schedule | ✅ Done |
| \`/whitepaper\` | Whitepaper | ✅ Done |
| \`/legal/privacy\` | Privacy Policy | ✅ Done |
| \`/legal/terms\` | Terms of Service | ✅ Done |
| \`/legal/disclaimer\` | Disclaimer | ✅ Done |

### Homepage Sections (14 required)
Hero → Trust Bar → Features → How It Works → Ecosystem → Tokenomics Chart → 
Vesting Schedule → Live Stats → Roadmap → Team → Partners → FAQ → Community CTA

---

## 🗺️ Roadmap

### Phase 1 — [Q1-Q2 2025] ✅ Completed
- [ ] [Milestone 1]
- [ ] [Milestone 2]

### Phase 2 — [Q3-Q4 2025] 🔄 In Progress
- [ ] TGE Launch
- [ ] DEX Listing
- [ ] [Feature Beta]

### Phase 3 — [2026] ⏳ Upcoming
- [ ] [Feature 1]
- [ ] [Feature 2]

### Phase 4 — [2027+] 🔮 Future
- [ ] [Long-term vision]

---

## 👥 Team

### Core Team
| Name | Role |
|------|------|
| [Name] | CEO |
| [Name] | CTO |
| [Name] | CMO |

---

## 🤝 Partners

[Partner 1] · [Partner 2] · [Partner 3] · [Partner 4] · [Partner 5]

---

## 🔐 Authentication (Demo)

| Method | Credentials |
|--------|-------------|
| Email | demo@[domain].io / Demo1234! |
| MetaMask | Simulated |
| WalletConnect | Simulated |

Session stored in \`localStorage\` key: \`[project]_user\`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Hosting** | Cloudflare Pages |
| **Runtime** | Cloudflare Workers (Edge) |
| **Framework** | Hono v4 (TypeScript) |
| **Build** | Vite v6 + @hono/vite-cloudflare-pages |
| **CLI** | Wrangler v4 |
| **Styling** | Tailwind CSS CDN |
| **Charts** | Chart.js |
| **Icons** | Font Awesome 6.4 |
| **Auth** | localStorage demo auth |

---

## 📁 Project Structure

\`\`\`
[CODENAME]/
├── src/
│   ├── index.tsx          # Main Hono router
│   └── pages/
│       ├── layout.ts      # Shared navbar + footer
│       ├── home.ts        # Home page (14 sections)
│       ├── login.ts       # Login / wallet connect
│       ├── signup.ts      # Registration
│       ├── mypage.ts      # User dashboard
│       ├── vesting.ts     # Token vesting
│       ├── whitepaper.ts  # Documentation
│       └── legal.ts       # Privacy/Terms/Disclaimer
├── public/static/         # Static assets
├── dist/                  # Build output
├── ecosystem.config.cjs   # PM2 config
├── wrangler.jsonc         # Cloudflare config
├── vite.config.ts         # Build config
├── package.json
└── README.md
\`\`\`

---

## 🚀 Deployment

### Platform
- **Cloudflare Pages** · Build: \`npm run build\` · Output: \`dist/\`
- **Production Branch**: main
- **Cloudflare Project**: [CODENAME]
- **SSL**: Auto via Cloudflare
- **CDN**: 200+ global PoPs

### Commands
\`\`\`bash
# Development
git clone https://github.com/[OWNER]/[CODENAME].git
cd [CODENAME] && npm install
npm run build && pm2 start ecosystem.config.cjs

# Deploy to production
npm run build
npx wrangler pages deploy dist --project-name [CODENAME]
\`\`\`

---

## 📦 Backup History

| Date | Version | Download | Notes |
|------|---------|----------|-------|
| [YYYY-MM-DD] | [v1.0.0] | [link] | Initial release |

---

## ⚠️ Disclaimer

$[SYMBOL] is a utility token and is NOT a security or investment product.
© [YEAR] [PROJECT_NAME]. All rights reserved.
</pre>
  </div>

  <!-- Common Layout Template -->
  <div class="card">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h2 style="font-size: 1rem; font-weight: 700; color: white;"><i class="fas fa-code" style="color: #22c55e; margin-right: 0.5rem;"></i> wrangler.jsonc Standard</h2>
      <button class="btn-copy" onclick="copyWrangler()"><i class="fas fa-copy"></i> Copy</button>
    </div>
    <pre id="wrangler-template">{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "[CODENAME]",
  "compatibility_date": "2024-01-01",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"]
}</pre>
  </div>

  <!-- ecosystem.config.cjs -->
  <div class="card">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h2 style="font-size: 1rem; font-weight: 700; color: white;"><i class="fas fa-cog" style="color: #fbbf24; margin-right: 0.5rem;"></i> ecosystem.config.cjs Standard</h2>
      <button class="btn-copy" onclick="copyPm2()"><i class="fas fa-copy"></i> Copy</button>
    </div>
    <pre id="pm2-template">module.exports = {
  apps: [{
    name: '[CODENAME]',
    script: 'npx',
    args: 'wrangler pages dev dist --ip 0.0.0.0 --port [PORT]',
    env: { NODE_ENV: 'development', PORT: [PORT] },
    watch: false,
    instances: 1,
    exec_mode: 'fork'
  }]
}</pre>
  </div>

</div>

<div id="toast" style="position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px); background: rgba(34,197,94,0.9); color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 600; transition: transform 0.3s; z-index: 1000; pointer-events: none;">
  <i class="fas fa-check"></i> Copied to clipboard!
</div>

<script>
function showToast() {
  const t = document.getElementById('toast');
  t.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => t.style.transform = 'translateX(-50%) translateY(100px)', 2000);
}
function copyTemplate() {
  navigator.clipboard.writeText(document.getElementById('readme-template').textContent);
  showToast();
}
function copyWrangler() {
  navigator.clipboard.writeText(document.getElementById('wrangler-template').textContent);
  showToast();
}
function copyPm2() {
  navigator.clipboard.writeText(document.getElementById('pm2-template').textContent);
  showToast();
}
function copyAll() {
  const all = document.getElementById('readme-template').textContent + '\\n\\n' + document.getElementById('wrangler-template').textContent;
  navigator.clipboard.writeText(all);
  showToast();
}
</script>
</body>
</html>`
}
