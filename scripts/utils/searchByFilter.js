export function searchByIngredient(recipeRequest, allRecipes) {
    let recipesFiltered = []
    for (let i = 0; i < allRecipes.length; i++) {
        const recipe = allRecipes[i]
        const ingredients = recipe.ingredients
        for (let ingIndex = 0; ingIndex < ingredients.length; ingIndex++) {
            const ingredient = ingredients[ingIndex].ingredient
            if (ingredient.toLowerCase().includes(recipeRequest)) {
                recipesFiltered.splice(0, 0, recipe)
            }
        }
    }
    recipesFiltered = [...new Set(recipesFiltered)]
    console.log(recipesFiltered)
    return recipesFiltered
}
export function searchByAppliance(recipeRequest, allRecipes) {
    let recipesFiltered = []
    for (let i = 0; i < allRecipes.length; i++) {
        const recipe = allRecipes[i]
        if (recipe.appliance.toLowerCase().includes(recipeRequest)) {
            recipesFiltered.splice(0, 0, recipe)
        }
    }
    console.log(recipesFiltered)
    return recipesFiltered
}
export function searchByUstensil(recipeRequest, allRecipes) {
    let recipesFiltered = []
    for (let i = 0; i < allRecipes.length; i++) {
        const recipe = allRecipes[i]
        const ustensils = recipe.ustensils
        for (let ustIndex = 0; ustIndex < ustensils.length; ustIndex++) {
            const ustensil = ustensils[ustIndex]
            if (ustensil.toLowerCase().includes(recipeRequest)) {
                recipesFiltered.splice(0, 0, recipe)
            }
        }
    }
    recipesFiltered = [...new Set(recipesFiltered)]
    console.log(recipesFiltered)
    return recipesFiltered
}
