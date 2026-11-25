---
title: Claude deployt deine App per MCP
description: blitz.cloud hat einen MCP-Server. Damit stellen Claude, Cursor oder VS Code deine Apps online, lesen Logs und legen DNS-Einträge an.
key: let-claude-deploy-your-app
date: 2026-11-20
---

blitz.cloud hat einen eigenen MCP-Server. Verbindest du deinen Assistenten damit, kannst du ihm einfach sagen: „Stell mal Uptime Kuma unter uptime online“ oder „Warum ist meine App stehen geblieben?“. Er macht dann genau das, was du sonst im Dashboard klicken würdest.

Diese Seite ist übrigens genau so online gegangen. Claude Code hat die App aus dem GitHub-Repository angelegt und die Domain hinzugefügt. Ich musste nur noch die zwei DNS-Einträge, die zurückkamen, bei Cloudflare eintragen.

## Claude Code verbinden

Deine Serveradresse findest du im Dashboard auf der Seite AI tools. Dann:

```
claude mcp add --transport http blitz https://mcp.blitz.cloud/<dein Name>
```

Tipp in Claude Code `/mcp` ein, wähl blitz aus und melde dich mit deinem blitz.cloud-Konto an. Es geht ein Browserfenster auf, das dir zeigt, welche App fragt, und du gibst sie frei.

Es gibt auch ein Plugin, das dasselbe macht und gleich einen Skill fürs Deployen mitbringt:

```
/plugin marketplace add blitzworks-io/blitz-cloud-mcp
/plugin install blitz-cloud@blitz-cloud-mcp
```

Claude im Web und in der Desktop-App verbindest du unter Einstellungen, Konnektoren, „Benutzerdefinierten Konnektor hinzufügen“. Bei Cursor und VS Code kommt die Adresse in die `mcp.json`.

## Was er kann

So ziemlich alles, was auch das Dashboard kann. Er deployt aus dem App Store, aus einem Docker-Image, aus einem GitHub-Repository oder aus einem hochgeladenen ZIP. Er ändert Einstellungen, startet neu und liest Logs. Er legt Datenbanken an und schaut nur lesend hinein, und er legt DNS-Einträge an und verbindet Domains. Die komplette Liste der Tools kommt direkt vom Server und steht ebenfalls auf der Seite AI tools.

## Was er nicht kann

Bezahlen, Anmelden und GitHub verbinden passieren in deinem Browser. Der Assistent bekommt höchstens einen Link zur Bezahlseite, ein Chat kann also kein Geld ausgeben. Und bevor er etwas löscht, neu startet oder ersetzt, fragt er dich.

## Ohne Anmeldung

Skripte und Clients, die kein Browserfenster aufmachen können, nehmen einen API-Schlüssel von derselben Seite. Der wird nur einmal angezeigt, kopier ihn also gleich. Am besten machst du einen pro Rechner, dann kannst du einen widerrufen, ohne die anderen anzufassen.

Wie du die einzelnen Clients einrichtest, steht in der [Doku zu KI-Assistenten](https://blitz.cloud/de/docs/ai-assistants/).
