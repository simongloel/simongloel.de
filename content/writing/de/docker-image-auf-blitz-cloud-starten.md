---
title: Ein Docker-Image auf blitz.cloud starten
description: Jedes öffentliche amd64-Image von Docker Hub, ghcr.io oder Quay, mit HTTPS davor. Wie blitz.cloud den Port findet und was bei Updates passiert.
key: deploy-a-docker-image
date: 2026-11-20
---

Gibt es für das, was du laufen lassen willst, schon ein Image, brauchst du gar kein Repository. blitz.cloud startet jedes öffentliche Image für `linux/amd64`, egal ob von Docker Hub, `ghcr.io`, Quay oder einer anderen öffentlichen Registry, und setzt HTTPS davor.

## Schritt für Schritt

1. Klick im [Dashboard](https://dashboard.blitz.cloud/) auf „Host something new“.
2. Wähl „An app from Docker Hub“ und tipp einen Teil des Namens ein, zum Beispiel `uptime-kuma`. Bei einer anderen Registry gibst du den vollen Namen ein, etwa `ghcr.io/du/deineapp`.
3. Such dir einen Tag aus. Die Liste zeigt die echten Tags des Images und hat den schon ausgewählt, der neuen Releases folgt.
4. Gib der App einen kurzen Namen, daraus wird die Subdomain.
5. Schau kurz drüber, was erkannt wurde, und klick auf „Put it online“.

## Wie der Port gefunden wird

Das entscheidet das Image. blitz.cloud liest die Ports, die es per `EXPOSE` angibt. Sind es mehrere, nimmt es in dieser Reihenfolge 80, 8080, 3000, 8000 und 5000. Nur wenn ein Image gar keinen Port angibt, schlägt ein Sprachmodell einen vor, und weiß das auch nichts, wird es eben 80. Unter „Advanced settings“ kannst du den Port auch selbst setzen.

Genauso findet blitz.cloud Volumes und die Namen von Umgebungsvariablen. Braucht das Image eine Datenbank, kann blitz.cloud gleich eine anlegen und die bekannten Variablen füllen. Kennt es die Namen nicht, setzt es `DATABASE_URL`.

## Root ist kein Problem

Jede App läuft in ihrer eigenen gVisor-Sandbox. Startet ein Image als root, ist es also root in dieser Sandbox und nirgendwo sonst. Viele Images auf Docker Hub erwarten nun mal root und gehen ohne auf seltsame Weise kaputt. So musst du sie nicht extra mit einem anderen Benutzer neu bauen.

## Updates

Bei einem wandernden Tag wie `latest` schaut blitz.cloud jede Nacht gegen 4:00 Uhr UTC nach, wohin der Tag gerade zeigt. Hat er sich bewegt, geht die neue Version online, fest auf ihren Digest gepinnt. Startet sie nicht innerhalb von zehn Minuten, kommt die alte Version zurück, und automatische Updates bleiben für diese App aus, bis du sie wieder einschaltest.

## Wenn sie nicht hochkommt

- Hängt auf „Starting“: Die App lauscht auf einem anderen Port als dem gewählten. Ändere ihn im Tab Settings.
- Startet immer wieder neu: Die letzten Logzeilen stehen auf der Seite der App. Meistens fehlt eine Umgebungsvariable.
- Startet gar nicht: Schau nach, ob es das Image überhaupt für amd64 gibt. Ein reines arm64-Image läuft nicht.

Mehr Details findest du in der [Doku zu Docker-Images](https://blitz.cloud/de/docs/deploy-docker-image/).
