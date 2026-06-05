/* ================= Smart Search — data & semantic index ================= */
/* Concept groups: each has display "concepts" (shown in the matched-concepts
   line) and "synonyms" used for matching. An item belongs to one or more groups. */

const GROUPS = {
  learning:   { concepts:["learning","training","development","upskilling","classmate"],
    synonyms:["learn","learning","train","training","trainings","course","courses","class","classes","certification","certifications","certificate","certificates","lms","upskill","upskilling","skill","skills","education","educate","classmate","develop","development","learning path","learning paths","study","onboarding","grow","career growth"] },
  workflow:   { concepts:["workflows","approvals","processes","automation"],
    synonyms:["workflow","workflows","approval","approvals","approve","process","processes","automation","automate","automated","automating","task","tasks","flow","flows","routing","sign off","sign-off"] },
  hr:         { concepts:["policies","handbook","benefits","company rules"],
    synonyms:["hr","human resources","handbook","policy","policies","benefit","benefits","company rules","rules","leave","pto","vacation","sick leave","conduct","code of conduct","guidelines","perks","wellness"] },
  org:        { concepts:["org chart","reporting structure","managers"],
    synonyms:["org","organization","organisation","organization chart","org chart","reporting","reporting structure","manager","managers","management","hierarchy","team","teams","directory","reports to","who is","structure","reorg"] },
  engagement: { concepts:["engagement","employee feedback","surveys","culture"],
    synonyms:["vibe","engagement","engaged","feedback","survey","surveys","culture","employee feedback","morale","sentiment","pulse survey","experience","wellbeing","recognition","kudos"] },
  support:    { concepts:["IT support","service desk","troubleshooting","tickets"],
    synonyms:["it","it support","support","ticket","tickets","issue","issues","technical","technical support","service desk","helpdesk","help desk","help","troubleshoot","troubleshooting","smart support","password","laptop","vpn","reset","outage","incident","bug","not working","broken"] },
  performance:{ concepts:["performance reviews","goals","appraisals","feedback"],
    synonyms:["performance","my performance","goal","goals","review","reviews","performance review","appraisal","appraisals","feedback","okr","okrs","rating","ratings","evaluation","check-in","one on one","1:1","self review"] },
  payroll:    { concepts:["payroll","paystubs","tax forms","direct deposit"],
    synonyms:["payroll","pay","paycheck","paystub","paystubs","pay stub","salary","tax","taxes","tax form","tax forms","w2","w-2","w 2","1099","direct deposit","deposit","adp","adp workforce","compensation","wages","earnings","payslip","payday"] },
  news:       { concepts:["announcements","company news","communications"],
    synonyms:["pulse","announcement","announcements","news","update","updates","company updates","communication","communications","newsletter","memo","bulletin","press","stories","town hall"] },
  knowledge:  { concepts:["knowledge base","AI assistant","help"],
    synonyms:["yoda","knowledge","knowledge base","kb","ai","ai assistant","assistant","chatbot","bot","search","help","faq","faqs","ask","question","how do i","how to","answers", "timesheet", "hours"] },
  expenses:   { concepts:["expenses","reimbursements","travel","receipts"],
    synonyms:["concur","expense","expenses","reimburse","reimbursement","reimbursements","receipt","receipts","travel","trip","trips","expense report","expense reports","mileage","per diem","booking","book travel","flights","hotel","claim"] },
  portal:     { concepts:["internal portal","resources","central hub"],
    synonyms:["nexus","portal","internal portal","intranet","resource","resources","central hub","hub","homepage","home page","links","start page","quick links"] },
  jobs:       { concepts:["internal jobs","careers","referrals"],
    synonyms:["jobs","job","opening","openings","career","careers","internal jobs","position","positions","role","roles","referral","referrals","hiring","recruit","recruitment","recruiting","apply","vacancy","vacancies","transfer","mobility"] },
};

/* group color used for tiles */
const GROUP_COLOR = {
  learning:"#0e7c93", workflow:"#117865", hr:"#8045a8", org:"#2b6cb0",
  engagement:"#b83280", support:"#c05621", performance:"#2563a8", payroll:"#b23a48",
  news:"#0b7285", knowledge:"#475569", expenses:"#b7791f", portal:"#6b46c1", jobs:"#2f855a",
};

/* ---- Apps (the platforms the user listed) ---- */
const APPS = [
  {id:"classmate", title:"Classmate", mono:"Cl", color:"#0e7c93", groups:["learning"], source:"Classmate", audience:"All employees", date:"2024-02-01", primary:true,
    desc:"Access learning paths, courses, certifications, and resources."},
  {id:"skillportal", title:"Skill Portal", mono:"Sk", color:"#5b5fc7", groups:["learning"], source:"Skill Portal", audience:"All employees", date:"2024-01-12",
    desc:"Build skills, track progress, and grow your career."},
  {id:"workflows", title:"Workflows", mono:"Wf", color:"#117865", groups:["workflow"], source:"Workflows", audience:"All employees", date:"2024-03-05", primary:true,
    desc:"Build, run, and track approvals and automated processes."},
  {id:"hrpolicies", title:"HR Policies", mono:"HR", color:"#8045a8", groups:["hr"], source:"HR Portal", audience:"All employees", date:"2024-04-01", primary:true,
    desc:"Find the employee handbook, benefits, and company policies."},
  {id:"orgview", title:"Org View", mono:"Or", color:"#2b6cb0", groups:["org"], source:"Org View", audience:"All employees", date:"2024-02-18", primary:true,
    desc:"Explore the org chart, reporting lines, and team structure."},
  {id:"vibe", title:"Vibe", mono:"Vi", color:"#b83280", groups:["engagement"], source:"Vibe", audience:"All employees", date:"2024-02-14", primary:true,
    desc:"Share feedback, take surveys, and shape company culture."},
  {id:"helpdesk", title:"Helpdesk", mono:"He", color:"#c05621", groups:["support"], source:"Helpdesk", audience:"All employees", date:"2024-03-10", primary:true,
    desc:"Raise IT tickets and get technical support, fast."},
  {id:"myperformance", title:"My Performance", mono:"MP", color:"#2563a8", groups:["performance"], source:"My Performance", audience:"All employees", date:"2024-01-22", primary:true,
    desc:"Set goals, track reviews, and manage your appraisals."},
  {id:"adp", title:"ADP Workforce", mono:"AD", color:"#b23a48", groups:["payroll"], source:"ADP Workforce", audience:"All employees", date:"2024-01-31", primary:true,
    desc:"View paystubs and tax forms, and manage direct deposit."},
  {id:"pulse", title:"Pulse", mono:"Pu", color:"#0b7285", groups:["news"], source:"Pulse", audience:"All employees", date:"2024-03-20", primary:true,
    desc:"Read announcements, company news, and updates."},
  {id:"yoda", title:"YODA", mono:"Yo", color:"#475569", groups:["knowledge"], source:"YODA", audience:"All employees", date:"2024-02-05", primary:true,
    desc:"Ask the AI assistant and search the knowledge base."},
  {id:"concur", title:"Concur", mono:"Co", color:"#b7791f", groups:["expenses"], source:"Concur", audience:"All employees", date:"2024-02-02", primary:true,
    desc:"Submit expenses, receipts, and travel reimbursements."},
  {id:"smartsupport", title:"OI Smart Support", mono:"SS", color:"#0e7490", groups:["support","knowledge"], source:"OI Smart Support", audience:"All employees", date:"2024-03-12",
    desc:"Get AI-powered help and guided troubleshooting."},
  {id:"nexus", title:"Nexus", mono:"Ne", color:"#6b46c1", groups:["portal"], source:"Nexus", audience:"All employees", date:"2024-03-28", primary:true,
    desc:"Your internal portal and central hub for resources."},
  {id:"jobsdash", title:"Jobs Dashboard", mono:"Jo", color:"#2f855a", groups:["jobs"], source:"Jobs Dashboard", audience:"All employees", date:"2024-01-25", primary:true,
    desc:"Browse internal openings, careers, and referrals."},
];

/* ---- Files (articles, policies, knowledge-base docs) ---- */
const FILES = [
  // learning
  {id:"f-ld-policy", title:"Learning & Development Policy", kind:"Policy", groups:["learning"], source:"HR Portal", audience:"All employees", date:"2024-02-10", desc:"Guidelines for employee learning, training support, and development programs."},
  {id:"f-classmate-start", title:"How to Get Started with Classmate", kind:"Knowledge Base", groups:["learning"], source:"YODA", audience:"All employees", date:"2024-01-28", desc:"Step-by-step guide to access Classmate and begin your learning journey."},
  {id:"f-learn-handbook", title:"Learning Resources — Employee Handbook", kind:"Searchable article", groups:["learning","hr"], source:"HR Portal", audience:"All employees", date:"2023-12-05", desc:"Overview of learning resources, programs, and support available to employees."},
  {id:"f-upskill-mgr", title:"Manager Guide to Employee Upskilling", kind:"Knowledge Base", groups:["learning","performance"], source:"YODA", audience:"Managers", date:"2023-11-20", desc:"Best practices to support team learning and career development."},
  {id:"f-certs", title:"Recommended Certifications for Employees", kind:"Knowledge Base", groups:["learning"], source:"Skill Portal", audience:"All employees", date:"2023-10-12", desc:"Curated list of role-based certifications to build in-demand skills."},
  // workflow
  {id:"f-approval-guide", title:"Approval Workflow Guidelines", kind:"Policy", groups:["workflow"], source:"Workflows", audience:"All employees", date:"2024-03-02", desc:"How to request, route, and approve workflows across teams."},
  {id:"f-automation", title:"Process Automation Handbook", kind:"Knowledge Base", groups:["workflow"], source:"Workflows", audience:"All employees", date:"2024-01-15", desc:"Set up automated processes and recurring approvals."},
  // hr
  {id:"f-handbook", title:"Employee Handbook", kind:"Handbook", groups:["hr"], source:"HR Portal", audience:"All employees", date:"2024-04-01", desc:"The complete guide to company policies, conduct, and benefits."},
  {id:"f-benefits", title:"Benefits Policy 2024", kind:"Policy", groups:["hr"], source:"HR Portal", audience:"All employees", date:"2024-01-08", desc:"Health, retirement, and wellness benefits available to all employees."},
  {id:"f-conduct", title:"Code of Conduct & Company Rules", kind:"Policy", groups:["hr"], source:"HR Portal", audience:"All employees", date:"2023-09-30", desc:"Standards of behavior and workplace guidelines for everyone."},
  {id:"f-leave", title:"Time Off & Leave Policy", kind:"Policy", groups:["hr"], source:"HR Portal", audience:"All employees", date:"2024-02-20", desc:"How to request PTO, sick leave, and parental leave."},
  // org
  {id:"f-reporting", title:"Reporting Structure Guide", kind:"Knowledge Base", groups:["org"], source:"Org View", audience:"All employees", date:"2023-11-02", desc:"Understand reporting lines and how teams are organized."},
  {id:"f-orgchange", title:"Org Change Request Policy", kind:"Policy", groups:["org"], source:"HR Portal", audience:"Managers", date:"2023-10-18", desc:"Process for team moves, reorgs, and manager changes."},
  // engagement
  {id:"f-survey-guide", title:"Engagement Survey Guide", kind:"Knowledge Base", groups:["engagement"], source:"Vibe", audience:"All employees", date:"2024-02-14", desc:"How surveys work and how your feedback is used."},
  {id:"f-culture", title:"Culture & Values Playbook", kind:"Searchable article", groups:["engagement"], source:"Pulse", audience:"All employees", date:"2023-12-12", desc:"Our values and how we bring company culture to life."},
  // support
  {id:"f-it-guide", title:"IT Support & Service Desk Guide", kind:"Knowledge Base", groups:["support"], source:"Helpdesk", audience:"All employees", date:"2024-03-10", desc:"How to raise tickets and reach technical support."},
  {id:"f-troubleshoot", title:"Common Troubleshooting FAQ", kind:"Knowledge Base", groups:["support"], source:"OI Smart Support", audience:"All employees", date:"2024-02-26", desc:"Quick fixes for VPN, password, and laptop issues."},
  {id:"f-sla", title:"Service Desk SLA & Priorities", kind:"Policy", groups:["support"], source:"Helpdesk", audience:"IT", date:"2023-11-28", desc:"Response times and ticket priority levels explained."},
  // performance
  {id:"f-review-cycle", title:"Performance Review Cycle Guide", kind:"Knowledge Base", groups:["performance"], source:"My Performance", audience:"All employees", date:"2024-01-22", desc:"Timeline and steps for the performance review cycle."},
  {id:"f-okr", title:"Goal Setting & OKR Framework", kind:"Searchable article", groups:["performance"], source:"My Performance", audience:"All employees", date:"2023-12-01", desc:"Write effective goals and track your progress."},
  {id:"f-appraisal", title:"Appraisal & Rating Policy", kind:"Policy", groups:["performance"], source:"HR Portal", audience:"Managers", date:"2023-10-05", desc:"How ratings and appraisals are determined."},
  // payroll
  {id:"f-payschedule", title:"Payroll Schedule 2024", kind:"Knowledge Base", groups:["payroll"], source:"ADP Workforce", audience:"All employees", date:"2024-01-03", desc:"Pay dates, cutoffs, and processing timelines."},
  {id:"f-w2", title:"W-2 & Tax Form Guide", kind:"Knowledge Base", groups:["payroll"], source:"ADP Workforce", audience:"All employees", date:"2024-01-31", desc:"How to access and understand your tax forms."},
  {id:"f-deposit", title:"Direct Deposit Setup Guide", kind:"Knowledge Base", groups:["payroll"], source:"ADP Workforce", audience:"All employees", date:"2023-12-08", desc:"Add or update your direct deposit details."},
  {id:"f-comp", title:"Compensation & Pay Policy", kind:"Policy", groups:["payroll"], source:"HR Portal", audience:"All employees", date:"2023-09-15", desc:"How pay, raises, and bonuses work."},
  // news
  {id:"f-comms", title:"Communications Guidelines", kind:"Policy", groups:["news"], source:"Pulse", audience:"All employees", date:"2023-11-10", desc:"How company news and announcements are shared."},
  {id:"f-newsletter", title:"Company Newsletter Archive", kind:"Searchable article", groups:["news"], source:"Pulse", audience:"All employees", date:"2024-03-20", desc:"Past editions of the company newsletter."},
  // knowledge
  {id:"f-yoda-guide", title:"YODA Knowledge Base Guide", kind:"Knowledge Base", groups:["knowledge"], source:"YODA", audience:"All employees", date:"2024-02-05", desc:"How to search and ask YODA for answers."},
  {id:"f-ai-faq", title:"AI Assistant FAQ", kind:"Knowledge Base", groups:["knowledge"], source:"OI Smart Support", audience:"All employees", date:"2024-01-18", desc:"What YODA can do and how to use it."},
  // expenses
  {id:"f-expense-policy", title:"Expense & Reimbursement Policy", kind:"Policy", groups:["expenses"], source:"Concur", audience:"All employees", date:"2024-01-12", desc:"What's reimbursable and how to claim it."},
  {id:"f-travel", title:"Travel Booking & Per Diem Guide", kind:"Knowledge Base", groups:["expenses"], source:"Concur", audience:"All employees", date:"2023-12-15", desc:"Book travel and understand per diem rates."},
  {id:"f-receipts", title:"Receipt Submission Guide", kind:"Knowledge Base", groups:["expenses"], source:"Concur", audience:"All employees", date:"2024-02-02", desc:"Upload receipts and submit expense reports."},
  // portal
  {id:"f-intranet", title:"Nexus Intranet User Guide", kind:"Knowledge Base", groups:["portal"], source:"Nexus", audience:"All employees", date:"2023-12-20", desc:"Navigate the internal portal and find resources."},
  // jobs
  {id:"f-mobility", title:"Internal Mobility Policy", kind:"Policy", groups:["jobs"], source:"Jobs Dashboard", audience:"All employees", date:"2023-11-15", desc:"How to apply for internal roles and transfers."},
  {id:"f-referral", title:"Employee Referral Program Guide", kind:"Knowledge Base", groups:["jobs"], source:"Jobs Dashboard", audience:"All employees", date:"2024-01-25", desc:"Refer candidates and earn referral rewards."},
];

/* ---- Websites (internal sites & portals) ---- */
const WEBSITES = [
  // learning
  {id:"w-learnhub", title:"Learning Hub", kind:"Website", groups:["learning"], source:"Classmate", audience:"All employees", date:"2024-02-08", desc:"Curated learning resources, programs, and events for employees."},
  {id:"w-hr-learn", title:"HR Portal — Learning Center", kind:"Internal Portal", groups:["learning","hr"], source:"HR Portal", audience:"All employees", date:"2024-01-30", desc:"Discover training programs, policies, and learning support."},
  {id:"w-compliance", title:"Compliance Training Center", kind:"Internal Portal", groups:["learning"], source:"Classmate", audience:"All employees", date:"2023-12-18", desc:"Mandatory trainings and compliance learning for all employees."},
  // workflow
  {id:"w-process", title:"Process Center", kind:"Internal Portal", groups:["workflow"], source:"Workflows", audience:"All employees", date:"2024-03-01", desc:"Standard processes, templates, and approval routes."},
  {id:"w-automation-hub", title:"Automation Hub", kind:"Website", groups:["workflow"], source:"Workflows", audience:"All employees", date:"2024-02-22", desc:"Tools and tips to automate routine work."},
  // hr
  {id:"w-hr-portal", title:"HR Portal", kind:"Internal Portal", groups:["hr"], source:"HR Portal", audience:"All employees", date:"2024-04-02", desc:"Your hub for policies, benefits, and HR support."},
  {id:"w-benefits-center", title:"Benefits Center", kind:"Website", groups:["hr"], source:"HR Portal", audience:"All employees", date:"2024-01-09", desc:"Enroll in and manage your benefits."},
  // org
  {id:"w-directory", title:"People Directory", kind:"Internal Portal", groups:["org"], source:"Org View", audience:"All employees", date:"2024-02-19", desc:"Search colleagues, teams, and reporting lines."},
  {id:"w-orgchart", title:"Org Chart Portal", kind:"Website", groups:["org"], source:"Org View", audience:"All employees", date:"2024-02-17", desc:"Interactive organization chart and team structure."},
  // engagement
  {id:"w-experience", title:"Employee Experience Hub", kind:"Internal Portal", groups:["engagement"], source:"Vibe", audience:"All employees", date:"2024-02-15", desc:"Engagement programs, surveys, and culture resources."},
  // support
  {id:"w-it-portal", title:"IT Service Portal", kind:"Internal Portal", groups:["support"], source:"Helpdesk", audience:"All employees", date:"2024-03-11", desc:"Self-service IT, tickets, and software downloads."},
  {id:"w-support-center", title:"Support Center", kind:"Website", groups:["support","knowledge"], source:"OI Smart Support", audience:"All employees", date:"2024-03-13", desc:"Guides, system status, and contact options for support."},
  // performance
  {id:"w-perf-portal", title:"Performance Portal", kind:"Internal Portal", groups:["performance"], source:"My Performance", audience:"All employees", date:"2024-01-23", desc:"Reviews, goals, and feedback in one place."},
  // payroll
  {id:"w-adp-portal", title:"ADP Portal", kind:"Website", groups:["payroll"], source:"ADP Workforce", audience:"All employees", date:"2024-02-01", desc:"Payroll, paystubs, and tax documents."},
  {id:"w-pay-center", title:"Payroll & Pay Center", kind:"Internal Portal", groups:["payroll"], source:"ADP Workforce", audience:"All employees", date:"2024-01-04", desc:"Pay schedules, deductions, and pay support."},
  // news
  {id:"w-news-hub", title:"News Hub", kind:"Website", groups:["news"], source:"Pulse", audience:"All employees", date:"2024-03-21", desc:"Company news, announcements, and stories."},
  // knowledge
  {id:"w-knowledge-center", title:"Knowledge Center", kind:"Internal Portal", groups:["knowledge"], source:"YODA", audience:"All employees", date:"2024-02-06", desc:"Browse the knowledge base by topic."},
  // expenses
  {id:"w-concur-portal", title:"Concur Portal", kind:"Website", groups:["expenses"], source:"Concur", audience:"All employees", date:"2024-02-03", desc:"Submit and track expenses and travel."},
  {id:"w-travel-center", title:"Travel Center", kind:"Internal Portal", groups:["expenses"], source:"Concur", audience:"All employees", date:"2023-12-16", desc:"Book travel and manage your trips."},
  // portal
  {id:"w-nexus-portal", title:"Nexus Portal", kind:"Internal Portal", groups:["portal"], source:"Nexus", audience:"All employees", date:"2024-03-29", desc:"The central hub for company resources."},
  {id:"w-resource-center", title:"Resource Center", kind:"Website", groups:["portal"], source:"Nexus", audience:"All employees", date:"2024-03-25", desc:"Tools, links, and downloads in one place."},
  // jobs
  {id:"w-careers", title:"Careers Portal", kind:"Website", groups:["jobs"], source:"Jobs Dashboard", audience:"All employees", date:"2024-01-26", desc:"Internal openings and career resources."},
  {id:"w-referral-center", title:"Referral Center", kind:"Internal Portal", groups:["jobs"], source:"Jobs Dashboard", audience:"All employees", date:"2024-01-24", desc:"Submit referrals and track your rewards."},
];

/* ---- People (for the People tab) ---- */
const PEOPLE = [
  {id:"p-maya", name:"Maya Chen", role:"Learning & Development Lead", dept:"People & Culture", groups:["learning","performance"], color:"#0e7c93", mono:"MC", email:"maya.chen@company.com"},
  {id:"p-daniel", name:"Daniel Park", role:"IT Service Desk Manager", dept:"Information Technology", groups:["support"], color:"#c05621", mono:"DP", email:"daniel.park@company.com"},
  {id:"p-priya", name:"Priya Nair", role:"HR Business Partner", dept:"People & Culture", groups:["hr","org"], color:"#8045a8", mono:"PN", email:"priya.nair@company.com"},
  {id:"p-tom", name:"Tom Becker", role:"Payroll Specialist", dept:"Finance", groups:["payroll"], color:"#b23a48", mono:"TB", email:"tom.becker@company.com"},
  {id:"p-aisha", name:"Aisha Rahman", role:"People Analytics Partner", dept:"People & Culture", groups:["engagement","performance"], color:"#b83280", mono:"AR", email:"aisha.rahman@company.com"},
  {id:"p-luis", name:"Luis Romero", role:"Talent Acquisition Partner", dept:"Recruiting", groups:["jobs"], color:"#2f855a", mono:"LR", email:"luis.romero@company.com"},
  {id:"p-sofia", name:"Sofia Almeida", role:"Expenses & Travel Analyst", dept:"Finance", groups:["expenses"], color:"#b7791f", mono:"SA", email:"sofia.almeida@company.com"},
  {id:"p-ken", name:"Ken Watanabe", role:"Engineering Manager", dept:"Engineering", groups:["org","performance"], color:"#2563a8", mono:"KW", email:"ken.watanabe@company.com"},
];

/* assign type + color to files/websites */
APPS.forEach(a=>a.type="app");
FILES.forEach(f=>{f.type="file"; f.color="#6b4ea8";});
WEBSITES.forEach(w=>{w.type="website"; w.color=GROUP_COLOR[w.groups[0]]||"#117865";});

const CORPUS = [...APPS, ...FILES, ...WEBSITES];

/* Filter option vocabularies (derived) */
const SOURCES = [...new Set(CORPUS.map(i=>i.source))].sort();
const CONTENT_TYPES = ["App","Website","Internal Portal","Policy","Knowledge Base","Searchable article","Handbook"];
const AUDIENCES = ["All employees","Managers","IT","Finance"];
