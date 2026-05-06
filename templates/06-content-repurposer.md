# SOP 6 — The Content Repurposer (Social Media)

**Trigger phrase:** "Run Content Repurposer on [FOLDER] for [PLATFORM]"

## Purpose
Analyzes video/audio, clips the best 60-second segment, and generates matching platform copy — turning long-form content into social posts.

## Inputs Required
| Variable | Example |
|----------|---------|
| `[FOLDER]` | `~/Videos/Podcast_Episodes` |
| `[FILENAME.mp4]` | `episode_42.mp4` |
| `[VIBE]` | `energetic` / `insightful` / `funny` |
| `[PLATFORM]` | `LinkedIn` / `X` / `Instagram` |

## Steps
1. Locate `[FILENAME.mp4]` in `[FOLDER]`
2. Analyze the video/audio stream to find the most `[VIBE]` 60-second segment
3. Sub-agent: Clip that segment and save it as a new file in `[FOLDER]`
4. Write a `[PLATFORM]`-optimized post based on the clip content

## Prompt Template
```
In [FOLDER], find the video [FILENAME.mp4].
Find the most [VIBE, e.g., energetic/insightful] 60-second segment
and save it as a new clip. Then, write a [PLATFORM, e.g., LinkedIn/X]
post based on that clip.
```

## Output
- A 60-second video clip saved alongside the source file
- A platform-ready post (caption + relevant hashtags)
