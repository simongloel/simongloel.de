---
title: So läuft diese Seite
description: Ein statischer Next.js-Export, ein Dockerfile in zwei Stufen und meine eigene Hosting-Plattform. Das ganze Setup in fünf Minuten Lesezeit.
order: 1
key: how-this-site-runs
date: 2026-11-20
---

Diese Seite ist ein kleines Next.js-Projekt. Der Code liegt öffentlich auf [github.com/simongloel/simongloel.de](https://github.com/simongloel/simongloel.de) und läuft auf [blitz.cloud](https://blitz.cloud), der Hosting-Plattform, die ich baue. Ich wollte eine Seite, auf der ich schreiben kann, ohne an Server zu denken. So sieht das aus.

## Die Seite

Next.js mit `output: "export"` macht beim Build aus der ganzen Seite einfache HTML-Dateien. Die Artikel sind Markdown-Dateien in `content/writing`, eine pro Sprache. Die Seite liest sie mit `gray-matter` und `marked`, und beim Aufruf läuft auf dem Server nichts.

Es gibt keine Datenbank, kein CMS und kein Tracking. Ein neuer Artikel ist eine neue Datei und ein Push.

## Das Dockerfile

blitz.cloud schreibt ein Dockerfile selbst, wenn ein Repository keins hat. Für eine so kleine Seite habe ich die zehn Zeilen aber lieber im Repo:

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

Die erste Stufe baut die Seite, die zweite enthält nur nginx und den Ordner `out`. Im Image, das am Ende läuft, ist gar kein Node.js mehr. `EXPOSE 8080` sagt blitz.cloud, auf welchen Port der Verkehr gehen soll.

## Sprache

nginx schaut beim ersten Besuch auf `/` in den `Accept-Language`-Header des Browsers und leitet auf `/de/` oder `/en/` weiter. Wer oben umschaltet, bekommt ein Cookie mit der Wahl, und das gewinnt beim nächsten Mal.

## Deployen

Die App ist aus dem GitHub-Repository angelegt. Jeder Push auf `main` baut ein neues Image und stellt es online. Die alte Version läuft weiter, bis die neue antwortet. Ein kaputter Build nimmt die Seite also nicht vom Netz.

## Die Domain

`simongloel.de` liegt bei Cloudflare. Wenn du bei blitz.cloud eine eigene Domain hinzufügst, bekommst du zwei DNS-Einträge: einen TXT-Eintrag, der zeigt, dass dir die Domain gehört, und einen CNAME, der den Namen auf blitz.cloud zeigen lässt. Sobald beide im öffentlichen DNS standen, war die Domain aktiv, das Zertifikat kam mit.

## Was ich ändern würde

Erstmal nichts. Wenn ich irgendwann Kommentare oder einen Newsletter will, ist das eine Datenbank und eine kleine API, und dasselbe Repository kann dahin wachsen, ohne umzuziehen.
