FROM node:12.14.0-alpine

LABEL Description="Upswyng container boiiii"

WORKDIR /usr/src/upswyng

COPY . .

RUN yarn

EXPOSE 3000

RUN ["yarn", "run", "build-local-packages"]

CMD ["yarn", "workspace", "@upswyng/upswyng-web", "run", "start"]

