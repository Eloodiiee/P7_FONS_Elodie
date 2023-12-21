export function displayCards(data) {
    const cardsContainer = document.querySelector("[data-cards-container]")
    const cardTemplate = document.querySelector("[data-template]")
    const card = cardTemplate.content.cloneNode(true).children[0]
    const cardImg = card.querySelector("[data-img]")
    const cardName = card.querySelector("[data-name]")
    const cardDetailsContainer = card.querySelector("[data-details-container]")
    const cardChip = card.querySelector("[data-chip]")
    let oneCard = {}

    return (oneCard = {
        element: card,
        img: cardImg,
        title: cardName,
        detailsContainer: cardDetailsContainer,
        chip: cardChip,
        image: data.image,
        name: data.name,
        time: data.time,
        description: data.description,
        ingredients: data.ingredients,
        ustensils: data.ustensils,
        appliance: data.appliance,
    })
}
export function displayRecipes(data) {
    data.img.src = `../../assets/recipes/${data.image}`
    data.title.textContent = data.name
    data.chip.textContent = `${data.time}min`
    const recipeSubTitle = document.createElement("h3")
    recipeSubTitle.textContent = "Recette"
    data.detailsContainer.appendChild(recipeSubTitle)
    const recipeDescription = document.createElement("p")
    recipeDescription.classList.add("recipeDescription")
    recipeDescription.textContent = data.description
    data.detailsContainer.appendChild(recipeDescription)
    const recipeList = document.createElement("div")
    recipeList.classList.add("recipeList")
    data.detailsContainer.appendChild(recipeList)
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
}
