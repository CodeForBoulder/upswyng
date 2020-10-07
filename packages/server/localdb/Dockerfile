FROM mongo:3.6.12

COPY mongodump/ /tmp/dump/

ENV MONGO_INITDB_DATABASE: upswyng-dev

EXPOSE 27017

CMD mongod --fork --logpath /var/log/mongodb.log; \
    mongorestore -d upswyng-dev /tmp/dump/; \
    mongod --shutdown; \
    docker-entrypoint.sh mongod
