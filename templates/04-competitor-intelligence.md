# SOP 4 — The Competitor Intelligence (Market Research)

**Trigger phrase:** "Run Competitor Research on [INDUSTRY]"

## Purpose
Spawns sub-agents — one to browse the web for data, another to generate a polished PowerPoint — delivering a ready-to-present competitor deck.

## Inputs Required
| Variable | Example |
|----------|---------|
| `[NUMBER]` | `5` |
| `[INDUSTRY]` | `project management software` |
| `[KEY METRIC]` | `Pricing` or `Top Product` |
| Slide count | `5` (one per competitor) |

## Steps
1. Sub-agent 1: Search the web for top `[NUMBER]` competitors in `[INDUSTRY]`
2. Sub-agent 1: Collect `[KEY METRIC]` for each competitor
3. Sub-agent 2: Generate a `[NUMBER]`-slide `.pptx` with consistent layout
4. Each slide covers one competitor with their key metric highlighted

## Prompt Template
```
Search the web for the top [NUMBER] competitors in the [INDUSTRY] space.
Find their [KEY METRIC, e.g., Pricing or Top Product].
Use this data to create a [NUMBER]-slide PowerPoint presentation
with a consistent layout.
```

## Output
- A `.pptx` competitor intelligence deck, one slide per competitor
