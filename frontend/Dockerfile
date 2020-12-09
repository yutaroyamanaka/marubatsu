FROM node:12.20.0
MAINTAINER YUTARO_YAMANAKA

RUN mkdir /usr/src/code
WORKDIR /usr/src/code
COPY code/src src
COPY code/public public
COPY code/package-lock.json package-lock.json
COPY code/package.json package.json
COPY code/tsconfig.json tsconfig.json
COPY code/yarn.lock yarn.lock
COPY code/.env .env

EXPOSE 3000
RUN yarn install
