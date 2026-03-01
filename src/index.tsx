import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { dashboardPage } from './pages/dashboard'
import { projectDetailPage } from './pages/project-detail'
import { addProjectPage } from './pages/add-project'
import { templatePage } from './pages/template'

const app = new Hono()

// Static files
app.use('/static/*', serveStatic({ root: './' }))

// Routes
app.get('/', (c) => c.html(dashboardPage()))
app.get('/project/:id', (c) => {
  const id = c.req.param('id')
  return c.html(projectDetailPage(id))
})
app.get('/add', (c) => c.html(addProjectPage()))
app.get('/template', (c) => c.html(templatePage()))

// API: Get all projects
app.get('/api/projects', (c) => {
  return c.json({ projects: PROJECTS_DATA })
})

// API: Get single project
app.get('/api/projects/:id', (c) => {
  const id = c.req.param('id')
  const project = PROJECTS_DATA.find(p => p.id === id)
  if (!project) return c.json({ error: 'Not found' }, 404)
  return c.json(project)
})

// Health check
app.get('/api/health', (c) => c.json({ status: 'ok', service: 'Blockchain Portfolio Manager', version: '3.0.0' }))

// Projects data (embedded)
const PROJECTS_DATA = [
  {
    id: 'ailink',
    name: 'AILINK',
    codename: 'ailink-web',
    version: 'v2.0.0',
    status: 'active',
    chain: 'BNB Chain',
    token: 'ALINK',
    supply: '20,000,000,000',
    contract: '0x33c5502261c589a2EC4B1a6C4350aBF60ef47254',
    tge: 'Q4 2025',
    description: 'AI-powered blockchain ecosystem with DeFi, Gaming, and Social features',
    category: 'DeFi + AI',
    urls: {
      production: 'https://aichainlabs.xyz',
      pages: 'https://ailink-web.pages.dev',
      github: 'https://github.com/vinsenzo83/ailink-web',
      twitter: 'https://x.com/AiLink_Official',
      telegram: 'https://t.me/AiLink_Official',
      bscscan: 'https://bscscan.com/token/0x33c5502261c589a2EC4B1a6C4350aBF60ef47254'
    },
    team: [
      { name: 'Alex Kim', role: 'CEO' },
      { name: 'Sophia Nguyen', role: 'CTO' },
      { name: 'Daniel Park', role: 'CMO' }
    ],
    tokenomics: [
      { name: 'Ecosystem Rewards', pct: 45, amount: '9,000,000,000', cliff: 0, vesting: 36 },
      { name: 'Team & Advisors', pct: 15, amount: '3,000,000,000', cliff: 12, vesting: 36 },
      { name: 'Partnerships', pct: 15, amount: '3,000,000,000', cliff: 3, vesting: 30 },
      { name: 'Private Sale', pct: 15, amount: '3,000,000,000', cliff: 6, vesting: 18 },
      { name: 'Protocol Reserve', pct: 10, amount: '2,000,000,000', cliff: 0, vesting: 48 }
    ],
    pages: [
      { path: '/', name: 'Home', status: 'done' },
      { path: '/login', name: 'Login', status: 'done' },
      { path: '/signup', name: 'Sign Up', status: 'done' },
      { path: '/mypage', name: 'My Dashboard', status: 'done' },
      { path: '/vesting', name: 'Vesting', status: 'done' },
      { path: '/whitepaper', name: 'Whitepaper', status: 'done' },
      { path: '/legal/privacy', name: 'Privacy Policy', status: 'done' },
      { path: '/legal/terms', name: 'Terms of Service', status: 'done' },
      { path: '/legal/disclaimer', name: 'Disclaimer', status: 'done' }
    ],
    roadmap: [
      { phase: 'Phase 1', period: 'Q3 2025', status: 'completed', items: ['Website Launch', 'Token Contract', 'Community Building'] },
      { phase: 'Phase 2', period: 'Q4 2025', status: 'in-progress', items: ['TGE', 'PancakeSwap Listing', 'Mini-Games Beta'] },
      { phase: 'Phase 3', period: '2026', status: 'upcoming', items: ['AI Media Suite', 'DAO Launch', 'Cross-chain Bridge'] },
      { phase: 'Phase 4', period: '2027+', status: 'future', items: ['Multichain', 'Mobile App', 'L2 Solution'] }
    ],
    techStack: ['Cloudflare Pages', 'Hono v4', 'TypeScript', 'Vite v6', 'Tailwind CSS', 'Chart.js'],
    partners: ['BNB Chain', 'Chainlink', 'OKX Web3', 'Google Cloud AI', 'CertiK'],
    progress: 72,
    color: '#3b82f6'
  },
  {
    id: 'davinci',
    name: 'DaVinci AI',
    codename: 'davinci-ai',
    version: 'v3.5.0',
    status: 'active',
    chain: 'BNB Chain',
    token: 'DAVINCI',
    supply: '8,888,888,888',
    contract: '',
    tge: 'Q4 2025',
    description: 'Web3-native AI agent creative platform with NFT Marketplace and DAO governance',
    category: 'AI + NFT',
    urls: {
      production: 'https://davinciai.io',
      pages: 'https://davinci-ai.pages.dev',
      github: 'https://github.com/vinsenzo83/davinci-ai',
      twitter: 'https://x.com/DaVinciAiZ',
      telegram: 'https://t.me/DaVinciAiZ',
      bscscan: ''
    },
    team: [
      { name: 'Leonardo Chen', role: 'CEO' },
      { name: 'Aria Nakamoto', role: 'CTO' },
      { name: 'Marcus Rivera', role: 'CCO' },
      { name: 'Yuki Tanaka', role: 'Head of Partnerships' }
    ],
    tokenomics: [
      { name: 'Community Rewards', pct: 45, amount: '4,000,000,000', cliff: 0, vesting: 36 },
      { name: 'Strategic', pct: 15, amount: '1,333,333,333', cliff: 6, vesting: 24 },
      { name: 'Ecosystem', pct: 13, amount: '1,155,555,556', cliff: 3, vesting: 24 },
      { name: 'Team', pct: 12, amount: '1,066,666,667', cliff: 12, vesting: 36 },
      { name: 'Treasury', pct: 10, amount: '888,888,889', cliff: 0, vesting: 48 },
      { name: 'Artist Fund', pct: 5, amount: '444,444,444', cliff: 1, vesting: 12 }
    ],
    pages: [
      { path: '/', name: 'Home', status: 'done' },
      { path: '/agents', name: 'AI Agents Marketplace', status: 'done' },
      { path: '/create/image', name: 'AI Image Studio', status: 'done' },
      { path: '/create/video', name: 'AI Video Lab', status: 'done' },
      { path: '/whitepaper', name: 'Whitepaper', status: 'done' },
      { path: '/mypage', name: 'My Page', status: 'done' },
      { path: '/login', name: 'Login', status: 'done' },
      { path: '/nft', name: 'NFT Marketplace', status: 'planned' },
      { path: '/dao', name: 'DAO Governance', status: 'planned' }
    ],
    roadmap: [
      { phase: 'Phase 1', period: 'Q1-Q2 2025', status: 'completed', items: ['Platform Architecture', 'AI Agent Framework', 'Website Launch'] },
      { phase: 'Phase 2', period: 'Q3-Q4 2025', status: 'in-progress', items: ['TGE', 'NFT Marketplace Beta', '15+ AI Agents'] },
      { phase: 'Phase 3', period: 'Q1-Q2 2026', status: 'upcoming', items: ['DAO Governance', 'Cross-chain NFT', 'Mobile App'] },
      { phase: 'Phase 4', period: 'Q3-Q4 2026', status: 'future', items: ['AI Agent SDK', 'Creator Monetization', 'L2 Deployment'] },
      { phase: 'Phase 5', period: '2027+', status: 'future', items: ['Multichain Expansion', 'AI-Native L1', 'Global Creator Economy'] }
    ],
    techStack: ['Cloudflare Pages', 'Hono v4', 'TypeScript', 'Vite v6', 'Tailwind CSS', 'Chart.js'],
    partners: ['OpenAI', 'BNB Chain', 'PancakeSwap', 'Chainlink', 'IPFS', 'MetaMask', 'WalletConnect'],
    progress: 68,
    color: '#8b5cf6'
  }
]

export default app
