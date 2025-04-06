# Stage 1: Build the TypeScript project
FROM node:22.14.0-alpine AS builder

WORKDIR /app

# Copy project files from host machine
COPY . .

# Install all dependencies (including dev dependencies)
RUN npm install

# Build the TypeScript project
RUN npm run build

# Stage 2: Production image
FROM node:22.14.0-alpine AS production

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production

# Command to run your application
CMD ["node", "dist/index.js"]