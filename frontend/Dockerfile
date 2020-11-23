FROM node:15-alpine

RUN mkdir -p /usr/src/app

WORKDIR '/usr/src/app'

RUN npm install -g @angular/cli@11.0.2

COPY . . 

RUN npm install