FROM node:15-alpine

RUN mkdir -p /usr/src/app

WORKDIR '/usr/src/app'

RUN npm install -g @angular/cli@10.2.3

COPY . . 

RUN npm install