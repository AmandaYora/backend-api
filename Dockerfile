FROM node:20.10.0
RUN apt-get update && \
    apt-get install -y mariadb-server supervisor && \
    mkdir -p /run/mysqld && chown -R mysql:mysql /run/mysqld && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
COPY .env .env
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 3000 3306
CMD ["/usr/bin/supervisord", "-n"]
