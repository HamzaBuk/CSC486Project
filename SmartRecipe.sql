-- this is just for this code, probably don't need when launching to cloud bc we would have to create it in terminal
CREATE DATABASE smartRecipe;

-- enter database
\c smartRecipe

-- table for users
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

-- table for recipes
CREATE TABlE recipes(
    id SERIAL PRIMARY KEY, 
    spoonacular_id INT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    ready_in_minutes INT,
    servings INT,
    source_url TEXT,
    image_url TEXT
);

-- table for ingredients (user currently has these)
CREATE TABLE ingredients(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL 
);

-- recipe ingredients (needed for the recipes)
CREATE TABLE recipe_ingredients(
    recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
    ingreident_id INT REFERENCES ingredients(id) ON DELETE CASCADE, 
    amount VARCHAR(100),
    PRIMARY KEY (recipe_id, ingreident_id)
);

--saved recipes
CREATE TABLE saved_recipes(
    user_id INT REFERENCES Users(id) on DELETE CASCADE,
    recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id)
);

-- users pantry (saved recipes what ingredients they llke)
CREATE TABLE pantry(
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    ingreident_id INT REFERENCES ingredients(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, ingreident_id)
);

