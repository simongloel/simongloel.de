---
title: So läuft diese Seite
description: Ein statischer Next.js-Export, ein Dockerfile mit zwei Stufen und meine eigene Hosting-Plattform. Das ganze Setup, in fünf Minuten gelesen.
order: 1
key: how-this-site-runs
date: 2026-11-20
---

Diese Seite ist ein kleines Next.js-Projekt. Den Code findest du öffentlich auf [github.com/simongloel/simongloel.de](https://github.com/simongloel/simongloel.de), und laufen tut sie auf [blitz.cloud](https://blitz.cloud), der Hosting-Plattform, die ich baue. Ich wollte eine Seite, auf der ich einfach schreiben kann, ohne mich um Server zu kümmern. Das ist dabei rausgekommen.

## Die Seite

Mit `output: "export"` macht Next.js beim Build aus der ganzen Seite normale HTML-Dateien. Die Artikel sind Markdown-Dateien in `content/writing`, eine pro Sprache. Gelesen werden sie mit `gray-matter` und `marked`. Wenn du die Seite aufrufst, läuft auf dem Server also gar nichts mehr.

Es gibt keine Datenbank, kein CMS und kein Tracking. Ein neuer Artikel ist eine neue Datei und ein Push, mehr nicht.

## Das Dockerfile

Hat ein Repository kein Dockerfile, schreibt blitz.cloud selbst eins. Bei so einer kleinen Seite hab ich die zehn Zeilen aber lieber selbst im Repo:

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

Die erste Stufe baut die Seite, in der zweiten landen nur nginx und der Ordner `out`. Im fertigen Image steckt also gar kein Node.js mehr. Über `EXPOSE 8080` weiß blitz.cloud, an welchen Port die Anfragen gehen.

## Sprache

Beim ersten Besuch auf `/` schaut nginx in den `Accept-Language`-Header deines Browsers und schickt dich auf `/de/` oder `/en/`. Schaltest du oben die Sprache um, merkt sich ein Cookie deine Wahl, und die gilt dann beim nächsten Mal.

## Deployen

Die App hab ich direkt aus dem GitHub-Repository angelegt. Jeder Push auf `main` baut ein neues Image und stellt es online. Die alte Version läuft so lange weiter, bis die neue antwortet. Ein kaputter Build nimmt die Seite also nicht vom Netz.

## Die Domain

`simongloel.de` liegt bei Cloudflare. Wenn du bei blitz.cloud eine eigene Domain hinzufügst, bekommst du zwei DNS-Einträge: einen TXT-Eintrag als Nachweis, dass dir die Domain gehört, und einen CNAME, der auf blitz.cloud zeigt. Sobald beide im öffentlichen DNS zu sehen waren, war die Domain aktiv, und das Zertifikat kam gleich mit.

## Was ich ändern würde

Erst mal nichts. Will ich irgendwann Kommentare oder einen Newsletter, sind das halt eine Datenbank und eine kleine API. Dafür kann dasselbe Repository einfach weiterwachsen, umziehen muss ich nicht.
