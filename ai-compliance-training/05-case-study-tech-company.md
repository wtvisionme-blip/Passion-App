# Case Study 3 — Mid-Size Tech Company
## AI Compliance Architect Engagement: EU AI Act Readiness & Governance Framework

---

## CLIENT PROFILE

| Field | Detail |
|-------|--------|
| Organization | B2B SaaS company (project management software) |
| Size | 280 employees |
| Industry | Technology / Software |
| Regulations | EU AI Act, GDPR, SOC 2 |
| Engagement Type | EU AI Act readiness assessment + AI Governance Framework |
| Duration | 12 weeks |
| Investment | $38,000 |

---

## HOW THEY FOUND YOU

The company's General Counsel read an article about the EU AI Act fines (up to 35 million euros or 7% of global turnover for certain violations) and panicked. Their product included several AI-powered features — automated task assignment, resource forecasting, and a recently launched AI assistant for project managers. They sold to enterprise clients across Europe. She found you through a referral from a privacy attorney she trusted.

---

## DISCOVERY CALL — WHAT YOU LEARNED

**General Counsel opened with:**
"We have AI baked into our product. We sell to companies in Germany, France, the UK, and Spain. I just read about the EU AI Act and I honestly don't know if we're compliant. We need someone to tell us where we stand."

**Key discoveries:**

1. Their product had 3 AI-powered features: automated task assignment, resource forecasting, AI project assistant chatbot
2. The automated task assignment feature used AI to recommend which employee should be assigned work — this involves making inferences about people's performance and workload
3. They had no documentation on how their AI models worked or what data they used
4. Their GDPR privacy policy mentioned AI in one sentence — no detailed disclosure
5. They had no AI governance internally — product team made AI decisions independently
6. They were about to launch a new AI feature: automated performance scoring for project outcomes
7. Their enterprise clients were starting to ask them AI compliance questions in RFPs and security reviews
8. They had not conducted a GDPR Data Protection Impact Assessment (DPIA) for any of their AI features

**Critical context on the EU AI Act:**
The EU AI Act classifies AI systems by risk level. Systems that make or significantly influence decisions about employment, work management, or performance evaluation are classified as HIGH RISK. High-risk AI systems require:
- Technical documentation
- Human oversight mechanisms
- Transparency to users
- Bias testing and monitoring
- Registration in the EU AI Act database
- Conformity assessment before deployment

The automated task assignment feature and the upcoming performance scoring feature both likely qualified as high-risk AI systems under the Act.

---

## YOUR DIAGNOSIS ON THE CALL

"I want to flag something important before we go further. The automated task assignment feature — the one that recommends which employee gets which work — may qualify as a high-risk AI system under the EU AI Act because it influences work management decisions. If that classification applies, there are significant documentation, transparency, and oversight requirements that need to be in place. The performance scoring feature you're about to launch raises the same concern. I'd want to assess both carefully before you launch that feature."

**The General Counsel's response:**
"We're supposed to launch performance scoring in 6 weeks."

**Your response:**
"Then we should start immediately."

---

## PROPOSAL & SCOPE

**Phase 1 — EU AI Act Risk Classification & GDPR AI Assessment (5 weeks) — $19,000**
- Inventory and assess all AI features in the product
- Determine risk classification for each feature under EU AI Act
- Review GDPR compliance for AI features (lawful basis, transparency, DPIA requirements)
- Stakeholder interviews with product, engineering, legal, and sales teams
- Risk Report with clear classification findings and recommended actions

**Phase 2 — AI Governance Framework & Compliance Documentation (7 weeks) — $19,000**
- Technical documentation for high-risk AI features (EU AI Act requirement)
- GDPR Data Protection Impact Assessments for applicable features
- Human oversight protocols for automated task assignment feature
- Bias testing framework
- Updated privacy policy AI disclosure language
- AI Governance Framework for internal product development
- Response templates for client RFP AI compliance questions

---

## WHAT YOU FOUND — ASSESSMENT RESULTS

### EU AI Act Risk Classification

| AI Feature | Classification | Reason | Required Actions |
|-----------|---------------|---------|-----------------|
| Automated Task Assignment | HIGH RISK | Influences work management decisions about individuals | Technical docs, human oversight, transparency, bias testing |
| Resource Forecasting | LIMITED RISK | Forecasts workloads — no direct individual decisions | Transparency disclosure to users |
| AI Project Assistant Chatbot | MINIMAL RISK | General assistant, no decisions about individuals | Basic transparency (disclose it's AI) |
| Performance Scoring (planned) | HIGH RISK | Evaluates individual performance outcomes | All high-risk requirements + DPIA required |

**Recommendation on Performance Scoring launch:**
You recommended delaying the launch by 8 weeks to complete required documentation and build human oversight into the feature. The General Counsel agreed. Engineering was frustrated but understood the legal exposure.

### GDPR AI Compliance Gaps

**Gap 1: No DPIA for high-risk AI processing**
GDPR Article 35 requires a Data Protection Impact Assessment before deploying processing likely to result in high risk to individuals. Automated task assignment processed employee behavioral data from enterprise clients' workforces — a DPIA was required and missing.

**Gap 2: Insufficient AI transparency in privacy policy**
GDPR requires transparency about automated decision-making. The company's one-sentence AI mention did not explain: what AI features existed, what data they used, what decisions they influenced, or how users could request human review.

**Gap 3: No lawful basis documented for AI processing**
The company had not documented a clear GDPR lawful basis for processing employee data through the AI task assignment feature. Legitimate interest was likely applicable, but no Legitimate Interest Assessment had been conducted.

**Gap 4: No mechanism for human override**
Enterprise clients' employees had no way to request human review of an AI-generated task assignment. GDPR Article 22 gives individuals rights related to automated decision-making.

### Vendor AI Risk (Supply Chain)

The product itself was built using a third-party AI model API. You reviewed their AI vendor agreements and found:
- The AI model vendor's terms permitted using customer data for model improvement in certain scenarios
- No data processing addendum specific to enterprise client employee data was in place
- The company was passing enterprise client employee data to the AI vendor without explicit disclosure to those clients

---

## WHAT YOU BUILT — PHASE 2 DELIVERABLES

### 1. Technical Documentation Package (EU AI Act Requirement)
For each high-risk AI feature:
- Description of the AI system's purpose and intended use
- Training data description (what data, how collected, how representative)
- Model performance metrics and accuracy benchmarks
- Known limitations and potential failure modes
- Human oversight mechanisms
- Monitoring and update procedures

This documentation took 3 weeks to produce, requiring multiple sessions with the engineering team.

### 2. Data Protection Impact Assessments (GDPR)
Completed DPIAs for:
- Automated task assignment feature
- Performance scoring feature (prior to launch)

Each DPIA covered: description of processing, necessity and proportionality, risk assessment, mitigation measures.

### 3. Human Oversight Protocol
For the automated task assignment feature:
- Every AI-generated task assignment is presented as a recommendation, not a mandate
- Project managers have a one-click override with optional reason logging
- Employees can see which assignments were AI-suggested vs. human-assigned
- Monthly reports to enterprise clients showing override rates

### 4. Bias Testing Framework
A quarterly process for testing the task assignment AI for bias:
- Test whether assignments differ by gender, age, or other protected characteristics
- Test whether high-value or high-visibility tasks are distributed equitably
- Document findings and remediation
- Report results to enterprise clients on request

### 5. Updated Privacy Policy AI Section
Replaced the one-sentence mention with a full AI disclosure section covering:
- What AI features exist in the product
- What data each feature uses
- What decisions or recommendations each feature makes
- How users and enterprise admins can request human review
- How to contact the company with AI-related questions

### 6. AI RFP Response Templates
Enterprise clients were increasingly asking AI compliance questions in security reviews and RFPs. You built 12 standard response templates covering the most common questions:
- "Does your product use AI?"
- "What data does your AI use?"
- "Is your AI compliant with the EU AI Act?"
- "How do you test your AI for bias?"
- "Can we opt out of AI features?"
- etc.

**Impact:** Sales team reported that having ready answers to AI compliance questions increased enterprise deal velocity. Three deals that had stalled on AI compliance questions closed within 30 days of the templates being deployed.

### 7. Internal AI Governance Framework for Product Teams
A process for building new AI features responsibly:
- AI Feature Risk Classification checklist (run before any new AI feature is built)
- Required documentation for any AI feature that touches user data
- Legal and compliance review gate before AI features launch
- AI ethics review for features involving individual assessments

---

## OUTCOME

| Metric | Result |
|--------|--------|
| AI features assessed | 4 (3 existing, 1 planned) |
| High-risk features identified | 2 |
| Performance scoring launch | Delayed 8 weeks; launched with full compliance documentation |
| DPIAs completed | 2 |
| Enterprise deals unblocked by RFP templates | 3 |
| GDPR gaps remediated | 4 of 4 |
| Client outcome | EU AI Act readiness achieved; GDPR gaps closed; sales velocity improved |
| Your outcome | 12-month retainer at $5,000/month for ongoing AI governance advisory |

---

## KEY LESSONS FROM THIS CASE

**Lesson 1: Tech companies are building the AI — which makes their compliance more complex.**
Healthcare and financial clients are using AI tools. Tech companies are building them. When AI is in the product, you are dealing with product liability, not just employee behavior. The stakes and complexity are higher — so is the value you deliver.

**Lesson 2: The EU AI Act is a growth opportunity for you.**
Most US companies selling to Europe have no idea where they stand with the EU AI Act. Any SaaS company with European clients is a potential client for you. Learn the EU AI Act deeply — it is one of the most significant AI regulations in the world and most companies are underprepared.

**Lesson 3: Delaying a product launch takes courage — and builds massive credibility.**
When you told the General Counsel that launching performance scoring in 6 weeks was risky, you were potentially creating conflict. But you were right. Recommending the delay and being proven right by the compliance documentation process built enormous trust. Do not soften your findings to keep clients comfortable.

**Lesson 4: Compliance can directly drive revenue.**
The RFP templates you built helped close 3 enterprise deals. When you can show a client that your work helped them make more money — not just avoid fines — you become invaluable. Always look for where compliance intersects with the sales process.
