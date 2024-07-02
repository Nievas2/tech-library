FROM node:19-alpine

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

RUN npm run db:create

EXPOSE 8000

CMD [ "npm", "start" ]