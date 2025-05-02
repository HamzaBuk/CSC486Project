const backendURL = `http://${window.location.hostname}:4000`;

const getIngredients = () => {
    const id = localStorage.getItem('token');//get ID code;
    const input = {id};
    fetch(${backendURL}/ingredients', {method:'POST', body: JSON.stringify(input), 
        headers: {'content-type':'application/json', 
                  'Authorization':'bearer '+id
        }})
    .then((res) =>  res.json())
    .then((jsoned) => {
        //console.log(jsoned.results[0].title);
        showIngredients(jsoned);
    });

}

const newIngredient = () =>{
    const token = localStorage.getItem('token');
    const name = document.querySelector('#name').value;
    const quantity = document.querySelector('#quantity').value;
    const unit = document.querySelector('#unit').value;
    const input = {
        name, 
        quantity, 
        unit
    }
    if(!name || !quantity || !unit){
        alert("Please fill in all ingredient information.")
    }else{
        fetch('${backendURL}/spoonacular/recipes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(input)
          }).then(() => {
            const containerCode = `
            <div class="container-md">
            <body>${input.name} ${input.quantity} ${input.unit}</body>
            <div>
            <button type="button" class="btn btn-primary" onclick="deleteIngredient(${input.name})">Delete Ingredient</button>
            </div>
            </div>`
        
            const container = document.createElement('div');
            container.innerHTML = containerCode;
            container.classList.add('container');
            container.appendChild(container);
          })
    }
}

const showIngredients = (ingredientData) => {
    const container = document.querySelector('#ingredients');
    container.innerHTML = '';
    ingredientData.ingredients.forEach(ingredient => {
        const containerCode = `
        <div class="container-md">
        <body>${ingredient.name} ${ingredient.quantity} ${ingredient.unit}</body>
        <div>
        <button type="button" class="btn btn-primary" onclick="deleteIngredient(${ingredient.name})">Delete Ingredient</button>
        </div>
        </div>`
        
        const container = document.createElement('div');
        container.innerHTML = containerCode;
        container.classList.add('container');
        container.appendChild(container);
    });
}

const deleteIngredient = (id) => {
    //stuff with database
    alert("The delete button called correctly");
}
