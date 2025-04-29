require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const ingredientRoutes = require('./routes/ingredients');
const spoonacularRoutes = require('./routes/spoonacular');
const savedRecipeRoutes = require('./routes/savedRecipes');

app.use(express.json());

// Route imports
app.use('/auth', authRoutes);           // /auth/register, /auth/login
app.use('/ingredients', ingredientRoutes); // protected routes
app.use('/spoonacular', spoonacularRoutes);
app.use('/savedRecipes', savedRecipeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
