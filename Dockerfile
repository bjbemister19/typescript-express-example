# Stage 1: Install dependencies
FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Stage 2: Production image
FROM oven/bun:alpine AS production

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Copy source code
COPY src/ src/

# Set environment variables
ENV NODE_ENV=production

# Command to run your application
CMD ["bun", "run", "src/index.ts"]