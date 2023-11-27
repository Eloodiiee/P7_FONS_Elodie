export function searchRecipes(recipes) {
    const inputSearchBar = document.querySelector("#inputSearchBar")
    let recipeRequest = inputSearchBar.value
    recipeRequest = recipeRequest.toUpperCase()
    let recipesFiltered = []
    for (let i = 0; i < recipes.length; i++) {
        const regexQuery = new RegExp(`${recipeRequest}`)
        if (recipeRequest == "") {
            recipesFiltered.push(recipes[i])
        }
        if (regexQuery.test(recipes[i].name.toUpperCase())) {
            recipesFiltered.push(recipes[i])
        }
        if (regexQuery.test(recipes[i].appliance.toUpperCase())) {
            recipesFiltered.push(recipes[i])
        }
    }
    recipesFiltered = recipesFiltered.filter((item, index) => recipesFiltered.indexOf(item) === index)
    return recipesFiltered
}
