FROM node:20.10.0

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
COPY .env .env

# Tambahkan skrip wait-for-it
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 3000

# Jalankan app setelah MySQL siap
CMD ["/wait-for-it.sh", "db:3306", "--", "yarn", "start"]
