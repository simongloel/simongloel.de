---
title: Deploy a GitHub repository on blitz.cloud
description: Connect GitHub, pick a repository and get an HTTPS address. With or without a Dockerfile, and every push goes online by itself.
key: deploy-github-repository-on-blitz-cloud
date: 2026-11-20
---

This is the way I put most of my own projects online. You connect GitHub once, pick a repository, and blitz.cloud builds it and runs it at its own address. Every push to the branch builds a new version.

## Before you start

You need a free account on [blitz.cloud](https://dashboard.blitz.cloud/) with your address claimed. The address is the part every app lives under, for example `lena.prod.page`.

A Dockerfile is optional. If the repository has one, blitz.cloud builds it. If it doesn't, a language model reads the file listing and the manifests (`package.json`, `requirements.txt`, `go.mod` and so on) and writes one. When that build fails, it reads the log and tries again, up to three times. The Dockerfile it wrote is shown under the build log, and you can copy it into your repo if you want the build to be the same every time.

## Step by step

1. Open the dashboard and click "Host something new".
2. Choose "My own code".
3. Click "Connect GitHub" if you haven't yet. GitHub asks which repositories blitz.cloud may read, and you can pick single ones.
4. Pick your repository from the list. A public repository also works without connecting, just paste its link.
5. Give the app a short name. `demo` becomes `demo.lena.prod.page`.
6. Click "Build it and put it online".

The first build takes a few minutes because everything is downloaded from scratch. Later builds reuse the layers that didn't change.

## Ports

Your app should listen on the port in the `PORT` environment variable, which is `8080`. If your Dockerfile has an `EXPOSE` line with another port, blitz.cloud reads it from the image and uses that instead. An app that stays on "Starting" forever is almost always listening on a different port.

## Updates

With GitHub connected, a push to the app's branch builds and deploys a new version. The running version stays up until the new one starts, and if the new one doesn't come up within ten minutes, the old one is put back. The last ten versions can be put back by hand from the Activity tab.

## Monorepos

If the app is one folder of a bigger repository, like `apps/web`, set it under "Folder to build" in the advanced settings. [metalltarif.com](https://metalltarif.com) runs that way, built from one folder of a larger repository.

## Settings and databases

Environment variables go on the app's Environment tab after the first deploy. A PostgreSQL, MariaDB or Redis database is created on the Databases page and connected to the app there, and the connection details show up as environment variables.

The full reference is in the [blitz.cloud docs](https://blitz.cloud/docs/deploy-from-github/).
