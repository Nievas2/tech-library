FROM node:19-alpine

ARG HOSTNAME

RUN apk add --no-cache bash

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-it.sh /usr/src/app/
RUN chmod +x /usr/src/app/wait-for-it.sh

RUN npm run build

EXPOSE 8000

# CMD ["/usr/src/app/wait-for-it.sh", "tech_library_db:3312 -t 60", "--", "sh", "-c", "npm run db:create && npm start"]

CMD ["npm" , "start"]
