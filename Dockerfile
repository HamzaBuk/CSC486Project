FROM node:20
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

# Copy the rest of the app
COPY . .

EXPOSE 4000
CMD ["nodemon", "server.js"]