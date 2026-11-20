---
title: Ein Docker-Image auf blitz.cloud starten
description: Jedes öffentliche amd64-Image von Docker Hub, ghcr.io oder Quay, mit HTTPS davor. Wie blitz.cloud den Port findet und was bei Updates passiert.
key: deploy-a-docker-image
date: 2026-11-20
---

Wenn es für das, was du laufen lassen willst, schon ein Image gibt, brauchst du gar kein Repository. blitz.cloud startet jedes öffentliche Image für `linux/amd64` von Docker Hub, `ghcr.io`, Quay oder einer anderen öffentlichen Registry und setzt HTTPS davor.

## Schritt für Schritt

1. Klick im [Dashboard](https://dashboard.blitz.cloud/) auf "Host something new".
2. Wähl "An app from Docker Hub" und tipp einen Teil des Namens ein, zum Beispiel `uptime-kuma`. Für eine andere Registry gibst du den vollen Namen ein, etwa `ghcr.io/du/deineapp`.
3. Wähl einen Tag. Die Liste zeigt die echten Tags des Images und wählt den vor, der neuen Releases folgt.
4. Gib der App einen kurzen Namen, daraus wird die Subdomain.
5. Prüf, was erkannt wurde, und klick auf "Put it online".

## Wie der Port gefunden wird

Das Image entscheidet. blitz.cloud liest die Ports, die es mit `EXPOSE` angibt. Bei mehreren nimmt es in dieser Reihenfolge 80, 8080, 3000, 8000 und 5000. Nur wenn ein Image gar keinen angibt, schlägt ein Sprachmodell einen vor, und wenn nichts bekannt ist, wird es 80. Unter "Advanced settings" kannst du den Port selbst setzen.

Auf dieselbe Weise findet blitz.cloud Volumes und die Namen von Umgebungsvariablen. Braucht das Image eine Datenbank, kann blitz.cloud eine anlegen und die bekannten Variablen füllen, oder `DATABASE_URL`, wenn die Namen unbekannt sind.

## Root ist in Ordnung

Jede App läuft in ihrer eigenen gVisor-Sandbox. Ein Image, das als root startet, läuft also als root in dieser Sandbox und nirgends sonst. Viele Images auf Docker Hub erwarten root und gehen ohne auf verwirrende Weise kaputt, so musst du sie nicht mit einem anderen Benutzer neu bauen.

## Updates

Bei einem wandernden Tag wie `latest` schaut blitz.cloud jede Nacht gegen 4:00 UTC, wohin der Tag zeigt. Hat er sich bewegt, geht die neue Version online, festgenagelt auf ihren Digest. Startet sie nicht innerhalb von zehn Minuten, kommt die alte Version zurück, und automatische Updates bleiben für diese App aus, bis du sie wieder einschaltest.

## Wenn sie nicht hochkommt

- Bleibt auf "Starting" hängen: Die App lauscht auf einem anderen Port als dem gewählten. Ändere ihn im Tab Settings.
- Startet immer wieder neu: Die letzten Log-Zeilen stehen auf der Seite der App. Meistens fehlt eine Umgebungsvariable.
- Startet gar nicht: Prüf, ob es das Image für amd64 gibt. Ein Image nur für arm64 läuft nicht.

Mehr Details stehen in der [Doku zu Docker-Images](https://blitz.cloud/de/docs/deploy-docker-image/).
