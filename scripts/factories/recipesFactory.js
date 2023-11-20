export function displayRecipes(data) {
    const recipesContainer = document.querySelector(".recipesContainer")
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].id)
        console.log(data[i].servings)
        console.log(data[i].ingredients)
        console.log(data[i].time)
        console.log(data[i].description)
        console.log(data[i].appliance)
        console.log(data[i].ustensils)

        const article = document.createElement("article")
        article.classList.add("recipeCard")
        const recipeImg = document.createElement("img")
        recipeImg.classList.add("recipeImg")
        recipeImg.setAttribute("src", `../../assets/recipes/${data[i].image}`)

        const recipeDetails = document.createElement("div")
        recipeDetails.classList.add("recipeDetails")

        const recipeName = document.createElement("h2")
        recipeName.classList.add("recipeTitle")
        recipeName.textContent = data[i].name

        const recipeDetailsMain = document.createElement("div")
        recipeDetailsMain.classList.add("recipeDetails-main")

        const recipeSubtitle = document.createElement("h3")
        recipeSubtitle.textContent = "Recette"

        const recipeDescription = document.createElement("p")
        recipeDescription.classList.add("recipeDescription")
        recipeDescription.textContent = data[i].description

        const recipeList = document.createElement("div")
        recipeList.classList.add("recipeList")

        const recipeIngredientsSubTitle = document.createElement("h3")
        recipeIngredientsSubTitle.textContent = "Ingrédients"

        const recipeAllIngredients = document.createElement("div")
        recipeAllIngredients.classList.add("recipeAllIngredients")

        data[i].ingredients.forEach((ingredients) => {
            console.log(ingredients.ingredient)
            console.log(ingredients.quantity)
            console.log(ingredients.unit)

            const recipeIngredient = document.createElement("div")
            recipeIngredient.classList.add("recipeIngredient")
            const recipeIngredientName = document.createElement("span")
            recipeIngredientName.classList.add("recipeIngredient-name")
            recipeIngredientName.textContent = ingredients.ingredient
            const recipeIngredientQuantity = document.createElement("span")
            recipeIngredientQuantity.classList.add("recipeIngredient-quantity")
            recipeIngredientQuantity.textContent = ingredients.quantity
            const recipeIngredientUnit = document.createElement("span")
            recipeIngredientQuantity.classList.add("recipeIngredient-unit")
            recipeIngredientUnit.textContent = ingredients.unit
            const recipeIngredientQuantityUnit = document.createElement("div")
            recipeIngredientQuantityUnit.classList.add("recipeIngredientQuantityUnit")

            recipeIngredient.appendChild(recipeIngredientName)
            recipeIngredient.appendChild(recipeIngredientQuantityUnit)
            recipeIngredientQuantityUnit.appendChild(recipeIngredientQuantity)
            recipeIngredientQuantityUnit.appendChild(recipeIngredientUnit)

            recipeAllIngredients.appendChild(recipeIngredient)
        })

        const recipeTime = document.createElement("span")
        recipeTime.classList.add("recipeTime")
        recipeTime.textContent = `${data[i].time}min`

        recipeDetailsMain.appendChild(recipeSubtitle)
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
    }
}
