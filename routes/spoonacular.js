router.post('/recipes', authenticate, async (req, res) => {
  const { ingredients } = req.body;


  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'No ingredients provided' });
  }

  const ingredientList = ingredients.join(',');

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        ingredients: ingredientList,
        number: 5
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Spoonacular API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});
