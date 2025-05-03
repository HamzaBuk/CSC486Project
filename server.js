require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const ingredientRoutes = require('./routes/ingredients');
const spoonacularRoutes = require('./routes/spoonacular');
const savedRecipeRoutes = require('./routes/savedRecipes');
const cors = require('cors');

app.use(cors()); 
app.use(express.json());
app.use(express.static('frontend', {index: "login.html"}));

// Route imports
app.use('/auth', authRoutes);           // /auth/register, /auth/login
app.use('/ingredients', ingredientRoutes); // protected routes
app.use('/spoonacular', spoonacularRoutes);
app.use('/savedRecipes', savedRecipeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
