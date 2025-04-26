//var http = require('http');
// var fs = require('fs');
// http.createServer(function (req, res) {
//   fs.readFile('demofile.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(40080); 
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

let url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=a8b79bd13e1b4daea84052d93eee4093&addRecipeInstructions=true&addRecipeInformation=true&fillIngredients=true&number="

app.use(express.json());
app.use(cors());

app.post('/getRecipes', (req, res) => {
  console.log(req.body);
  url+=req.body.numRecipes;
  url+="&includeIngredients="+req.body.ingredients+"&";
  url+="diet="+req.body.diet;
  console.log(url);
  fetch(url)
  .then((res) =>  res.json())
  .then((apiresponse) => {
    console.log(apiresponse);
    res.send(apiresponse)
  });
});

app.listen(4000, () => console.log("fjhqbwljhqbwlfjhbqlwfb"))

// var http = require('http');
// var uc = require('upper-case');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write(uc.upperCase("Hello World!"));
//   res.end();
// }).listen(8080);

// const EventEmitter = require('node:events');

// const myEmitter = new EventEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.emit('event');

// myEmitter.on('event2', () => {
//   console.log('a second event occurred!');
// });
// myEmitter.emit('event2');