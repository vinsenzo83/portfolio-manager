# Blockchain Portfolio Manager

> 다수의 블록체인 프로젝트를 트리 형태로 관리하는 대시보드

---

## 📌 Project Overview

| Field | Value |
|-------|-------|
| **Name** | Blockchain Portfolio Manager |
| **Codename** | portfolio-manager |
| **Version** | v1.0.0 |
| **Owner** | vinsenzo83 |
| **Status** | 🟢 Active |
| **Created** | 2026-03-01 |

---

## 🌐 Live URLs

| Type | URL |
|------|-----|
| **Cloudflare Pages** | https://portfolio-manager-1jr.pages.dev |
| **GitHub** | https://github.com/vinsenzo83/portfolio-manager |
| **Sandbox** | https://3001-ifclimfdh50ocesbammad-cbeee0f9.sandbox.novita.ai |

---

## 🎯 Features

### Tree View (트리 뷰)
- vinsenzo83 루트 노드를 중심으로 모든 프로젝트가 트리 구조로 표시
- AILINK, DaVinci AI 프로젝트 카드 (진행률, 페이지 목록, 링크 포함)
- 새 프로젝트 추가 슬롯

### Grid View (그리드 뷰)
- 프로젝트 카드 갤러리 뷰
- 토큰 정보, 진행률, 링크 요약

### Common Features (공통 기능)
- 두 프로젝트의 공통 기술 스택 분석
- 공통 페이지 목록
- 공통 컴포넌트 목록
- 공통 배포 구조

### Required Fields (필수 항목)
- 8개 카테고리 × 5-7개 항목의 필수/권장 체크리스트
- 모든 신규 블록체인 프로젝트에 적용할 표준 기준

### README Template (README 템플릿)
- 표준 README.md 템플릿 (클립보드 복사 기능)
- wrangler.jsonc 표준 설정
- ecosystem.config.cjs PM2 표준 설정

---

## 📄 Pages

| Path | Description |
|------|-------------|
| `/` | Dashboard (Tree/Grid/Common/Required/Template 탭) |
| `/project/ailink` | AILINK 프로젝트 상세 페이지 |
| `/project/davinci` | DaVinci AI 프로젝트 상세 페이지 |
| `/add` | 새 프로젝트 추가 폼 |
| `/template` | README 표준 템플릿 |
| `/api/projects` | 전체 프로젝트 목록 API |
| `/api/projects/:id` | 개별 프로젝트 API |
| `/api/health` | 헬스 체크 |

---

## 📊 Managed Projects

| Project | Token | Chain | TGE | Status |
|---------|-------|-------|-----|--------|
| AILINK | ALINK | BNB Chain | Q4 2025 | Active |
| DaVinci AI | DAVINCI | BNB Chain | Q4 2025 | Active |

---

## 🔑 Common Required Fields (표준화된 필수 항목)

모든 블록체인 프로젝트 README에 반드시 포함해야 할 8가지 카테고리:

1. **프로젝트 정체성**: Name, Codename, Version, Owner, Status, Description
2. **토큰 정보**: Symbol, Supply, Chain, Contract, TGE, DEX
3. **URL & 소셜**: Production, Pages, GitHub, Twitter, Telegram
4. **배포 정보**: Platform, Build Command, Output Dir, Branch
5. **토큰노믹스**: Allocation Table, Cliff, Vesting, Chart
6. **팀 & 파트너**: Core Team, Roles, Partners List
7. **페이지 목록**: Home, Login, MyPage, Whitepaper, Vesting, Legal
8. **로드맵**: Phases, Periods, Status, Key Items

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Hosting** | Cloudflare Pages |
| **Framework** | Hono v4 (TypeScript) |
| **Build** | Vite v6 |
| **Styling** | Tailwind CSS CDN |
| **Charts** | Chart.js |
| **Icons** | Font Awesome 6.4 |

---

## 🚀 Deployment

```bash
# Development
cd portfolio-manager && npm install
npm run build && pm2 start ecosystem.config.cjs  # port 3001

# Deploy to production
npm run build
npx wrangler pages deploy dist --project-name portfolio-manager
```

---

## 📦 Backup History

| Date | Version | Notes |
|------|---------|-------|
| 2026-03-01 | v1.0.0 | Initial release |

---

© 2025 vinsenzo83. Built with Hono + Cloudflare Pages.
