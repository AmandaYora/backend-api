# Gunakan image resmi Node.js versi 20.10.0
FROM node:20.10.0

# Atur working directory di dalam container
WORKDIR /app

# Salin file package.json dan yarn.lock ke dalam container
COPY package.json yarn.lock ./

# Install dependency menggunakan Yarn
RUN yarn install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Expose port yang digunakan aplikasi (misalnya 3000)
EXPOSE 3000

# Jalankan aplikasi menggunakan script start dari package.json
CMD ["yarn", "start"]
