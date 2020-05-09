#!/bin/bash

# Used when starting the server to check if the web client has been built.
# In production, the script will fail if the web client has not been built,
# otherwise, a placeholder for the root path is created.

# TODO (rhinodavid): make it throw if client isnt built in prod

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
echo $DIR
CLIENT_BUILD_OUTPUT_DIR="${DIR}/../../../web/build"
CLIENT_INDEX="${CLIENT_BUILD_OUTPUT_DIR}/index.html"

if ! test -f "$CLIENT_INDEX"; then
    if [ $NODE_ENV = "production" ]; then
        # TODO (rhinodavid): If prod, check to see if the placeholder site is present
        echo "Attempted to start server in production without building web client"
        exit 1
    fi
    mkdir -p $CLIENT_BUILD_OUTPUT_DIR
    echo "<!doctype html>" | tee $CLIENT_INDEX
    echo "<html>" | tee -a $CLIENT_INDEX
    echo "<head><title>UpSwyng: Client not built</title></head><body>" | tee -a $CLIENT_INDEX
    echo "<h1>UpSwyng Web Client has not been built</h1>" | tee -a $CLIENT_INDEX
    echo "<p>Try running:<br />" | tee -a $CLIENT_INDEX
    echo "yarn build:web<br>" | tee -a $CLIENT_INDEX
    echo "from the workspace root, then restart the server</p>" | tee -a $CLIENT_INDEX
    echo "<p>Or <a href=\"/provider\" >visit the provider portal</a></p>" | tee -a $CLIENT_INDEX
    echo "</body></html>" | tee -a $CLIENT_INDEX
fi
