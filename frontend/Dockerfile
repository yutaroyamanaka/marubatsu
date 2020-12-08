FROM node:8
MAINTAINER YUTARO_YAMANAKA

RUN mkdir /code
COPY code/src code/src
COPY code/public code/public
COPY code/package-lock.json code/package-lock.json
COPY code/package.json code/package.json
COPY code/tsconfig.json code/tsconfig.json
COPY code/yarn.lock code/yarn.lock

WORKDIR /code/
RUN yarn install
RUN yarn build
