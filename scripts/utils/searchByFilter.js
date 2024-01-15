///// allRecipes remplacé par recipesFiltered ////

/** La fonction "searchByFilter" filtre les recettes en fonction de quel filtre est utilisé. **/
export function searchByFilter(recipeRequest, recipesFiltered, functionSearch) {
    /** Je vérifie si "recipeRequest" est vide ou inexistant. Si c'est le cas, **/
    if (!recipeRequest || !recipeRequest.length) {
        /** Je retourne une copie de la liste des recettes filtrées. **/
        return [...recipesFiltered]
    }

    /** Si "recipeRequest" n'est pas vide, la fonction "functionSearch" s'exécute **/
    /** pour filtrer et retourner les recettes correspondantes. **/
    return functionSearch(recipeRequest, recipesFiltered)
}

/** La fonction "searchByIngredient" a pour but de rechercher des recettes par ingrédient. **/
export function searchByIngredient(recipeRequest, recipesFiltered) {
    /** Filtre "recipesFiltered" pour ne garder que les recettes dont les ingrédients correspondent à "recipeRequest". **/
    return recipesFiltered.filter((recipe) => recipe.ingredients.find((ing) => ing.ingredient.toLowerCase().includes(recipeRequest)))
}

/** La fonction "searchByAppliance" a pour but de rechercher des recettes par appareil. **/
export function searchByAppliance(recipeRequest, recipesFiltered) {
    /** Filtre "recipesFiltered" pour ne garder que les recettes dont l'appareil correspond à "recipeRequest". **/
    return recipesFiltered.filter((recipe) => recipe.appliance.toLowerCase().includes(recipeRequest))
}

/** La fonction "searchByUstensil" a pour but de rechercher des recettes par ustensile. **/
export function searchByUstensil(recipeRequest, recipesFiltered) {
    /** Filtre "recipesFiltered" pour ne garder que les recettes dont les ustensiles correspondent à "recipeRequest". **/
    return recipesFiltered.filter((recipe) => recipe.ustensils.find((ust) => ust.toLowerCase().includes(recipeRequest)))
}
