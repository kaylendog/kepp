FROM node:alpine as build

WORKDIR /build/backend

# TS Dependancies
COPY package*.json .
RUN yarn 

# Build TypeScript
COPY tsconfig.json .
COPY src src
RUN yarn build 

# Multi-stage build to decrease image size.
FROM node:alpine

WORKDIR /opt/backend
EXPOSE 8080

RUN apk update
RUN apk --update add git

# Instal only production dependancies
COPY package*.json .
COPY yarn.lock . 
RUN yarn --prod

COPY .git .
COPY --from=build /build/backend/dist dist


ENTRYPOINT [ "yarn", "start" ]