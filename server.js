require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const ingredientRoutes = require('./routes/ingredients');
const spoonacularRoutes = require('./routes/spoonacular');

app.use(express.json());

// Route imports
app.use('/auth', authRoutes);           // /auth/register, /auth/login
app.use('/ingredients', ingredientRoutes); // protected routes
app.use('/spoonacular', spoonacularRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
