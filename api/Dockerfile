FROM node:lts-alpine3.14
WORKDIR /api/
RUN apk --no-cache --virtual build-dependencies add python3 make g++
COPY package.json yarn.lock ./
RUN yarn
COPY ./ ./
