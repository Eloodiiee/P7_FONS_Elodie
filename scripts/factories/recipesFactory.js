export function displayRecipes(data) {
    const recipesContainer = document.querySelector(".recipesContainer")
    data.forEach((recipe) => {
        /*   console.log(recipe.id)
        console.log(recipe.servings)
        console.log(recipe.appliance)
        console.log(recipe.ustensils) */
        const article = document.createElement("article")
        article.classList.add("recipeCard")
        const recipeImg = document.createElement("img")
        recipeImg.classList.add("recipeImg")
        recipeImg.setAttribute("src", `../../assets/recipes/${recipe.image}`)
        const recipeDetails = document.createElement("div")
        recipeDetails.classList.add("recipeDetails")

        const recipeName = document.createElement("h2")
        recipeName.classList.add("recipeTitle")
        recipeName.textContent = recipe.name
        const recipeDetailsMain = document.createElement("div")
        recipeDetailsMain.classList.add("recipeDetails-main")

        const recipeSubTitle = document.createElement("h3")
        recipeSubTitle.textContent = "Recette"

        const recipeDescription = document.createElement("p")
        recipeDescription.classList.add("recipeDescription")
        recipeDescription.textContent = recipe.description
        const recipeList = document.createElement("div")
        recipeList.classList.add("recipeList")

        const recipeIngredientsSubTitle = document.createElement("h3")
        recipeIngredientsSubTitle.textContent = "Ingrédients"

        const recipeAllIngredients = document.createElement("div")
        recipeAllIngredients.classList.add("recipeAllIngredients")

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
                recipeIngredientQuantity.textContent = ` `
                recipeIngredientUnit.textContent = ` `
            }
            if (ingredients.quantity !== undefined && ingredients.unit == undefined) {
                recipeIngredientQuantity.textContent = `${ingredients.quantity} `
                recipeIngredientUnit.textContent = ` `
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
        const recipeTime = document.createElement("span")
        recipeTime.classList.add("recipeTime")
        recipeTime.textContent = `${recipe.time}min`

        recipeDetailsMain.appendChild(recipeSubTitle)
        recipeDetailsMain.appendChild(recipeDescription)
        recipeDetails.appendChild(recipeName)
        recipeDetails.appendChild(recipeDetailsMain)
        recipeList.appendChild(recipeIngredientsSubTitle)
        recipeList.appendChild(recipeAllIngredients)
        recipeDetails.appendChild(recipeList)
        article.appendChild(recipeImg)
        article.appendChild(recipeDetails)
        article.appendChild(recipeTime)
        recipesContainer.appendChild(article)
    })
    /*    for (let i = 0; i < data.length; i++) {
        const element = data[i]
        console.log(element.name)
    } */
}
