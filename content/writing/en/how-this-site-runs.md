---
title: How this site runs
description: A static Next.js export, a two-stage Dockerfile and my own hosting platform. The whole setup in five minutes of reading.
order: 1
key: how-this-site-runs
date: 2026-11-20
---

This site is a small Next.js project. The code is public at [github.com/simongloel/simongloel.de](https://github.com/simongloel/simongloel.de), and it runs on [blitz.cloud](https://blitz.cloud), the hosting platform I build. I wanted a page I can write on without thinking about servers, so here is what that looks like.

## The site

Next.js with `output: "export"` turns the whole site into plain HTML files at build time. Articles are Markdown files in `content/writing`, one per language. A page reads them with `gray-matter` and `marked`, and nothing runs on a server when you open it.

There's no database, no CMS and no analytics. A new article is a new file and a push.

## The Dockerfile

blitz.cloud can write a Dockerfile itself when a repository has none, but for a site this small I'd rather have the ten lines in the repo:

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 8080
```

The first stage builds the site, the second one only carries nginx and the `out` folder. The image that runs has no Node.js in it at all. `EXPOSE 8080` tells blitz.cloud which port to send traffic to.

## Language

On the first visit to `/`, nginx reads the browser's `Accept-Language` header and redirects to `/en/` or `/de/`. If you switch at the top, a cookie keeps your choice, and that wins next time.

## Deploying it

The app was created from the GitHub repository, so every push to `main` builds a new image and puts it online. The old version keeps running until the new one answers, so a broken build never takes the site down.

## The domain

`simongloel.de` sits in Cloudflare. blitz.cloud gives you two DNS records when you add your own domain: a TXT record that proves you own it, and a CNAME that points the name to blitz.cloud. Once both were in public DNS, the domain showed up as active and the certificate came with it.

## What I'd change

Probably nothing for a while. If I ever want comments or a newsletter, that's a database and a small API, and the same repository can grow into that without moving anywhere.
