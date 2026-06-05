/* ================= Smart Search — semantic engine ================= */
/* Local concept-expansion search: expand the query into concept groups via a
   synonym index, then score & rank corpus items. No backend / no real model. */

function normalize(s){ return (s||"").toLowerCase().replace(/[^a-z0-9\s\-]/g," ").replace(/\s+/g," ").trim(); }
function tokenize(s){ return normalize(s).split(" ").filter(Boolean); }

/* score how strongly a query relates to one concept group */
function scoreGroup(qNorm, qTokens, group){
  let score = 0;
  for(const syn of group.synonyms){
    if(syn.includes(" ")){                       // multi-word synonym
      if(qNorm.includes(syn)) score += 9;
      continue;
    }
    for(const t of qTokens){
      if(t === syn) score += 8;
      else if(t.length>=4 && syn.startsWith(t)) score += 6;   // learn -> learning
      else if(syn.length>=4 && t.startsWith(syn)) score += 6; // trainings -> train
      else if(t.length>=5 && syn.includes(t)) score += 3;
    }
  }
  return score;
}

/* main search */
function semanticSearch(query){
  const qNorm = normalize(query);
  const qTokens = tokenize(query);
  if(!qNorm) return {empty:true, concepts:[], groups:[], items:[]};

  // 1. matched concept groups
  const groupScores = {};
  for(const gid in GROUPS){
    const sc = scoreGroup(qNorm, qTokens, GROUPS[gid]);
    if(sc>0) groupScores[gid] = sc;
  }

  // 2. score every corpus item
  const scored = [];
  for(const item of CORPUS){
    let score = 0;
    const tNorm = normalize(item.title);
    const tTokens = tokenize(item.title);

    // title relevance
    if(tNorm === qNorm) score += 26;
    else if(tNorm.startsWith(qNorm)) score += 14;
    else if(tNorm.includes(qNorm) && qNorm.length>=3) score += 11;
    for(const qt of qTokens){
      if(qt.length<2) continue;
      for(const tt of tTokens){
        if(tt===qt) score += 8;
        else if(qt.length>=4 && tt.startsWith(qt)) score += 5;
      }
    }
    // group / concept relevance
    let groupHit = 0;
    for(const g of item.groups){
      if(groupScores[g]){ score += Math.min(groupScores[g], 12); groupHit += groupScores[g]; }
    }
    // primary apps are the destination for their concept — surface them as the top match
    if(item.primary && groupHit>0) score += 16 + Math.min(groupHit, 12);

    if(score>0){
      // tiny recency tiebreak (newer first)
      const t = new Date(item.date).getTime() || 0;
      scored.push({item, score, recency:t});
    }
  }

  // if a title hit fell outside matched groups, fold its groups into matched set
  for(const s of scored){
    if(normalize(s.item.title).includes(qNorm) && qNorm.length>=3){
      groupScores[s.item.groups[0]] = Math.max(groupScores[s.item.groups[0]]||0, 4);
    }
  }

  // 3. ranked matched groups + concept terms
  const rankedGroups = Object.keys(groupScores).sort((a,b)=>groupScores[b]-groupScores[a]);
  const concepts = [];
  for(const gid of rankedGroups){
    for(const c of GROUPS[gid].concepts){
      if(!concepts.includes(c)) concepts.push(c);
    }
  }

  scored.sort((a,b)=> b.score-a.score || b.recency-a.recency || a.item.title.localeCompare(b.item.title));
  return {
    empty:false,
    query,
    groups: rankedGroups,
    concepts: concepts.slice(0,6),
    items: scored.map(s=>({...s.item, _score:s.score})),
  };
}

/* people search (separate corpus) */
function searchPeople(result){
  if(result.empty) return [];
  const gset = new Set(result.groups);
  const qNorm = normalize(result.query);
  return PEOPLE.map(p=>{
    let score = 0;
    if(normalize(p.name).includes(qNorm) && qNorm.length>=3) score += 12;
    if(normalize(p.role).includes(qNorm) && qNorm.length>=3) score += 8;
    for(const g of p.groups) if(gset.has(g)) score += 6;
    return {...p, _score:score};
  }).filter(p=>p._score>0).sort((a,b)=>b._score-a._score);
}

/* type-ahead suggestions while typing */
function suggest(partial){
  const q = normalize(partial);
  if(!q) return [];
  const out = [];
  const seen = new Set();
  // matching apps
  for(const a of APPS){
    if(normalize(a.title).includes(q)){
      out.push({kind:"app", title:a.title, sub:"App", app:a});
      seen.add(a.title.toLowerCase());
    }
    if(out.length>=5) break;
  }
  // matching concept terms
  const terms = [];
  for(const gid in GROUPS){
    for(const syn of GROUPS[gid].synonyms){
      if(syn.length>=3 && syn.startsWith(q) && !seen.has(syn) && syn!==q){
        terms.push({kind:"concept", title:syn, sub:"Search"});
        seen.add(syn);
      }
    }
  }
  terms.sort((a,b)=>a.title.length-b.title.length);
  return [...out, ...terms.slice(0, Math.max(0, 7-out.length))];
}
