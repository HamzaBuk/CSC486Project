# Use node.js image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy only dependency descriptors first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose the app port
EXPOSE 4000

# Start the app using nodemon for development
CMD ["npm", "run", "dev"]
