# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install


RUN npm install dotenv

# Install nodemon 
RUN npm install -g nodemon

# Copy rest of the app
COPY . .

# Expose the app port
EXPOSE 4000

# Start the app
CMD ["nodemon", "server.js"]

