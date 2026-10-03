import { useState, useEffect } from "react";

const NAVY = "#0B1628";
const GOLD = "#C9A044";
const GOLD_LIGHT = "#E8C96A";
const DARK2 = "#111E35";
const DARK3 = "#162240";
const MUTED = "#7A8BA8";
const WHITE = "#F4F0E8";

const WT_RELEVANT_CATEGORIES = ["Legal", "Professional", "Finance", "Research", "Sales", "Life Sciences", "Healthcare", "Marketing", "HR"];

const ALL_USE_CASES = [
  // ---- COWORK / DISPATCH ----
  { id: 1, title: "Remote Control Your Computer with Dispatch", desc: "Send instructions from your phone. Claude runs the task on your desktop — reading files, pulling data, searching the web — and the result is waiting when you sit down.", category: "Cowork", features: ["Connectors", "Cowork"], model: "Sonnet 4.6", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/remote-control-your-computer-with-dispatch", wtv: false },
  { id: 2, title: "Kick Off Long-Running Tasks from Your Phone", desc: "Check progress on a running task, give Claude Cowork the next instruction, and keep work moving from your mobile app without returning to your desk.", category: "Cowork", features: ["Cowork"], model: "Sonnet 4.6", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/kick-off-long-running-computer-tasks-from-the-claude-mobile-app", wtv: false },
  { id: 3, title: "Handle a Request While Away from Your Keyboard", desc: "Use Dispatch to respond to requests from your phone using everything on your computer. Claude finds the file, drafts the reply, and waits for your approval before sending.", category: "Cowork", features: ["Connectors", "Cowork"], model: "Sonnet 4.6", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/handle-a-request-while-away-from-your-keyboard", wtv: false },
  { id: 4, title: "Operate Any Computer App from Your Phone with Dispatch", desc: "Dispatch with computer use lets Claude control your computer's mouse and keyboard from the Claude mobile app to work in apps that have no other interface Claude could reach.", category: "Cowork", features: ["Connectors", "Cowork"], model: "Sonnet 4.6", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/operate-any-computer-app-from-your-phone-with-dispatch", wtv: false },
  { id: 5, title: "Audit a Folder of Visual Assets Against Your Guidelines", desc: "Claude Opus can read a large folder of image exports at full resolution to spot off-brand colors, outdated logos, and missing legal copy — returning a categorized list of violations with confidence ratings.", category: "Cowork", features: ["Cowork"], model: "Opus 4.7", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/audit-a-folder-of-visual-assets-against-your-guidelines", wtv: false },
  { id: 6, title: "Organize Files Across Your Desktop", desc: "Grant Cowork access to your cluttered desktop and walk away. It reads your files, figures out what they are, and sorts them into folders while you do something else.", category: "Personal", features: ["Cowork"], model: "Opus 4.5", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/organize-files-by-whats-in-them", wtv: false },
  // ---- PROFESSIONAL / OPERATIONS ----
  { id: 7, title: "Build a Daily Briefing Across Your Tools", desc: "Generate a daily briefing that pulls from Slack, Notion, and your team dashboard to surface priorities and connections you'd miss scanning each platform separately.", category: "Professional", features: ["Cowork"], model: "Sonnet 4.5", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/build-a-daily-briefing-across-your-tools", wtv: true },
  { id: 8, title: "Process Batches of Vendors with Cowork", desc: "Onboard several vendors in one session — Claude reads a folder of vendor files, adds each to your tracker, generates their contracts, and fills multiple intake forms in your browser.", category: "Professional", features: ["Cowork"], model: "Sonnet 4.5", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/process-batches-of-vendors-with-cowork", wtv: true },
  { id: 9, title: "Size a Market Using Your Research", desc: "Ask Claude a market question and get back an analysis with professional deliverables — PowerPoint, Excel workbook with methodology, and a Markdown source document with citations.", category: "Professional", features: ["Cowork"], model: "Sonnet 4.5", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/size-a-market-using-your-research", wtv: true },
  { id: 10, title: "Build Analysis from Browser Charts and Folder Data", desc: "Pull your quarterly revenue from scattered board decks, then grab GDP and macro data. Cowork creates a comparison chart showing how your growth stacks up against the environment.", category: "Professional", features: ["Cowork"], model: "Sonnet 4.5", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/build-analysis-from-browser-charts-and-folder-data", wtv: true },
  { id: 11, title: "Package Your Brand Guidelines in a Skill", desc: "Package your brand guidelines into a skill to create presentations, spreadsheets, or documents that automatically match your preferred style — every time.", category: "Professional", features: ["Skills"], model: "Sonnet 4.5", product: "Claude.ai", url: "https://claude.com/resources/use-cases/package-your-brand-guidelines-in-a-skill", wtv: true },
  { id: 12, title: "Explore What Claude Can Do for You", desc: "New to Claude? Tell Claude your role and get a personalized guide to the capabilities that will matter most for your specific work.", category: "Professional", features: ["Connectors"], model: "Opus 4.5", product: "Claude.ai", url: "https://claude.com/resources/use-cases/explore-what-claude-can-do-for-you", wtv: true },
  // ---- LEGAL / COMPLIANCE ----
  { id: 13, title: "Prep Scattered Documents for a Compliance Audit", desc: "Turn a folder of scattered policy documents, contracts, and records into an organized, clearly named collection ready for regulatory review.", category: "Legal", features: ["Cowork"], model: "Sonnet 4.5", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/prep-scattered-documents-for-a-compliance-audit", wtv: true },
  // ---- FINANCE ----
  { id: 14, title: "Draft a Credit Memo from Spreads and Statements", desc: "Cowork pulls the borrower's filings and spreads through connectors, reads the underwriting workbook from your deal folder, and brings the writeup into Claude for Word for the credit memo.", category: "Finance", features: ["Connectors"], model: "Sonnet 4.6", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/draft-a-credit-memo-from-spreads-and-statements-with-claude-for-excel", wtv: false },
  { id: 15, title: "Validate Reserves and Draft Filing Narrative", desc: "Cowork reads your reserve workbook and pulls prior filings through the NAIC connector. You take the formula flags into Claude for Excel, then bring the narrative into Claude for Word.", category: "Finance", features: ["Connectors"], model: "Sonnet 4.6", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/validate-reserves-and-draft-filing-narrative-with-claude-for-excel", wtv: false },
  { id: 16, title: "Update Your Financial Model After Earnings", desc: "Cowork pulls the release and transcript and checks them against your financial model. You take the flags into Claude for Excel to edit cells, then build the deck in Claude for PowerPoint.", category: "Finance", features: ["Connectors", "Skills"], model: "Opus 4.6", product: "Claude in Excel", url: "https://claude.com/resources/use-cases/update-your-financial-model-after-earnings", wtv: false },
  { id: 17, title: "Reconcile Transactions Across Your Accounts", desc: "Hand Cowork your bank exports and ledger files. It matches transactions across sources, flags discrepancies, and outputs an annotated reconciliation report.", category: "Finance", features: ["Cowork"], model: "Sonnet 4.5", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/reconcile-transactions-across-your-accounts", wtv: true },
  { id: 18, title: "Understand and Extend an Inherited Spreadsheet", desc: "Understand existing formulas and structure, then add new data while preserving the original logic — perfect for taking over someone else's complex model.", category: "Finance", features: ["Extended Thinking"], model: "Opus 4.5", product: "Claude.ai", url: "https://claude.com/resources/use-cases/understand-and-extend-an-inherited-spreadsheet", wtv: false },
  // ---- RESEARCH ----
  { id: 19, title: "Surface Themes from All Your Feedback Channels", desc: "Synthesize feedback from call transcripts, Slack, CRM notes, and issue trackers to identify cross-platform patterns and generate prioritized product ideas.", category: "Research", features: ["Cowork"], model: "Sonnet 4.5", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/surface-themes-from-all-your-feedback-channels", wtv: true },
  { id: 20, title: "Map Your Understanding and Build Lessons from Gaps", desc: "Claude Opus traces your confusion to its source. It maps what you already understand, finds the specific misconception underneath, and builds personalized learning experiences around it.", category: "Personal", features: ["Extended Thinking"], model: "Opus 4.6", product: "Claude.ai", url: "https://claude.com/resources/use-cases/map-your-understanding-and-build-lessons-from-the-gaps", wtv: false },
  { id: 21, title: "Turn Research into Presentations", desc: "Claude helps translate findings into slide outlines and speaker notes that show what's compelling, how to structure the story, and which visuals would help — giving you the framework to build.", category: "Education", features: ["Connectors"], model: "Sonnet 4.5", product: "Claude.ai", url: "https://claude.com/resources/use-cases/turn-research-into-presentations", wtv: true },
  // ---- EDUCATION ----
  { id: 22, title: "Adapt a Textbook Page to Every Reading Level", desc: "Opus reads a single source page in detail and returns a finished file for each audience that needs it — one spread becomes a deck and reading handouts at three levels.", category: "Education", features: ["Cowork"], model: "Opus 4.7", product: "Claude Cowork", url: "https://claude.com/resources/use-cases/adapt-a-standard-textbook-page-to-every-reading-level", wtv: false },
  { id: 23, title: "Build Interactive Diagram Tools", desc: "From body systems to molecular structures, turn a detailed prompt into a working reference app with the depth and design you specify.", category: "Personal", features: ["Extended Thinking"], model: "Opus 4.5", product: "Claude.ai", url: "https://claude.com/resources/use-cases/build-interactive-diagram-tools", wtv: false },
  { id: 24, title: "Visualize the Mechanism Behind an Explanation", desc: "Claude builds an interactive visual inline as you talk through the problem — shaped to your specific question, with controls you manipulate and buttons that drill deeper.", category: "Education", features: ["Custom visuals"], model: "Sonnet 4.6", product: "Claude.ai", url: "https://claude.com/resources/use-cases/visualize-the-mechanism-behind-an-explanation-mid-chat", wtv: false },
  { id: 25, title: "Work Through Grant Options in Chat", desc: "Claude plots every funder in one view — odds, award, deadline, effort — and you filter, test scenarios, ask for a prioritization, and narrow down together.", category: "Education", features: ["Custom visuals"], model: "Sonnet 4.6", product: "Claude.ai", url: "https://claude.com/resources/use-cases/work-through-grant-options-in-chat-with-claude", wtv: false },
  { id: 26, title: "Workflow Improvement Planner", desc: "Turn process pain points into structured improvement plans. Claude helps define workflow challenges and design AI-powered solutions that save time and increase capacity.", category: "Nonprofits", features: ["Extended Thinking"], model: "Sonnet 4.5", product: "Claude.ai", url: "https://claude.com/resources/use-cases/workflow-improvement-planner", wtv: true },
  { id: 27, title: "See Your Theory of Change in Chat", desc: "Describe your program and Claude draws the causal chain inline — inputs through impact — with every arrow clickable to show the assumption behind it.", category: "Nonprofits", features: ["Custom visuals"], model: "Sonnet 4.6", product: "Claude.ai", url: "https://claude.com/resources/use-cases/see-your-theory-of-change-in-chat-with-claude", wtv: false },
];

const CATEGORIES = ["All", ...Array.from(new Set(ALL_USE_CASES.map(u => u.category))).sort()];
const FEATURES = ["All", ...Array.from(new Set(ALL_USE_CASES.flatMap(u => u.features))).sort()];

const PRACTICE_TYPES = ["Healthcare", "Dental", "Wellness / Med Spa", "Chiropractic", "Mental Health", "Physical Therapy", "Other"];
const TIERS = ["Tier 1 — AI Risk Audit", "Tier 2 — Governance Program", "Tier 3 — Monthly Retainer", "Prospect / Not Yet Qualified"];
const STATUSES = ["Prospect", "Outreach Sent", "Discovery Call Scheduled", "Proposal Sent", "Active Client", "On Hold"];

const STATUS_COLORS = {
  "Prospect": "#4a6080",
  "Outreach Sent": "#8877cc",
  "Discovery Call Scheduled": "#cc9933",
  "Proposal Sent": "#cc7733",
  "Active Client": "#44aa66",
  "On Hold": "#555",
};

const ACTIVITY_TYPE_COLORS = {
  "Call": "#4488cc",
  "Email": "#8877cc",
  "Meeting": "#44aa66",
  "Note": "#888",
  "Follow-up": "#cc7733",
};

const ACTIVITY_TYPES = ["Call", "Email", "Meeting", "Note", "Follow-up"];

function CategoryBadge({ label }) {
  const colors = {
    Legal: { bg: "#1a2e1a", text: "#5dd85d" },
    Professional: { bg: "#1a2535", text: GOLD },
    Finance: { bg: "#2a1f0a", text: "#e8a83a" },
    Research: { bg: "#1a1a2e", text: "#8888ff" },
    Sales: { bg: "#2e1a1a", text: "#ff7777" },
    Healthcare: { bg: "#1a2e2e", text: "#5dd8d8" },
    "Life Sciences": { bg: "#1a2e2e", text: "#5dd8d8" },
    Cowork: { bg: "#1e1a2e", text: "#b388ff" },
    Education: { bg: "#1a2528", text: "#66ccbb" },
    Marketing: { bg: "#2e1a24", text: "#ff88bb" },
    Personal: { bg: "#222", text: "#aaa" },
    Nonprofits: { bg: "#1a2820", text: "#66cc99" },
    HR: { bg: "#281a1a", text: "#cc8866" },
  };
  const c = colors[label] || { bg: "#1c2236", text: MUTED };
  return (
    <span style={{ background: c.bg, color: c.text, fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" }}>
      {label}
    </span>
  );
}

function UseCaseCard({ uc, wtvMode }) {
  const highlight = wtvMode && uc.wtv;
  return (
    <a href={uc.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <div style={{
        background: highlight ? `linear-gradient(135deg, #162240 0%, #1e2d4a 100%)` : DARK2,
        border: `1px solid ${highlight ? GOLD : "#1e2d44"}`,
        borderRadius: 10,
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = highlight ? GOLD : "#1e2d44"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {highlight && (
          <div style={{ position: "absolute", top: 12, right: 12, background: GOLD, color: NAVY, fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 3, letterSpacing: 1 }}>
            WT VISION
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <CategoryBadge label={uc.category} />
        </div>
        <div style={{ color: WHITE, fontWeight: 700, fontSize: 14, lineHeight: 1.4, fontFamily: "'Georgia', serif" }}>
          {uc.title}
        </div>
        <div style={{ color: MUTED, fontSize: 12, lineHeight: 1.6, flex: 1 }}>
          {uc.desc}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <span style={{ color: GOLD, fontSize: 10, fontWeight: 600 }}>{uc.model}</span>
          <span style={{ color: "#4a6080", fontSize: 10 }}>{uc.product} →</span>
        </div>
      </div>
    </a>
  );
}

function UseCasesTab() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [feature, setFeature] = useState("All");
  const [wtvMode, setWtvMode] = useState(false);

  const filtered = ALL_USE_CASES.filter(u => {
    const matchSearch = u.title.toLowerCase().includes(search.toLowerCase()) || u.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || u.category === category;
    const matchFeat = feature === "All" || u.features.includes(feature);
    const matchWtv = !wtvMode || u.wtv;
    return matchSearch && matchCat && matchFeat && matchWtv;
  });

  return (
    <div style={{ padding: "24px 0" }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, alignItems: "center" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search use cases..."
          style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 8, padding: "9px 14px", fontSize: 13, width: 220, outline: "none" }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}
          style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 8, padding: "9px 12px", fontSize: 12 }}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={feature} onChange={e => setFeature(e.target.value)}
          style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 8, padding: "9px 12px", fontSize: 12 }}>
          {FEATURES.map(f => <option key={f}>{f}</option>)}
        </select>
        <button onClick={() => setWtvMode(!wtvMode)}
          style={{
            background: wtvMode ? GOLD : "transparent",
            color: wtvMode ? NAVY : GOLD,
            border: `1.5px solid ${GOLD}`,
            borderRadius: 8, padding: "9px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5
          }}>
          {wtvMode ? "✦ WT Vision Mode ON" : "✦ WT Vision Mode"}
        </button>
        {(search || category !== "All" || feature !== "All" || wtvMode) && (
          <button onClick={() => { setSearch(""); setCategory("All"); setFeature("All"); setWtvMode(false); }}
            style={{ background: "transparent", color: MUTED, border: `1px solid #1e2d44`, borderRadius: 8, padding: "9px 12px", fontSize: 12, cursor: "pointer" }}>
            Clear
          </button>
        )}
        <span style={{ color: MUTED, fontSize: 12, marginLeft: "auto" }}>{filtered.length} use cases</span>
      </div>

      {wtvMode && (
        <div style={{ background: `linear-gradient(90deg, #1a2840, #162240)`, border: `1px solid ${GOLD}40`, borderRadius: 8, padding: "10px 16px", marginBottom: 20, color: GOLD, fontSize: 12 }}>
          ✦ Showing {filtered.filter(u => u.wtv).length} WT Vision relevant use cases — filtered for Healthcare, Legal, Compliance, Professional, Research, Sales
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {filtered.map(uc => <UseCaseCard key={uc.id} uc={uc} wtvMode={wtvMode} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", color: MUTED, padding: "60px 0", fontSize: 14 }}>
          No use cases match your filters. Try clearing some.
        </div>
      )}

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <a href="https://claude.com/resources/use-cases" target="_blank" rel="noopener noreferrer"
          style={{ color: GOLD, fontSize: 12, textDecoration: "none", border: `1px solid ${GOLD}50`, padding: "8px 20px", borderRadius: 6 }}>
          View Full Library on claude.com →
        </a>
      </div>
    </div>
  );
}

const EMPTY_CLIENT = {
  id: null, company: "", contactName: "", contactTitle: "", email: "", phone: "",
  practiceType: "Healthcare", tier: "Prospect / Not Yet Qualified", status: "Prospect",
  employees: "", location: "", notes: "", createdAt: "", wtvNotes: "", activityLog: []
};

function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function abbreviateTier(tier) {
  if (tier.startsWith("Tier 1")) return "T1";
  if (tier.startsWith("Tier 2")) return "T2";
  if (tier.startsWith("Tier 3")) return "T3";
  return "Prospect";
}

function ClientsTab() {
  const [clients, setClients] = useState([]);
  const [view, setView] = useState("list");
  const [clientView, setClientView] = useState("grid");
  const [form, setForm] = useState({ ...EMPTY_CLIENT });
  const [loading, setLoading] = useState(true);
  const [activityEntry, setActivityEntry] = useState({ type: "Call", date: getToday(), note: "" });

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("wtvision-clients");
        if (result) {
          const parsed = JSON.parse(result.value);
          setClients(parsed.map(c => ({ ...c, activityLog: c.activityLog || [] })));
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  const save = async (updated) => {
    setClients(updated);
    try { await window.storage.set("wtvision-clients", JSON.stringify(updated)); } catch {}
  };

  const openAdd = () => {
    setForm({ ...EMPTY_CLIENT });
    setActivityEntry({ type: "Call", date: getToday(), note: "" });
    setView("add");
  };

  const openEdit = (client) => {
    setForm({ ...client, activityLog: client.activityLog || [] });
    setActivityEntry({ type: "Call", date: getToday(), note: "" });
    setView("edit");
  };

  const addClient = async () => {
    if (!form.company.trim()) return;
    const newClient = { ...form, id: Date.now(), createdAt: new Date().toLocaleDateString() };
    await save([...clients, newClient]);
    setForm({ ...EMPTY_CLIENT });
    setView("list");
  };

  const deleteClient = async (id) => {
    await save(clients.filter(c => c.id !== id));
    setView("list");
  };

  const updateClient = async () => {
    await save(clients.map(c => c.id === form.id ? form : c));
    setView("list");
  };

  const logActivity = () => {
    if (!activityEntry.note.trim()) return;
    const entry = { id: Date.now(), ...activityEntry };
    setForm(f => ({ ...f, activityLog: [entry, ...(f.activityLog || [])] }));
    setActivityEntry({ type: "Call", date: getToday(), note: "" });
  };

  // Dashboard stats
  const total = clients.length;
  const activeClients = clients.filter(c => c.status === "Active Client").length;
  const proposalsOut = clients.filter(c => c.status === "Proposal Sent").length;
  const prospects = clients.filter(c => c.status === "Prospect").length;
  const inPipeline = clients.filter(c => c.status !== "On Hold").length;

  const FInput = ({ label, field, placeholder, type = "text" }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ color: MUTED, fontSize: 11, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" }}>{label}</label>
      <input type={type} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
        placeholder={placeholder}
        style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 6, padding: "8px 12px", fontSize: 13, outline: "none" }} />
    </div>
  );

  const FSelect = ({ label, field, options }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ color: MUTED, fontSize: 11, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" }}>{label}</label>
      <select value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
        style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 6, padding: "8px 12px", fontSize: 13 }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  if (loading) return <div style={{ color: MUTED, padding: 40, textAlign: "center" }}>Loading client folders...</div>;

  if (view === "add" || view === "edit") {
    const isEdit = view === "edit";
    const actLog = form.activityLog || [];
    return (
      <div style={{ padding: "24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <button onClick={() => { setView("list"); setForm({ ...EMPTY_CLIENT }); }}
            style={{ background: "transparent", color: MUTED, border: "none", cursor: "pointer", fontSize: 13 }}>← Back</button>
          <h3 style={{ color: WHITE, margin: 0, fontFamily: "'Georgia', serif", fontSize: 18 }}>
            {isEdit ? `Edit: ${form.company}` : "New Client Folder"}
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 720 }}>
          <FInput label="Company / Practice Name *" field="company" placeholder="Murfreesboro Family Dental" />
          <FSelect label="Practice Type" field="practiceType" options={PRACTICE_TYPES} />
          <FInput label="Primary Contact Name" field="contactName" placeholder="Dr. Sarah Williams" />
          <FInput label="Contact Title" field="contactTitle" placeholder="Owner / Office Manager" />
          <FInput label="Email" field="email" placeholder="contact@practice.com" type="email" />
          <FInput label="Phone" field="phone" placeholder="(615) 000-0000" />
          <FInput label="Location / City" field="location" placeholder="Murfreesboro, TN" />
          <FInput label="Number of Employees" field="employees" placeholder="15" />
          <FSelect label="Current Tier / Stage" field="tier" options={TIERS} />
          <FSelect label="Pipeline Status" field="status" options={STATUSES} />
        </div>

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 4, maxWidth: 720 }}>
          <label style={{ color: MUTED, fontSize: 11, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" }}>WT Vision Notes / Compliance Flags</label>
          <textarea value={form.wtvNotes} onChange={e => setForm({ ...form, wtvNotes: e.target.value })}
            placeholder="AI tools in use, compliance risks identified, SB 1580 flags, follow-up notes..."
            rows={4}
            style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 6, padding: "8px 12px", fontSize: 13, outline: "none", resize: "vertical" }} />
        </div>

        {/* Activity Log */}
        <div style={{ marginTop: 28, maxWidth: 720 }}>
          <div style={{ color: GOLD, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, borderBottom: `1px solid #1e2d44`, paddingBottom: 8 }}>
            Activity Log
          </div>

          {/* Add entry row */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ color: MUTED, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" }}>Type</label>
              <select value={activityEntry.type} onChange={e => setActivityEntry({ ...activityEntry, type: e.target.value })}
                style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 6, padding: "7px 10px", fontSize: 12 }}>
                {ACTIVITY_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ color: MUTED, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" }}>Date</label>
              <input type="date" value={activityEntry.date} onChange={e => setActivityEntry({ ...activityEntry, date: e.target.value })}
                style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 6, padding: "7px 10px", fontSize: 12, outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 180 }}>
              <label style={{ color: MUTED, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" }}>Note</label>
              <input value={activityEntry.note} onChange={e => setActivityEntry({ ...activityEntry, note: e.target.value })}
                onKeyDown={e => { if (e.key === "Enter") logActivity(); }}
                placeholder="What happened?"
                style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 6, padding: "7px 10px", fontSize: 12, outline: "none" }} />
            </div>
            <button onClick={logActivity}
              style={{ background: DARK3, color: GOLD, border: `1px solid ${GOLD}50`, borderRadius: 6, padding: "7px 16px", fontSize: 12, cursor: "pointer", fontWeight: 700, alignSelf: "flex-end" }}>
              Log
            </button>
          </div>

          {/* Existing entries */}
          {actLog.length === 0 ? (
            <div style={{ color: MUTED, fontSize: 12, fontStyle: "italic", padding: "12px 0" }}>No activity logged yet.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {actLog.map(entry => (
                <div key={entry.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: DARK3, borderRadius: 6, padding: "8px 12px" }}>
                  <span style={{
                    background: (ACTIVITY_TYPE_COLORS[entry.type] || "#888") + "22",
                    color: ACTIVITY_TYPE_COLORS[entry.type] || "#888",
                    fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.5,
                    textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0
                  }}>
                    {entry.type}
                  </span>
                  <span style={{ color: MUTED, fontSize: 11, whiteSpace: "nowrap", flexShrink: 0 }}>{entry.date}</span>
                  <span style={{ color: WHITE, fontSize: 12, lineHeight: 1.5, flex: 1 }}>{entry.note}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <button onClick={isEdit ? updateClient : addClient}
            style={{ background: GOLD, color: NAVY, border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 800, fontSize: 13, cursor: "pointer", letterSpacing: 0.5 }}>
            {isEdit ? "Save Changes" : "Create Client Folder"}
          </button>
          <button onClick={() => { setView("list"); setForm({ ...EMPTY_CLIENT }); }}
            style={{ background: "transparent", color: MUTED, border: `1px solid #1e2d44`, borderRadius: 8, padding: "10px 20px", fontSize: 13, cursor: "pointer" }}>
            Cancel
          </button>
          {isEdit && (
            <button onClick={() => { if (window.confirm(`Delete folder for ${form.company}?`)) deleteClient(form.id); }}
              style={{ background: "transparent", color: "#cc4444", border: `1px solid #cc444430`, borderRadius: 8, padding: "10px 20px", fontSize: 13, cursor: "pointer", marginLeft: "auto" }}>
              Delete Client
            </button>
          )}
        </div>
      </div>
    );
  }

  // Pipeline view
  const renderPipeline = () => (
    <div style={{ overflowX: "auto", paddingBottom: 16 }}>
      <div style={{ display: "flex", gap: 14, minWidth: "fit-content", paddingBottom: 4 }}>
        {STATUSES.map(status => {
          const col = STATUS_COLORS[status] || "#666";
          const colClients = clients.filter(c => c.status === status);
          return (
            <div key={status} style={{ width: 210, flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Column header */}
              <div style={{
                background: col + "22",
                border: `1px solid ${col}55`,
                borderRadius: 8,
                padding: "8px 12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ color: col, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{status}</span>
                <span style={{ background: col + "44", color: col, fontSize: 11, fontWeight: 800, borderRadius: 10, padding: "1px 8px" }}>{colClients.length}</span>
              </div>
              {/* Cards */}
              {colClients.map(client => {
                const lastActivity = client.activityLog && client.activityLog.length > 0 ? client.activityLog[0].date : null;
                return (
                  <div key={client.id}
                    onClick={() => openEdit(client)}
                    style={{
                      background: DARK2,
                      border: `1px solid #1e2d44`,
                      borderRadius: 8,
                      padding: "10px 12px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = col; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2d44"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ color: WHITE, fontWeight: 700, fontSize: 13, fontFamily: "'Georgia', serif", marginBottom: 4, lineHeight: 1.3 }}>{client.company}</div>
                    <div style={{ color: MUTED, fontSize: 11, marginBottom: 2 }}>{client.practiceType}</div>
                    {client.contactName && <div style={{ color: GOLD, fontSize: 11, marginBottom: 2 }}>{client.contactName}</div>}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                      <span style={{ color: "#4a6080", fontSize: 10, fontWeight: 600 }}>{abbreviateTier(client.tier)}</span>
                      {lastActivity && <span style={{ color: "#2a4060", fontSize: 10 }}>{lastActivity}</span>}
                    </div>
                  </div>
                );
              })}
              {colClients.length === 0 && (
                <div style={{ color: "#2a3f5f", fontSize: 11, textAlign: "center", padding: "12px 0", fontStyle: "italic" }}>Empty</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ padding: "24px 0" }}>

      {/* Dashboard Summary */}
      {clients.length > 0 && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
          {[
            { label: "Total", value: total, color: GOLD },
            { label: "Active Clients", value: activeClients, color: "#44aa66" },
            { label: "Proposals Out", value: proposalsOut, color: "#cc7733" },
            { label: "Prospects", value: prospects, color: "#4a6080" },
            { label: "In Pipeline", value: inPipeline, color: "#8877cc" },
          ].map(chip => (
            <div key={chip.label} style={{
              background: DARK2,
              border: `1px solid ${chip.color}44`,
              borderRadius: 10,
              padding: "12px 20px",
              minWidth: 90,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}>
              <span style={{ color: chip.color, fontSize: 24, fontWeight: 900, lineHeight: 1 }}>{chip.value}</span>
              <span style={{ color: MUTED, fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>{chip.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ color: MUTED, fontSize: 12 }}>{clients.length} client folder{clients.length !== 1 ? "s" : ""}</div>
        <button onClick={openAdd}
          style={{ background: GOLD, color: NAVY, border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 800, fontSize: 13, cursor: "pointer", letterSpacing: 0.5 }}>
          + New Client Folder
        </button>
      </div>

      {/* View Toggle */}
      {clients.length > 0 && (
        <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
          {["grid", "pipeline"].map(v => (
            <button key={v} onClick={() => setClientView(v)}
              style={{
                background: clientView === v ? DARK3 : "transparent",
                color: clientView === v ? GOLD : MUTED,
                border: `1px solid ${clientView === v ? GOLD + "55" : "#1e2d44"}`,
                borderRadius: 6,
                padding: "7px 18px",
                fontSize: 12,
                fontWeight: clientView === v ? 700 : 400,
                cursor: "pointer",
                textTransform: "capitalize",
                letterSpacing: 0.5,
              }}>
              {v === "grid" ? "⊞ Grid" : "⋮⋮ Pipeline"}
            </button>
          ))}
        </div>
      )}

      {clients.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", border: `1px dashed #1e2d44`, borderRadius: 12 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📁</div>
          <div style={{ color: WHITE, fontSize: 16, fontFamily: "'Georgia', serif", marginBottom: 8 }}>No client folders yet</div>
          <div style={{ color: MUTED, fontSize: 13, marginBottom: 20 }}>When you land your first client, create their folder here — pre-loaded with company info, contact details, and compliance notes.</div>
          <button onClick={openAdd}
            style={{ background: GOLD, color: NAVY, border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
            Create First Client Folder
          </button>
        </div>
      ) : clientView === "pipeline" ? renderPipeline() : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {clients.map(client => (
            <div key={client.id}
              style={{ background: DARK2, border: `1px solid #1e2d44`, borderRadius: 10, padding: "18px 20px", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2d44"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <CategoryBadge label={client.practiceType} />
                <span style={{ background: (STATUS_COLORS[client.status] || "#666") + "33", color: STATUS_COLORS[client.status] || "#666", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.5 }}>
                  {client.status}
                </span>
              </div>
              <div style={{ color: WHITE, fontWeight: 700, fontSize: 15, fontFamily: "'Georgia', serif", marginBottom: 4 }}>{client.company}</div>
              {client.contactName && <div style={{ color: GOLD, fontSize: 12, marginBottom: 2 }}>{client.contactName}{client.contactTitle ? ` · ${client.contactTitle}` : ""}</div>}
              {client.location && <div style={{ color: MUTED, fontSize: 12, marginBottom: 2 }}>{client.location}</div>}
              {client.email && (
                <div style={{ marginBottom: 2 }}>
                  <a href={`mailto:${client.email}`} onClick={e => e.stopPropagation()}
                    style={{ color: GOLD, fontSize: 11, textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>
                    {client.email}
                  </a>
                </div>
              )}
              {client.phone && (
                <div style={{ marginBottom: 6 }}>
                  <a href={`tel:${client.phone}`} onClick={e => e.stopPropagation()}
                    style={{ color: GOLD, fontSize: 11, textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>
                    {client.phone}
                  </a>
                </div>
              )}
              <div style={{ color: "#4a6080", fontSize: 11, marginBottom: 14, fontStyle: "italic" }}>{client.tier}</div>
              {client.wtvNotes && (
                <div style={{ background: DARK3, borderRadius: 6, padding: "8px 10px", fontSize: 11, color: MUTED, marginBottom: 12, lineHeight: 1.5 }}>
                  {client.wtvNotes.length > 100 ? client.wtvNotes.slice(0, 100) + "..." : client.wtvNotes}
                </div>
              )}
              {client.activityLog && client.activityLog.length > 0 && (
                <div style={{ color: "#2a4060", fontSize: 10, marginBottom: 8 }}>
                  Last activity: {client.activityLog[0].date} · {client.activityLog[0].type}
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => openEdit(client)}
                  style={{ flex: 1, background: "transparent", color: GOLD, border: `1px solid ${GOLD}50`, borderRadius: 6, padding: "7px 0", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                  Edit
                </button>
                <button onClick={() => { if (window.confirm(`Delete folder for ${client.company}?`)) deleteClient(client.id); }}
                  style={{ background: "transparent", color: "#cc4444", border: `1px solid #cc444430`, borderRadius: 6, padding: "7px 14px", fontSize: 12, cursor: "pointer" }}>
                  ✕
                </button>
              </div>
              {client.createdAt && <div style={{ color: "#2a3f5f", fontSize: 10, marginTop: 8 }}>Created {client.createdAt}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PLAYBOOK TAB ────────────────────────────────────────────────────────────

const OUTREACH_TEMPLATES = [
  {
    tag: "INITIAL CONTACT",
    tagColor: "#4488cc",
    title: "Cold Outreach",
    subject: "[Practice Name] — SB 1580 Is Active. Are You Covered?",
    body: `Hi [Name],

Tennessee's AI disclosure law has been in effect since July 1st, and most [healthcare practices / dental offices / law firms] I speak with haven't taken the formal steps to document their compliance — which means they're operating with real exposure right now.

I run WT Vision LLC. We help Tennessee businesses inventory their AI tools, assess risk under SB 1580, and put the documentation in place to protect them.

I'd like to offer you a complimentary 20-minute AI exposure review — no commitment, just a clear picture of where your practice stands.

Are you open to a quick call this week?

[Your name]
WT Vision LLC
[Phone] | wtvision.me@gmail.com`,
  },
  {
    tag: "5–7 DAYS AFTER COLD",
    tagColor: GOLD,
    title: "Follow-Up",
    subject: "Re: [Practice Name] — Quick Follow-Up",
    body: `Hi [Name],

Following up on my note from last week.

With SB 1580 now active, enforcement is live — and most practices I speak with are surprised to find out how many AI-powered tools they're using without any compliance documentation in place.

If the timing wasn't right, no worries. But if you'd like to know exactly where you stand, I can walk you through our checklist in 15 minutes — no slides, no pitch, just clarity.

Worth a quick call?

[Your name]
WT Vision LLC`,
  },
  {
    tag: "AFTER DISCOVERY CALL",
    tagColor: "#44aa66",
    title: "Post-Discovery Call",
    subject: "Next Steps for [Practice Name] — AI Governance",
    body: `Hi [Name],

Great speaking with you today. Based on what we discussed, here's where I'd recommend starting:

[Recommended tier and one sentence on why it fits their situation]

I'll send over a formal proposal by [date]. In the meantime, a few things worth noting from our conversation:

• [Specific AI tool or risk you identified]
• [Compliance gap or urgency flag]
• [Any quick win they can act on immediately]

Looking forward to partnering with you on this.

[Your name]
WT Vision LLC
[Phone]`,
  },
];

const QUAL_ITEMS = [
  // AI EXPOSURE
  { cat: "AI EXPOSURE", catColor: "#4488cc", text: "Uses AI chatbots, automated messaging, or AI phone systems with customers/patients" },
  { cat: "AI EXPOSURE", catColor: "#4488cc", text: "Uses AI for scheduling, intake, or triage workflows" },
  { cat: "AI EXPOSURE", catColor: "#4488cc", text: "Uses AI-generated content in marketing, emails, or client communications" },
  // BUSINESS PROFILE
  { cat: "BUSINESS PROFILE", catColor: "#8877cc", text: "Located in Tennessee or actively serves Tennessee consumers" },
  { cat: "BUSINESS PROFILE", catColor: "#8877cc", text: "Healthcare, dental, legal, financial, or professional services industry" },
  { cat: "BUSINESS PROFILE", catColor: "#8877cc", text: "10 or more employees" },
  // COMPLIANCE GAP
  { cat: "COMPLIANCE GAP", catColor: "#cc7733", text: "No formal AI use policy or governance documentation exists" },
  { cat: "COMPLIANCE GAP", catColor: "#cc7733", text: "Has not conducted an AI risk assessment in the past 12 months" },
  // DECISION READINESS
  { cat: "DECISION READINESS", catColor: GOLD, text: "You are speaking with an owner, partner, or C-level decision-maker" },
  { cat: "DECISION READINESS", catColor: GOLD, text: "Prospect has expressed concern about compliance, legal risk, or staying current with AI" },
];

function PlaybookTab() {
  const [section, setSection] = useState("tiers");
  const [checks, setChecks] = useState(Array(10).fill(false));
  const [copied, setCopied] = useState(null);

  const score = checks.filter(Boolean).length;

  const toggleCheck = (i) => {
    setChecks(prev => { const next = [...prev]; next[i] = !next[i]; return next; });
  };

  const copyTemplate = (idx, subject, body) => {
    navigator.clipboard.writeText(subject + "\n\n" + body).catch(() => {});
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  let scoreResult;
  if (score >= 8) scoreResult = { label: "Strong Prospect", color: "#44aa66", desc: "Ready for outreach and discovery call" };
  else if (score >= 5) scoreResult = { label: "Warm Lead", color: GOLD, desc: "Educate on SB 1580 · Schedule follow-up in 30 days" };
  else if (score >= 3) scoreResult = { label: "Early Stage", color: "#cc7733", desc: "Add to nurture sequence · Revisit in 60–90 days" };
  else scoreResult = { label: "Not a Fit Yet", color: MUTED, desc: "No active AI use or outside applicable market" };

  const pillStyle = (id) => ({
    background: section === id ? GOLD : "transparent",
    color: section === id ? NAVY : MUTED,
    border: `1px solid ${section === id ? GOLD : "#1e2d44"}`,
    borderRadius: 20,
    padding: "8px 18px",
    fontSize: 12,
    fontWeight: section === id ? 700 : 400,
    cursor: "pointer",
    letterSpacing: 0.3,
    transition: "all 0.15s",
  });

  const renderTiers = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 8 }}>
        {/* Tier 1 */}
        <div style={{ background: DARK2, border: `1.5px solid #4488cc55`, borderRadius: 12, padding: "22px 22px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ background: "#4488cc22", color: "#4488cc", fontSize: 9, fontWeight: 800, letterSpacing: 1.5, padding: "3px 10px", borderRadius: 4, textTransform: "uppercase" }}>ONE-TIME ENGAGEMENT</span>
          </div>
          <div style={{ color: WHITE, fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 700 }}>Tier 1 — AI Risk Audit</div>
          <div style={{ color: MUTED, fontSize: 12 }}><span style={{ color: "#4488cc", fontWeight: 600 }}>For:</span> First engagement · Practices unsure of their AI exposure</div>
          <div style={{ borderTop: `1px solid #1e2d44`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
            {["AI tool inventory across all departments", "SB 1580 compliance gap analysis", "Risk classification per use case", "Written remediation roadmap", "Certificate of completion"].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: "#4488cc", marginTop: 1, flexShrink: 0 }}>✓</span>
                <span style={{ color: MUTED, fontSize: 12 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid #1e2d44`, paddingTop: 10, marginTop: "auto" }}>
            <div style={{ color: WHITE, fontSize: 11, fontWeight: 600 }}>Deliverable: Written Audit Report</div>
            <div style={{ color: MUTED, fontSize: 11, marginTop: 2 }}>Timeline: 2–3 weeks</div>
          </div>
        </div>

        {/* Tier 2 */}
        <div style={{ background: DARK2, border: `1.5px solid ${GOLD}55`, borderRadius: 12, padding: "22px 22px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ background: GOLD + "22", color: GOLD, fontSize: 9, fontWeight: 800, letterSpacing: 1.5, padding: "3px 10px", borderRadius: 4, textTransform: "uppercase" }}>PROJECT-BASED</span>
          </div>
          <div style={{ color: WHITE, fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 700 }}>Tier 2 — Governance Program</div>
          <div style={{ color: MUTED, fontSize: 12 }}><span style={{ color: GOLD, fontWeight: 600 }}>For:</span> Practices building lasting compliance infrastructure</div>
          <div style={{ borderTop: `1px solid #1e2d44`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
            {["Everything in Tier 1", "Custom AI Acceptable Use Policy", "Employee training session (up to 2 hours)", "AI vendor / contract review (up to 5 vendors)", "Disclosure language for patient/client touchpoints", "Compliance documentation package"].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: GOLD, marginTop: 1, flexShrink: 0 }}>✓</span>
                <span style={{ color: MUTED, fontSize: 12 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid #1e2d44`, paddingTop: 10, marginTop: "auto" }}>
            <div style={{ color: WHITE, fontSize: 11, fontWeight: 600 }}>Deliverable: Governance Binder + Policy Documents</div>
            <div style={{ color: MUTED, fontSize: 11, marginTop: 2 }}>Timeline: 6–8 weeks</div>
          </div>
        </div>

        {/* Tier 3 */}
        <div style={{ background: DARK2, border: `1.5px solid #44aa6655`, borderRadius: 12, padding: "22px 22px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ background: "#44aa6622", color: "#44aa66", fontSize: 9, fontWeight: 800, letterSpacing: 1.5, padding: "3px 10px", borderRadius: 4, textTransform: "uppercase" }}>ONGOING</span>
          </div>
          <div style={{ color: WHITE, fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 700 }}>Tier 3 — Monthly Retainer</div>
          <div style={{ color: MUTED, fontSize: 12 }}><span style={{ color: "#44aa66", fontWeight: 600 }}>For:</span> Active clients needing continuous protection as AI evolves</div>
          <div style={{ borderTop: `1px solid #1e2d44`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
            {["Quarterly AI tool review", "Policy updates as TN regulations evolve", "Priority email/phone support (48-hr response)", "Incident response guidance", "Annual compliance summary report", "Unlimited policy questions"].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: "#44aa66", marginTop: 1, flexShrink: 0 }}>✓</span>
                <span style={{ color: MUTED, fontSize: 12 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid #1e2d44`, paddingTop: 10, marginTop: "auto" }}>
            <div style={{ color: WHITE, fontSize: 11, fontWeight: 600 }}>Deliverable: Monthly check-in + annual report</div>
            <div style={{ color: MUTED, fontSize: 11, marginTop: 2 }}>Timeline: 3-month minimum · Month-to-month after</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSB1580 = () => (
    <div style={{ maxWidth: 760 }}>
      {/* Active status banner */}
      <div style={{ background: "#cc444422", border: `1.5px solid #cc4444`, borderRadius: 10, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 18 }}>⚠</span>
        <div>
          <div style={{ color: "#cc4444", fontWeight: 800, fontSize: 13 }}>SB 1580 is active as of July 1, 2026.</div>
          <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>Tennessee businesses must already be in compliance.</div>
        </div>
      </div>

      {/* Sections */}
      {[
        {
          title: "WHAT IT REQUIRES",
          color: GOLD,
          items: [
            "Businesses must disclose when a customer is interacting with AI — not a human",
            "Customers must be able to request a human representative at any point",
            "Disclosure must appear upfront, clearly, and in plain language",
            "AI-generated communications must be identifiable as such",
          ]
        },
        {
          title: "WHO IT APPLIES TO",
          color: "#4488cc",
          items: [
            "Tennessee-based businesses using AI in customer-facing interactions",
            "Out-of-state companies serving Tennessee consumers",
            "Any business using chatbots, AI phone systems, automated intake, or AI-generated messaging",
            "Healthcare, dental, legal, financial, and professional service practices are common targets",
          ]
        },
        {
          title: "KEY RISK AREAS",
          color: "#cc7733",
          items: [
            "AI scheduling and intake systems with no disclosure notice",
            "Automated text/email sequences without AI identification",
            "AI-assisted phone systems without human handoff option",
            "Marketing content generated by AI without disclosure",
          ]
        },
        {
          title: "YOUR ROLE — WT VISION",
          color: "#44aa66",
          items: [
            "This brief is for client education during discovery — not legal advice",
            "Full compliance work is an add-on service (Tier 1 minimum)",
            "Use this to surface urgency and open the compliance conversation",
          ]
        },
      ].map(s => (
        <div key={s.title} style={{ background: DARK2, border: `1px solid ${s.color}33`, borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
          <div style={{ color: s.color, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>{s.title}</div>
          {s.items.map(item => (
            <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ color: s.color, flexShrink: 0, marginTop: 1 }}>•</span>
              <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      ))}

      <div style={{ color: MUTED, fontSize: 11, fontStyle: "italic", marginTop: 8, padding: "10px 0", borderTop: `1px solid #1e2d44` }}>
        This is an overview for sales conversations only. Refer clients to a licensed attorney for legal interpretation of SB 1580.
      </div>
    </div>
  );

  const renderQualification = () => {
    // Group items by category
    const cats = [];
    QUAL_ITEMS.forEach((item, i) => {
      const last = cats[cats.length - 1];
      if (!last || last.cat !== item.cat) {
        cats.push({ cat: item.cat, catColor: item.catColor, items: [{ ...item, idx: i }] });
      } else {
        last.items.push({ ...item, idx: i });
      }
    });

    return (
      <div style={{ maxWidth: 700 }}>
        <div style={{ color: MUTED, fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
          Check every criterion that applies to the prospect you&apos;re evaluating. Score updates in real time. Current as of September 28, 2026.
        </div>

        {cats.map(group => (
          <div key={group.cat} style={{ marginBottom: 20 }}>
            <div style={{ color: group.catColor, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>{group.cat}</div>
            {group.items.map(item => (
              <label key={item.idx} style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginBottom: 10, padding: "10px 14px", background: checks[item.idx] ? group.catColor + "12" : DARK2, border: `1px solid ${checks[item.idx] ? group.catColor + "55" : "#1e2d44"}`, borderRadius: 8, transition: "all 0.15s" }}>
                <input type="checkbox" checked={checks[item.idx]} onChange={() => toggleCheck(item.idx)}
                  style={{ marginTop: 2, accentColor: group.catColor, width: 15, height: 15, flexShrink: 0 }} />
                <span style={{ color: checks[item.idx] ? WHITE : MUTED, fontSize: 13, lineHeight: 1.5 }}>{item.text}</span>
              </label>
            ))}
          </div>
        ))}

        {/* Score card */}
        <div style={{ background: scoreResult.color + "18", border: `1.5px solid ${scoreResult.color}`, borderRadius: 12, padding: "18px 22px", marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ color: scoreResult.color, fontSize: 20, fontWeight: 900 }}>{score} / 10</div>
            <div style={{ color: scoreResult.color, fontWeight: 800, fontSize: 15, marginTop: 2 }}>{scoreResult.label}</div>
            <div style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>{scoreResult.desc}</div>
          </div>
          <button onClick={() => setChecks(Array(10).fill(false))}
            style={{ background: "transparent", color: MUTED, border: `1px solid #1e2d44`, borderRadius: 6, padding: "8px 18px", fontSize: 12, cursor: "pointer" }}>
            Reset
          </button>
        </div>
      </div>
    );
  };

  const renderOutreach = () => (
    <div style={{ maxWidth: 760 }}>
      <div style={{ color: MUTED, fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>
        Templates calibrated for Tennessee businesses. SB 1580 has been in effect since July 1, 2026 — outreach reflects urgency, not a future threat.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {OUTREACH_TEMPLATES.map((tmpl, idx) => (
          <div key={idx} style={{ background: DARK2, border: `1px solid ${tmpl.tagColor}44`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div>
                <span style={{ background: tmpl.tagColor + "22", color: tmpl.tagColor, fontSize: 9, fontWeight: 800, letterSpacing: 1.5, padding: "3px 10px", borderRadius: 4, textTransform: "uppercase" }}>{tmpl.tag}</span>
                <div style={{ color: WHITE, fontFamily: "'Georgia', serif", fontSize: 16, fontWeight: 700, marginTop: 8 }}>{tmpl.title}</div>
              </div>
              <button onClick={() => copyTemplate(idx, tmpl.subject, tmpl.body)}
                style={{
                  background: copied === idx ? "#44aa6622" : "transparent",
                  color: copied === idx ? "#44aa66" : GOLD,
                  border: `1px solid ${copied === idx ? "#44aa66" : GOLD + "55"}`,
                  borderRadius: 6, padding: "7px 16px", fontSize: 12, cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap"
                }}>
                {copied === idx ? "✓ Copied!" : "Copy Template"}
              </button>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: MUTED, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 4 }}>Subject</div>
              <div style={{ color: GOLD, fontSize: 13, fontWeight: 600 }}>{tmpl.subject}</div>
            </div>
            <div>
              <div style={{ color: MUTED, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8 }}>Body</div>
              <div style={{ background: DARK3, borderRadius: 8, padding: "14px 16px", color: MUTED, fontSize: 12, lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                {tmpl.body}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SECTIONS = [
    { id: "tiers", label: "Service Tiers" },
    { id: "sb1580", label: "SB 1580 Brief" },
    { id: "qualification", label: "Qualification" },
    { id: "outreach", label: "Outreach" },
  ];

  return (
    <div style={{ padding: "24px 0" }}>
      {/* Sub-nav pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)} style={pillStyle(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      {section === "tiers" && renderTiers()}
      {section === "sb1580" && renderSB1580()}
      {section === "qualification" && renderQualification()}
      {section === "outreach" && renderOutreach()}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("usecases");

  const tabs = [
    { id: "usecases", label: "📚 Use Cases Library" },
    { id: "clients", label: "📁 Client Folders" },
    { id: "playbook", label: "📋 Playbook" },
  ];

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Inter', 'Helvetica Neue', sans-serif", color: WHITE }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(180deg, ${DARK2} 0%, ${NAVY} 100%)`, borderBottom: `1px solid #1e2d44`, padding: "20px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ color: GOLD, fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>
              WT Vision LLC
            </div>
            <h1 style={{ margin: 0, fontSize: 22, fontFamily: "'Georgia', serif", color: WHITE, fontWeight: 400 }}>
              Claude Intelligence Hub
            </h1>
            <div style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>
              AI Governance Infrastructure Command Center
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: GOLD, fontSize: 10, fontWeight: 600, letterSpacing: 1 }}>
              Tennessee SB 1580
            </div>
            <div style={{ color: "#cc4444", fontSize: 11, fontWeight: 700 }}>
              Active Since July 1, 2026
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, padding: "0 32px", background: DARK2, borderBottom: `1px solid #1e2d44` }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              background: "transparent", color: tab === t.id ? GOLD : MUTED,
              border: "none", borderBottom: `2px solid ${tab === t.id ? GOLD : "transparent"}`,
              padding: "14px 20px", fontSize: 13, fontWeight: tab === t.id ? 700 : 400,
              cursor: "pointer", transition: "all 0.2s", letterSpacing: 0.3
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "0 32px", maxWidth: 1200, margin: "0 auto" }}>
        {tab === "usecases" && <UseCasesTab />}
        {tab === "clients" && <ClientsTab />}
        {tab === "playbook" && <PlaybookTab />}
      </div>
    </div>
  );
}
