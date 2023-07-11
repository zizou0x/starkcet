FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .

EXPOSE 4000

ENV NODE_ENV=production

CMD ["node", "main.js"]
