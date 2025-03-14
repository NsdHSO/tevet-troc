# Stage 1: Development Stage
FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml .npmrc ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm && \
    pnpm install

COPY --chown=node:node . .

CMD ["pnpm", "start"]

# Stage 2: Builder Stage
FROM development AS builder

# Install dependencies using Docker's cache mount
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile

# Build the application
RUN pnpm run build

# Stage 3: Production Stage
FROM node:20-alpine AS production

RUN apk update && apk add openssh

ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml .npmrc ./

# Install pnpm globally and install dependencies with cache mount
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --mount=type=cache,target=/root/.pnpm-store

# Change ownership of /usr/src/app before switching to node user
RUN chown -R node:node /usr/src/app

USER node:node

# Copy built application from builder stage
COPY --from=builder --chown=node:node /usr/src/app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main"]