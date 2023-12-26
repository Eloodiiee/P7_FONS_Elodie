export function displayCards(data) {
    const card = document.createElement("article")
    card.classList.add("recipeCard")
    const recipeDetailMain = document.createElement("div")
    recipeDetailMain.classList.add("recipeDetails-main")

    const cardImg = document.createElement("img")
    cardImg.src = `../../assets/recipes/${data.image}`
    cardImg.classList.add("recipeImg")
    const cardName = document.createElement("h2")
    cardName.textContent = data.name
    cardName.classList.add("recipeTitle")
    const cardChip = document.createElement("span")
    cardChip.textContent = `${data.time}min`
    cardChip.classList.add("recipeTime")

    const recipeSubTitle = document.createElement("h3")
    recipeSubTitle.textContent = "Recette"
    const cardDetailsContainer = document.createElement("div")
    cardDetailsContainer.appendChild(recipeSubTitle)
    cardDetailsContainer.classList.add("recipeDetails")
    const recipeDescription = document.createElement("p")
    recipeDescription.classList.add("recipeDescription")
    recipeDescription.textContent = data.description
    cardDetailsContainer.appendChild(recipeDescription)
    const recipeList = document.createElement("div")
    recipeList.classList.add("recipeList")
    cardDetailsContainer.appendChild(recipeList)
    const recipeIngredientsSubTitle = document.createElement("h3")
    recipeIngredientsSubTitle.textContent = "Ingrédients"
    recipeList.appendChild(recipeIngredientsSubTitle)
    const recipeAllIngredients = document.createElement("div")
    recipeAllIngredients.classList.add("recipeAllIngredients")
    recipeList.appendChild(recipeAllIngredients)
    data.ingredients.forEach((ingredients) => {
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
            recipeIngredientQuantity.textContent = `${ingredients.quantity} `
            recipeIngredientUnit.textContent = ingredients.unit
        }

        recipeIngredient.appendChild(recipeIngredientName)
        recipeIngredient.appendChild(recipeIngredientQuantityUnit)
        recipeIngredientQuantityUnit.appendChild(recipeIngredientQuantity)
        recipeIngredientQuantityUnit.appendChild(recipeIngredientUnit)
        recipeAllIngredients.appendChild(recipeIngredient)
    })
    card.appendChild(cardImg)
    card.appendChild(cardDetailsContainer)
    cardDetailsContainer.appendChild(cardName)
    cardName.appendChild(recipeDetailMain)
    card.appendChild(cardChip)
    return card
}
