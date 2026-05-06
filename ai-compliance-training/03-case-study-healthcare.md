# Case Study 1 — Healthcare Organization
## AI Compliance Architect Engagement: HIPAA Risk & Unsanctioned AI Tools

---

## CLIENT PROFILE

| Field | Detail |
|-------|--------|
| Organization | Regional community hospital network |
| Size | 850 employees across 3 locations |
| Industry | Healthcare |
| Regulations | HIPAA, state health privacy laws |
| Engagement Type | Full assessment + policy build |
| Duration | 14 weeks |
| Investment | $42,000 (assessment + policy package) |

---

## HOW THEY FOUND YOU

The hospital's CISO attended a LinkedIn webinar you hosted on "AI Risk in Healthcare Settings." She connected with you afterward and mentioned they had no AI governance policy despite staff openly using AI tools. She said the compliance officer was nervous but leadership hadn't prioritized it. She asked for a proposal.

---

## DISCOVERY CALL — WHAT YOU LEARNED

**Key findings from the 55-minute discovery call:**

1. At least 4 departments were using AI tools daily — nursing staff, billing, HR, and the marketing team
2. Nurses were using a popular AI chatbot to help write patient care notes
3. Billing staff were copying patient insurance data into an AI summarization tool to speed up claims
4. HR was using an AI resume screener for hiring that nobody had reviewed for bias
5. Marketing was using an AI image generator — lower risk but still unreviewed
6. There was no AI use policy
7. No vendor agreements had been reviewed for AI data clauses
8. Staff had received zero training on AI risks
9. The hospital had a HIPAA audit scheduled for 8 months out
10. The CISO was the only person concerned — the CMO and COO were unaware of the scope of AI usage

**The 3 Power Questions and what they revealed:**

- "What AI tools are in your org right now including ones IT didn't approve?"
  - IT was unaware that nursing staff had been using a consumer AI chatbot for 6 months
- "Have regulators or auditors asked about AI?"
  - Not yet — but the HIPAA audit in 8 months made this urgent
- "Who would be accountable if an AI system caused a violation tomorrow?"
  - Long pause. Nobody had a clear answer. The CISO said "probably me."

**Your diagnosis stated back to them:**
"What I'm hearing is you have protected health information being entered into AI systems that have no HIPAA Business Associate Agreement in place. That is a live HIPAA violation risk right now. The audit timeline makes this critical to address immediately."

---

## PROPOSAL & SCOPE

**You proposed a two-phase engagement:**

**Phase 1 — AI Risk Assessment (6 weeks) — $18,000**
- Full AI Systems Inventory across all 3 locations
- Stakeholder interviews with 12 staff members
- Data flow mapping for all AI tools touching patient data
- Vendor contract review for AI data use clauses
- Regulatory gap analysis against HIPAA requirements
- Risk Report with executive summary for leadership

**Phase 2 — Policy & Framework Build (8 weeks) — $24,000**
- AI Use Policy written for healthcare context
- HIPAA-compliant AI vendor evaluation checklist
- Business Associate Agreement (BAA) requirement process for AI vendors
- AI Governance Framework with designated ownership
- Employee AI training module (HIPAA + AI combined)
- AI Risk Register

**Total: $42,000 | 50% upfront, 50% on final delivery**

---

## WHAT YOU FOUND — ASSESSMENT RESULTS

### AI Systems Inventory (Summary)

| Tool | Department | Data Involved | BAA in Place? | Risk Level |
|------|-----------|---------------|---------------|------------|
| Consumer AI Chatbot | Nursing | Patient names, symptoms, care notes (PHI) | No | CRITICAL |
| AI Claims Summarizer | Billing | Insurance ID, diagnosis codes, patient names (PHI) | No | CRITICAL |
| AI Resume Screener | HR | Applicant names, addresses, employment history | No | HIGH |
| AI Image Generator | Marketing | No PHI | No | LOW |
| AI Scheduling Tool | Admin | Staff names, shift data | No | MEDIUM |

### Critical Findings

**Finding 1: PHI Entering Unvetted AI Systems (CRITICAL)**
Nursing staff were entering patient names, symptoms, and care note drafts into a consumer-grade AI chatbot. This tool had no HIPAA Business Associate Agreement with the hospital. The vendor's privacy policy explicitly stated user inputs could be used to improve their model — meaning patient health information could be used for AI training without patient consent.

This is a direct HIPAA violation. Potential fine range: $100 to $50,000 per violation, up to $1.9 million per violation category per year.

**Finding 2: Patient Insurance Data in AI Summarization Tool (CRITICAL)**
Billing staff were copying full insurance claim data including patient names and diagnosis codes into a third-party AI tool. Same issue — no BAA, no data processing agreement. High volume of records affected — billing team processed approximately 200 claims per day.

**Finding 3: Unreviewed AI Resume Screener — Bias Risk (HIGH)**
HR was using an AI tool to screen job applicants. The tool had never been audited for bias. Under EEOC guidance and emerging state AI laws, using AI hiring tools without bias testing exposes the hospital to employment discrimination liability.

**Finding 4: No AI Governance or Ownership (HIGH)**
There was no designated owner for AI compliance. No process for evaluating new AI tools. No policy prohibiting staff from downloading and using AI tools independently. No incident reporting mechanism if something went wrong.

---

## YOUR RISK REPORT PRESENTATION

You presented findings in a 90-minute meeting with the CISO, CMO, COO, and General Counsel.

**How you opened:**
"I want to start by saying this situation is not unique. Most healthcare organizations at your stage are in the same position. The good news is we found this before your audit, and everything I'm about to show you is fixable. Let me walk you through what we found."

**The CMO's reaction when shown Finding 1:**
"The nurses are doing what? How long has this been happening?"

**Your response:**
"Approximately 6 months based on our interviews. The nurses were trying to be efficient — they weren't trying to break the law. That's actually common. Which is why the policy and training come first, not punishment."

**Outcome of the meeting:**
Leadership authorized Phase 2 immediately. The General Counsel immediately sent a cease-and-desist notice to the nursing department for that specific chatbot tool while compliant alternatives were evaluated.

---

## WHAT YOU BUILT — PHASE 2 DELIVERABLES

### 1. AI Use Policy
Written for hospital staff — clear, plain language, no legal jargon.

**Key rules in the policy:**
- Never enter patient names, diagnosis codes, treatment information, or insurance data into any AI tool not on the approved list
- All AI tools must be evaluated and approved by the AI Review Committee before use
- Any AI vendor handling PHI must have a signed BAA with the hospital
- Violations are subject to the same disciplinary process as other HIPAA violations

### 2. Approved AI Tools List
You worked with IT and the CISO to evaluate and onboard HIPAA-compliant AI alternatives:
- Replaced the consumer chatbot with a healthcare-specific AI assistant with a BAA
- Evaluated 3 AI claims tools — approved 1 with appropriate data handling agreements
- Added the resume screener to a 90-day bias audit process before continued use

### 3. AI Vendor Evaluation Checklist
A 12-question checklist for evaluating any new AI vendor:
- Do they offer a HIPAA BAA?
- Is patient data used to train their models?
- Where is data stored geographically?
- What is their breach notification timeline?
- Have they passed a SOC 2 Type 2 audit?
- etc.

### 4. Employee Training Module
A 25-minute training deployed to all 850 staff members covering:
- What AI is and how it works (basics)
- Why PHI in AI tools is a HIPAA risk
- What tools are approved and how to use them
- How to request a new AI tool
- How to report an AI-related concern

Training completion: 94% within 30 days of launch.

### 5. AI Governance Framework
- Established an AI Review Committee (CISO, CMO rep, Legal, IT)
- Quarterly AI tool reviews
- Annual full AI risk re-assessment
- Incident response process for AI-related breaches

---

## OUTCOME

| Metric | Result |
|--------|--------|
| Critical risks resolved | 2 of 2 before the HIPAA audit |
| Staff trained | 801 of 850 (94%) |
| AI tools reviewed | 5 tools — 2 replaced, 1 approved with BAA, 1 pending audit, 1 approved as-is |
| HIPAA audit result | Passed — auditors noted AI governance framework as a strength |
| Client outcome | Hospital avoided potential fines; CISO received internal recognition |
| Your outcome | Signed 12-month retainer at $4,500/month after project completion |

---

## KEY LESSONS FROM THIS CASE

**Lesson 1: Shadow AI is everywhere in healthcare.**
Staff are not trying to be non-compliant. They are trying to work faster. Your job is to give them compliant tools that meet the same need, not just take tools away.

**Lesson 2: The CISO is often your internal champion.**
In healthcare, the CISO or Compliance Officer is usually the one who wants your help. Your job is to give them the language and evidence to get leadership's attention and budget.

**Lesson 3: Findings presentations are where trust is built.**
The 90-minute meeting where you walked leadership through the risk report was more valuable than all the documents you produced. People buy from people they trust. Being calm, clear, and solution-oriented in that meeting set up the retainer.

**Lesson 4: Always offer a retainer.**
The work never ends. Regulations change. New AI tools emerge. Staff turn over. The hospital needed ongoing help and was relieved when you offered it. A 12-month retainer at $4,500/month is $54,000 in recurring revenue.
