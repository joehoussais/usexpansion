# US Expansion Antiplaybook

A web app helping European founders avoid costly mistakes when expanding to the US market.

## Project Overview

- **Purpose**: Quiz-based tool that profiles European founders and shows them relevant mistakes to avoid based on their company type, stage, and concerns
- **Hosted on**: Netlify (auto-deploys from `main` branch)
- **Stack**: Vanilla HTML/CSS/JS with Supabase backend (optional)

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main page structure, quiz container, results section |
| `app.js` | Core application logic, quiz flow, results rendering |
| `quiz-engine.js` | Quiz state management, conditional questions, profile generation |
| `data.js` | Fallback data: mistakes, tags, archetypes, question options |
| `styles.css` | All styling including pixel art theme, responsive design |
| `config.js` | Configuration settings |
| `tag-manager.js` | Tag management utilities |
| `content-builder.js` | Admin tools for editing content |

## Quiz Flow

1. User answers 6 core questions (business model, vertical, revenue model, funding stage, journey stage, concerns)
2. Conditional questions appear based on answers (e.g., defense tech triggers gov contract questions)
3. Profile generated: Explorer (L1), Pioneer (L2), Builder (L3), Champion (L4)
4. Top 3 relevant mistakes shown based on tag matching
5. Special warnings for defense tech / regulated industries

## Styling Notes

- **Color scheme**: Dark blue/teal primary, red accent
- **Font**: "Press Start 2P" for pixel text, "Inter" for body
- **Theme**: Retro pixel art / gaming aesthetic
- CSS variables defined in `:root` at top of `styles.css`

## Common Tasks

### Fixing quiz display issues
- Options grid: `styles.css` lines 767-777
- Option buttons: `styles.css` lines 779-845
- Results container: `styles.css` lines 847-1042

### Modifying quiz questions
- Questions defined in `quiz-engine.js` `loadFallbackData()` method (line 85+)
- Options for each question in same method

### Updating mistakes
- Mistakes data in `data.js` `mistakesData` array (line 60+)
- Each mistake has: id, title, icon, category, cost, preview, tags, tagWeights, content

### Results display
- `showDynamicResults()` in `app.js` (line 467+)
- Profile card rendering: `renderProfile()` in `app.js`
- Mistakes rendering: `renderTopMistakes()` in `app.js`

## Responsive Breakpoints

- 900px: Share container stacks
- 768px: Quiz layout stacks, profile header stacks
- 480px: Single column options, mobile-optimized results
