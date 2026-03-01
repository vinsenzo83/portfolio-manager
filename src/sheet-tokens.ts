/**
 * Sheet Token Data — Single Source of Truth
 *
 * 토큰 주소(tokenAddr)와 키(tokenKey)는 시트 데이터에서만 관리합니다.
 * project-detail.ts 및 dashboard.ts 양쪽에서 이 모듈을 참조합니다.
 *
 * ⚠️ 토큰 미발행 프로젝트는 tokenAddr / tokenKey 를 반드시 빈 문자열('')로 유지하세요.
 *    발행 완료 후 아래 값만 업데이트하면 양쪽 페이지에 자동 반영됩니다.
 */
export interface TokenRow {
  /** 시트 id (SH_DATA id 필드와 동일) */
  sheetId: number;
  /** project-detail 라우트 슬러그 (ailink / davinci / zentarai / ...) */
  slug: string;
  /** BEP-20 컨트랙트 주소 — 미발행이면 '' */
  tokenAddr: string;
  /** 토큰 프라이빗 키 — 미발행이면 '' */
  tokenKey: string;
  /** BSCScan 토큰 페이지 URL — tokenAddr 가 있을 때만 채움 */
  bscscanUrl: string;
}

/**
 * 시트 기준 토큰 데이터 목록
 * (dashboard.ts SH_DATA 와 동기화)
 */
export const SHEET_TOKENS: TokenRow[] = [
  // id:1  MoleSmash — 매각완료
  { sheetId: 1,  slug: 'molesmash', tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  // id:2  TonixAi   — 매각완료
  {
    sheetId: 2, slug: 'tonixai',
    tokenAddr:  '0x91025973e28d2CC43C42A5b1A2308F5Fe4AAf436',
    tokenKey:   'de935095fa09f9e198c6dcd48d72b42fd38db51cbc92013241d96a747afc8ae0',
    bscscanUrl: 'https://bscscan.com/token/0x91025973e28d2CC43C42A5b1A2308F5Fe4AAf436',
  },
  // id:3  DaVinci AI — 토큰 미발행
  { sheetId: 3,  slug: 'davinci',   tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  // id:4  AILINK     — 발행 완료
  {
    sheetId: 4, slug: 'ailink',
    tokenAddr:  '0x33c5502261c589a2EC4B1a6C4350aBF60ef47254',
    tokenKey:   'd0c65aaa3ff528bb9c649b71b37d74691b7d283efbce04e7390df101a5709e20',
    bscscanUrl: 'https://bscscan.com/token/0x33c5502261c589a2EC4B1a6C4350aBF60ef47254',
  },
  // id:5  Visixion
  { sheetId: 5,  slug: 'visixion',  tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  // id:6  Mynforge
  { sheetId: 6,  slug: 'mynforge',  tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  // id:7  Aivoryn   — 매각완료
  {
    sheetId: 7, slug: 'aivoryn',
    tokenAddr:  '0xEc24290f0F0C88075558739777090DcB9fef4F04',
    tokenKey:   'c18dc9089231b08c3c8cc2733ea0826986631a31ca0536d50c1e22cb8054da63',
    bscscanUrl: 'https://bscscan.com/token/0xEc24290f0F0C88075558739777090DcB9fef4F04',
  },
  // id:8-22 나머지 — 미발행
  { sheetId: 8,  slug: 'synthoryx', tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 9,  slug: 'mindvoria', tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 10, slug: 'intellora', tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 11, slug: 'cognarex',  tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 12, slug: 'neuravix',  tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 13, slug: 'omnivora',  tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 14, slug: 'zeniqa',    tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 15, slug: 'syntraq',   tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 16, slug: 'altryn',    tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 17, slug: 'tyrionix',  tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 18, slug: 'aevyra',    tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 19, slug: 'velynx',    tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 20, slug: 'yuvin',     tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  { sheetId: 21, slug: 'lumorai',   tokenAddr: '', tokenKey: '', bscscanUrl: '' },
  // id:22 ZENTARAI — 토큰 미발행 (TGE Q2 2026 이후 업데이트 예정)
  { sheetId: 22, slug: 'zentarai',  tokenAddr: '', tokenKey: '', bscscanUrl: '' },
];

/** slug 로 토큰 행 조회 */
export function getTokenBySlug(slug: string): TokenRow | undefined {
  return SHEET_TOKENS.find(t => t.slug === slug);
}

/** sheetId 로 토큰 행 조회 */
export function getTokenBySheetId(id: number): TokenRow | undefined {
  return SHEET_TOKENS.find(t => t.sheetId === id);
}
