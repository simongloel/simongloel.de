# simongloel.de

My personal site and blog. Next.js as a static export, articles are Markdown files in `content/writing`.

```
npm install
npm run dev
```

`npm run build` writes the site to `out/`. The Dockerfile builds it and serves `out/` with nginx on port 8080, which is how it runs on [blitz.cloud](https://blitz.cloud).
