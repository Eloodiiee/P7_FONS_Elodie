export function searchRecipes(recipeRequest, allRecipes) {
    let recipesFiltered = []
    if (!recipeRequest || !recipeRequest.length) {
        recipesFiltered = [...allRecipes]
    } else {
        recipesFiltered = allRecipes.filter(
            (recipe) =>
                recipe.name.toLowerCase().includes(recipeRequest) ||
                recipe.ingredients.find((ing) => ing.ingredient.toLowerCase().includes(recipeRequest)) ||
                recipe.appliance.toLowerCase().includes(recipeRequest) ||
                recipe.ustensils.find((ust) => ust.toLowerCase().includes(recipeRequest))
        )
    }
    return recipesFiltered
}
