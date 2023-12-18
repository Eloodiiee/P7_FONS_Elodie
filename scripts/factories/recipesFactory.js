export function displayRecipes(card) {
    card.img.src = `../../assets/recipes/${card.image}`
    card.title.textContent = card.name
    card.chip.textContent = `${card.time}min`
    const recipeSubTitle = document.createElement("h3")
    recipeSubTitle.textContent = "Recette"
    card.detailsContainer.appendChild(recipeSubTitle)
    const recipeDescription = document.createElement("p")
    recipeDescription.classList.add("recipeDescription")
    recipeDescription.textContent = card.description
    card.detailsContainer.appendChild(recipeDescription)
    const recipeList = document.createElement("div")
    recipeList.classList.add("recipeList")
    card.detailsContainer.appendChild(recipeList)
    const recipeIngredientsSubTitle = document.createElement("h3")
    recipeIngredientsSubTitle.textContent = "Ingrédients"
    recipeList.appendChild(recipeIngredientsSubTitle)
    const recipeAllIngredients = document.createElement("div")
    recipeAllIngredients.classList.add("recipeAllIngredients")
    recipeList.appendChild(recipeAllIngredients)
    card.ingredients.forEach((ingredients) => {
        const recipeIngredient = document.createElement("div")
        recipeIngredient.classList.add("recipeIngredient")
        const recipeIngredientName = document.createElement("span")
        recipeIngredientName.classList.add("recipeIngredient-name")
        recipeIngredientName.textContent = ingredients.ingredient

        const recipeIngredientQuantityUnit = document.createElement("div")
        recipeIngredientQuantityUnit.classList.add("recipeIngredientQuantityUnit")
        const recipeIngredientQuantity = document.createElement("span")
        recipeIngredientQuantity.classList.add("recipeIngredient-quantity")
        const recipeIngredientUnit = document.createElement("span")
        recipeIngredientUnit.classList.add("recipeIngredient-unit")
        if (ingredients.quantity == undefined && ingredients.unit == undefined) {
            recipeIngredientQuantity.textContent = " "
            recipeIngredientUnit.textContent = " "
        }
        if (ingredients.quantity !== undefined && ingredients.unit == undefined) {
            recipeIngredientQuantity.textContent = `${ingredients.quantity}`
            recipeIngredientUnit.textContent = " "
        }
        if (ingredients.unit !== undefined && ingredients.quantity !== undefined) {
            recipeIngredientQuantity.textContent = `${ingredients.quantity}`
            recipeIngredientUnit.textContent = ingredients.unit
        }

        recipeIngredient.appendChild(recipeIngredientName)
        recipeIngredient.appendChild(recipeIngredientQuantityUnit)
        recipeIngredientQuantityUnit.appendChild(recipeIngredientQuantity)
        recipeIngredientQuantityUnit.appendChild(recipeIngredientUnit)
        recipeAllIngredients.appendChild(recipeIngredient)
    })
}
