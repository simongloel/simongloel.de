---
title: Eine statische Website ohne GitHub online stellen
description: Ein Ordner oder ein ZIP mit einer index.html reicht. Wie du eine fertige Seite zu blitz.cloud hochlädst, wo die Grenzen sind und wie du sie später austauschst.
key: put-a-static-website-online
date: 2026-11-20
---

Nicht jede Seite braucht ein Repository und einen Build. Manchmal hast du einen Ordner mit einer `index.html`, etwas CSS und ein paar Bildern und willst einfach einen Link, den du jemandem schicken kannst. blitz.cloud nimmt so einen Ordner direkt aus dem Browser.

## Hochladen

1. Klick im [Dashboard](https://dashboard.blitz.cloud/) auf "App online stellen" und wähl "Website hochladen".
2. Klick auf "Ordner wählen" oder "ZIP-Datei wählen", oder zieh beides auf die Seite. Ein Ordner wird im Browser gepackt, bevor er hochgeladen wird.
3. Gib der Seite einen Namen. `portfolio` ist dann unter `https://portfolio.deinname.prod.page` online.

Die Seite zeigt jeden Schritt und endet mit dem Link.

## Was du hochlädst

Lad die fertige Seite hoch, also die Dateien, die ein Browser direkt öffnen kann. Die Startseite muss `index.html` heißen.

Hast du die Seite mit Vite, Astro, Hugo oder Next.js als statischen Export gebaut, lädst du den Ausgabeordner hoch und nicht das Projekt. Er heißt meistens `dist`, `build`, `out` oder `public`. Erwischst du aus Versehen das ganze Projekt mit `node_modules`, wird der Upload wegen der Dateianzahl abgelehnt.

Die Grenzen sind 50 MB für das ZIP, 200 MB entpackt und 5.000 Dateien. Videos gehören woanders hin.

## Single-Page-Apps

Eine React-, Vue- oder Svelte-App, die aus einer `index.html` mit Skripten besteht, bekommt auf jeden unbekannten Pfad die `index.html`. Ein Neuladen auf `/settings` funktioniert also. Eine Seite mit echten eigenen Seiten antwortet auf eine fehlende Seite mit ihrer `404.html`, wenn es eine gibt.

## Eine neue Version

Öffne die Seite im Dashboard, geh in die Einstellungen und klick auf "Neue Version hochladen". Die alte Version bleibt online, bis die neue fertig ist, und die Adresse ändert sich nicht.

Die hochgeladenen Dateien werden einen Tag lang aufbewahrt. Die Seite bleibt so lange online, wie du willst, aber heb dir die Dateien selbst auf.

## Wenn es mehr als Dateien sein soll

In einem Upload läuft nichts auf dem Server, PHP oder eine `server.js` werden also nicht ausgeführt. Sobald eine Seite eine Datenbank braucht oder bei jedem Push neu gebaut werden soll, würde ich sie auf GitHub legen und von dort deployen. Wie das geht, steht in [Ein GitHub-Repository auf blitz.cloud deployen](/de/writing/github-repository-auf-blitz-cloud-deployen/).
