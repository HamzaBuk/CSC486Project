#Use node.js 
FROM node:20

#working directory
WORKDIR /app

#copy package.json 
COPY package*.json ./

#Install all npm dependencies 
RUN npm install 

RUN npm uninstall bcrypt

RUN npm install bcrypt

#copy all the app
COPY . . 

#expose port
EXPOSE 4000
#start the server
CMD ["node", "server.js"]
