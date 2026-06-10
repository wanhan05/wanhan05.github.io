# Wanhan — Portfolio Site

Static site. No build step, no dependencies. Open `index.html` in a browser or push to GitHub Pages.

## File structure

```
/
├── index.html          — shell: loads CSS + JS, defines mount points
│
├── css/
│   ├── tokens.css      — ALL design tokens (colors, fonts, spacing)
│   ├── base.css        — reset, shared layout, animations, footer
│   ├── nav.css         — navigation bar
│   ├── hero.css        — hero section
│   ├── experience.css  — timeline styles
│   ├── projects.css    — slider + project cards
│   ├── writing.css     — writing list + reading sidebar
│   └── about.css       — about section + stat cards
│
└── js/
    ├── utils.js        — mount(), initReveal(), initNavSpy()
    ├── nav.js          — renders nav HTML
    ├── hero.js         — renders hero HTML
    ├── experience.js   — EXPERIENCE data array + renders timeline
    ├── slider.js       — drag/swipe/dot slider logic (no data)
    ├── projects.js     — PROJECTS data array + renders slider cards
    ├── writing.js      — WRITING + READING data arrays + renders section
    ├── about.js        — ABOUT_STATS data + renders about section
    └── main.js         — calls all render functions + inits behaviours
```

## How to update content

**Add a new project**
Open `js/projects.js` → push a new object into the `PROJECTS` array.
```js
{
  title: 'My New Project',
  tags: ['ML', 'Python'],
  summary: 'One paragraph visible on the card.',
  detail: 'Expanded detail shown when clicked.',
}
```

**Add a new experience entry**
Open `js/experience.js` → push into the `EXPERIENCE` array.
Set `concurrent: true` if it overlaps with the previous entry.

**Add a writing piece**
Open `js/writing.js` → push into the `WRITING` array.
Set `link: 'https://...'` once the piece is published — the title becomes a link automatically.

**Add a book to the reading list**
Open `js/writing.js` → push into the `READING` array.

**Change colors or fonts**
Open `css/tokens.css`. All design decisions live there.
The rest of the CSS uses CSS variables — no hunting through files.

## Deploy to GitHub Pages

```bash
# First time
git init
git add .
git commit -m "initial site"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/YOURUSERNAME.github.io.git
git push -u origin main

# Every update
git add .
git commit -m "describe what changed"
git push
```

In GitHub repo Settings → Pages → Source: `main` branch, `/ (root)`.
Site goes live at `https://YOURUSERNAME.github.io` within ~2 minutes.
