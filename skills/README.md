# Chromary, Agent Skills

Six production grade skills in the open [`SKILL.md`](https://agent skills.dev) format. Drop them into any skills aware agent (Claude Code, Cursor, Windsurf, custom runtimes) and it instantly gains expert-level color abilities.

## Install

```bash
# Per-project (recommended, versioned with your repo)
mkdir -p .claude/skills
cp -r /path/to/chromary/skills/* .claude/skills/

# Global (available in every project)
mkdir -p ~/.claude/skills
cp -r /path/to/chromary/skills/* ~/.claude/skills/
```

## The lineup

| Skill | Fires when the user says… | Superpower |
|---|---|---|
| [`palette-generator`](palette-generator/SKILL.md) | "give me a palette / brand colors" | Mood → accessible palette in OKLCH, gated by WCAG |
| [`contrast-auditor`](contrast-auditor/SKILL.md) | "is this accessible? fix contrast" | WCAG 2.1 + APCA audit with minimal-distance auto-fix |
| [`theme-builder`](theme-builder/SKILL.md) | "build a theme from this color" | One seed → complete 50 to 950 scale + shadcn tokens |
| [`dataviz-colormaps`](dataviz-colormaps/SKILL.md) | "which colormap for my chart?" | Data type → scientifically correct colormap |
| [`gradient-smith`](gradient-smith/SKILL.md) | "make a gradient" | Gray free perceptual gradients, zero dead zones |
| [`image-palette`](image-palette/SKILL.md) | "extract colors from this logo" | Image → role based brand ready tokens |

## How agents find these

The YAML `description` in each `SKILL.md` is a routing instruction: *what it does + when to use it + trigger keywords*. The agent matches the user's request against that line and loads the body **only when relevant** (progressive disclosure → token-efficient).

## Write your own

Copy any skill folder as a starting point, keep the anatomy (When to use → Workflow → Decision rules → Hard gates → Output format → Example), and read [the Agent Skills guide](../docs/02-ai-agent-skills.md). PRs welcome, see [CONTRIBUTING](../CONTRIBUTING.md#-writing-a-new-agent-skill).

---
*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
