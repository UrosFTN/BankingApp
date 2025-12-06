FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose gRPC port
EXPOSE 50051

# Run migrations and start service
CMD npm run migrate:up && npm start