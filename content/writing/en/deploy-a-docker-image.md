---
title: Run a Docker image on blitz.cloud
description: Any public amd64 image from Docker Hub, ghcr.io or Quay, with HTTPS in front. How blitz.cloud finds the port and what happens on updates.
key: deploy-a-docker-image
date: 2026-11-20
---

If there's already an image for what you want to run, you don't need a repository at all. blitz.cloud runs any public image built for `linux/amd64` from Docker Hub, `ghcr.io`, Quay or another public registry, and puts HTTPS in front of it.

## Step by step

1. In the [dashboard](https://dashboard.blitz.cloud/), click "Host something new".
2. Choose "An app from Docker Hub" and type part of the name, for example `uptime-kuma`. For another registry type the full name, like `ghcr.io/you/yourapp`.
3. Pick a tag. The list shows the image's real tags and preselects the one that follows new releases.
4. Give the app a short name. That becomes the subdomain.
5. Check what was detected and click "Put it online".

## How the port is found

The image decides. blitz.cloud reads the ports it declares with `EXPOSE`. With several ports it prefers 80, 8080, 3000, 8000 and 5000 in that order. Only when an image declares none does a language model suggest one, and if nothing is known it falls back to 80. You can override the port under "Advanced settings".

The same reading of the image finds volumes and environment variable names. If the image needs a database, blitz.cloud can create one and fill in the variables it knows, or `DATABASE_URL` when it doesn't.

## Root is fine

Every app runs in its own gVisor sandbox, so an image that starts as root runs as root inside that sandbox and nowhere else. A lot of images on Docker Hub expect root and break in confusing ways without it, so you don't have to rebuild them with another user.

## Updates

For a moving tag like `latest`, blitz.cloud looks every night around 4:00 UTC where the tag points. When it moved, the new version goes online pinned by its digest. If it doesn't start within ten minutes, the old version comes back and automatic updates switch off for that app until you turn them on again.

## When it doesn't come up

- Stuck on "Starting": the app listens on another port than the chosen one. Change it on the Settings tab.
- Crash loop: the last log lines are on the app page. A missing environment variable is the usual cause.
- Nothing starts at all: check that the image exists for amd64. An arm64-only image won't run.

More details are in the [docs on Docker images](https://blitz.cloud/docs/deploy-docker-image/).
