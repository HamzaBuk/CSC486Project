const backendURL = `http://${window.location.hostname}:4000`;

const getRecipes = () => {
  const token = localStorage.getItem('token');

  fetch(`${backendURL}/savedRecipes/getSavedRecipes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch saved recipes');
    return res.json();
  })
  .then(jsoned => {
    showRecipes({ results: jsoned });
  })
  .catch(err => {
    console.error("Error loading saved recipes:", err);
    alert("Error loading saved recipes: " + err.message);
  });
};

//calls the recipes column from DB 
const showRecipes = (recipeData) => {
  const container = document.querySelector('#recipes');
  container.innerHTML = '';

  recipeData.results.forEach(recipe => {
    const accordion = document.createElement('div');
    accordion.innerHTML = `
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#recipe${recipe.id}" aria-expanded="false" aria-controls="recipe${recipe.id}">
          ${recipe.title}
        </button>
      </h2>
      <div id="recipe${recipe.id}" class="accordion-collapse collapse" data-bs-parent="#recipes">
        <div class="accordion-body">
          <div><strong>Summary:</strong><br>${recipe.summary || "<i>No summary available</i>"}</div>
          <div><h3>Ingredients</h3>${getIngredientsList(recipe)}</div>
          <div><h3>Instructions</h3>${getInstructionSteps(recipe)}</div>
          <div><button type="button" class="btn btn-primary" onclick="deleteRecipe(${recipe.id})">Delete Recipe</button></div>
        </div>
      </div>`;
    accordion.classList.add('accordion-item');
    container.appendChild(accordion);
  });
};

//using the DB instead of calling spoonacular everytime
const getIngredientsList = (recipe) => {
  return recipe.ingredients || "<i>No ingredients saved</i>";
};

const getInstructionSteps = (recipe) => {
  return recipe.instructions || "<i>No instructions saved</i>";
};

const deleteRecipe = (id) => {
  const element = document.getElementById(id);
  if (element) element.parentNode.removeChild(element);
};
