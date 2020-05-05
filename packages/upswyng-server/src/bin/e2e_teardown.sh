#!/bin/bash

# Shuts down the mongo db instance started in e2e_setup.sh

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

# get the pid of the mongodb instance
read -r MONGODB_PID <"${DIR}/../../cypress/.mongodbpid"

# kill it
kill $MONGODB_PID

# clean up artifacts from start
rm "${DIR}/../../cypress/.mongodbpid" "${DIR}/../../cypress/.mongodburi"
