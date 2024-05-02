# Install Linux Alpine (specific version [3.19 is a last version now]) + Node.js (specific version [20 is a last version now])
FROM node:20-alpine3.19

# Create app folder inside the image:
WORKDIR /app

# Copy node_modules files from root (.) into image folder:
COPY package*.json /app

# Install packages:
RUN npm i

# Copy source filesfrom developer cp (.) into the /app folder inside the image (/app):
COPY . /app

# Specify which terminal command will run the application:
ENTRYPOINT npm start