---
title: Ein GitHub-Repository auf blitz.cloud deployen
description: GitHub verbinden, Repository auswählen, HTTPS-Adresse bekommen. Das geht mit oder ohne Dockerfile, und jeder Push geht von selbst online.
key: deploy-github-repository-on-blitz-cloud
date: 2026-11-20
---

So stelle ich die meisten meiner eigenen Projekte online. Du verbindest einmal GitHub und suchst dir ein Repository aus. blitz.cloud baut es dann und lässt es unter einer eigenen Adresse laufen. Mit jedem Push auf den Branch kommt eine neue Version.

## Bevor du loslegst

Du brauchst ein kostenloses Konto auf [blitz.cloud](https://dashboard.blitz.cloud/) mit deiner Adresse. Unter der laufen dann alle deine Apps, zum Beispiel `lena.prod.page`.

Ein Dockerfile brauchst du nicht unbedingt. Hat dein Repository eins, baut blitz.cloud damit. Wenn nicht, liest ein Sprachmodell die Dateiliste und die Manifeste (`package.json`, `requirements.txt`, `go.mod` und so weiter) und schreibt dir eins. Schlägt der Build fehl, schaut es ins Log und probiert es noch mal, bis zu dreimal. Das fertige Dockerfile steht unter dem Build-Log. Kopier es ruhig in dein Repo, dann läuft der Build jedes Mal gleich.

## Schritt für Schritt

1. Öffne das Dashboard und klick auf „Host something new“.
2. Wähl „My own code“.
3. Falls noch nicht passiert, klick auf „Connect GitHub“. GitHub fragt dann, welche Repositories blitz.cloud lesen darf. Du kannst auch nur einzelne freigeben.
4. Wähl dein Repository aus der Liste. Ein öffentliches Repository geht auch ohne Verbindung, dann fügst du einfach den Link ein.
5. Gib der App einen kurzen Namen. Aus `demo` wird `demo.lena.prod.page`.
6. Klick auf „Build it and put it online“.

Der erste Build dauert ein paar Minuten, weil erst mal alles heruntergeladen wird. Danach geht's schneller, weil spätere Builds die Schichten wiederverwenden, die sich nicht geändert haben.

## Ports

Deine App sollte auf dem Port aus der Umgebungsvariable `PORT` lauschen, und das ist `8080`. Steht in deinem Dockerfile ein `EXPOSE` mit einem anderen Port, liest blitz.cloud den aus dem Image und nimmt ihn. Hängt eine App ewig auf „Starting“, lauscht sie fast immer auf dem falschen Port.

## Updates

Ist GitHub verbunden, baut jeder Push auf den Branch der App eine neue Version und stellt sie online. Die laufende Version bleibt so lange, bis die neue startet. Kommt die neue nicht innerhalb von zehn Minuten hoch, wird die alte wiederhergestellt. Die letzten zehn Versionen kannst du im Tab Activity auch von Hand zurückholen.

## Monorepos

Ist die App nur ein Ordner in einem größeren Repository, etwa `apps/web`, trägst du den in den erweiterten Einstellungen unter „Folder to build“ ein. [metalltarif.com](https://metalltarif.com) läuft zum Beispiel so, gebaut aus einem Ordner in einem größeren Repository.

## Einstellungen und Datenbanken

Umgebungsvariablen setzt du nach dem ersten Deploy im Tab Environment der App. Eine PostgreSQL-, MariaDB- oder Redis-Datenbank legst du auf der Seite Databases an und verbindest sie dort mit deiner App. Die Zugangsdaten landen dann als Umgebungsvariablen in der App.

Alles im Detail findest du in der [Doku von blitz.cloud](https://blitz.cloud/de/docs/deploy-from-github/).
