# SOP 2 — The Receipt-to-Spreadsheet (Accounting)

**Trigger phrase:** "Run Receipt Scan on [FOLDER WITH RECEIPTS]"

## Purpose
Uses Vision to read receipts and Python to build a functional, formula-ready spreadsheet — no manual data entry needed.

## Inputs Required
| Variable | Example |
|----------|---------|
| `[FOLDER WITH RECEIPTS]` | `~/Documents/Receipts_March` |
| `[DATA POINTS]` | `Vendor, Date, Total` |
| `[FILENAME.xlsx]` | `March_Expenses.xlsx` |

## Steps
1. Go through every file in `[FOLDER WITH RECEIPTS]`
2. Use Vision to "read" each receipt image or PDF
3. Extract `[DATA POINTS]` from each receipt
4. Create a new Excel file named `[FILENAME.xlsx]` with one column per data point
5. Add a `SUM` formula at the bottom of the Total column

## Prompt Template
```
Go through every file in [FOLDER WITH RECEIPTS].
Extract the [DATA POINTS, e.g., Vendor, Date, Total].
Create a new Excel file named [FILENAME.xlsx] with these columns
and add a total sum formula at the bottom.
```

## Output
- A formula-ready `.xlsx` spreadsheet with all receipt data extracted
