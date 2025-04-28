const getRecipes = () => {
    const ingredients = document.querySelector('#ingredients').value;
    const diet = document.querySelector('#diet').value;
    const numRecipes = document.querySelector('#numRecipes').value;
    const input = {ingredients, diet, numRecipes};
    fetch('http://localhost:4000/getRecipes', {method:'POST', body: JSON.stringify(input), headers: {'content-type':'application/json'}})
    .then((res) =>  res.json())
    .then((jsoned) => {
        //console.log(jsoned.results[0].title);
        showRecipes(jsoned);
    });

}

const saveRecipe = (id) => {
    const savedRecipe = savedRecipes.find((recipe) => recipe.id === id)
    fetch('save recipe endpoint', {method:'POST', body: JSON.stringify(savedRecipe), headers: {'content-type':'application/json'}})
    .then((res) =>  res.json())
    .then((jsoned) => {
         console.log(jsoned.results[0].title);
         alert(savedRecipe.title+" saved.")
     });
}

let savedRecipes = [];
const showRecipes = (recipeData) => {
    const container = document.querySelector('#recipes');
    container.innerHTML = '';
    savedRecipes = [];
    recipeData.results.forEach(recipe => {
        savedStuff = {
            title: recipe.title,
            id: recipe.id,
            summary: recipe.summary,
            ingredients: getIngredientsList(recipe),
            instructionSteps: getInstructionSteps(recipe)
        }
        savedRecipes.push(savedStuff)
        const accordionCode = `
        <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#recipe${recipe.id}" aria-expanded="false" aria-controls="recipe${recipe.id}">
        ${recipe.title}
        </button>
        </h2>
        <div id="recipe${recipe.id}" class="accordion-collapse collapse " data-bs-parent="#recipes">
        <div class="accordion-body">
        <div>
        ${recipe.summary}
        </div>
        <div>
        <h3>Ingredients</h3>
        ${savedStuff.ingredients}
        </div>
        <div>
        <h3>Instructions</h3>
        ${savedStuff.instructionSteps}
        </div>
        <div>
        <button type="button" class="btn btn-primary" onclick="saveRecipe(${recipe.id})">Save Recipe</button>
        </div>
        </div>
        </div>`
        
        const accordion = document.createElement('div');
        accordion.innerHTML = accordionCode;
        accordion.classList.add('accordion-item');
        container.appendChild(accordion);
    });
}

const getIngredientsList = (recipe) => {
    let ingredientList = '<ul>';
    recipe.extendedIngredients.forEach(ing => {
        ingredientList += `<li>${ing.original}</li>`
    });
    ingredientList += '</ul>';
    return ingredientList;
}

const getInstructionSteps = (recipe) => {
    let instructionSteps = '<ol>';
    recipe.analyzedInstructions[0].steps.forEach(step => {
       instructionSteps += `<li>${step.step}</li>`
    });
    instructionSteps += '</ol>';
    return instructionSteps;
}
