export function tablePage(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blockchain Project Portfolio</title>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root {
      --bg: #0a0a14;
      --surface: #111120;
      --surface2: #181830;
      --border: rgba(255,255,255,0.08);
      --text: #e2e8f0;
      --muted: #64748b;
      --accent: #6366f1;
      --green: #22c55e;
      --yellow: #fbbf24;
      --red: #ef4444;
      --blue: #3b82f6;
      --purple: #a78bfa;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: 'Inter', system-ui, sans-serif; font-size: 13px; min-height: 100vh; }

    /* ── NAV ── */
    nav {
      background: rgba(10,10,20,0.96);
      border-bottom: 1px solid var(--border);
      padding: 0 1.25rem;
      height: 52px;
      display: flex; align-items: center; justify-content: space-between;
      position: sticky; top: 0; z-index: 200;
      backdrop-filter: blur(12px);
    }
    .nav-brand { display: flex; align-items: center; gap: .6rem; font-weight: 700; font-size: .95rem; }
    .nav-brand .icon { width: 30px; height: 30px; background: linear-gradient(135deg,#6366f1,#8b5cf6); border-radius: 7px; display:flex; align-items:center; justify-content:center; color:white; font-size:.8rem; }
    .nav-actions { display:flex; gap:.5rem; align-items:center; }
    .btn { padding:.35rem .85rem; border-radius:.4rem; font-size:.78rem; font-weight:600; cursor:pointer; border:none; transition:all .15s; display:flex; align-items:center; gap:.35rem; }
    .btn-primary { background:var(--accent); color:white; }
    .btn-primary:hover { background:#4f51d8; }
    .btn-ghost { background:rgba(255,255,255,.06); color:var(--text); border:1px solid var(--border); }
    .btn-ghost:hover { background:rgba(255,255,255,.1); }
    .btn-success { background:rgba(34,197,94,.15); color:var(--green); border:1px solid rgba(34,197,94,.3); }
    .btn-danger { background:rgba(239,68,68,.15); color:var(--red); border:1px solid rgba(239,68,68,.3); }

    /* ── TOOLBAR ── */
    .toolbar {
      padding: .75rem 1.25rem;
      display: flex; align-items: center; gap: .75rem; flex-wrap: wrap;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
    }
    .search-box {
      display:flex; align-items:center; gap:.4rem;
      background: rgba(255,255,255,.05); border: 1px solid var(--border);
      border-radius: .4rem; padding: .3rem .7rem; flex: 1; max-width: 280px;
    }
    .search-box input { background:none; border:none; outline:none; color:var(--text); font-size:.8rem; width:100%; }
    .search-box input::placeholder { color:var(--muted); }
    .filter-select {
      background: rgba(255,255,255,.05); border: 1px solid var(--border);
      border-radius: .4rem; padding: .3rem .6rem; color: var(--text); font-size: .78rem; outline:none; cursor:pointer;
    }
    .stats-bar { display:flex; gap:1.25rem; margin-left:auto; flex-wrap:wrap; }
    .stat { text-align:center; }
    .stat-num { font-size:1rem; font-weight:700; }
    .stat-lbl { font-size:.65rem; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; }

    /* ── TABLE WRAPPER ── */
    .table-wrap { overflow-x: auto; overflow-y: auto; max-height: calc(100vh - 140px); }
    table { border-collapse: collapse; width: 100%; min-width: 2400px; }

    /* ── HEADER ── */
    thead tr th {
      background: var(--surface2);
      border: 1px solid var(--border);
      padding: .5rem .65rem;
      font-size: .7rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .04em;
      color: var(--muted);
      white-space: nowrap;
      position: sticky; top: 0; z-index: 10;
      user-select: none; cursor: pointer;
    }
    thead tr th:hover { color: var(--text); background: rgba(99,102,241,.1); }
    thead tr th .sort-icon { margin-left:.3rem; opacity:.4; font-size:.6rem; }
    thead tr th.sorted { color:var(--accent); }
    thead tr th.sorted .sort-icon { opacity:1; }

    /* group header */
    thead tr.group-row th {
      background: rgba(99,102,241,.08);
      color: var(--purple);
      font-size: .65rem;
      padding: .3rem .65rem;
    }

    /* ── ROWS ── */
    tbody tr { border-bottom: 1px solid rgba(255,255,255,.04); transition: background .1s; }
    tbody tr:hover { background: rgba(255,255,255,.03); }
    tbody tr.editing { background: rgba(99,102,241,.07); outline: 1px solid rgba(99,102,241,.4); }
    tbody tr.sold { opacity: .55; }

    td {
      border: 1px solid rgba(255,255,255,.04);
      padding: .45rem .65rem;
      vertical-align: middle;
      white-space: nowrap;
      max-width: 220px;
      overflow: hidden; text-overflow: ellipsis;
    }
    td.wrap { white-space: normal; word-break: break-all; }

    /* ── BADGES ── */
    .badge { display:inline-flex; align-items:center; gap:3px; padding:2px 8px; border-radius:999px; font-size:.65rem; font-weight:700; white-space:nowrap; }
    .badge-sold { background:rgba(239,68,68,.15); color:var(--red); border:1px solid rgba(239,68,68,.25); }
    .badge-done { background:rgba(34,197,94,.12); color:var(--green); border:1px solid rgba(34,197,94,.25); }
    .badge-prog { background:rgba(251,191,36,.12); color:var(--yellow); border:1px solid rgba(251,191,36,.25); }
    .badge-none { background:rgba(100,116,139,.12); color:var(--muted); border:1px solid rgba(100,116,139,.2); }
    .badge-y { background:rgba(34,197,94,.12); color:var(--green); }
    .badge-n { background:rgba(100,116,139,.1); color:var(--muted); }

    /* ── LINKS ── */
    a.cell-link { color:#60a5fa; text-decoration:none; font-size:.72rem; display:flex; align-items:center; gap:3px; }
    a.cell-link:hover { text-decoration:underline; }

    /* ── EDIT CONTROLS ── */
    .edit-cell input, .edit-cell select {
      width: 100%; background: rgba(99,102,241,.15); border: 1px solid rgba(99,102,241,.5);
      border-radius:.3rem; padding:.25rem .4rem; color:var(--text); font-size:.75rem; outline:none;
    }
    .edit-cell input:focus { border-color:var(--accent); }
    .row-actions { display:flex; gap:.3rem; }
    .action-btn { background:none; border:none; cursor:pointer; padding:.2rem .4rem; border-radius:.3rem; font-size:.72rem; transition:all .15s; }
    .action-btn.edit { color:#60a5fa; }
    .action-btn.edit:hover { background:rgba(96,165,250,.15); }
    .action-btn.save { color:var(--green); }
    .action-btn.save:hover { background:rgba(34,197,94,.15); }
    .action-btn.cancel { color:var(--muted); }
    .action-btn.cancel:hover { background:rgba(255,255,255,.08); }
    .action-btn.del { color:var(--red); }
    .action-btn.del:hover { background:rgba(239,68,68,.15); }

    /* ── MODAL ── */
    .modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.7); z-index:500; align-items:center; justify-content:center; }
    .modal-overlay.open { display:flex; }
    .modal { background:var(--surface2); border:1px solid var(--border); border-radius:.75rem; padding:1.5rem; width:90%; max-width:700px; max-height:90vh; overflow-y:auto; }
    .modal h2 { font-size:1rem; font-weight:700; margin-bottom:1.25rem; display:flex; align-items:center; gap:.5rem; }
    .modal-grid { display:grid; grid-template-columns:1fr 1fr; gap:.75rem; }
    .form-group label { display:block; font-size:.7rem; color:var(--muted); margin-bottom:.25rem; font-weight:600; text-transform:uppercase; letter-spacing:.04em; }
    .form-group input, .form-group select {
      width:100%; background:rgba(255,255,255,.05); border:1px solid var(--border);
      border-radius:.4rem; padding:.45rem .65rem; color:var(--text); font-size:.8rem; outline:none;
    }
    .form-group input:focus { border-color:var(--accent); }
    .form-group.full { grid-column:1/-1; }
    .modal-footer { display:flex; justify-content:flex-end; gap:.5rem; margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border); }

    /* ── TOAST ── */
    #toast { position:fixed; bottom:1.5rem; left:50%; transform:translateX(-50%) translateY(80px); background:rgba(34,197,94,.9); color:white; padding:.55rem 1.2rem; border-radius:.5rem; font-size:.8rem; font-weight:600; transition:transform .25s; z-index:999; pointer-events:none; }
    #toast.show { transform:translateX(-50%) translateY(0); }
    #toast.error { background:rgba(239,68,68,.9); }

    /* ── COL WIDTHS ── */
    .col-num { width:100px; }
    .col-rank { width:80px; }
    .col-followers { width:80px; }
    .col-devstatus { width:90px; }
    .col-posting { width:70px; }
    .col-posts { width:70px; }
    .col-xname { width:110px; }
    .col-xacc { width:140px; }
    .col-xpass { width:110px; }
    .col-gname { width:110px; }
    .col-gacc { width:160px; }
    .col-gpass { width:110px; }
    .col-tgname { width:110px; }
    .col-tglink { width:160px; }
    .col-twname { width:110px; }
    .col-twlink { width:180px; }
    .col-site { width:160px; }
    .col-token { width:200px; }
    .col-tkey { width:200px; }
    .col-email { width:160px; }
    .col-doc { width:80px; }
    .col-exchange { width:80px; }
    .col-sold { width:80px; }
    .col-action { width:90px; min-width:90px; position:sticky; right:0; background:var(--surface2); z-index:5; }

    /* password mask */
    .pw-mask { font-family:monospace; letter-spacing:.1em; color:var(--muted); cursor:pointer; }
    .pw-mask:hover { color:var(--text); }
  </style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-brand">
    <div class="icon"><i class="fas fa-sitemap"></i></div>
    Blockchain Portfolio Manager
    <span style="background:rgba(99,102,241,.2);color:#a5b4fc;padding:1px 8px;border-radius:999px;font-size:.65rem;margin-left:.25rem;">v2.0</span>
  </div>
  <div class="nav-actions">
    <button class="btn btn-ghost" onclick="exportCSV()"><i class="fas fa-download"></i> CSV</button>
    <button class="btn btn-primary" onclick="openAddModal()"><i class="fas fa-plus"></i> New Project</button>
  </div>
</nav>

<!-- TOOLBAR -->
<div class="toolbar">
  <div class="search-box">
    <i class="fas fa-search" style="color:var(--muted);font-size:.75rem;"></i>
    <input type="text" id="searchInput" placeholder="프로젝트명, 도메인, 계정 검색..." oninput="filterTable()">
  </div>
  <select class="filter-select" id="statusFilter" onchange="filterTable()">
    <option value="">전체 상태</option>
    <option value="매각완료">매각완료</option>
    <option value="완료">개발완료</option>
    <option value="y">포스팅중</option>
  </select>
  <select class="filter-select" id="exchangeFilter" onchange="filterTable()">
    <option value="">전체 거래소</option>
    <option value="mexc">MEXC</option>
    <option value="gate">Gate.io</option>
  </select>
  <div class="stats-bar">
    <div class="stat"><div class="stat-num" id="stat-total" style="color:var(--accent);">0</div><div class="stat-lbl">Total</div></div>
    <div class="stat"><div class="stat-num" id="stat-sold" style="color:var(--red);">0</div><div class="stat-lbl">매각완료</div></div>
    <div class="stat"><div class="stat-num" id="stat-active" style="color:var(--green);">0</div><div class="stat-lbl">활성</div></div>
    <div class="stat"><div class="stat-num" id="stat-posting" style="color:var(--yellow);">0</div><div class="stat-lbl">포스팅중</div></div>
  </div>
</div>

<!-- TABLE -->
<div class="table-wrap">
<table id="mainTable">
  <thead>
    <tr class="group-row">
      <th colspan="6" style="border-right:2px solid rgba(99,102,241,.3);">기본 정보</th>
      <th colspan="3" style="border-right:2px solid rgba(59,130,246,.3);">X (Twitter) 계정</th>
      <th colspan="3" style="border-right:2px solid rgba(34,197,94,.3);">Google 이메일</th>
      <th colspan="2" style="border-right:2px solid rgba(251,191,36,.3);">Telegram</th>
      <th colspan="2" style="border-right:2px solid rgba(168,85,247,.3);">Twitter 링크</th>
      <th colspan="1" style="border-right:2px solid rgba(239,68,68,.3);">사이트</th>
      <th colspan="2" style="border-right:2px solid rgba(100,116,139,.3);">토큰</th>
      <th colspan="2" style="border-right:2px solid rgba(100,116,139,.3);">기타</th>
      <th colspan="2" style="border-right:2px solid rgba(100,116,139,.3);">거래소/매각</th>
      <th colspan="1"></th>
    </tr>
    <tr>
      <th class="col-num" onclick="sortTable(0)">SIM No. <span class="sort-icon">↕</span></th>
      <th class="col-rank" onclick="sortTable(1)">매각순위 <span class="sort-icon">↕</span></th>
      <th class="col-followers" onclick="sortTable(2)">팔로워수 <span class="sort-icon">↕</span></th>
      <th class="col-devstatus" onclick="sortTable(3)">개발상황 <span class="sort-icon">↕</span></th>
      <th class="col-posting" onclick="sortTable(4)">포스팅 <span class="sort-icon">↕</span></th>
      <th class="col-posts" onclick="sortTable(5)">포스트수 <span class="sort-icon">↕</span></th>
      <th class="col-xname">X 프로젝트명</th>
      <th class="col-xacc">X 계정</th>
      <th class="col-xpass">X 비밀번호</th>
      <th class="col-gname">G 프로젝트명</th>
      <th class="col-gacc">Gmail</th>
      <th class="col-gpass">G 비밀번호</th>
      <th class="col-tgname">TG 프로젝트명</th>
      <th class="col-tglink">Telegram 링크</th>
      <th class="col-twname">TW 프로젝트명</th>
      <th class="col-twlink">Twitter 링크</th>
      <th class="col-site">사이트</th>
      <th class="col-token">Token Address</th>
      <th class="col-tkey">Token Key</th>
      <th class="col-email">도메인 이메일</th>
      <th class="col-doc">개발문서</th>
      <th class="col-exchange">거래소</th>
      <th class="col-sold">매각여부</th>
      <th class="col-action">액션</th>
    </tr>
  </thead>
  <tbody id="tableBody"></tbody>
</table>
</div>

<!-- ADD/EDIT MODAL -->
<div class="modal-overlay" id="modal">
  <div class="modal">
    <h2><i class="fas fa-edit" style="color:var(--accent);"></i> <span id="modal-title">New Project</span></h2>
    <div class="modal-grid">
      <div class="form-group"><label>SIM Card No.</label><input id="f-sim" placeholder="SIM card number"></div>
      <div class="form-group"><label>매각 순위</label><input id="f-rank" placeholder="매각완료 / 1 / 2..."></div>
      <div class="form-group"><label>팔로워수</label><input id="f-followers" placeholder="e.g. 26k"></div>
      <div class="form-group"><label>개발진행상황</label>
        <select id="f-devstatus">
          <option value="">-</option>
          <option value="완료">완료</option>
          <option value="진행중">진행중</option>
          <option value="매각완료">매각완료</option>
        </select>
      </div>
      <div class="form-group"><label>포스팅 시작여부</label>
        <select id="f-posting">
          <option value="">-</option>
          <option value="y">y</option>
          <option value="n">n</option>
        </select>
      </div>
      <div class="form-group"><label>Total Posts</label><input id="f-posts" type="number" placeholder="0"></div>
      <div class="form-group"><label>X 프로젝트명</label><input id="f-xname" placeholder="project name"></div>
      <div class="form-group"><label>X 계정</label><input id="f-xacc" placeholder="@handle"></div>
      <div class="form-group"><label>X 비밀번호</label><input id="f-xpass" placeholder="password"></div>
      <div class="form-group"><label>Google 프로젝트명</label><input id="f-gname" placeholder="project name"></div>
      <div class="form-group"><label>Gmail</label><input id="f-gacc" placeholder="email@gmail.com"></div>
      <div class="form-group"><label>Google 비밀번호</label><input id="f-gpass" placeholder="password"></div>
      <div class="form-group"><label>Telegram 프로젝트명</label><input id="f-tgname" placeholder="project name"></div>
      <div class="form-group"><label>Telegram 링크</label><input id="f-tglink" placeholder="https://t.me/..."></div>
      <div class="form-group"><label>Twitter 프로젝트명</label><input id="f-twname" placeholder="project name"></div>
      <div class="form-group"><label>Twitter 링크</label><input id="f-twlink" placeholder="https://x.com/..."></div>
      <div class="form-group"><label>사이트</label><input id="f-site" placeholder="domain.xyz"></div>
      <div class="form-group"><label>Token Address</label><input id="f-token" placeholder="0x..."></div>
      <div class="form-group full"><label>Token Key</label><input id="f-tkey" placeholder="token key"></div>
      <div class="form-group"><label>도메인 이메일</label><input id="f-email" placeholder="admin@domain.xyz"></div>
      <div class="form-group"><label>개발문서 URL</label><input id="f-doc" placeholder="https://docs.google.com/..."></div>
      <div class="form-group"><label>진행거래소</label><input id="f-exchange" placeholder="mexc / gate"></div>
      <div class="form-group"><label>매각여부</label>
        <select id="f-sold">
          <option value="">-</option>
          <option value="매각완료">매각완료</option>
          <option value="진행중">진행중</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">취소</button>
      <button class="btn btn-primary" onclick="saveModal()"><i class="fas fa-save"></i> 저장</button>
    </div>
  </div>
</div>

<div id="toast"></div>

<script>
// ── DATA ────────────────────────────────────────────────
let projects = [
  {id:1, sim:"", rank:"매각완료", followers:"26k", devStatus:"", posting:"", posts:"", xName:"mole", xAcc:"MoleSmash", xPass:"rhkdtp00!!", gName:"mole", gAcc:"moletaptap@gmail.com", gPass:"rhkdtp00!!", tgName:"mole", tgLink:"https://t.me/MoleOfficialchannel", twName:"mole", twLink:"https://x.com/MoleSmash", site:"molesmash.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"mexc", sold:"매각완료"},
  {id:2, sim:"880 1601929592", rank:"매각완료", followers:"200", devStatus:"매각완료", posting:"y", posts:"232", xName:"tonixai", xAcc:"@TonixAiOfficial", xPass:"Abcd@1233", gName:"tonnixai", gAcc:"mrstefan45678@gmail.com", gPass:"12345@Abcd", tgName:"tonixai", tgLink:"https://t.me/tonixaiOfficial", twName:"tonixai", twLink:"https://x.com/TonixAiOfficial", site:"tonixai.org", tokenAddr:"0x91025973e28d2CC43C42A5b1A2308F5Fe4AAf436", tokenKey:"de935095fa09f9e198c6dcd48d72b42fd38db51cbc92013241d96a747afc8ae0", domainEmail:"", devDoc:"", exchange:"mexc", sold:"매각완료"},
  {id:3, sim:"", rank:"", followers:"", devStatus:"완료", posting:"y", posts:"98", xName:"DaVinci AI", xAcc:"@DVinciAiZ", xPass:"Abcd@1233", gName:"DaVinci AI", gAcc:"davinciai59sala@gmail.com", gPass:"Abcd@1233", tgName:"DaVinci AI", tgLink:"https://t.me/DaVinciAiZ", twName:"DaVinci AI", twLink:"https://x.com/DVinciAiZ", site:"davinciai.io", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"https://docs.google.com/document/d/1tTYRudGDhRK91Mo81uRNdxfD6Mpc4FKWwJU8k8rgpWU/edit", exchange:"mexc", sold:""},
  {id:4, sim:"", rank:"", followers:"", devStatus:"완료", posting:"y", posts:"118", xName:"AiLink", xAcc:"@AiLink_Official", xPass:"Abcd@1233", gName:"AiLink", gAcc:"ailinkofficial.net@gmail.com", gPass:"Abcd@1233", tgName:"AiLink", tgLink:"https://t.me/AiLink_Official", twName:"AiLink", twLink:"https://x.com/AiLink_Official", site:"aichainlabs.xyz", tokenAddr:"0x33c5502261c589a2EC4B1a6C4350aBF60ef47254", tokenKey:"d0c65aaa3ff528bb9c649b71b37d74691b7d283efbce04e7390df101a5709e20", domainEmail:"", devDoc:"https://docs.google.com/document/d/1p-Lk94S_KjtVfKo4W1cbqqhdkMkTvxc8JGEd4V-3IAc/edit", exchange:"mexc", sold:""},
  {id:5, sim:"", rank:"", followers:"", devStatus:"", posting:"y", posts:"49", xName:"visixion", xAcc:"@visixion", xPass:"Abcd@1234", gName:"visixion", gAcc:"mdrazzakcom@gmail.com", gPass:"Abcd@1234", tgName:"visixion", tgLink:"https://t.me/visixion_official", twName:"visixion", twLink:"https://x.com/visixion", site:"visixion.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"https://docs.google.com/document/d/1IWtQEXcwGAlEDDIiVPucllIeVrUAR-nIQ3u5cpwKpfA/edit", exchange:"mexc", sold:""},
  {id:6, sim:"", rank:"", followers:"", devStatus:"", posting:"y", posts:"35", xName:"mynforge", xAcc:"@mynforge", xPass:"Abcd@1234", gName:"mynforge", gAcc:"mynforge@gmail.com", gPass:"Abcd@1234", tgName:"mynforge", tgLink:"https://t.me/mynforge", twName:"mynforge", twLink:"https://x.com/mynforge", site:"mynforge.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"mexc", sold:""},
  {id:7, sim:"", rank:"매각완료", followers:"25k", devStatus:"매각완료", posting:"y", posts:"98", xName:"Aivoryn", xAcc:"@Aivoryn_officia", xPass:"rhkdtp00!!", gName:"Aivoryn", gAcc:"meow830417@gmail.com", gPass:"rhkdtp00!!", tgName:"Aivoryn", tgLink:"https://t.me/Aivoryn", twName:"Aivoryn", twLink:"https://x.com/Aivoryn_officia", site:"aivoryn.xyz", tokenAddr:"0xEc24290f0F0C88075558739777090DcB9fef4F04", tokenKey:"c18dc9089231b08c3c8cc2733ea0826986631a31ca0536d50c1e22cb8054da63", domainEmail:"", devDoc:"", exchange:"", sold:"매각완료"},
  {id:8, sim:"", rank:"", followers:"", devStatus:"", posting:"y", posts:"24", xName:"Synthoryx", xAcc:"@Synthoryx", xPass:"Abcd@1234", gName:"Synthoryx", gAcc:"synthoryx50@gmail.com", gPass:"Abcd@1234", tgName:"Synthoryx", tgLink:"https://t.me/Synthoryx", twName:"Synthoryx", twLink:"https://x.com/Synthoryx", site:"synthoryx.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:9, sim:"", rank:"", followers:"", devStatus:"", posting:"y", posts:"28", xName:"mindvoria", xAcc:"@mindvoria", xPass:"Abcd@1234", gName:"mindvoria", gAcc:"mindvoria@gmail.com", gPass:"Abcd@1234", tgName:"mindvoria", tgLink:"https://t.me/mindvoria", twName:"mindvoria", twLink:"https://x.com/mindvoria", site:"mindvoria.org", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:10, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"intellora", xAcc:"@IntelloraAi", xPass:"Abcd@1234", gName:"intellora", gAcc:"intellora3@gmail.com", gPass:"Abcd@1234", tgName:"intellora", tgLink:"https://t.me/intellora_Official", twName:"intellora", twLink:"https://x.com/IntelloraAi", site:"intellora.org", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:11, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"Cognarex", xAcc:"@Cognarex", xPass:"Abcd@1234", gName:"Cognarex", gAcc:"cognarex@gmail.com", gPass:"Abcd@1234", tgName:"Cognarex", tgLink:"https://t.me/Cognarex", twName:"Cognarex", twLink:"https://x.com/Cognarex", site:"cognarex.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:12, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"Neuravix", xAcc:"@Neuravix", xPass:"Abcd@1234", gName:"Neuravix", gAcc:"neuravix812@gmail.com", gPass:"Abcd@1234", tgName:"Neuravix", tgLink:"https://t.me/Neuravix_Official", twName:"Neuravix", twLink:"https://x.com/Neuravix", site:"neuravix.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:13, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"Omnivora", xAcc:"@OmnivoraAi", xPass:"Abcd@1234", gName:"Omnivora", gAcc:"omnivora270@gmail.com", gPass:"Abcd@1244", tgName:"Omnivora", tgLink:"https://t.me/OnivoraAi", twName:"Omnivora", twLink:"https://x.com/OmnivoraAi", site:"omnivora.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:14, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"ZENIQA", xAcc:"@ZeniqaAi", xPass:"Abcd@1234", gName:"ZENIQA", gAcc:"zeniqa3@gmail.com", gPass:"Abcd@1234", tgName:"ZENIQA", tgLink:"https://t.me/ZeniqaAi", twName:"ZENIQA", twLink:"https://x.com/ZeniqaAi", site:"zeniqa.org", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:15, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"SYNTRAQ", xAcc:"@SyntraqAi", xPass:"Abcd@1234", gName:"SYNTRAQ", gAcc:"syntraq592@gmail.com", gPass:"Abcd@1234", tgName:"SYNTRAQ", tgLink:"https://t.me/SyntraqAi", twName:"SYNTRAQ", twLink:"https://x.com/SyntraqAi", site:"syntraq.org", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:16, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"ALTRYN", xAcc:"@AltrynAi", xPass:"Abcd@1234", gName:"ALTRYN", gAcc:"alryn29@gmail.com", gPass:"Abcd@1234", tgName:"ALTRYN", tgLink:"https://t.me/Altryn", twName:"ALTRYN", twLink:"https://x.com/AltrynAi", site:"altryn.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:17, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"TYRIONIX", xAcc:"@Tyrionix_X", xPass:"Abcd@1234", gName:"TYRIONIX", gAcc:"tyrionix42@gmail.com", gPass:"Abcd@1234", tgName:"TYRIONIX", tgLink:"https://t.me/TYRIONIX", twName:"TYRIONIX", twLink:"https://x.com/Tyrionix_X", site:"tyrionix.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:18, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"Aevyra", xAcc:"@Aevyra_Official", xPass:"Abcd@1234", gName:"Aevyra", gAcc:"aveyra260@gmail.com", gPass:"Abcd@1234", tgName:"Aevyra", tgLink:"https://t.me/Aevyra_official", twName:"Aevyra", twLink:"https://x.com/Aevyra_Official", site:"aevyra.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:19, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"Velynx", xAcc:"@Velynx_Official", xPass:"Abcd@1234", gName:"Velynx", gAcc:"Velynx23@gmail.com", gPass:"Abcd@1234", tgName:"Velynx", tgLink:"https://t.me/Velynx_Official", twName:"Velynx", twLink:"https://x.com/Velynx_Official", site:"velynx.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:20, sim:"", rank:"", followers:"", devStatus:"", posting:"", posts:"", xName:"Yuvin", xAcc:"@Yuvin_Official", xPass:"Abcd@1234", gName:"Yuvin", gAcc:"Yuvin957@gmail.com", gPass:"Abcd@1234", tgName:"Yuvin", tgLink:"https://t.me/Yuvin_Official", twName:"Yuvin", twLink:"https://x.com/Yuvin_Official", site:"yuvin.xyz", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:21, sim:"", rank:"", followers:"7k", devStatus:"", posting:"y", posts:"", xName:"LUMORAI", xAcc:"@LUMORAI_OP", xPass:"rhkdtp00!!", gName:"LUMORAI", gAcc:"catnipsprint@gmail.com", gPass:"rhkdtp00!!", tgName:"LUMORAI", tgLink:"", twName:"LUMORAI", twLink:"https://x.com/LUMORAI_OP", site:"", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
  {id:22, sim:"", rank:"", followers:"24k", devStatus:"", posting:"y", posts:"", xName:"ZENTARAI", xAcc:"@intellora_", xPass:"rhkdtp00!!", gName:"mole", gAcc:"moletaptap@gmail.com", gPass:"rhkdtp00!!", tgName:"ZENTARAI", tgLink:"", twName:"ZENTARAI", twLink:"https://x.com/intellora_", site:"", tokenAddr:"", tokenKey:"", domainEmail:"", devDoc:"", exchange:"", sold:""},
];

let nextId = 23;
let editingId = null;
let sortCol = -1, sortAsc = true;

// localStorage 불러오기
function loadData() {
  const saved = localStorage.getItem('pm_projects');
  if (saved) { try { projects = JSON.parse(saved); nextId = Math.max(...projects.map(p=>p.id)) + 1; } catch(e){} }
}
function saveData() {
  localStorage.setItem('pm_projects', JSON.stringify(projects));
}

// ── RENDER ──────────────────────────────────────────────
function renderTable(data) {
  const tbody = document.getElementById('tableBody');
  if (!data) data = projects;

  // stats
  document.getElementById('stat-total').textContent = data.length;
  document.getElementById('stat-sold').textContent = data.filter(p=>p.sold==='매각완료'||p.rank==='매각완료').length;
  document.getElementById('stat-active').textContent = data.filter(p=>p.devStatus==='완료').length;
  document.getElementById('stat-posting').textContent = data.filter(p=>p.posting==='y').length;

  tbody.innerHTML = data.map(p => {
    const isSold = p.sold==='매각완료' || p.rank==='매각완료';
    return \`<tr class="\${isSold?'sold':''}" id="row-\${p.id}">
      <td class="col-num">\${p.sim||'<span style="color:var(--muted)">-</span>'}</td>
      <td class="col-rank">\${renderBadge(p.rank)}</td>
      <td class="col-followers">\${p.followers ? '<span style="color:var(--yellow);font-weight:600;">'+p.followers+'</span>' : '<span style="color:var(--muted)">-</span>'}</td>
      <td class="col-devstatus">\${renderDevBadge(p.devStatus)}</td>
      <td class="col-posting">\${p.posting==='y' ? '<span class="badge badge-y">Y</span>' : '<span class="badge badge-n">-</span>'}</td>
      <td class="col-posts">\${p.posts ? '<span style="font-weight:600;">'+p.posts+'</span>' : '<span style="color:var(--muted)">-</span>'}</td>
      <td class="col-xname" style="font-weight:600;">\${p.xName||''}</td>
      <td class="col-xacc">\${p.xAcc ? '<a class="cell-link" href="https://x.com/'+p.xAcc.replace('@','')+'" target="_blank"><i class="fab fa-x-twitter"></i> '+p.xAcc+'</a>' : ''}</td>
      <td class="col-xpass"><span class="pw-mask" onclick="togglePw(this)" data-pw="\${esc(p.xPass)}">••••••••</span></td>
      <td class="col-gname">\${p.gName||''}</td>
      <td class="col-gacc" style="color:#60a5fa;">\${p.gAcc||''}</td>
      <td class="col-gpass"><span class="pw-mask" onclick="togglePw(this)" data-pw="\${esc(p.gPass)}">••••••••</span></td>
      <td class="col-tgname">\${p.tgName||''}</td>
      <td class="col-tglink">\${p.tgLink ? '<a class="cell-link" href="'+p.tgLink+'" target="_blank"><i class="fab fa-telegram"></i> '+p.tgLink.replace('https://t.me/','')+'</a>' : ''}</td>
      <td class="col-twname">\${p.twName||''}</td>
      <td class="col-twlink">\${p.twLink ? '<a class="cell-link" href="'+p.twLink+'" target="_blank"><i class="fab fa-x-twitter"></i> '+p.twLink.replace('https://x.com/','@').split('?')[0]+'</a>' : ''}</td>
      <td class="col-site">\${p.site ? '<a class="cell-link" href="https://'+p.site+'" target="_blank"><i class="fas fa-globe"></i> '+p.site+'</a>' : '<span style="color:var(--muted)">-</span>'}</td>
      <td class="col-token" style="font-family:monospace;font-size:.68rem;">\${p.tokenAddr ? '<a class="cell-link" href="https://bscscan.com/token/'+p.tokenAddr+'" target="_blank"><i class="fas fa-cube"></i> '+p.tokenAddr.slice(0,12)+'...</a>' : '<span style="color:var(--muted)">-</span>'}</td>
      <td class="col-tkey" style="font-family:monospace;font-size:.68rem;">\${p.tokenKey ? '<span class="pw-mask" onclick="togglePw(this)" data-pw="\${esc(p.tokenKey)}">••••••••••••</span>' : '<span style="color:var(--muted)">-</span>'}</td>
      <td class="col-email">\${p.domainEmail||'<span style="color:var(--muted)">-</span>'}</td>
      <td class="col-doc">\${p.devDoc ? '<a class="cell-link" href="'+p.devDoc+'" target="_blank"><i class="fas fa-file-alt"></i> 문서</a>' : '<span style="color:var(--muted)">-</span>'}</td>
      <td class="col-exchange">\${p.exchange ? '<span style="background:rgba(99,102,241,.15);color:#a5b4fc;padding:2px 7px;border-radius:4px;font-size:.68rem;font-weight:700;">'+p.exchange.toUpperCase()+'</span>' : '<span style="color:var(--muted)">-</span>'}</td>
      <td class="col-sold">\${renderSoldBadge(p.sold)}</td>
      <td class="col-action">
        <div class="row-actions">
          <button class="action-btn edit" onclick="openEditModal(\${p.id})" title="편집"><i class="fas fa-pen"></i></button>
          <button class="action-btn del" onclick="deleteRow(\${p.id})" title="삭제"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>\`;
  }).join('');
}

function esc(s) { return (s||'').replace(/"/g,'&quot;'); }

function renderBadge(v) {
  if (!v) return '<span style="color:var(--muted)">-</span>';
  if (v==='매각완료') return '<span class="badge badge-sold"><i class="fas fa-circle" style="font-size:.45rem;"></i>매각완료</span>';
  return '<span class="badge badge-prog">'+v+'</span>';
}
function renderDevBadge(v) {
  if (!v) return '<span style="color:var(--muted)">-</span>';
  if (v==='완료') return '<span class="badge badge-done">완료</span>';
  if (v==='매각완료') return '<span class="badge badge-sold">매각완료</span>';
  return '<span class="badge badge-prog">'+v+'</span>';
}
function renderSoldBadge(v) {
  if (!v) return '<span style="color:var(--muted)">-</span>';
  if (v==='매각완료') return '<span class="badge badge-sold">매각완료</span>';
  return '<span class="badge badge-prog">'+v+'</span>';
}

function togglePw(el) {
  if (el.textContent.includes('•')) {
    el.textContent = el.dataset.pw;
    el.style.color = 'var(--text)';
    setTimeout(()=>{ el.textContent='••••••••'; el.style.color=''; }, 5000);
  } else {
    el.textContent = '••••••••';
    el.style.color = '';
  }
}

// ── FILTER ──────────────────────────────────────────────
function filterTable() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const sf = document.getElementById('statusFilter').value;
  const ef = document.getElementById('exchangeFilter').value;

  let filtered = projects.filter(p => {
    const searchStr = [p.xName,p.xAcc,p.gAcc,p.site,p.tgLink,p.twLink,p.sim].join(' ').toLowerCase();
    const matchQ = !q || searchStr.includes(q);
    const matchS = !sf || p.devStatus===sf || p.rank===sf || p.posting===sf;
    const matchE = !ef || (p.exchange||'').toLowerCase().includes(ef);
    return matchQ && matchS && matchE;
  });
  renderTable(filtered);
}

// ── SORT ────────────────────────────────────────────────
const colKeys = ['sim','rank','followers','devStatus','posting','posts','xName','xAcc','xPass','gName','gAcc','gPass','tgName','tgLink','twName','twLink','site','tokenAddr','tokenKey','domainEmail','devDoc','exchange','sold'];
function sortTable(colIdx) {
  const key = colKeys[colIdx];
  if (sortCol === colIdx) sortAsc = !sortAsc; else { sortCol = colIdx; sortAsc = true; }
  projects.sort((a,b) => {
    const av = (a[key]||'').toString().toLowerCase();
    const bv = (b[key]||'').toString().toLowerCase();
    return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
  });
  document.querySelectorAll('thead tr:last-child th').forEach((th,i) => {
    th.classList.toggle('sorted', i===colIdx);
    const icon = th.querySelector('.sort-icon');
    if (icon) icon.textContent = i===colIdx ? (sortAsc?'↑':'↓') : '↕';
  });
  renderTable();
}

// ── MODAL ───────────────────────────────────────────────
const fields = ['sim','rank','followers','devStatus','posting','posts','xName','xAcc','xPass','gName','gAcc','gPass','tgName','tgLink','twName','twLink','site','token','tkey','email','doc','exchange','sold'];

function openAddModal() {
  editingId = null;
  document.getElementById('modal-title').textContent = 'New Project';
  fields.forEach(f => {
    const el = document.getElementById('f-'+f);
    if (el) el.value = '';
  });
  document.getElementById('modal').classList.add('open');
}

function openEditModal(id) {
  const p = projects.find(x=>x.id===id);
  if (!p) return;
  editingId = id;
  document.getElementById('modal-title').textContent = 'Edit: ' + (p.xName||p.id);
  const map = {sim:'sim',rank:'rank',followers:'followers',devStatus:'devStatus',posting:'posting',posts:'posts',xName:'xName',xAcc:'xAcc',xPass:'xPass',gName:'gName',gAcc:'gAcc',gPass:'gPass',tgName:'tgName',tgLink:'tgLink',twName:'twName',twLink:'twLink',site:'site',token:'tokenAddr',tkey:'tokenKey',email:'domainEmail',doc:'devDoc',exchange:'exchange',sold:'sold'};
  Object.entries(map).forEach(([fid, pkey]) => {
    const el = document.getElementById('f-'+fid);
    if (el) el.value = p[pkey]||'';
  });
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  editingId = null;
}

function saveModal() {
  const map = {sim:'sim',rank:'rank',followers:'followers',devStatus:'devStatus',posting:'posting',posts:'posts',xName:'xName',xAcc:'xAcc',xPass:'xPass',gName:'gName',gAcc:'gAcc',gPass:'gPass',tgName:'tgName',tgLink:'tgLink',twName:'twName',twLink:'twLink',site:'site',token:'tokenAddr',tkey:'tokenKey',email:'domainEmail',doc:'devDoc',exchange:'exchange',sold:'sold'};
  const vals = {};
  Object.entries(map).forEach(([fid, pkey]) => {
    const el = document.getElementById('f-'+fid);
    vals[pkey] = el ? el.value.trim() : '';
  });

  if (!vals.xName) { showToast('프로젝트명을 입력하세요', true); return; }

  if (editingId !== null) {
    const idx = projects.findIndex(p=>p.id===editingId);
    if (idx >= 0) projects[idx] = { ...projects[idx], ...vals };
    showToast('저장 완료: ' + vals.xName);
  } else {
    projects.push({ id: nextId++, ...vals });
    showToast('프로젝트 추가: ' + vals.xName);
  }
  saveData();
  closeModal();
  renderTable();
}

function deleteRow(id) {
  const p = projects.find(x=>x.id===id);
  if (!confirm((p?.xName||'이 프로젝트') + '를 삭제하시겠습니까?')) return;
  projects = projects.filter(x=>x.id!==id);
  saveData();
  renderTable();
  showToast('삭제 완료');
}

// ── EXPORT CSV ──────────────────────────────────────────
function exportCSV() {
  const headers = ['SIM','매각순위','팔로워수','개발상황','포스팅','포스트수','X프로젝트명','X계정','X비밀번호','G프로젝트명','Gmail','G비밀번호','TG프로젝트명','TG링크','TW프로젝트명','TW링크','사이트','토큰주소','토큰키','도메인이메일','개발문서','거래소','매각여부'];
  const keys = ['sim','rank','followers','devStatus','posting','posts','xName','xAcc','xPass','gName','gAcc','gPass','tgName','tgLink','twName','twLink','site','tokenAddr','tokenKey','domainEmail','devDoc','exchange','sold'];
  const rows = [headers.join(','), ...projects.map(p => keys.map(k => '"'+(p[k]||'').replace(/"/g,'""')+'"').join(','))];
  const blob = new Blob([rows.join('\\n')], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'portfolio_'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
  showToast('CSV 다운로드 완료');
}

// ── TOAST ────────────────────────────────────────────────
function showToast(msg, isErr=false) {
  const t = document.getElementById('toast');
  t.textContent = (isErr ? '⚠ ' : '✓ ') + msg;
  t.className = 'show' + (isErr?' error':'');
  setTimeout(() => t.className = '', 2500);
}

// ── INIT ────────────────────────────────────────────────
loadData();
renderTable();

// ESC to close modal
document.addEventListener('keydown', e => { if (e.key==='Escape') closeModal(); });
document.getElementById('modal').addEventListener('click', e => { if (e.target.id==='modal') closeModal(); });
</script>
</body>
</html>`
}
