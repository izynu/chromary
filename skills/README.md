# Chromary, Agent Skills

Six production grade skills in the open [`SKILL.md`](https://agent skills.dev) format. Drop them into any skills aware agent (Claude Code, Cursor, Windsurf, custom runtimes) and it instantly gains expertlevel color abilities.

## Install

```bash
# Perproject (recommended, versioned with your repo)
mkdir p .claude/skills
cp r /path/to/chromary/skills/* .claude/skills/

# Global (available in every project)
mkdir p ~/.claude/skills
cp r /path/to/chromary/skills/* ~/.claude/skills/
```

## The lineup

| Skill | Fires when the user says… | Superpower |
||||
| [`palettegenerator`](palettegenerator/SKILL.md) | "give me a palette / brand colors" | Mood → accessible palette in OKLCH, gated by WCAG |
| [`contrastauditor`](contrastauditor/SKILL.md) | "is this accessible? fix contrast" | WCAG 2.1 + APCA audit with minimaldistance autofix |
| [`themebuilder`](themebuilder/SKILL.md) | "build a theme from this color" | One seed → complete 50 to 950 scale + shadcn tokens |
| [`datavizcolormaps`](datavizcolormaps/SKILL.md) | "which colormap for my chart?" | Data type → scientifically correct colormap |
| [`gradientsmith`](gradientsmith/SKILL.md) | "make a gradient" | Gray free perceptual gradients, zero dead zones |
| [`imagepalette`](imagepalette/SKILL.md) | "extract colors from this logo" | Image → role based brand ready tokens |

## How agents find these

The YAML `description` in each `SKILL.md` is a routing instruction: *what it does + when to use it + trigger keywords*. The agent matches the user's request against that line and loads the body **only when relevant** (progressive disclosure → tokenefficient).

## Write your own

Copy any skill folder as a starting point, keep the anatomy (When to use → Workflow → Decision rules → Hard gates → Output format → Example), and read [the Agent Skills guide](../docs/02aiagentskills.md). PRs welcome, see [CONTRIBUTING](../CONTRIBUTING.md#writinganewagentskill).


*Part of [Chromary](../README.md), the ultimate color engineering toolkit.*
