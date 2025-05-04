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
                    <div>${recipe.summary}</div>
                    <div><h3>Ingredients</h3>${getIngredientsList(recipe)}</div>
                    <div><h3>Instructions</h3>${getInstructionSteps(recipe)}</div>
                    <div><button type="button" class="btn btn-primary" onclick="deleteRecipe(${recipe.id})">Delete Recipe</button></div>
                </div>
            </div>`;
        accordion.classList.add('accordion-item');
        container.appendChild(accordion);
    });
};

const getIngredientsList = (recipe) => {
    if (!recipe.extendedIngredients) return "<i>No ingredients provided</i>";
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

const deleteRecipe = (id) => {
    const element = document.getElementById(id);
    if (element) element.parentNode.removeChild(element);
};
