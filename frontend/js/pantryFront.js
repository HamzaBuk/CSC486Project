const getIngredients = () => {
    const id //get ID code;
    const input = {id};
    fetch('http://localhost:3000/ingredients', {method:'POST', body: JSON.stringify(input), headers: {'content-type':'application/json'}})
    .then((res) =>  res.json())
    .then((jsoned) => {
        //console.log(jsoned.results[0].title);
        showIngredients(jsoned);
    });

}
const showIngredients = (ingredientData) => {
    const container = document.querySelector('#ingredients');
    container.innerHTML = '';
    ingredientData.ingredients.forEach(ingredient => {
        const containerCode = `
        <div class="container-md">
        <body>${ingredient}</body>
        <div>
        <button type="button" class="btn btn-primary" onclick="deleteIngredient(${ingredient})">Delete Ingredient</button>
        </div>
        </div>`
        
        const container = document.createElement('div');
        accordion.innerHTML = accordionCode;
        accordion.classList.add('container');
        container.appendChild(container);
    });
}

const deleteIngredient = (id) => {
    //stuff with database
}
