# The AI Marketing BS Index

**[👉 Try it live](https://yujqiao.github.io/bs-index/)**

Paste AI marketing text and get an instant BS score. Inspired by [Bastian Rieck's AI Marketing BS Index](https://bastian.rieck.me/blog/2026/bs/) and [John Baez's Crackpot Index](https://math.ucr.edu/home/baez/crackpot.html).

All scoring is regex-based pattern matching — no LLM, no server. Everything runs in your browser.

## Scoring Rubric

Your text starts at **5 points** (benefit of the doubt), then:

| Rule | Points | Mode |
|------|--------|------|
| No citation for invention claims | 10 | once |
| Misused scientific terms | 10 | per unique term |
| Motte-and-bailey hedging | 20 | per match |
| Pseudo-profound paragraph endings | 20 | per match |
| Nature / universe claims | 20 | per match |
| Emergent properties (unwarranted) | 20 | per match |
| Ivy League namedropping | 20 | per match |
| No falsifiable claims anywhere | 30 | once |
| Unverifiable collaborations | 40 | per match |

See the **Methodology** modal on the site for the exact patterns each rule matches.

## Verdict Scale

| Score | Verdict |
|-------|---------|
| ≤ 0 | ✅ Seems Legit |
| 1–30 | 🤔 Mild BS Detected |
| 31–70 | ⚠️ Significant BS |
| 71–120 | 🚨 Major BS Alert |
| > 120 | 🔥 Weapons-Grade BS |

## Stack

React · TypeScript · Tailwind CSS v4 · shadcn/ui · Vite

## Development

```bash
pnpm install
pnpm dev          # start dev server
pnpm test         # run 72 unit tests
pnpm build        # production build
```

## License

MIT
