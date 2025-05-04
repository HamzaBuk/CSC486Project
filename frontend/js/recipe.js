const backendURL = `http://${window.location.hostname}:4000`;

const getRecipes = () => {
  const ingredientsInput = document.querySelector('#ingredients').value;
  const diet = document.querySelector('#diet').value;
  const numRecipes = document.querySelector('#numRecipes').value;

  const token = localStorage.getItem('token');
  if (!token) {
    alert("You must be logged in to get recipes.");
    return;
  }

  const input = {
    ingredients: ingredientsInput.split(',').map(i => i.trim()),
    diet,
    number: parseInt(numRecipes)
  };

  fetch(`${backendURL}/spoonacular/getRecipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(input)
  })
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch recipes');
    return res.json();
  })
  .then(data => {
    if (data.length === 0) {
      alert("No recipes found.");
    } else {
      showRecipes(data);
    }
  })
  .catch(err => {
    console.error(err);
    alert("Something went wrong: " + err.message);
  });
};

let savedRecipes = [];

const saveRecipe = (id) => {
  const token = localStorage.getItem('token');
  const savedRecipe = savedRecipes.find((recipe) => recipe.id === id);

  const payload = {
    recipeId: savedRecipe.id,
    title: savedRecipe.title,
    image: savedRecipe.image || 'https://via.placeholder.com/150',
    ingredients: savedRecipe.ingredients || '',
    instructions: savedRecipe.instructionSteps || '',
    summary: savedRecipe.summary || ''
  };

  fetch(`${backendURL}/savedRecipes/saveRecipe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(payload)
  })
  .then((res) => {
    if (!res.ok) throw new Error('Failed to save recipe');
    return res.json();
  })
  .then((jsoned) => {
    console.log(jsoned.title + ' saved!');
    alert(jsoned.title + " saved.");
  })
  .catch(err => {
    console.error(err);
    alert("Error saving recipe: " + err.message);
  });
};

const showRecipes = (recipeData) => {
  const container = document.querySelector('#recipes');
  container.innerHTML = '';
  savedRecipes = [];

  recipeData.results.forEach(recipe => {
    const savedStuff = {
      title: recipe.title,
      id: recipe.id,
      image: recipe.image,
      summary: recipe.summary || '',
      ingredients: getIngredientsList(recipe),
      instructionSteps: getInstructionSteps(recipe)
    };

    savedRecipes.push(savedStuff);

    const accordionCode = `
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#recipe${recipe.id}" aria-expanded="false" aria-controls="recipe${recipe.id}">
          ${recipe.title}
        </button>
      </h2>
      <div id="recipe${recipe.id}" class="accordion-collapse collapse" data-bs-parent="#recipes">
        <div class="accordion-body">
          <div>${recipe.summary}</div>
          <div><h3>Ingredients</h3>${savedStuff.ingredients}</div>
          <div><h3>Instructions</h3>${savedStuff.instructionSteps}</div>
          <div><button type="button" class="btn btn-primary" onclick="saveRecipe(${recipe.id})">Save Recipe</button></div>
        </div>
      </div>
    `;

    const accordion = document.createElement('div');
    accordion.innerHTML = accordionCode;
    accordion.classList.add('accordion-item');
    container.appendChild(accordion);
  });
};

const getIngredientsList = (recipe) => {
  if (!Array.isArray(recipe.extendedIngredients)) return "<i>No ingredients provided</i>";
  let list = "<ul>";
  recipe.extendedIngredients.forEach(ing => {
    list += `<li>${ing.original}</li>`;
  });
  list += "</ul>";
  return list;
};

const getInstructionSteps = (recipe) => {
  if (!recipe.analyzedInstructions?.[0]?.steps) {
    return '<p><i>No instructions available.</i></p>';
  }
  let steps = "<ol>";
  recipe.analyzedInstructions[0].steps.forEach(step => {
    steps += `<li>${step.step}</li>`;
  });
  steps += "</ol>";
  return steps;
};
