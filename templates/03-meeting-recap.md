# SOP 3 — The Meeting Recap (Project Management)

**Trigger phrase:** "Run Meeting Recap on [MEETING FOLDER]"

## Purpose
Analyzes multiple transcript files simultaneously, identifies patterns, and writes a professional summary — saved in a new folder automatically named with today's date.

## Inputs Required
| Variable | Example |
|----------|---------|
| `[MEETING FOLDER]` | `~/Meetings/Sprint_22` |

## Steps
1. Read all transcripts and notes in `[MEETING FOLDER]`
2. Get today's date and format it as `MM-DD-YYYY`
3. Create a new output folder named `Meeting_Recap_MM-DD-YYYY` (e.g. `Meeting_Recap_05-06-2026`)
4. Synthesize content across all files into three sections:
   - **Decisions** — what was agreed upon
   - **Next Steps** — action items with owners
   - **Blockers** — issues blocking progress
5. Save the recap as `Meeting_Recap_MM-DD-YYYY.docx` inside the new dated folder

## Prompt Template
```
Read all transcripts and notes in [MEETING FOLDER].
Get today's date and create a new folder named Meeting_Recap_[MM-DD-YYYY].
Synthesize the notes into a Word doc with three headings:
Decisions, Next Steps, and Blockers.
Save it inside the new dated folder.
```

## Output
- A new folder: `Meeting_Recap_05-06-2026` (date auto-filled)
- A structured `.docx` recap inside that folder
