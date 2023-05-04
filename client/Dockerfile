FROM node:18-alpine

WORKDIR /app/client

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm install --save @emotion/styled @emotion/react

COPY . . 

EXPOSE 3000

CMD [ "npm", "run","start" ]