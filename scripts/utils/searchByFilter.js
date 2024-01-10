/** La fonction "searchByFilter" filtre les recettes en fonction de quel filtre est utilisé. **/
export function searchByFilter(recipeRequest, allRecipes, functionSearch) {
    /** Je vérifie si "recipeRequest" est vide ou inexistant. Si c'est le cas, **/
    if (!recipeRequest || !recipeRequest.length) {
        /** Je retourne une copie complète de la liste de toutes les recettes. **/
        return [...allRecipes]
    }

    /** Si "recipeRequest" n'est pas vide, la fonction "functionSearch" s'exécute **/
    /** pour filtrer et retourner les recettes correspondantes. **/
    return functionSearch(recipeRequest, allRecipes)
}

/** La fonction "searchByIngredient" a pour but de rechercher des recettes par ingrédient. **/
export function searchByIngredient(recipeRequest, allRecipes) {
    /** Filtre "allRecipes" pour ne garder que les recettes dont les ingrédients correspondent à "recipeRequest". **/
    return allRecipes.filter((recipe) => recipe.ingredients.find((ing) => ing.ingredient.toLowerCase().includes(recipeRequest)))
}

/** La fonction "searchByAppliance" a pour but de rechercher des recettes par appareil. **/
export function searchByAppliance(recipeRequest, allRecipes) {
    /** Filtre "allRecipes" pour ne garder que les recettes dont l'appareil correspond à "recipeRequest". **/
    return allRecipes.filter((recipe) => recipe.appliance.toLowerCase().includes(recipeRequest))
}

/** La fonction "searchByUstensil" a pour but de rechercher des recettes par ustensile. **/
export function searchByUstensil(recipeRequest, allRecipes) {
    /** Filtre "allRecipes" pour ne garder que les recettes dont les ustensiles correspondent à "recipeRequest". **/
    return allRecipes.filter((recipe) => recipe.ustensils.find((ust) => ust.toLowerCase().includes(recipeRequest)))
}
