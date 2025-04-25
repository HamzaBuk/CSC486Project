const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../db');
const authenticate = require('../middleware/authenticate'); // Ensures only logged-in users can access

// GET /spoonacular/recipes - Fetch recipes based on the user's pantry ingredients
router.get('/recipes', authenticate, async (req, res) => {
  try {
    //fetch user's ingredients from the database
    const result = await pool.query(
      'SELECT name FROM ingredients WHERE user_id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No ingredients found in pantry' });
    }

    //convert ingredient names into a comma-separated list for the Spoonacular API
    const ingredientList = result.rows.map(row => row.name).join(',');

    //call the Spoonacular API
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY, // API key stored in .env
        ingredients: ingredientList, // e.g., "apples,flour,sugar"
        number: 5, // Adjust as needed
      },
    });

    // Return the list of recipes to the frontend
    res.json(response.data);
  } catch (err) {
    console.error('Spoonacular API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

module.exports = router;
