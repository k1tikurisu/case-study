FROM node:18.12-slim

RUN apt update && apt install -y curl jq git
RUN curl -fsSL https://test.docker.com/ | sh

ENV APP_ROOT /works

WORKDIR $APP_ROOT

COPY ./package.json $APP_ROOT
COPY ./yarn.lock $APP_ROOT

RUN yarn install 

COPY . $APP_ROOT