require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const ingredientRoutes = require('./routes/ingredients');

app.use(express.json());

// Route imports
app.use('/auth', authRoutes);           // /auth/register, /auth/login
app.use('/ingredients', ingredientRoutes); // protected routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
