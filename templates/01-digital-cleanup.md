# SOP 1 — The Digital Cleanup (File Management)

**Trigger phrase:** "Run Digital Cleanup on [FOLDER]"

## Purpose
Acts as a digital intern to physically organize a messy desktop or downloads folder — scanning, moving, and renaming files automatically.

## Inputs Required
| Variable | Example |
|----------|---------|
| `[FOLDER NAME]` | `~/Downloads` |
| `[NEW FOLDER NAME]` | `Work_Q1_2024` |
| `[TOPIC/PROJECT]` | `invoices` |
| `[NAME FORMAT]` | `Date_FileName` (e.g. `2024-01-15_Invoice.pdf`) |

## Steps
1. Scan all files in `[FOLDER NAME]`
2. Create a new folder named `[NEW FOLDER NAME]`
3. Find every file related to `[TOPIC/PROJECT]` and move it to the new folder
4. Rename all moved files to `[NAME FORMAT]`
5. Write a `Summary.txt` listing every file moved and its new name

## Prompt Template
```
Scan my [FOLDER NAME]. Create a new folder named [NEW FOLDER NAME].
Find every file related to [TOPIC/PROJECT], move them there,
and rename them all to [NAME FORMAT, e.g., Date_FileName].
Finally, write a Summary.txt listing exactly what you moved.
```

## Output
- Reorganized folder with consistently named files
- `Summary.txt` change log
