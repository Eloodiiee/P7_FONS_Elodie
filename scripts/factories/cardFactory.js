import { createElementWithClass } from "../utils/createHTMLElement.js"

/** La fonction "displayCards" sert à afficher les détails d'une recette sous forme de carte. **/
export function displayCards(data) {
    /** Je crée la carte de la recette. **/
    const card = createElementWithClass("article", "recipeCard")
    /** Je crée et configure l'image de la recette. **/
    const cardImg = createElementWithClass("img", "recipeImg")
    cardImg.src = `../../assets/recipes/${data.image}`

    /** Je crée le conteneur pour les détails de la recette. **/
    const cardDetailsContainer = createElementWithClass("div", "recipeDetails")
    /** Je crée et définit le titre de la recette. **/
    const cardName = createElementWithClass("h2", "recipeTitle", "", data.name)
    /** Je crée et définit le temps de préparation de la recette. **/
    const cardChip = createElementWithClass("span", "recipeTime", "", `${data.time}min`)

    /** Je crée le conteneur principal pour les détails de la recette. **/
    const recipeDetailMain = createElementWithClass("div", "recipeDetails-main")
    /** Je crée un sous-titre pour la section des détails de la recette. **/
    const recipeSubTitle = createElementWithClass("h3", "", "", "Recette")
    /** Je crée et définit la description de la recette. **/
    const recipeDescription = createElementWithClass("p", "recipeDescription", "", data.description)

    /** Je crée le conteneur pour la liste des ingrédients. **/
    const recipeList = createElementWithClass("div", "recipeList")
    /** Je crée un sous-titre pour la liste des ingrédients. **/
    const recipeIngredientsSubTitle = createElementWithClass("h3", "", "", "Ingrédients")
    /** Je crée le conteneur pour tous les ingrédients. **/
    const recipeAllIngredients = createElementWithClass("div", "recipeAllIngredients")

    /** Je parcours chaque ingrédient de la recette et crée les éléments correspondants. **/
    for (let i = 0; i < data.ingredients.length; i++) {
        const ingredients = data.ingredients[i]
        const recipeIngredient = createElementWithClass("div", "recipeIngredient")
        const recipeIngredientName = createElementWithClass("span", "recipeIngredient-name", "", ingredients.ingredient)

        /** Je gère l'affichage des quantités et unités des ingrédients. **/
        const quantity = ingredients.quantity ?? ""
        const unit = ingredients.unit ?? ""
        const recipeIngredientQuantityUnit = createElementWithClass("div", "recipeIngredientQuantityUnit")
        recipeIngredientQuantityUnit.textContent = `${quantity} ${unit}`.trim()

        /** J'ajoute les éléments d'ingrédient au conteneur d'ingrédients. **/
        recipeIngredient.appendChild(recipeIngredientName)
        recipeIngredient.appendChild(recipeIngredientQuantityUnit)
        recipeAllIngredients.appendChild(recipeIngredient)
    }

    /** J'assemble la structure de la carte de recette. **/
    card.appendChild(cardImg)
    cardDetailsContainer.appendChild(cardName)
    recipeDetailMain.appendChild(recipeSubTitle)
    recipeDetailMain.appendChild(recipeDescription)
    recipeDetailMain.appendChild(recipeList)
    recipeList.appendChild(recipeIngredientsSubTitle)
    recipeList.appendChild(recipeAllIngredients)
    cardDetailsContainer.appendChild(recipeDetailMain)
    card.appendChild(cardDetailsContainer)
    card.appendChild(cardChip)

    /** Je retourne l'élément de carte de recette complet. **/
    return card
}

/* export function displayCards(data) {
    const card = document.createElement("article")
    card.classList.add("recipeCard")

    const cardImg = document.createElement("img")
    cardImg.src = `../../assets/recipes/${data.image}`
    cardImg.classList.add("recipeImg")

    const cardDetailsContainer = document.createElement("div")
    cardDetailsContainer.classList.add("recipeDetails")

    const cardName = document.createElement("h2")
    cardName.textContent = data.name
    cardName.classList.add("recipeTitle")

    const cardChip = document.createElement("span")
    cardChip.textContent = `${data.time}min`
    cardChip.classList.add("recipeTime")

    const recipeDetailMain = document.createElement("div")
    recipeDetailMain.classList.add("recipeDetails-main")

    const recipeSubTitle = document.createElement("h3")
    recipeSubTitle.textContent = "Recette"

    const recipeDescription = document.createElement("p")
    recipeDescription.classList.add("recipeDescription")
    recipeDescription.textContent = data.description

    const recipeList = document.createElement("div")
    recipeList.classList.add("recipeList")

    const recipeIngredientsSubTitle = document.createElement("h3")
    recipeIngredientsSubTitle.textContent = "Ingrédients"

    const recipeAllIngredients = document.createElement("div")
    recipeAllIngredients.classList.add("recipeAllIngredients")

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
    recipeDetailMain.appendChild(recipeSubTitle)
    recipeDetailMain.appendChild(recipeDescription)
    recipeDetailMain.appendChild(recipeList)
    recipeList.appendChild(recipeIngredientsSubTitle)
    recipeList.appendChild(recipeAllIngredients)

    cardDetailsContainer.appendChild(recipeDetailMain)
    card.appendChild(cardChip)
    return card
}
 */
