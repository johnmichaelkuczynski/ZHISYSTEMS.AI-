# This Dockerfile is for Render deployment
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev) for the build step
ENV NODE_ENV=development
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Set production for runtime
ENV NODE_ENV=production

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
