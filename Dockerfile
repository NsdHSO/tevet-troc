FROM node:alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install --only=development --silent
COPY . .
RUN npm run-script build
FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install -g pm2@latest
RUN npm install --only=production --silent
RUN npm install fastify

# List the contents of the 'dist' directory
RUN ls dist

COPY --from=builder /usr/src/app/dist/apps/tevet-troc ./build
ENTRYPOINT ["pm2-runtime","build/main.js"]
