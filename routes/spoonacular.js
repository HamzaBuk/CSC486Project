router.post('/recipes', authenticate, async (req, res) => {
  const { ingredients, diet, cuisine, mealType } = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'No ingredients provided' });
  }

  try {
    const params = {
      apiKey: process.env.SPOONACULAR_API_KEY,
      includeIngredients: ingredients.join(','),
      number: 5,
      sort: "random"
    };

    if (diet) params.diet = diet;
    if (cuisine) params.cuisine = cuisine;
    if (mealType) params.type = mealType;

    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params,
    });

    res.json(response.data.results);
  } catch (err) {
    console.error('Spoonacular complexSearch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});
