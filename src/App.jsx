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
  employees: "", location: "", notes: "", createdAt: "", wtvNotes: ""
};

function ClientsTab() {
  const [clients, setClients] = useState([]);
  const [view, setView] = useState("list");
  const [form, setForm] = useState({ ...EMPTY_CLIENT });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("wtvision-clients");
        if (result) setClients(JSON.parse(result.value));
      } catch {}
      setLoading(false);
    })();
  }, []);

  const save = async (updated) => {
    setClients(updated);
    try { await window.storage.set("wtvision-clients", JSON.stringify(updated)); } catch {}
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

  const statusColor = (s) => ({
    "Prospect": "#4a6080",
    "Outreach Sent": "#8877cc",
    "Discovery Call Scheduled": "#cc9933",
    "Proposal Sent": "#cc7733",
    "Active Client": "#44aa66",
    "On Hold": "#666",
  }[s] || "#666");

  const Input = ({ label, field, placeholder, type = "text" }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ color: MUTED, fontSize: 11, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" }}>{label}</label>
      <input type={type} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
        placeholder={placeholder}
        style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 6, padding: "8px 12px", fontSize: 13, outline: "none" }} />
    </div>
  );

  const Select = ({ label, field, options }) => (
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
          <Input label="Company / Practice Name *" field="company" placeholder="Murfreesboro Family Dental" />
          <Select label="Practice Type" field="practiceType" options={PRACTICE_TYPES} />
          <Input label="Primary Contact Name" field="contactName" placeholder="Dr. Sarah Williams" />
          <Input label="Contact Title" field="contactTitle" placeholder="Owner / Office Manager" />
          <Input label="Email" field="email" placeholder="contact@practice.com" type="email" />
          <Input label="Phone" field="phone" placeholder="(615) 000-0000" />
          <Input label="Location / City" field="location" placeholder="Murfreesboro, TN" />
          <Input label="Number of Employees" field="employees" placeholder="15" />
          <Select label="Current Tier / Stage" field="tier" options={TIERS} />
          <Select label="Pipeline Status" field="status" options={STATUSES} />
        </div>

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 4, maxWidth: 720 }}>
          <label style={{ color: MUTED, fontSize: 11, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" }}>WT Vision Notes / Compliance Flags</label>
          <textarea value={form.wtvNotes} onChange={e => setForm({ ...form, wtvNotes: e.target.value })}
            placeholder="AI tools in use, compliance risks identified, SB 1580 flags, follow-up notes..."
            rows={4}
            style={{ background: DARK3, border: `1px solid #1e2d44`, color: WHITE, borderRadius: 6, padding: "8px 12px", fontSize: 13, outline: "none", resize: "vertical" }} />
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <button onClick={isEdit ? updateClient : addClient}
            style={{ background: GOLD, color: NAVY, border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 800, fontSize: 13, cursor: "pointer", letterSpacing: 0.5 }}>
            {isEdit ? "Save Changes" : "Create Client Folder"}
          </button>
          <button onClick={() => { setView("list"); setForm({ ...EMPTY_CLIENT }); }}
            style={{ background: "transparent", color: MUTED, border: `1px solid #1e2d44`, borderRadius: 8, padding: "10px 20px", fontSize: 13, cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ color: MUTED, fontSize: 12 }}>{clients.length} client folder{clients.length !== 1 ? "s" : ""}</div>
        </div>
        <button onClick={() => { setForm({ ...EMPTY_CLIENT }); setView("add"); }}
          style={{ background: GOLD, color: NAVY, border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 800, fontSize: 13, cursor: "pointer", letterSpacing: 0.5 }}>
          + New Client Folder
        </button>
      </div>

      {clients.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", border: `1px dashed #1e2d44`, borderRadius: 12 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📁</div>
          <div style={{ color: WHITE, fontSize: 16, fontFamily: "'Georgia', serif", marginBottom: 8 }}>No client folders yet</div>
          <div style={{ color: MUTED, fontSize: 13, marginBottom: 20 }}>When you land your first client, create their folder here — pre-loaded with company info, contact details, and compliance notes.</div>
          <button onClick={() => { setForm({ ...EMPTY_CLIENT }); setView("add"); }}
            style={{ background: GOLD, color: NAVY, border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
            Create First Client Folder
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {clients.map(client => (
            <div key={client.id}
              style={{ background: DARK2, border: `1px solid #1e2d44`, borderRadius: 10, padding: "18px 20px", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2d44"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <CategoryBadge label={client.practiceType} />
                <span style={{ background: statusColor(client.status) + "33", color: statusColor(client.status), fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.5 }}>
                  {client.status}
                </span>
              </div>
              <div style={{ color: WHITE, fontWeight: 700, fontSize: 15, fontFamily: "'Georgia', serif", marginBottom: 4 }}>{client.company}</div>
              {client.contactName && <div style={{ color: GOLD, fontSize: 12, marginBottom: 2 }}>{client.contactName}{client.contactTitle ? ` · ${client.contactTitle}` : ""}</div>}
              {client.location && <div style={{ color: MUTED, fontSize: 12, marginBottom: 2 }}>{client.location}</div>}
              {client.email && <div style={{ color: MUTED, fontSize: 11, marginBottom: 8 }}>{client.email}</div>}
              <div style={{ color: "#4a6080", fontSize: 11, marginBottom: 14, fontStyle: "italic" }}>{client.tier}</div>
              {client.wtvNotes && (
                <div style={{ background: DARK3, borderRadius: 6, padding: "8px 10px", fontSize: 11, color: MUTED, marginBottom: 12, lineHeight: 1.5 }}>
                  {client.wtvNotes.length > 100 ? client.wtvNotes.slice(0, 100) + "..." : client.wtvNotes}
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { setForm({ ...client }); setView("edit"); }}
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

export default function App() {
  const [tab, setTab] = useState("usecases");

  const tabs = [
    { id: "usecases", label: "📚 Use Cases Library" },
    { id: "clients", label: "📁 Client Folders" },
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
              Effective July 1, 2026
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
      </div>
    </div>
  );
}
