# Supamanio
A Docker Compose workaround for running Supabase with MinIO on Portainer

This project adapts the Supabase stack to work seamlessly with [Portainer](https://www.portainer.io/), a popular Docker management UI, while integrating [MinIO](https://min.io/) for S3-compatible storage. It eliminates bind mounts (which Portainer doesn’t handle natively) by using named volumes and a custom setup container, making it ideal for containerized environments.

Supamanio is derived from [Supabase](https://github.com/supabase/supabase), licensed under the Apache License 2.0. Modifications include Portainer compatibility and MinIO integration.

## Features
- **Portainer-Friendly:** Uses named volumes instead of bind mounts for easy deployment in Portainer.
- **MinIO Integration:** Bundles MinIO as an S3-compatible storage backend alongside Supabase’s storage API.
- **Automated Updates:** Syncs with Supabase’s `docker/volumes/` via GitHub Actions, building and pushing a setup image to Docker Hub.
- **Reproducible:** Everything’s defined in `docker-compose.yml` and version-controlled in Git.

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed (or Portainer).
- A [Docker Hub](https://hub.docker.com/) account for pulling the `supamanio-setup` image.
- A `.env` file with environment variables (see `.env.example` in the repo for reference).

****************************************************
****************                  ******************
**************** WORK IN PROGRESS ******************
****************                  ******************
****************************************************
## Setup Instructions


Accessing Services
Supabase Studio: http://<your-host-ip>:8000

MinIO Console: http://<your-host-ip>:9001 (use MINIO_USER/MINIO_PASSWORD to log in)

How It Works
A custom setup container (built from Dockerfile.setup) initializes named volumes with Supabase’s configuration files (volumes/).

Services like db, kong, vector, and supavisor use these volumes instead of bind mounts.

GitHub Actions syncs volumes/ with a fork of Supabase, rebuilds the setup image, and pushes it to Docker Hub as petronem/supamanio-setup:latest.  This only runs once or on stack re-deployment then exit 0 allowing the other services to start.

Updating with Supabase Releases
Supamanio stays in sync with Supabase via:
A fork of supabase/supabase at petronem/supabase.

A GitHub Action in this repo that:
Pulls docker/volumes/ from the fork into volumes/.

Builds and pushes petronem/supamanio-setup:latest to Docker Hub.


Redeploy your stack in Portainer to pull the latest image.

Contributing
Feel free to fork this repo, submit issues, or open pull requests! If you improve the setup (e.g., add support for more Supabase features), let’s make it better together.
License
Licensed under the Apache License 2.0 (LICENSE). See the original Supabase license here.


