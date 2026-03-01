# Blockchain Portfolio Manager v3.0.0

## 프로젝트 개요
- **이름**: Blockchain Portfolio Manager
- **버전**: v3.0.0
- **소유자**: vinsenzo83
- **목적**: 다수의 블록체인 프로젝트를 한 곳에서 관리하는 비공개 포트폴리오 관리 도구

## 배포 주소
- **Cloudflare Pages**: https://portfolio-manager-1jr.pages.dev
- **GitHub**: https://github.com/vinsenzo83/portfolio-manager

## 접속 방법
- 홈페이지 접속 시 비밀번호 입력 필요
- 비밀번호: `rhkdtp00!!`

## 주요 기능

### 탭 구성
| 탭 | 설명 |
|---|---|
| Tree View | 프로젝트 트리 구조 시각화 |
| Grid View | 그리드 카드 뷰 |
| Sheet | 22개 프로젝트 스프레드시트 관리 |
| Common Features | 공통 기술스택 및 컴포넌트 |
| Required Fields | 프로젝트 필수 항목 체크리스트 |

### Sheet 탭 기능
- 22개 프로젝트 데이터 (localStorage 자동저장)
- 검색 / 상태 필터 / 그룹 필터
- 행 추가 / 편집(모달) / 삭제
- CSV 내보내기 (UTF-8 BOM)
- **카테고리(컬럼 그룹) 추가/삭제** 기능
- 비밀번호 / 토큰키 평문 표시

### 프로젝트 상세 페이지 (`/project/:id`)
- Token Information (Symbol, Supply, TGE 등)
- Token Allocation 도넛 차트
- Pages, Roadmap, Team, Partners
- **Downloads & Assets 카드**
  - 소스코드 ZIP 다운로드 (GitHub main)
  - Token Address 평문 표시 + BSCScan 링크 + Copy
  - Token Private Key 평문 표시 + Copy

## 라우트 목록
| 경로 | 설명 |
|---|---|
| `/` | 메인 대시보드 (비밀번호 게이트) |
| `/project/ailink` | AILINK 프로젝트 상세 |
| `/project/davinci` | DaVinci AI 프로젝트 상세 |
| `/add` | 프로젝트 추가 |
| `/template` | README 템플릿 |
| `/api/health` | 헬스체크 |
| `/api/projects` | 프로젝트 목록 (JSON) |

## 기술 스택
- **Framework**: Hono v4 (TypeScript)
- **Build**: Vite v6
- **Deploy**: Cloudflare Pages + Wrangler v4
- **Frontend**: Tailwind CSS CDN, FontAwesome 6.4, Chart.js

## 버전 히스토리
| 버전 | 내용 |
|---|---|
| v3.0.0 | 비밀번호 게이트, 마스킹 제거, Downloads&Assets 카드, 카테고리 관리, 페이지 너비 확대 |
| v2.0.0 | Sheet 탭 추가, 22개 프로젝트, 24컬럼, CSV 내보내기 |
| v1.0.0 | 최초 배포 - AILINK + DaVinci AI 트리뷰 대시보드 |

## 배포 정보
- **플랫폼**: Cloudflare Pages
- **빌드 명령**: `npm run build`
- **출력 디렉토리**: `dist/`
- **상태**: ✅ Active
- **최종 업데이트**: 2026-03-01
