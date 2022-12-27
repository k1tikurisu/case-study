FROM node:18.12-slim

RUN apt update && apt install -y git jq

ENV APP_ROOT /works
WORKDIR $APP_ROOT
COPY ./inputs.json $APP_ROOT

RUN jq -r "[.[].nameWithOwner] | unique | .[]" ./inputs.json |\
  xargs -i bash -c "git clone https://github.com/{}.git repos/{} && echo wait 1s && sleep 1";\
  exit 0

COPY . $APP_ROOT
RUN chmod +x ./getDiff.sh
