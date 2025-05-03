const express = require('express');
const router = express.Router();
const axios = require('axios');
const authenticate = require('../middleware/authenticate');

router.post('/getRecipes', authenticate, async (req, res) => {
  const { ingredients, diet, number } = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'No ingredients provided' });
  }

  try {

    const searchParams = {
      apiKey: process.env.SPOONACULAR_API_KEY,
      includeIngredients: ingredients.join(','),
      number: number || 5,
    };
    if (diet) searchParams.diet = diet;

    const searchResponse = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch',
      { params: searchParams }
    );

    const recipeIds = searchResponse.data.results.map(recipe => recipe.id);
    if (recipeIds.length === 0) {
      return res.json({ results: [] });
    }


    const infoResponse = await axios.get(
      'https://api.spoonacular.com/recipes/informationBulk',
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          ids: recipeIds.join(',')
        }
      }
    );

    res.json({ results: infoResponse.data });
  } catch (err) {
    console.error('Spoonacular API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

module.exports = router;
