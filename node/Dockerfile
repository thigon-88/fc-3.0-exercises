FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk update && apk add bash && apk add wget

COPY . /usr/src/app

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
	
EXPOSE 3000

COPY package*.json ./
RUN npm install

CMD [ "npm", "start" ]