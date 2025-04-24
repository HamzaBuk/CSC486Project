//This is the middleware for calling the spoonacular API
//I got this code off of stack overflow, it will likely need changes
const express = require('express');
const router = express.router();
const got = require('got');
const { pipeline } = require('stream');
const key = process.env.API_KEY;

router.get('/', function(req, res) {
  const dataStream = got.stream({
      uri: 'https://api.spoonacular.com/recipes/complexSearch/information?apiKey=${key}&number=1', //We would want this URL to be flexible in the full application
  });
  pipeline(dataStream, res, (err) => {
      if (err) {
          console.log(err);
          res.sendStatus(500);
      }
  });
});

module.exports = router;
