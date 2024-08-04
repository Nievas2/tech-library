FROM node:19-alpine

RUN npm install -g ts-node wait-port

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000