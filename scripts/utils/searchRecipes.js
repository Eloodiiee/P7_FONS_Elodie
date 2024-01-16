///// Recherche par nom, description et ingrédient comme demandé sur le projet. ////

/** La fonction "searchRecipes" a pour but de rechercher des recettes en fonction de plusieurs critères. **/
export function searchRecipes(recipeRequest, allRecipes) {
    /** Je vérifie si "recipeRequest" est vide ou inexistant. **/
    /** Si c'est le cas, je retourne une copie complète de la liste de toutes les recettes. **/
    if (!recipeRequest) {
        return [...allRecipes]
    }
    /** Si "recipeRequest" n'est pas vide, filtre allRecipes. **/
    /** Pour chaque recette dans allRecipes, effectue les vérifications suivantes : **/
    return allRecipes.filter(
        (recipe) =>
            /** Vérifie par nom, description et ingrédient les recettes correspondantes et les retourne. **/
            recipe.name.toLowerCase().includes(recipeRequest) ||
            recipe.description.toLowerCase().includes(recipeRequest) ||
            recipe.ingredients.some((ing) => ing.ingredient.toLowerCase().includes(recipeRequest))
    )
}
/**  **/
