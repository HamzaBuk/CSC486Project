const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&addRecipeInstructions=true&addRecipeInformation=true&fillIngredients=true&number=`

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

app.listen(4000, () => console.log("Server is Running"))