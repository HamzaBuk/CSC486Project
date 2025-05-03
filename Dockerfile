# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install


RUN npm install dotenv

# Install nodemon 
RUN npm install -g nodemon

# Copy all app files
COPY . .

# Expose the port
EXPOSE 4000

# Start the server
CMD ["nodemon", "server.js"]
