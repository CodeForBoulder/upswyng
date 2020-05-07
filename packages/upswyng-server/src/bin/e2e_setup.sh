#!/bin/bash

# Starts an in-memory mongodb instance, sets up service provider
# categories/subcategories, and starts a dev server connected to
# the in-memory db

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

# start the in-memory mongodb instance
node "${DIR}/../../cypress/start_memory_db.js"

# get the pid and uri of the mongodb instance
read -r MONGODB_PID <"${DIR}/../../cypress/.mongodbpid"
read -r MONGODB_URI <"${DIR}/../../cypress/.mongodburi"

SETUP_SCRIPT="${DIR}/../../__build__/setupCategories.js"

# see if the category setup script exists, if not, build it
if ! test -f "$SETUP_SCRIPT"; then
    yarn workspace @upswyng/upswyng-server rollup --config data-pipeline.rollup.config.js
fi

# setup categories
DATABASE_URL=$MONGODB_URI DATABASE_NAME="" DATABASE_USER="" DATABASE_PASSWORD="" \
    node $SETUP_SCRIPT

DATABASE_URL=$MONGODB_URI DATABASE_NAME="" DATABASE_USER="" DATABASE_PASSWORD="" PORT=43637 \
    yarn workspace @upswyng/upswyng-server dev
