export function displayRecipes(data) {
    const recipeCardTemplate = document.querySelector("[data-recipe-template]")
    const recipeCardsContainer = document.querySelector("[data-recipe-cards-container]")

    data.forEach((recipe) => {
        const card = recipeCardTemplate.content.cloneNode(true).children[0]
        const recipeImg = card.querySelector("[data-img]")
        const recipeName = card.querySelector("[data-name]")
        const recipeDescription = card.querySelector("[data-description]")
        const recipeAllIngredients = card.querySelector("[data-all-ingredients]")
        const recipeTime = card.querySelector("[data-time]")
        recipeImg.src = `assets/recipes/${recipe.image}`
        recipeName.textContent = recipe.name
        recipeDescription.textContent = recipe.description
        recipe.ingredients.forEach((ingredients) => {
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
                recipeIngredientQuantity.textContent = ""
                recipeIngredientUnit.textContent = ""
            }
            if (ingredients.quantity !== undefined && ingredients.unit == undefined) {
                recipeIngredientQuantity.textContent = `${ingredients.quantity}`
                recipeIngredientUnit.textContent = ""
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
        recipeTime.textContent = `${recipe.time}min`
        recipeCardsContainer.appendChild(card)
    })
}
