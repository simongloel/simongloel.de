---
title: Ein GitHub-Repository auf blitz.cloud deployen
description: GitHub verbinden, Repository auswählen, HTTPS-Adresse bekommen. Mit oder ohne Dockerfile, und jeder Push geht von selbst online.
key: deploy-github-repository-on-blitz-cloud
date: 2026-11-20
---

So stelle ich die meisten meiner eigenen Projekte online. Du verbindest GitHub einmal, wählst ein Repository aus, und blitz.cloud baut es und lässt es unter einer eigenen Adresse laufen. Jeder Push auf den Branch baut eine neue Version.

## Bevor du anfängst

Du brauchst ein kostenloses Konto auf [blitz.cloud](https://dashboard.blitz.cloud/) mit deiner Adresse. Unter dieser Adresse liegen alle deine Apps, zum Beispiel `lena.prod.page`.

Ein Dockerfile brauchst du nicht unbedingt. Hat das Repository eins, baut blitz.cloud damit. Hat es keins, liest ein Sprachmodell die Dateiliste und die Manifeste (`package.json`, `requirements.txt`, `go.mod` und so weiter) und schreibt eins. Schlägt der Build fehl, liest es das Log und versucht es noch einmal, bis zu dreimal. Das geschriebene Dockerfile steht unter dem Build-Log, und du kannst es in dein Repo kopieren, wenn der Build jedes Mal gleich laufen soll.

## Schritt für Schritt

1. Öffne das Dashboard und klick auf "Host something new".
2. Wähl "My own code".
3. Klick auf "Connect GitHub", falls du das noch nicht gemacht hast. GitHub fragt, welche Repositories blitz.cloud lesen darf, du kannst auch einzelne auswählen.
4. Wähl dein Repository aus der Liste. Ein öffentliches Repository geht auch ohne Verbindung, dann fügst du einfach den Link ein.
5. Gib der App einen kurzen Namen. Aus `demo` wird `demo.lena.prod.page`.
6. Klick auf "Build it and put it online".

Der erste Build dauert ein paar Minuten, weil alles einmal heruntergeladen wird. Spätere Builds nehmen die Schichten wieder, die sich nicht geändert haben.

## Ports

Deine App sollte auf dem Port aus der Umgebungsvariable `PORT` lauschen, das ist `8080`. Steht in deinem Dockerfile ein `EXPOSE` mit einem anderen Port, liest blitz.cloud ihn aus dem Image und nimmt den. Eine App, die ewig auf "Starting" steht, lauscht fast immer auf einem anderen Port.

## Updates

Mit verbundenem GitHub baut jeder Push auf den Branch der App eine neue Version und stellt sie online. Die laufende Version bleibt, bis die neue startet. Kommt die neue nicht innerhalb von zehn Minuten hoch, wird die alte zurückgestellt. Die letzten zehn Versionen kannst du im Tab Activity von Hand zurückholen.

## Monorepos

Ist die App nur ein Ordner in einem größeren Repository, etwa `apps/web`, trägst du ihn in den erweiterten Einstellungen unter "Folder to build" ein. [metalltarif.com](https://metalltarif.com) läuft so, gebaut aus einem Ordner eines größeren Repositories.

## Einstellungen und Datenbanken

Umgebungsvariablen setzt du nach dem ersten Deploy im Tab Environment der App. Eine PostgreSQL-, MariaDB- oder Redis-Datenbank legst du auf der Seite Databases an und verbindest sie dort mit der App. Die Zugangsdaten kommen dann als Umgebungsvariablen an.

Alles im Detail steht in der [Doku von blitz.cloud](https://blitz.cloud/de/docs/deploy-from-github/).
