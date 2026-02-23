FROM node:24-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@10.30.1

# Set working directory
WORKDIR /build

# Copy package files and lockfile
COPY package.json pnpm-lock.yaml ./

# Copy posts and scripts directories (needed for build)
COPY posts/ ./posts/
COPY scripts/ ./scripts/

# Install dependencies with frozen lockfile for reproducibility
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Run build process: backlinks first, then Next.js build
RUN pnpm run build:backlinks && pnpm run build

# Stage 2: Runtime
FROM node:24-alpine

# Create non-root user for security
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001

# Set working directory
WORKDIR /app

# Copy standalone build output from builder
COPY --from=builder --chown=appuser:appuser /build/.next/standalone ./

# Copy node_modules with production dependencies from builder
COPY --from=builder --chown=appuser:appuser /build/node_modules ./node_modules

# Set production environment
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Switch to non-root user
USER appuser

# Start the application
CMD ["node", "server.js"]
