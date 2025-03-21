FROM node:20.10.0
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
COPY .env .env
EXPOSE 3000
CMD ["yarn", "start"]
