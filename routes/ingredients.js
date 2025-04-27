const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticate = require('../middleware/authenticate');

// Add ingredient
router.post('/', authenticate, async (req, res) => {
  const { name, quantity, unit } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ingredients (user_id, name, quantity, unit) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, name, quantity, unit]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Could not add ingredient' });
  }
});

// Get all ingredients
router.get('/', authenticate, async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM ingredients WHERE user_id = $1 ORDER BY added_at DESC',
    [req.user.id]
  );
  res.json(result.rows);
});

// Update ingredient
router.put('/:id', authenticate, async (req, res) => {
  const { name, quantity, unit } = req.body;
  const { id } = req.params;

  const result = await pool.query(
    `UPDATE ingredients 
     SET name = $1, quantity = $2, unit = $3 
     WHERE id = $4 AND user_id = $5 
     RETURNING *`,
    [name, quantity, unit, id, req.user.id]
  );

  if (!result.rows.length) return res.status(404).json({ error: 'Ingredient not found' });
  res.json(result.rows[0]);
});

// Delete ingredient
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    'DELETE FROM ingredients WHERE id = $1 AND user_id = $2 RETURNING *',
    [id, req.user.id]
  );

  if (!result.rows.length) return res.status(404).json({ error: 'Ingredient not found' });
  res.json({ message: 'Ingredient deleted' });
});

module.exports = router;
