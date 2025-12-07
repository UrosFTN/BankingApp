FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose gRPC port
EXPOSE 50051

# Run in development mode with hot reload
CMD ["npm", "run", "dev"]

CMD npm run migrate:up && npm start