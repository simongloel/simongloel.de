---
title: Eine statische Website ohne GitHub online stellen
description: Ein Ordner oder ein ZIP mit einer index.html reicht. Wie du eine fertige Seite auf blitz.cloud hochlädst, wo die Grenzen liegen und wie du sie später austauschst.
key: put-a-static-website-online
date: 2026-11-20
---

Nicht jede Seite braucht ein Repository und einen Build. Manchmal hast du halt einen Ordner mit einer `index.html`, etwas CSS und ein paar Bildern und willst einfach einen Link, den du jemandem schicken kannst. So einen Ordner nimmt blitz.cloud direkt im Browser an.

## Hochladen

1. Klick im [Dashboard](https://dashboard.blitz.cloud/) auf „App online stellen“ und wähl „Website hochladen“.
2. Klick auf „Ordner wählen“ oder „ZIP-Datei wählen“, oder zieh das eine oder andere einfach auf die Seite. Einen Ordner packt der Browser vor dem Hochladen selbst.
3. Gib der Seite einen Namen. Mit `portfolio` ist sie dann unter `https://portfolio.deinname.prod.page` online.

Du siehst jeden Schritt, und am Ende bekommst du den Link.

## Was du hochlädst

Lad die fertige Seite hoch, also die Dateien, die ein Browser direkt öffnen kann. Die Startseite muss `index.html` heißen.

Hast du die Seite mit Vite, Astro, Hugo oder als statischen Next.js-Export gebaut, lädst du den Ausgabeordner hoch und nicht das ganze Projekt. Der heißt meistens `dist`, `build`, `out` oder `public`. Erwischst du aus Versehen das Projekt samt `node_modules`, wird der Upload wegen zu vieler Dateien abgelehnt.

Die Grenzen sind 50 MB fürs ZIP, 200 MB entpackt und 5.000 Dateien. Videos gehören also woanders hin.

## Single-Page-Apps

Eine React-, Vue- oder Svelte-App, die aus einer `index.html` mit Skripten besteht, bekommt auf jeden unbekannten Pfad die `index.html`. Neu laden auf `/settings` klappt also. Eine Seite mit echten Unterseiten antwortet auf eine fehlende Seite mit ihrer `404.html`, falls es eine gibt.

## Eine neue Version

Öffne die Seite im Dashboard, geh in die Einstellungen und klick auf „Neue Version hochladen“. Die alte Version bleibt online, bis die neue fertig ist, und die Adresse ändert sich nicht.

Die hochgeladenen Dateien bleiben nur einen Tag gespeichert. Die Seite selbst bleibt so lange online, wie du willst, aber die Dateien solltest du dir selbst aufbewahren.

## Wenn es mehr als Dateien sein soll

Bei einem Upload läuft nichts auf dem Server. PHP oder eine `server.js` werden also nicht ausgeführt. Sobald eine Seite eine Datenbank braucht oder bei jedem Push neu gebaut werden soll, würde ich sie auf GitHub legen und von dort deployen. Wie das geht, steht in [Ein GitHub-Repository auf blitz.cloud deployen](/de/writing/github-repository-auf-blitz-cloud-deployen/).
