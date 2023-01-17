# Member Management UI

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Build Status](https://travis-ci.com/heatsynclabs/members_ui.svg?branch=master)](https://travis-ci.com/heatsynclabs/members_ui)

This is the UI component of the [members_app](https://github.com/heatsynclabs/members_app). See that repo for full project info and general readme information.

See the CONTRIBUTING file for information on helping out, or our [Wiki](https://wiki.heatsynclabs.org/wiki/HSL_API) for project governance.

## Features

* JS frontend that connects directly to the members_api backend
* all of create-react-app features
* react-router
* redux
* cooldux

* Sign Up page
* Verify email page
* Login page
* Password reset page
* Logged in home page

## Logging In (Dev/Test)

Presuming nothing's changed on the API side, once the docker stack is started you can login with `admin@example.com` as a username, and access any emails sent at http://localhost:10001 in dev mode. Other users are jimbo, gobie, and hardy all at example.com, with member_levels of 1, 5, and 10 each.

## Normal Docker Dev Usage

### Prerequisites

- Docker Compose v2 or higher (run `docker compose version` or `docker-compose version`)

### ARM vs x86 Considerations

Due to the way npm handles binary packages across different CPU architectures, **if you run add a new dependency** (npm install ...), you will have to remove the volume and recreate the image, so something like:

```
docker compose rm -fsv members_ui
docker volume rm members_ui_nm
docker compose up -d members_ui
```

### Instructions

**Consider following the Docker instructions in the `members_app` repo instead of here, to get a full environment going instead of piecemeal with just the API.**

If you need to override some of the default environment variables or ports in from the docker-compose.yml file, you can create a docker-compose.override.yml and add your own environment variables or ports there. This file is automatically used by docker-compose and is ignored by git, so you can safely add it to your local repo.

  > **Warning, this docker image is intended for dev mode** attached to an npm-install-able project folder. ***Running this in critical/prod environments is strongly discouraged without lots of testing!!!***

Take note of port numbers, API url, and volume paths.

Review the `Dockerfile` so you know what's about to be booted. For example, the working directory, package.json, and CMD (including npm install and fixture-installation commands) lines which by default will affect your environment.

Create the docker container for the api and database:
`docker compose up`

To access the container's shell prompt:
`docker exec -it members_ui /bin/sh`

To view the container's website from the docker host machine: `http://localhost:3005`

Note that this app depends on the API host pretty extensively, so again if you want a working app you probably want to check out the `members_app` repo.

### Debugging Docker Dev Usage

You can build this container directly with: `docker build -t members_ui .`
You can run this container directly with: `docker run -it members_ui /bin/sh`
You'll then have to manually run commands like `npm install` or `npm run start` (see Dockerfile and docker-compose.yml for various assumptions and env vars we use during normal runtime.)

## Development

Since this is a React app, console.log will output directly to your browser's Javascript console for debugging purposes.

MORE
