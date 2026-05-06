# Case Study 2 — Financial Services Firm
## AI Compliance Architect Engagement: Shadow AI, SOC 2, and Client Data Risk

---

## CLIENT PROFILE

| Field | Detail |
|-------|--------|
| Organization | Mid-size registered investment advisory firm |
| Size | 120 employees |
| Industry | Financial Services |
| Regulations | SEC, FINRA, SOC 2 Type 2, state fiduciary rules |
| Engagement Type | Assessment + Policy Build + SOC 2 prep support |
| Duration | 10 weeks |
| Investment | $31,500 |

---

## HOW THEY FOUND YOU

Their external IT auditor flagged AI tool usage as an emerging risk during a routine security review. The auditor told their COO: "You need someone who specializes in AI compliance — we can't assess that." The COO Googled "AI compliance consultant financial services" and found your LinkedIn profile. She sent you a direct message the same day.

---

## DISCOVERY CALL — WHAT YOU LEARNED

**The COO opened with:**
"Our SOC 2 audit is in 4 months. Our IT auditor told us our AI situation is a problem and we need to fix it. I don't even know where to start."

**Key discoveries from the call:**

1. The firm's financial advisors were using AI tools to draft client communications and meeting summaries — client account information was being pasted in
2. The trading desk had started using an AI research tool to scan market news — lower risk but unreviewed
3. HR was using an AI tool for performance review summaries
4. IT had approved zero AI tools. All usage was self-initiated by employees
5. No AI-related clauses existed in any vendor contracts
6. Under FINRA rules, all client communications must be reviewed and archived — AI-drafted emails were not being flagged as AI-generated or reviewed separately
7. The firm had a SOC 2 audit in 4 months focusing on data access controls and vendor management
8. The compliance officer was a single person managing all regulatory compliance — overwhelmed and under-resourced

**The situation in plain terms:**
Advisors were pasting client portfolio data and personal financial information into unvetted AI tools to draft emails. Those emails were going to clients without flagging that AI was involved. Under SEC and FINRA guidance on AI use in client communications, this was a compliance landmine.

---

## PROPOSAL & SCOPE

**Phase 1 — AI Risk Assessment & SOC 2 Gap Analysis (4 weeks) — $14,000**
- AI Systems Inventory
- Data flow mapping with focus on client data exposure
- Regulatory gap analysis: SEC, FINRA, SOC 2 vendor management requirements
- Stakeholder interviews with advisors, trading, IT, compliance, HR
- Risk Report

**Phase 2 — Policy Build & SOC 2 Remediation Support (6 weeks) — $17,500**
- AI Use Policy aligned with FINRA communication rules
- AI Vendor Assessment framework for SOC 2 vendor management controls
- Client communication AI disclosure protocol
- Employee training module
- Support preparing AI-related documentation for SOC 2 auditors

---

## WHAT YOU FOUND — CRITICAL DISCOVERIES

### Shadow AI Inventory

When you sent the AI tool survey to all departments, you discovered 11 AI tools in active use. IT was aware of zero of them.

| Tool | Users | Client Data Involved | Approved? |
|------|-------|---------------------|-----------|
| AI Email Drafting Tool | 34 advisors | Client names, portfolio values, account numbers | No |
| AI Meeting Summary Tool | 22 advisors | Client financial discussions | No |
| AI Research Scanner | 8 traders | Market data only | No |
| AI Performance Review Tool | HR (3 people) | Employee data | No |
| AI Contract Summarizer | Legal (2 people) | Client agreement terms | No |
| AI Scheduling Assistant | Admin (5 people) | Calendar/meeting data | No |
| 5 additional minor tools | Various | Mixed | No |

**Zero AI tools had been through any approval process.**

### Critical Finding: FINRA Communication Compliance Risk

Under FINRA Rule 2210, all communications with clients must be:
- Supervised and reviewed
- Fair and balanced (no misleading statements)
- Archived for 3 years

The AI-drafted emails were not being:
- Flagged as AI-generated
- Separately reviewed by the compliance officer
- Checked for FINRA-prohibited language (guaranteed returns, misleading performance claims)
- Archived with notation that AI was used in drafting

Your finding: "Any AI-drafted client email that went out without compliance review is a potential FINRA violation. Based on interview data, approximately 200–400 emails per month may have been impacted over the past 8 months."

### SOC 2 Vendor Management Gap

SOC 2 Type 2 requires documented vendor management controls — including evidence that third-party vendors are assessed for security risk. None of the 11 AI tools had been through vendor assessment. For the SOC 2 audit, this was a clear control failure that auditors would flag.

### Data Retention Risk

Client financial data entered into AI tools may be stored on vendor servers outside the firm's data retention policy. Several of the AI tool vendors had privacy policies stating user data was retained for up to 24 months — longer than the firm's 90-day data retention policy for certain categories.

---

## YOUR RISK REPORT PRESENTATION

You presented to the COO, Compliance Officer, and two partners.

**Opening statement:**
"The good news is we have 4 months before your SOC 2 audit. The risks I'm going to show you are real, but every single one of them is addressable before that audit if we move quickly. Let me show you what we found and what we're going to do about it."

**Reaction to the shadow AI inventory:**
One partner said: "Wait — 11 tools and IT knew about none of them? How is that possible?"

Your response: "This is one of the most common things I find. Employees aren't trying to cause problems — they find a tool that makes their work faster and they start using it. Without a clear approval process and a policy, this happens in every organization. The fix is a clear process going forward — not blame for the past."

**Reaction to the FINRA finding:**
The compliance officer went quiet. Then: "We need to pull those email records."

Your response: "Yes. I'd recommend a 90-day lookback review of AI-drafted communications to assess the volume and content. I can help you structure that review and document it in a way that demonstrates good-faith remediation to FINRA if this ever comes up."

---

## WHAT YOU BUILT — PHASE 2 DELIVERABLES

### 1. AI Use Policy — Financial Services Edition

Key provisions:
- All AI tools must be approved through the AI Tool Request process before use
- Client names, account numbers, portfolio values, and any personally identifiable financial information may NOT be entered into any AI tool not on the Approved Tools List
- AI-drafted client communications must be reviewed by the compliance officer before sending and archived with an AI-use notation
- Advisors must disclose AI involvement in communications where material to the client relationship

### 2. Approved AI Tools List — Built With You

You worked with the compliance officer and IT to evaluate each of the 11 tools:
- 2 tools approved with enhanced vendor agreements
- 3 tools replaced with enterprise versions that offered better data controls and were SOC 2 certified
- 4 tools discontinued (employees moved to approved alternatives)
- 2 tools approved with restricted use (no client data permitted)

### 3. AI Vendor Assessment Checklist — SOC 2 Ready

For each AI vendor, the firm now documents:
- Security certifications (SOC 2, ISO 27001)
- Data retention and deletion policies
- Subprocessor list
- Breach notification SLA
- Data used for model training (yes/no)
- Contract clauses covering data handling

This checklist became part of the firm's formal vendor management program — directly supporting SOC 2 compliance.

### 4. Client Communication AI Protocol

A 1-page process for advisors:
1. Draft communication using approved AI tool
2. Review and edit for accuracy
3. Submit to compliance for review (same process as all client communications)
4. Archive with AI-use notation in compliance system
5. Send

### 5. SOC 2 Audit Preparation Support

You helped the compliance officer prepare documentation for the audit:
- AI vendor assessment records for all approved tools
- Evidence of AI Use Policy rollout and employee acknowledgment
- Updated vendor management control documentation
- AI tool approval process documentation

**SOC 2 auditor's assessment:** No exceptions noted on vendor management controls related to AI.

---

## OUTCOME

| Metric | Result |
|--------|--------|
| Shadow AI tools discovered | 11 |
| Tools rationalized | 11 (4 discontinued, 4 approved, 3 replaced) |
| FINRA risk remediated | 90-day email lookback completed; no violations escalated |
| SOC 2 audit result | Passed — AI vendor management documented as a strength |
| Employee training completion | 100% (mandatory before tool access restored) |
| Client outcome | Avoided potential FINRA enforcement; passed SOC 2 audit |
| Your outcome | 6-month retainer at $3,500/month signed post-engagement |

---

## KEY LESSONS FROM THIS CASE

**Lesson 1: In financial services, the compliance officer is your partner, not your audience.**
The compliance officer knew something was wrong but didn't have the AI expertise to prove it or fix it. You gave them the tools, language, and documentation to do their job better. Make compliance officers heroes — they'll refer you to other firms.

**Lesson 2: Shadow AI is the #1 finding in every engagement.**
Every organization has employees using AI tools that IT hasn't approved. Your AI Systems Inventory process is the single most valuable thing you do in an assessment. It always reveals more than the client expects.

**Lesson 3: Connect your findings to existing regulatory language.**
Saying "there's a data risk" is weak. Saying "under FINRA Rule 2210, AI-drafted client communications without compliance review may constitute a supervisory failure" is specific, credible, and motivating. Know the regulation numbers and quote them.

**Lesson 4: SOC 2 + AI compliance is a powerful combination to sell.**
Many mid-size financial firms are SOC 2 certified or pursuing it. SOC 2 auditors are starting to flag AI as a vendor management risk. Positioning yourself as someone who can fix AI compliance AND shore up SOC 2 controls simultaneously is a strong value proposition in this market.
