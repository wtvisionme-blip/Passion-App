# SOP 3 — The Meeting Recap (Project Management)

**Trigger phrase:** "Run Meeting Recap on [MEETING FOLDER]"

## Purpose
Analyzes multiple transcript files simultaneously, identifies patterns, and writes a professional summary with decisions, next steps, and blockers.

## Inputs Required
| Variable | Example |
|----------|---------|
| `[MEETING FOLDER]` | `~/Meetings/Sprint_22` |
| `[FILENAME.docx]` | `Sprint22_Recap.docx` |
| `[SECTION 1]` | `Decisions` |
| `[SECTION 2]` | `Next Steps` |
| `[SECTION 3]` | `Blockers` |

## Steps
1. Read all transcripts and notes in `[MEETING FOLDER]`
2. Synthesize content across all files
3. Organize output into three sections:
   - **Decisions** — what was agreed upon
   - **Next Steps** — action items with owners
   - **Blockers** — issues blocking progress
4. Write a Word-compatible document named `[FILENAME.docx]`

## Prompt Template
```
Read all transcripts and notes in [MEETING FOLDER].
Synthesize them into a Word doc called [FILENAME.docx].
Use three headings:
[SECTION 1, e.g., Decisions],
[SECTION 2, e.g., Next Steps], and
[SECTION 3, e.g., Blockers].
```

## Output
- A structured `.docx` meeting recap document
