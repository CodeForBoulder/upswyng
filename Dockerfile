FROM node:12.14.0-alpine

LABEL Description="Upswyng-server dev"

WORKDIR /usr/src/upswyngWeb

COPY . .

RUN yarn

EXPOSE 3000

RUN ["yarn", "run", "build-local-packages"]

CMD ["yarn", "workspace", "@upswyng/upswyng-server", "run", "start"]

