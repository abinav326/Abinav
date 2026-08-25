# Abitha Construction Website

A mobile-first, professional static website built with Vite. It is ready for GitHub + Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Add project images

Put images in `src/projects/` using `.jpg`, `.jpeg`, `.png`, or `.webp`.

The gallery automatically discovers image files at build time. You do **not** need to edit JavaScript to add a new photo.

Recommended naming:
- `modern-home-palappuram.jpg`
- `villa-ottapalam.webp`
- `renovation-project-01.jpg`

The filename becomes the project title, with `-` and `_` converted to spaces.

## Vercel

Import the GitHub repository into Vercel. Vercel should detect Vite automatically.

Build command: `npm run build`
Output directory: `dist`
