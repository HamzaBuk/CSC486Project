-- CREATE DATABASE smartrecipe;

\c smartrecipe

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash TEXT NOT NULL
);




CREATE TABLE recipes (
    id SERIAL PRIMARY KEY, 
    spoonacular_id INT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    ready_in_minutes INT,
    servings INT,
    source_url TEXT,
    image_url TEXT
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES Users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  quantity VARCHAR(50),
  unit VARCHAR(50),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipe_ingredients (
    recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id INT REFERENCES ingredients(id) ON DELETE CASCADE, 
    amount VARCHAR(100),
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE saved_recipes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  recipe_id INTEGER NOT NULL,
  title TEXT,
  image TEXT,
  ingredients TEXT,
  instructions TEXT,
  summary TEXT,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_recipe UNIQUE (user_id, recipe_id)
);


CREATE TABLE pantry (
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    ingredient_id INT REFERENCES ingredients(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, ingredient_id)
);
