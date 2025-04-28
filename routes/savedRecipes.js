const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const pool = require('../db');


router.post('/saveRecipe', authenticate, async (req, res) => {
  const { recipeId, title, image } = req.body;

  if (!recipeId || !title) {
    return res.status(400).json({ error: 'Missing recipe information' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO saved_recipes (user_id, recipe_id, title, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, recipeId, title, image]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saving recipe:', err.message);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});


router.get('/getSavedRecipes', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM saved_recipes WHERE user_id = $1 ORDER BY saved_at DESC',
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching saved recipes:', err.message);
    res.status(500).json({ error: 'Failed to fetch saved recipes' });
  }
});

module.exports = router;
