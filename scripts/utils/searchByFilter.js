let recipesFiltered = []

export function searchByIngredient(recipeRequest, allRecipes) {
    if (!recipeRequest || !recipeRequest.length) {
        recipesFiltered = [...allRecipes]
    } else {
        recipesFiltered = allRecipes.filter((recipe) => recipe.ingredients.find((ing) => ing.ingredient.toLowerCase().includes(recipeRequest)))
    }
    return recipesFiltered
}
export function searchByAppliance(recipeRequest, allRecipes) {
    if (!recipeRequest || !recipeRequest.length) {
        recipesFiltered = [...allRecipes]
    } else {
        recipesFiltered = allRecipes.filter((recipe) => recipe.appliance.toLowerCase().includes(recipeRequest))
    }
    return recipesFiltered
}
export function searchByUstensil(recipeRequest, allRecipes) {
    if (!recipeRequest || !recipeRequest.length) {
        recipesFiltered = [...allRecipes]
    } else {
        recipesFiltered = allRecipes.filter((recipe) => recipe.ustensils.find((ust) => ust.toLowerCase().includes(recipeRequest)))
    }
    return recipesFiltered
}
