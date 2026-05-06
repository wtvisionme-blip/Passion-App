# SOP 5 — The Inbox Watchdog (Email Routine)

**Trigger phrase:** "Run Inbox Watchdog for [NAME/COMPANY] about [TOPIC]"

## Purpose
A "set and forget" routine — Claude checks email on a timer and has the work waiting when you log in.

## Inputs Required
| Variable | Example |
|----------|---------|
| `[TIME/DAY]` | `every weekday at 8am` |
| `[NAME/COMPANY]` | `Acme Corp` |
| `[SPECIFIC TOPIC]` | `contract renewal` |

## Steps
1. Schedule a recurring check at `[TIME/DAY]`
2. Search Gmail for unread emails from `[NAME/COMPANY]`
3. Summarize all matching emails in a bullet list
4. If any email is about `[SPECIFIC TOPIC]`, draft a polite reply
5. Save the draft reply to the Drafts folder

## Prompt Template
```
/schedule every [TIME/DAY]** "Search my Gmail for unread emails
from [NAME/COMPANY]. Summarise them in a bulleted list.
If the email is about **[SPECIFIC TOPIC], draft a polite
reply and save it to my drafts folder."
```

## Output
- Bullet-point inbox summary (delivered at scheduled time)
- Draft reply in Gmail Drafts (when topic match is found)

## Notes
- Requires Gmail connection via Zapier
- Schedule persists until manually disabled
