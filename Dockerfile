# Use Node.js
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon


COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Copy the full app code
COPY . .

# Expose the port
EXPOSE 4000

CMD ["./wait-for-it.sh", "smartrecipe-db:5432", "--", "nodemon", "server.js"]
