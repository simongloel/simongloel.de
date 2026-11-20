---
title: Claude deployt deine App per MCP
description: blitz.cloud hat einen MCP-Server. Claude, Cursor oder VS Code stellen damit Apps online, lesen Logs und legen DNS-Einträge an.
key: let-claude-deploy-your-app
date: 2026-11-20
---

blitz.cloud betreibt einen MCP-Server. Verbindest du einen Assistenten damit, kannst du ihn zum Beispiel bitten: "Stell Uptime Kuma unter uptime online" oder "Warum ist meine App stehen geblieben?". Er nutzt dafür dieselben Aktionen, die du im Dashboard klicken würdest.

Diese Seite ist so online gegangen. Claude Code hat die App aus dem GitHub-Repository angelegt und die Domain hinzugefügt, und ich habe die zwei DNS-Einträge, die zurückkamen, bei Cloudflare eingetragen.

## Claude Code verbinden

Deine Serveradresse steht im Dashboard auf der Seite AI tools. Dann:

```
claude mcp add --transport http blitz https://mcp.blitz.cloud/<dein Name>
```

Tipp in Claude Code `/mcp`, wähl blitz und melde dich mit deinem blitz.cloud-Konto an. Ein Browserfenster geht auf, zeigt, welche App fragt, und du erlaubst es.

Es gibt auch ein Plugin, das dasselbe macht und eine Skill zum Deployen mitbringt:

```
/plugin marketplace add blitzworks-io/blitz-cloud-mcp
/plugin install blitz-cloud@blitz-cloud-mcp
```

Claude im Web und in der Desktop-App verbindest du unter Einstellungen, Konnektoren, "Benutzerdefinierten Konnektor hinzufügen". Cursor und VS Code bekommen die Adresse in ihre `mcp.json`.

## Was er kann

Ungefähr alles, was das Dashboard kann: aus dem App Store, einem Docker-Image, einem GitHub-Repository oder einem hochgeladenen ZIP deployen, Einstellungen ändern, neu starten, Logs lesen, Datenbanken anlegen und nur lesend hineinschauen, DNS-Einträge anlegen und Domains verbinden. Die vollständige Liste der Tools kommt direkt vom Server und steht auf der Seite AI tools.

## Was er nicht kann

Bezahlen, Anmelden und GitHub verbinden passiert in deinem Browser. Der Assistent bekommt höchstens einen Link zur Bezahlseite, ein Chat kann also kein Geld ausgeben. Alles, was etwas löscht, neu startet oder ersetzt, fragt dich vorher.

## Ohne Anmeldung

Skripte und Clients, die kein Browserfenster öffnen können, nehmen einen API-Schlüssel von derselben Seite. Er wird nur einmal angezeigt, also kopier ihn gleich. Mach einen pro Rechner, dann kannst du einen widerrufen, ohne die anderen anzufassen.

Die Einrichtung für jeden Client steht in der [Doku zu KI-Assistenten](https://blitz.cloud/de/docs/ai-assistants/).
