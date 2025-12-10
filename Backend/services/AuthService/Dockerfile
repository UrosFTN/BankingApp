FROM node:20-alpine

WORKDIR /app

# Install netcat for health checks
RUN apk add --no-cache netcat-openbsd postgresql-client

COPY package*.json ./
RUN npm install

COPY . .

# Copy entrypoint script
COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 50051

# Use entrypoint script
ENTRYPOINT ["/app/docker-entrypoint.sh"]