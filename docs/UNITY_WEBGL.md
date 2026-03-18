# Unity WebGL Games (Static Hosting)

This project can host Unity WebGL builds without a backend. Unity builds are static files.

## Folder structure

Place each Unity build in its own folder under:

`public/games/<game-slug>/`

Example:

`public/games/nebula-rush/`

Inside that folder Unity will generate:
- `index.html`
- `Build/`
- `TemplateData/`

So you should end up with:

```
public/games/nebula-rush/index.html
public/games/nebula-rush/Build/*
public/games/nebula-rush/TemplateData/*
```

## How to build in Unity

1. File > Build Settings
2. Select **WebGL**
3. Build to `public/games/<game-slug>/`

## How to link from the site

In `public/data/projects.csv`, set the `play` link to the game URL:

```
/play/games/<game-slug>/index.html
```

Example:

```
/play/games/nebula-rush/index.html
```

## Optional: Cleaner URLs

If you want `/play/<game-slug>` to work without `/index.html`, we can add a Vercel rewrite.
Let me know and I can set that up.