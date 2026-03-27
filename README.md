# IITK Game Development Club Website

Modern, dark-themed, responsive website for the Game Development Club at IIT Kanpur.

## Tech Stack

- React
- Vite
- TailwindCSS
- PapaParse for CSV-driven content
- Deploy-ready for Vercel

## Project Structure

```txt
src/
  components/
  pages/
  utils/
public/
  data/
  images/
  posts/
  games/
docs/
scripts/
```

## Features Implemented

- Dark gaming-inspired professional UI
- Card-based responsive layout
- Navbar with links to all pages
- Footer with social links
- Smooth hover transitions
- Lazy-loaded images (`loading="lazy"`)
- CSV-driven dynamic pages
- Markdown blog section (`JustInsights`) from `/public/posts`

## Pages

- Home
- Games
- Team
- RenderMondays
- Events
- Learning
- Blog (`JustInsights`)
- Gallery
- Sponsors
- Contact

## CSV Data Files

All editable content lives in `public/data/`.

### `team.csv`

```csv
name,role,photo,linkedin,github
```

### `games.csv`

```csv
title,description,image,github,play
```

### `rendermondays.csv`

```csv
title,artist,image,week
```

### `events.csv`

```csv
title,date,description,image
```

## How To Edit Team Members (No Code Changes)

1. Open `public/data/team.csv`.
2. Add or update rows using the format:

```csv
name,role,photo,linkedin,github
```

3. Commit and push to GitHub.
4. Vercel will redeploy, and Team page updates automatically.

## How To Add New Games

1. Open `public/data/games.csv`.
2. Add a new row with:

```csv
title,description,image,github,play
```

3. Ensure `image` points to a valid path inside `public/images/` or a public URL.
4. Commit and push changes.

## Blog Posts (`JustInsights`)

- Add markdown files to `public/posts/`.
- Register each post in `public/posts/index.json` with `slug`, `title`, and `date`.

Example:

```json
{
  "slug": "my-new-post",
  "title": "My New Post",
  "date": "2026-03-08"
}
```

## Hosting Unity WebGL Games

No backend is required. Unity WebGL builds can be hosted statically.

See full instructions in:

`docs/UNITY_WEBGL.md`

## Local Development

```bash
npm install
npm run dev
```

## CSV Parser Script (PapaParse)

A script is included at `scripts/parseCsv.mjs`.

Run:

```bash
npm run parse:csv -- public/data/team.csv
```

This parses and prints the CSV as formatted JSON.

## Deploying On Vercel

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Vercel auto-detects Vite settings.
4. Keep defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy.

`vercel.json` is included for SPA route rewrites so all routes resolve correctly.

## Notes

- Keep CSV headers unchanged.
- Dates in `events.csv` should use ISO format (`YYYY-MM-DD`).
- Content can be fully managed from GitHub by editing files under `public/data` and `public/posts`.
- Add the official club logo as `public/images/studio-centauri-logo.png`. The navbar will display it automatically.