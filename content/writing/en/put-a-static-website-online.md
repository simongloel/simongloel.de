---
title: Put a static website online without GitHub
description: A folder or ZIP with an index.html is enough. How to upload a finished site to blitz.cloud, what the limits are and how to replace it later.
key: put-a-static-website-online
date: 2026-11-20
---

Not every site needs a repository and a build. Sometimes you have a folder with an `index.html`, some CSS and a few pictures, and you want a link to send to someone. blitz.cloud takes that folder directly from the browser.

## Upload it

1. In the [dashboard](https://dashboard.blitz.cloud/), click "Put an app online" and choose "Upload a website".
2. Choose a folder or a ZIP file, or drop it onto the page. A folder is packed in the browser before it's sent.
3. Give the site a name. `portfolio` is online at `https://portfolio.yourname.prod.page`.

The page shows each step and ends with the link.

## What to upload

Upload the finished site, the files a browser can open as they are. The start page has to be called `index.html`.

If you built the site with Vite, Astro, Hugo or Next.js as a static export, upload the output folder and not the project. It's usually called `dist`, `build`, `out` or `public`. If you choose the whole project with its `node_modules` by accident, the upload is refused because of the file count.

The limits are 50 MB for the ZIP, 200 MB unpacked and 5,000 files. Videos belong somewhere else.

## Single-page apps

A React, Vue or Svelte app that is one `index.html` with scripts gets every unknown path answered with `index.html`, so a reload on `/settings` still works. A site with real pages of its own answers a missing page with its `404.html` if there is one.

## A new version

Open the site in the dashboard, go to Settings and click "Upload new version". The old version stays online until the new one is ready, and the address doesn't change.

Uploaded files are kept for one day. The site stays online as long as you want, but keep your own copy of the files.

## When it should be more than files

Nothing in an upload runs on the server, so PHP or a `server.js` won't execute. As soon as a site needs a database or should rebuild on every push, I'd move it to GitHub and deploy it from there. I wrote down how in [Deploy a GitHub repository on blitz.cloud](/en/writing/deploy-github-repository-on-blitz-cloud/).
