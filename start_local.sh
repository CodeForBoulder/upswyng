#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
COMMON_PATH="${DIR}/packages/common"
CLIENT_PATH="${DIR}/packages/web"
SERVER_PATH="${DIR}/packages/server"

# Install deps
yarn

# Check for local packages; build them if they do not exist
if ! [ -f "${COMMON_PATH}/dist/index.js" ]; then
  yarn build:web
fi

# Check for .env files; fill them in if they do not exist
if ! [ -f "${CLIENT_PATH}/.env" ]; then
  cp "${CLIENT_PATH}/.env.local.example" "${CLIENT_PATH}/.env"
fi
if ! [ -f "${SERVER_PATH}/.env" ]; then
  cp "${SERVER_PATH}/.env.example" "${SERVER_PATH}/.env"
fi

# Check if docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Docker does not seem to be running, start it first and retry"
    exit 1
fi
# Check for running docker network; start it up if it does not exist
docker top upswyng-dev-db > /dev/null 2>&1 || yarn build:local-db

# Start development servers for server and web packages concurrently
concurrently -n server,web -c yellow,blue "yarn server dev" "yarn web start"
