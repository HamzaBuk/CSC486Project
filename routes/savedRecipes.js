const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authenticate');

// Save a recipe
router.post('/saveRecipe', authenticateToken, async (req, res) => {
  try {
    const { recipeId, title, image, ingredients, instructions, summary } = req.body;
    const userId = req.user.id;
//get the saved recipes from the db as a query
    await db.query(`
      INSERT INTO saved_recipes (user_id, recipe_id, title, image, ingredients, instructions, summary)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (user_id, recipe_id) DO NOTHING
    `, [userId, recipeId, title, image, ingredients, instructions, summary]);

    res.status(200).json({ title });
  } catch (err) {
    console.error("Error saving recipe:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get saved recipes
router.get('/getSavedRecipes', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      'SELECT * FROM saved_recipes WHERE user_id = $1 ORDER BY saved_at DESC',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching saved recipes:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
