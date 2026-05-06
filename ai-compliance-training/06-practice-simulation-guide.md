# Practice Simulation Guide
## How to Train Yourself to Master AI Compliance Architecture

---

## OVERVIEW

Reading about compliance is not enough. You need to practice doing the work before your first real client walks in. This guide gives you structured exercises, roleplay scenarios, and mock deliverables to build your confidence and skills.

Work through all six sections in order. By the time you finish, you will have practiced every major skill an AI compliance architect uses.

---

## SECTION 1 — REGULATORY SELF-STUDY SPRINT

### Goal
Build your regulatory knowledge base so you can speak confidently about the rules that govern your clients.

### The 5 Regulations You Must Know Cold

**1. HIPAA (Health Insurance Portability and Accountability Act)**
- Who it covers: Healthcare providers, insurers, and their business associates
- AI relevance: Any AI tool that touches Protected Health Information (PHI) requires a Business Associate Agreement (BAA). PHI includes names, dates, diagnoses, treatment info, insurance numbers.
- Key rule for AI: If a vendor's AI system processes PHI, they must sign a BAA and cannot use that data to train their models without explicit authorization.
- Practice: Write a 1-paragraph plain-English explanation of why a hospital using ChatGPT for patient notes is a HIPAA problem.

**2. GDPR (General Data Protection Regulation)**
- Who it covers: Any organization processing personal data of EU residents
- AI relevance: Automated decision-making, transparency requirements, Data Protection Impact Assessments, right to human review
- Key rule for AI: Article 22 — individuals have the right not to be subject to solely automated decisions that significantly affect them. Article 35 — DPIAs required before high-risk processing.
- Practice: Write a 1-paragraph explanation of what a US company must disclose to EU employees about AI-powered performance tools.

**3. CCPA / CPRA (California Consumer Privacy Act / Privacy Rights Act)**
- Who it covers: Businesses collecting personal data from California residents above certain thresholds
- AI relevance: Automated decision-making technology regulations, opt-out rights, disclosure requirements
- Key rule for AI: California's CPRA requires businesses to disclose when they use automated decision-making technology and give consumers the right to opt out in certain situations.
- Practice: Write a 1-sentence disclosure statement a company would add to their privacy policy to comply with CPRA automated decision-making requirements.

**4. EU AI Act**
- Who it covers: Anyone placing AI systems on the EU market or using AI systems in the EU
- AI relevance: This is the world's first comprehensive AI law. It classifies AI by risk level (unacceptable, high, limited, minimal) with different requirements for each.
- High-risk categories: AI in employment, education, law enforcement, credit scoring, health, critical infrastructure
- Key rule for AI: High-risk AI systems require technical documentation, human oversight, bias testing, conformity assessment, and registration.
- Practice: Classify these AI systems as high-risk or not: (a) a chatbot for customer service, (b) an AI tool that scores job applicants, (c) an AI tool that detects fraud in loan applications.

**5. SOC 2 (System and Organization Controls 2)**
- Who it covers: Service providers storing or processing customer data in the cloud
- AI relevance: SOC 2 auditors are now examining AI vendor management, AI access controls, and AI in data processing
- Key rule for AI: AI vendors must be assessed as part of vendor management controls. Undocumented AI usage creates control gaps that auditors will flag.
- Practice: List 5 questions you would ask an AI vendor to determine if they meet SOC 2 vendor management requirements.

### Study Schedule (2 weeks)
| Day | Topic |
|-----|-------|
| 1–2 | HIPAA — read HHS AI guidance, practice explaining it out loud |
| 3–4 | GDPR Article 22 and 35 — read the actual text, then paraphrase it |
| 5–6 | CCPA/CPRA — read the automated decision-making provisions |
| 7–8 | EU AI Act — read the risk classification framework, practice classifying example AI systems |
| 9–10 | SOC 2 — read the trust service criteria, focus on vendor management |
| 11–12 | Review and quiz yourself — explain each regulation without notes |
| 13–14 | Write a one-page cheat sheet for each regulation |

---

## SECTION 2 — MOCK DISCOVERY CALL PRACTICE

### Goal
Be fluent and confident asking discovery questions before you get on a real call.

### Exercise 2A — Solo Run-Through

Set a timer for 60 minutes. Pretend you are on a discovery call. Read each question out loud as if you are asking a client. Then say an answer out loud as if you are the client. Then respond to that answer as the consultant.

Practice transitioning between sections naturally:
- "That's helpful. Let me ask you about the data side of things..."
- "Okay, so moving to governance — do you currently have..."
- "Before we wrap up, I want to understand the budget and decision-making process..."

### Exercise 2B — Roleplay With a Partner

Ask a friend, family member, or colleague to play a fictional client. Give them this brief:

> "You are the COO of a 150-person insurance company. Your employees use Microsoft Copilot, some personal ChatGPT accounts, and a new AI underwriting tool your IT team just rolled out. You are vaguely aware there are privacy regulations but you don't know which ones apply to AI. You are nervous about an upcoming state insurance audit. You have $30,000–$50,000 in budget if the problem is real."

Run the full 60-minute discovery call. Debrief afterward:
- What questions landed well?
- Where did you lose confidence?
- Did you summarize their situation back to them clearly?
- Did you end with clear next steps?

### Exercise 2C — Record Yourself

Do a solo run-through and record it on your phone. Watch it back. Look for:
- Filler words (um, uh, like, you know)
- Speaking too fast when nervous
- Missing a full section of questions
- Not summarizing the client's situation before closing

Repeat until you are smooth and confident.

---

## SECTION 3 — BUILD YOUR FIRST MOCK AI SYSTEMS INVENTORY

### Goal
Practice the most important deliverable from Phase 5 of the client engagement.

### The Exercise

Pick any organization you know — your gym, a local hospital, a retailer, a school. Imagine you are doing an AI Systems Inventory on them.

**Step 1: Brainstorm**
Write down every AI tool that type of organization might use. Think about:
- Customer-facing tools (chatbots, recommendation engines)
- Employee-facing tools (scheduling, performance, hiring)
- Back-office tools (accounting AI, document processing)
- Communication tools (email, meeting transcription)
- Industry-specific tools (medical AI, financial AI)

**Step 2: Build the Spreadsheet**
Create a spreadsheet with these columns:
- Tool Name
- Vendor
- Department Using It
- Data Types Involved
- Is PII Involved? (Yes/No)
- Is a Vendor Agreement in Place? (Yes/No/Unknown)
- Risk Level (Critical/High/Medium/Low)
- Notes

**Step 3: Identify the Risks**
For each tool, write one sentence describing the compliance risk.

**Step 4: Prioritize**
Mark the top 3 tools that need immediate attention and write a 2-sentence explanation of why.

This exercise makes you fast and confident when you run the real process with a client.

---

## SECTION 4 — WRITE A MOCK RISK REPORT

### Goal
Practice writing the document that is the centerpiece of your client engagements.

### The Scenario

You are the AI Compliance Architect for a fictional 200-person law firm called Meridian Legal Group. During your assessment you found:

1. Attorneys are using an AI legal research tool that stores client case data on servers outside the US — potential attorney-client privilege risk and state bar ethics concern
2. The firm's intake team uses an AI chatbot on the website to collect client information — no privacy policy disclosure about AI
3. HR uses an AI tool to scan attorney resumes for lateral hires — no bias testing, potential employment discrimination exposure
4. The managing partner uses a personal AI assistant for drafting emails — client names are sometimes included
5. No AI use policy exists
6. No AI vendor agreements have been reviewed

### Your Assignment

Write a mock Risk Report with these sections:

**1. Executive Summary (1 paragraph)**
Write this for the managing partner. Non-technical. Focus on business and legal exposure.

**2. Critical Findings (bullet list)**
List the top 3 findings. For each include: what you found, why it matters, what regulation it implicates.

**3. Risk Matrix**
Build a simple table: Finding | Likelihood | Impact | Risk Level | Recommended Action

**4. Remediation Roadmap**
List 5 prioritized actions with suggested owners and timelines.

When you finish, review it with this question: "Could a non-technical managing partner read this and understand exactly what the problem is and what to do about it?" If no, rewrite it until the answer is yes.

---

## SECTION 5 — DRAFT A MOCK AI USE POLICY

### Goal
Practice writing the document you will produce in almost every engagement.

### The Scenario

Write an AI Use Policy for a fictional 75-person marketing agency called Spark Creative. They use AI tools for copywriting, image generation, client research, and video editing. They work with clients in healthcare, finance, and consumer goods. They have no current AI policy.

### Your Policy Must Cover

1. **Purpose** — Why this policy exists (1 paragraph)
2. **Scope** — Who this applies to (all employees, contractors, etc.)
3. **Approved AI Tools** — Process for getting a tool approved (you invent a simple approval checklist)
4. **Prohibited Uses** — What employees may never do with AI (list at least 8 specific prohibitions)
5. **Client Data Rules** — Special rules for handling client data in AI tools
6. **Confidential Information** — What counts as confidential and why it cannot go into AI
7. **AI-Generated Content Disclosure** — When and how to disclose AI use to clients
8. **Reporting** — How to report a potential AI-related incident or concern
9. **Violations** — Consequences for violating the policy
10. **Policy Review** — How often the policy will be reviewed and by whom

When you finish, read it out loud. Is the language clear? Would a junior employee understand every rule? Are the prohibited uses specific enough to be enforceable?

---

## SECTION 6 — SIMULATE A FINDINGS PRESENTATION

### Goal
Practice the most important meeting in any engagement — presenting your findings to leadership.

### The Setup

You have completed your AI assessment for Meridian Legal Group from Section 4. You are now presenting your findings to:
- The Managing Partner (non-technical, focused on liability and reputation)
- The IT Director (technical, focused on tools and controls)
- The Office Manager who handles HR (worried about the resume screening finding)

### Practice This Presentation (30 minutes)

**Opening (2 minutes)**
Reassure them. "Here's what I found and here's how we fix it."

**Walk Through Each Finding (20 minutes)**
For each finding:
- State what you found in one sentence
- Explain why it matters in plain language
- State the risk level
- Give the recommended action

**Handle Pushback (5 minutes)**
Practice responding to these reactions:
- Managing partner: "Are you sure this is really a violation? Our attorneys have been using that tool for a year and nothing has happened."
- IT Director: "We can't just turn off tools that attorneys rely on. That'll cause chaos."
- Office Manager: "The resume screener has been great. We've hired 12 people with it. I don't see the problem."

Write out your responses to each before you practice. Your goal: stay calm, cite the regulation specifically, and redirect to the solution.

**Close With Next Steps (3 minutes)**
Tell them exactly what you recommend and what the first step is.

---

## YOUR 30-DAY MASTERY PLAN

| Week | Focus | Goal |
|------|-------|------|
| Week 1 | Regulatory study | Know all 5 regulations well enough to explain to a non-expert |
| Week 2 | Discovery call practice | Complete 3 solo run-throughs + 1 partner roleplay |
| Week 3 | Deliverable building | Complete mock AI Inventory, Risk Report, and AI Use Policy |
| Week 4 | Presentation practice | Run findings presentation solo + with a partner. Record yourself. |

After 30 days: You will have more preparation than most consultants have after their first real client. Walk into that first discovery call with confidence. You have done the work.

---

## CONFIDENCE REMINDERS

- You do not need to know every regulation perfectly. You need to know where to look and how to translate what you find into business language.
- Clients are not testing your credentials. They are testing whether you understand their problem and whether they trust you to solve it.
- The most important skill is listening. The best compliance architects are not the ones who talk the most — they are the ones who hear what the client is really afraid of.
- Every expert was once a beginner. Your first client does not need someone with 10 years of experience. They need someone who cares about getting it right, communicates clearly, and shows up prepared. That is you.
