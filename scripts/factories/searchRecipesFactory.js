export function searchRecipes(recipes) {
    const inputSearchBar = document.querySelector("#inputSearchBar")
    let recipeRequest = inputSearchBar.value
    recipeRequest = recipeRequest.toUpperCase()
    let recipesFiltered = []
    for (let i = 0; i < recipes.length; i++) {
        const regexQuery = new RegExp(`${recipeRequest}`)
        let ustensils = recipes[i].ustensils
        let ingredients = recipes[i].ingredients
        if (recipeRequest == "" || regexQuery.test(recipes[i].name.toUpperCase()) || regexQuery.test(recipes[i].appliance.toUpperCase())) {
            recipesFiltered.push(recipes[i])
        }
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i].ingredient.toUpperCase()

            if (regexQuery.test(ingredient)) {
                recipesFiltered.push(recipes[i])
            }
        }
        for (let i = 0; i < ustensils.length; i++) {
            const ustensil = ustensils[i].toUpperCase()
            console.log(ustensil)

            if (regexQuery.test(ustensil)) {
                recipesFiltered.push(recipes[i])
            }
        }
    }
    recipesFiltered = recipesFiltered.filter((item, index) => recipesFiltered.indexOf(item) === index)
    return recipesFiltered
}
