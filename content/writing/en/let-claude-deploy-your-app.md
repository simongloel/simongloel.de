---
title: Let Claude deploy your app over MCP
description: blitz.cloud has an MCP server, so Claude, Cursor or VS Code can put apps online, read logs and add DNS records. How to connect it and where it stops.
key: let-claude-deploy-your-app
date: 2026-11-20
---

blitz.cloud runs an MCP server. Connect an assistant to it and you can ask things like "put Uptime Kuma online at uptime" or "why did my app stop?" and it uses the same actions you'd click.

This site was put online that way. Claude Code created the app from the GitHub repository and added the domain, and I added the two DNS records it got back in Cloudflare.

## Connect Claude Code

Your server address is on the AI tools page in the dashboard. Then:

```
claude mcp add --transport http blitz https://mcp.blitz.cloud/<your name>
```

Type `/mcp` in Claude Code, pick blitz and sign in with your blitz.cloud account. A browser window opens, shows which app is asking, and you allow it.

There's also a plugin that does the same and adds a skill for deploying:

```
/plugin marketplace add blitzworks-io/blitz-cloud-mcp
/plugin install blitz-cloud@blitz-cloud-mcp
```

Claude on the web and in the desktop app connects under Settings, Connectors, "Add custom connector". Cursor and VS Code take the address in their `mcp.json`.

## What it can do

Roughly everything the dashboard can: deploy from the App Store, a Docker image, a GitHub repository or an uploaded ZIP, change settings, restart, read logs, create databases and look into them read-only, add DNS records and connect domains. The full list of tools comes straight from the server and is on the AI tools page.

## What it can't do

Payments, signing in and connecting GitHub happen in your browser. The assistant gets a link to a payment page and nothing more, so a chat can't spend money. Anything that deletes, restarts or replaces something asks you first.

## Without a sign-in

Scripts and clients that can't open a browser use an API key from the same page. It's shown once, so copy it right away, and make one per machine so you can revoke one without touching the others.

The setup for every client is in the [docs on AI assistants](https://blitz.cloud/docs/ai-assistants/).
