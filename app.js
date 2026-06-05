/* ================= Smart Search — UI controller ================= */

/* ---------- icons ---------- */
const I = {
  waffle:`<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><circle cx="3.5" cy="3.5" r="1.6"/><circle cx="10" cy="3.5" r="1.6"/><circle cx="16.5" cy="3.5" r="1.6"/><circle cx="3.5" cy="10" r="1.6"/><circle cx="10" cy="10" r="1.6"/><circle cx="16.5" cy="10" r="1.6"/><circle cx="3.5" cy="16.5" r="1.6"/><circle cx="10" cy="16.5" r="1.6"/><circle cx="16.5" cy="16.5" r="1.6"/></svg>`,
  logo:`<svg class="logo-mark" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="13" stroke="#fff" stroke-width="3"/><path d="M11 18a7 7 0 0 1 14 0" stroke="#1290a8" stroke-width="3" stroke-linecap="round"/><circle cx="18" cy="18" r="3" fill="#fff"/></svg>`,
  back:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
  search:`<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  contact:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 7h5M16 11h5M18.5 15H21"/></svg>`,
  gear:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.2a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 4.6 15H4.4a2 2 0 0 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.7l-.1-.1A2 2 0 1 1 8.4 5.4l.1.1A1.6 1.6 0 0 0 11 4.6V4.4a2 2 0 0 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.6 1.6 0 0 0 19.4 11h.2a2 2 0 0 1 0 4H19.4Z"/></svg>`,
  help:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.7-2.5 2-2.5 3.5"/><circle cx="12" cy="17.5" r=".6" fill="currentColor"/></svg>`,
  sparkle:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l1.7 4.6L18 8.9l-4.3 1.8L12 15l-1.7-4.3L6 8.9l4.3-1.8L12 2.5z"/><path d="M18.5 14l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4z" opacity=".75"/></svg>`,
  globe:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>`,
  pin:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>`,
  tag:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 12.2V5a2 2 0 0 1 2-2h7.2c.5 0 1 .2 1.4.6l7 7a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.3"/></svg>`,
  docBig:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>`,
  globeBig:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"/></svg>`,
  appsBig:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/></svg>`,
  docTile:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>`,
  globeTile:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 2.4 14.6 0 17M12 3.5c-2.4 2.4-2.4 14.6 0 17"/></svg>`,
  pinTile:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.3"/></svg>`,
  chevDown:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`,
  chevRight:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  sort:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h13M4 12h9M4 17h5M17 17V8m0 9l3-3m-3 3l-3-3" /></svg>`,
  check:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  thumbUp:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3zM7 10l4-7a2 2 0 0 1 2 1.5L12 9h6a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 16.8 20H7"/></svg>`,
  thumbDown:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3zM17 14l-4 7a2 2 0 0 1-2-1.5L12 15H6a2 2 0 0 1-2-2.3l1.2-7A2 2 0 0 1 7.2 4H17"/></svg>`,
  open:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>`,
  star:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8 6.8 19l1-5.8L3.6 9.1l5.8-.8z"/></svg>`,
  link:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7L11 6.3M14 11a4 4 0 0 0-5.7 0l-3 3A4 4 0 1 0 11 19.7L12.9 18"/></svg>`,
  home:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7M6 9.5V20h12V9.5"/></svg>`,
  card:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M7 14h4"/></svg>`,
  plus:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>`,
};

/* ---------- state ---------- */
const REF_NOW = new Date("2024-04-20T00:00:00");
const TABS = [
  {id:"all", label:"All"},
  {id:"file", label:"Files"},
  {id:"app", label:"Apps"},
  {id:"website", label:"Websites"},
  {id:"people", label:"People"},
];
const SEED = "learn";

const state = {
  query: SEED,
  result: semanticSearch(SEED),
  people: [],
  tab: "all",
  filters: { scope:"all", types:new Set(), source:"all", audience:"all", date:"any" },
  sort: "relevance",
  view: "results",
  detailId: null,
  openMenu: null,
  feedback: null,
  ta: { items:[], index:-1, open:false },
  fav: new Set(),
};
state.people = searchPeople(state.result);

/* ---------- helpers ---------- */
const $ = (s,r=document)=>r.querySelector(s);
function esc(s){ return (s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function kindOf(item){ return item.type==="app" ? "App" : item.kind; }
function fmtDate(d){ return new Date(d+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}); }
function byId(id){ return CORPUS.find(i=>i.id===id); }

function tileHTML(item, cls=""){
  if(item.type==="file") return `<span class="tile doc ${cls}">${I.docTile}</span>`;
  if(item.type==="website"){
    const ico = item.kind==="Internal Portal" ? I.pinTile : I.globeTile;
    return `<span class="tile web ${cls}" style="background:${item.color}">${ico}</span>`;
  }
  return `<span class="tile ${cls}" style="background:${item.color}">${esc(item.mono)}</span>`;
}
function metaIcon(item){
  if(item.type==="file") return I.tag;
  if(item.type==="website" && item.kind==="Internal Portal") return I.pin;
  return I.globe;
}

/* ---------- filtering / sorting ---------- */
function passFilters(item){
  const f = state.filters;
  if(f.scope!=="all" && item.type!==f.scope) return false;
  if(f.types.size>0 && !f.types.has(kindOf(item))) return false;
  if(f.source!=="all" && item.source!==f.source) return false;
  if(f.audience!=="all" && item.audience!==f.audience && item.audience!=="All employees") return false;
  if(f.date!=="any"){
    const days = {week:7, month:31, year:365}[f.date];
    const cutoff = REF_NOW.getTime() - days*86400000;
    if(new Date(item.date+"T00:00:00").getTime() < cutoff) return false;
  }
  return true;
}
function filteredItems(){
  let out = state.result.items.filter(passFilters);
  if(state.sort==="date") out = out.slice().sort((a,b)=> new Date(b.date)-new Date(a.date));
  else if(state.sort==="name") out = out.slice().sort((a,b)=> a.title.localeCompare(b.title));
  return out;
}
function topMatchId(items){ return items.length ? items[0].id : null; }   // relevance order is default

/* ---------- result row ---------- */
function rowHTML(item, topId, showDate){
  const badge = item.id===topId ? `<span class="topmatch">Top match</span>` : "";
  const dateBit = showDate ? `<span class="dot">·</span><span>Updated ${fmtDate(item.date)}</span>` : "";
  return `<div class="res" data-act="open" data-id="${item.id}">
    ${tileHTML(item)}
    <div class="res-body">
      <span class="res-title">${esc(item.title)}</span>${badge}
      <div class="res-meta"><span class="mico">${metaIcon(item)}</span><span>${esc(kindOf(item))}</span>${dateBit}</div>
      <div class="res-desc">${esc(item.desc)}</div>
    </div>
  </div>`;
}

/* ---------- columns (All tab) ---------- */
function columnHTML(type, items, topId){
  const meta = {
    file:   {cls:"files", ico:I.docBig,  title:"Files", tab:"file"},
    app:    {cls:"apps",  ico:I.appsBig, title:"Apps",  tab:"app"},
    website:{cls:"websites", ico:I.globeBig, title:"Websites", tab:"website"},
  }[type];
  const topic = state.result.concepts[0] || state.result.query;
  const subs = {
    file:`Knowledge base and policy articles about ${esc(topic)}.`,
    app:`Applications and platforms matched to ${esc(topic)}.`,
    website:`Internal sites and portals related to ${esc(topic)}.`,
  };
  const list = items.filter(i=>i.type===type);
  const shown = list.slice(0,5);
  const showDate = type==="file";
  const rows = shown.length
    ? shown.map(i=>rowHTML(i, topId, showDate)).join("")
    : `<div class="res-desc" style="padding:16px 0;color:var(--ink-3)">No matching ${meta.title.toLowerCase()}.</div>`;
  const viewAll = list.length>5 ? `<a class="viewall" data-act="viewall" data-tab="${meta.tab}">View all ${I.chevRight}</a>` : "";
  return `<section class="col">
    <div class="col-head">
      <span class="ch-ico ${meta.cls}">${meta.ico}</span>
      <div><h2>${meta.title} <span class="n">(${list.length})</span></h2><div class="ch-sub">${subs[type]}</div></div>
      ${viewAll}
    </div>
    ${rows}
  </section>`;
}

/* ---------- filter chips ---------- */
function chipMenu(){
  const m = state.openMenu;
  if(!m) return "";
  const f = state.filters;
  const opt = (sel,val,label,box)=>`<div class="opt ${sel?"sel":""}" data-act="opt" data-chip="${m}" data-val="${esc(val)}">
    ${box ? `<span class="box">${sel?I.check:""}</span>` : `<span class="mk">${sel?I.check:""}</span>`}<span>${esc(label)}</span></div>`;
  let inner="", right="";
  if(m==="scope"){
    inner = [["all","All sources"],["app","Apps only"],["website","Websites only"],["file","Files only"]]
      .map(([v,l])=>opt(f.scope===v,v,l)).join("");
  } else if(m==="types"){
    inner = CONTENT_TYPES.map(t=>opt(f.types.has(t),t,t,true)).join("");
  } else if(m==="source"){
    inner = opt(f.source==="all","all","All sources") + `<div class="divider"></div>` +
      SOURCES.map(s=>opt(f.source===s,s,s)).join("");
  } else if(m==="audience"){
    inner = opt(f.audience==="all","all","All audiences") + `<div class="divider"></div>` +
      AUDIENCES.map(a=>opt(f.audience===a,a,a)).join("");
  } else if(m==="date"){
    inner = [["any","Any time"],["week","Past week"],["month","Past month"],["year","Past year"]]
      .map(([v,l])=>opt(f.date===v,v,l)).join("");
  } else if(m==="sort"){
    right="right";
    inner = [["relevance","Relevance"],["date","Date (newest)"],["name","Name (A–Z)"]]
      .map(([v,l])=>`<div class="opt ${state.sort===v?"sel":""}" data-act="sort-opt" data-val="${v}"><span class="mk">${state.sort===v?I.check:""}</span><span>${l}</span></div>`).join("");
  }
  return `<div class="menu ${right}">${inner}</div>`;
}
function chip(id, baseLabel){
  const f = state.filters;
  let label = baseLabel, active=false;
  if(id==="scope"){ const map={all:"All sources",app:"Apps only",website:"Websites only",file:"Files only"}; label=map[f.scope]; active=f.scope!=="all"; }
  if(id==="types"){ if(f.types.size){label=`Content type (${f.types.size})`;active=true;} }
  if(id==="source"){ if(f.source!=="all"){label=f.source;active=true;} }
  if(id==="audience"){ if(f.audience!=="all"){label=f.audience;active=true;} }
  if(id==="date"){ const map={any:"Date",week:"Past week",month:"Past month",year:"Past year"}; label=map[f.date]; active=f.date!=="any"; }
  const open = state.openMenu===id;
  return `<div class="menuwrap" data-menuroot>
    <button class="chip ${active?"active":""} ${open?"open":""}" data-act="chip" data-chip="${id}">${esc(label)} <span class="chev">${I.chevDown}</span></button>
    ${open?chipMenu():""}
  </div>`;
}
function filterbarHTML(){
  const sortMap = {relevance:"Relevance",date:"Date (newest)",name:"Name (A–Z)"};
  const open = state.openMenu==="sort";
  return `<div class="filterbar">
    ${chip("scope","All sources")}
    ${chip("types","Content type")}
    ${chip("source","Source")}
    ${chip("audience","Audience")}
    ${chip("date","Date")}
    <div class="sortwrap menuwrap" data-menuroot>
      <span class="sort-ico">${I.sort}</span><span>Sort by:</span>
      <button class="chip plain ${open?"open":""}" data-act="chip" data-chip="sort">${sortMap[state.sort]} <span class="chev">${I.chevDown}</span></button>
      ${open?chipMenu():""}
    </div>
  </div>`;
}

/* ---------- tabs / header ---------- */
function tabsHTML(){
  const tabs = TABS.map(t=>`<button class="tab ${state.tab===t.id?"active":""}" data-act="tab" data-tab="${t.id}">${t.label}</button>`).join("");
  const fb=state.feedback;
  return `<div class="tabsrow">
    <div class="tabs">${tabs}</div>
    <div class="feedback">
      <a class="fb-link" data-act="toast" data-msg="Thanks — your feedback helps improve results.">Send feedback</a>
      <button class="fb-btn ${fb==="up"?"on":""}" data-act="feedback" data-val="up" title="Helpful">${I.thumbUp}</button>
      <button class="fb-btn ${fb==="down"?"on":""}" data-act="feedback" data-val="down" title="Not helpful">${I.thumbDown}</button>
    </div>
  </div>`;
}
function smartHeadHTML(){
  const r=state.result;
  const concepts = r.concepts.map(c=>`<span class="cterm">${esc(c)}</span>`).join('<span class="csep">, </span>');
  const cline = concepts ? `<div class="concepts"><span class="clabel">Matched concepts: </span>${concepts}</div>` : "";
  return `<div class="smarthead">
    <span class="spark">${I.sparkle}</span>
    <div><h1>Showing smart results for <span class="q">"${esc(r.query)}"</span></h1>${cline}</div>
  </div>`;
}

/* ---------- main render ---------- */
function render(){
  const c = $("#content");
  $("#q").value = state.query;
  if(state.view==="detail"){ c.innerHTML = detailHTML(byId(state.detailId)); c.firstChild&&c.firstChild.classList.add("fadein"); return; }
  if(state.result.empty){ c.innerHTML = emptyHTML(); return; }

  const items = filteredItems();
  const topId = topMatchId(state.result.items.filter(passFilters));
  let body;
  if(items.length===0 && state.tab!=="people"){
    body = noResultsBody();
  } else if(state.tab==="all"){
    body = `<div class="columns">
      ${columnHTML("file", items, topId)}
      ${columnHTML("app", items, topId)}
      ${columnHTML("website", items, topId)}
    </div>`;
  } else if(state.tab==="people"){
    body = peopleHTML();
  } else {
    const list = items.filter(i=>i.type===state.tab);
    const showDate = state.tab==="file";
    body = list.length
      ? `<div class="listview">${list.map(i=>rowHTML(i, topId, showDate)).join("")}</div>`
      : noResultsBody();
  }
  c.innerHTML = `${tabsHTML()}${smartHeadHTML()}${filterbarHTML()}<div class="fadein">${body}</div>`;
}

function noResultsBody(){
  return `<div class="empty"><div class="big-spark">${I.sparkle}</div>
    <h2>No results in this view</h2>
    <p>Try clearing a filter, or switch to another tab. Your search still matched other content types.</p></div>`;
}

/* ---------- people ---------- */
function peopleHTML(){
  const list = state.people;
  if(!list.length) return noResultsBody();
  const cards = list.map(p=>`<div class="person" data-act="open-person" data-id="${p.id}">
    <span class="pav" style="background:${p.color}">${esc(p.mono)}</span>
    <div><div class="person-title">${esc(p.name)}</div>
      <div class="person-sub">${esc(p.role)}</div>
      <div class="person-meta">${I.pin}<span>${esc(p.dept)}</span></div></div>
  </div>`).join("");
  return `<div class="listview"><div class="people-grid">${cards}</div></div>`;
}

/* ---------- detail ---------- */
function detailHTML(item){
  if(!item) return "";
  const groups = item.groups;
  const related = CORPUS.filter(i=>i.id!==item.id && i.groups.some(g=>groups.includes(g)))
    .sort((a,b)=>{const an=a.type==="app"?0:1,bn=b.type==="app"?0:1;return an-bn;}).slice(0,6);
  const why = state.result.concepts.length ? state.result.concepts : GROUPS[groups[0]].concepts;
  const fav = state.fav.has(item.id);
  return `<div class="detail">
    <div class="crumb" data-act="back">${I.back}<span>Back to results for "${esc(state.result.query)}"</span></div>
    <div class="detail-hero">
      ${tileHTML(item)}
      <div class="detail-hd">
        <h1>${esc(item.title)}</h1>
        <div class="detail-meta">
          <span class="mico" style="display:inline-grid;color:var(--ink-3)">${metaIcon(item)}</span><span>${esc(kindOf(item))}</span>
          <span class="dot">·</span><span>${esc(item.source)}</span>
          <span class="dot">·</span><span>Updated ${fmtDate(item.date)}</span>
          <span class="dot">·</span><span>${esc(item.audience)}</span>
        </div>
      </div>
    </div>
    <div class="detail-actions">
      <button class="btn primary" data-act="toast" data-msg="Opening ${esc(item.title)}…">${I.open} Open ${esc(item.type==="app"?"app":item.type==="website"?"site":"document")}</button>
      <button class="btn" data-act="fav" data-id="${item.id}">${I.star} ${fav?"Saved":"Save"}</button>
      <button class="btn" data-act="toast" data-msg="Link copied to clipboard.">${I.link} Copy link</button>
    </div>
    <div class="detail-sec">
      <h3>About</h3>
      <p>${esc(item.desc)} ${esc(detailBlurb(item))}</p>
    </div>
    <div class="detail-sec">
      <h3>Why this result</h3>
      <div class="why">
        <span style="color:var(--ink-2);font-size:13.5px;margin-right:4px">Matched your search through related concepts:</span>
        ${why.map(w=>`<span class="wterm">${esc(w)}</span>`).join("")}
      </div>
    </div>
    <div class="detail-sec">
      <h3>Related results</h3>
      <div class="related">
        ${related.map(r=>`<div class="relcard" data-act="open" data-id="${r.id}">
          ${tileHTML(r)}
          <div><div class="rc-title">${esc(r.title)}</div><div class="rc-kind">${esc(kindOf(r))} · ${esc(r.source)}</div></div>
        </div>`).join("")}
      </div>
    </div>
  </div>`;
}
function detailBlurb(item){
  if(item.type==="app") return "Single sign-on enabled — open it directly from Smart Search or pin it to your Nexus home for quick access.";
  if(item.type==="website") return "Part of the company intranet. You can bookmark this site or share it with your team.";
  return "Maintained by the owning team and indexed in the knowledge base. Use the concepts below to find similar guidance.";
}

/* ---------- empty / home state ---------- */
function emptyHTML(){
  const sug = ["learn","payroll","expenses","org chart","IT help","benefits","time off","careers"];
  return `<div class="empty" style="padding-top:96px">
    <div class="big-spark">${I.sparkle}</div>
    <h2>Search across everything at work</h2>
    <p>Find apps, files, sites, and people — search by what you mean, not just exact words. Try a concept like “learning” to find Classmate.</p>
    <div class="label">Try searching for</div>
    <div class="suggests">${sug.map(s=>`<button class="suggest" data-act="suggest" data-q="${esc(s)}">${I.search} ${esc(s)}</button>`).join("")}</div>
  </div>`;
}

/* ---------- type-ahead ---------- */
function renderTypeahead(){
  const box = $("#typeahead");
  const ta = state.ta;
  if(!ta.open || !ta.items.length){ box.innerHTML=""; box.style.display="none"; return; }
  box.style.display="block";
  let html = `<div class="ta-group-label">Suggestions</div>`;
  html += ta.items.map((s,idx)=>{
    const lead = s.kind==="app"
      ? `<span class="ta-tile" style="background:${s.app.color}">${esc(s.app.mono)}</span>`
      : `<span class="ta-ico">${I.search}</span>`;
    return `<div class="ta-item ${idx===ta.index?"active":""}" data-act="run-suggest" data-q="${esc(s.title)}">
      ${lead}<b>${esc(s.title)}</b><span class="ta-sub">${esc(s.sub)}</span></div>`;
  }).join("");
  box.innerHTML = html;
}
function closeTypeahead(){ state.ta.open=false; state.ta.index=-1; renderTypeahead(); }

/* ---------- actions ---------- */
function runQuery(q){
  state.query = q;
  state.result = semanticSearch(q);
  state.people = searchPeople(state.result);
  state.view="results";
  state.detailId=null;
  state.openMenu=null;
  if(!state.result.empty && state.tab==="people" && !state.people.length) state.tab="all";
  closeTypeahead();
  render();
}
function toast(msg){
  let t=document.createElement("div");
  t.textContent=msg;
  t.style.cssText="position:fixed;left:50%;bottom:34px;transform:translateX(-50%);background:#242220;color:#fff;padding:11px 20px;border-radius:8px;font-size:13.5px;z-index:200;box-shadow:0 8px 24px rgba(0,0,0,.25);opacity:0;transition:opacity .2s,transform .2s;";
  document.body.appendChild(t);
  requestAnimationFrame(()=>{t.style.opacity="1";t.style.transform="translateX(-50%) translateY(-4px)";});
  setTimeout(()=>{t.style.opacity="0";setTimeout(()=>t.remove(),250);},1900);
}

document.addEventListener("click",(e)=>{
  const el = e.target.closest("[data-act]");
  if(el){
    const act = el.dataset.act;
    if(act==="open"){ state.view="detail"; state.detailId=el.dataset.id; state.openMenu=null; render(); window.scrollTo({top:0}); return; }
    if(act==="open-person"){ toast("Opening profile…"); return; }
    if(act==="back"){ state.view="results"; state.detailId=null; render(); return; }
    if(act==="tab"){ state.tab=el.dataset.tab; state.view="results"; state.openMenu=null; render(); return; }
    if(act==="viewall"){ state.tab=el.dataset.tab; state.openMenu=null; render(); return; }
    if(act==="suggest" || act==="run-suggest"){ runQuery(el.dataset.q); return; }
    if(act==="feedback"){ state.feedback = state.feedback===el.dataset.val?null:el.dataset.val; toast(el.dataset.val==="up"?"Thanks — glad this helped.":"Thanks — we'll use this to improve."); render(); return; }
    if(act==="toast"){ toast(el.dataset.msg); return; }
    if(act==="fav"){ const id=el.dataset.id; state.fav.has(id)?state.fav.delete(id):state.fav.add(id); toast(state.fav.has(id)?"Saved to favorites.":"Removed from favorites."); render(); return; }
    if(act==="chip"){ const m=el.dataset.chip; state.openMenu = state.openMenu===m?null:m; render(); return; }
    if(act==="opt"){
      const f=state.filters, m=el.dataset.chip, v=el.dataset.val;
      if(m==="scope") f.scope=v;
      else if(m==="types"){ f.types.has(v)?f.types.delete(v):f.types.add(v); render(); return; } // keep menu open
      else if(m==="source") f.source=v;
      else if(m==="audience") f.audience=v;
      else if(m==="date") f.date=v;
      state.openMenu=null; render(); return;
    }
    if(act==="sort-opt"){ state.sort=el.dataset.val; state.openMenu=null; render(); return; }
  }
  // outside click closes menus + typeahead
  if(state.openMenu && !e.target.closest("[data-menuroot]")){ state.openMenu=null; render(); }
  if(state.ta.open && !e.target.closest(".searchwrap")) closeTypeahead();
});

/* search box wiring */
function wireSearch(){
  const input = $("#q");
  input.addEventListener("input", ()=>{
    state.ta.items = suggest(input.value);
    state.ta.open = state.ta.items.length>0;
    state.ta.index = -1;
    renderTypeahead();
  });
  input.addEventListener("focus", ()=>{
    if(input.value.trim()){ state.ta.items=suggest(input.value); state.ta.open=state.ta.items.length>0; renderTypeahead(); }
  });
  input.addEventListener("keydown",(e)=>{
    const ta=state.ta;
    if(e.key==="ArrowDown" && ta.open){ e.preventDefault(); ta.index=Math.min(ta.index+1,ta.items.length-1); renderTypeahead(); }
    else if(e.key==="ArrowUp" && ta.open){ e.preventDefault(); ta.index=Math.max(ta.index-1,-1); renderTypeahead(); }
    else if(e.key==="Enter"){
      if(ta.open && ta.index>=0){ runQuery(ta.items[ta.index].title); input.blur(); }
      else if(input.value.trim()){ runQuery(input.value.trim()); input.blur(); }
    } else if(e.key==="Escape"){ closeTypeahead(); }
  });
  $("#searchbtn").addEventListener("click", ()=>{ if(input.value.trim()) runQuery(input.value.trim()); });
  $("#backbtn").addEventListener("click", ()=>{ input.value=""; state.query=""; state.result={empty:true,concepts:[],groups:[],items:[]}; state.view="results"; closeTypeahead(); render(); input.focus(); });
}

/* ---------- boot ---------- */
function boot(){
  $("#q").value = state.query;
  wireSearch();
  render();
}
document.addEventListener("DOMContentLoaded", boot);
