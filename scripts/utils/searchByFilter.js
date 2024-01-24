import { removeAccents } from "./removeAccent.js"
// La fonction "searchByFilter" filtre les recettes en fonction de quel filtre est utilisé. /
export function searchByFilter(recipe, selectedCategoryTags, functionSearch) {
    // Je vérifie si "recipe" est vide ou inexistant. Si c'est le cas, /
    if (!recipe) {
        // Je retourne une copie complète de la liste de toutes les recettes. /
        return [...selectedCategoryTags]
    }

    // Si "recipe" n'est pas vide, la fonction "functionSearch" s'exécute /
    // pour filtrer et retourner les recettes correspondantes. /
    return functionSearch(recipe, selectedCategoryTags)
}

// La fonction "searchByIngredient" a pour but de rechercher des recettes par ingrédient. /
export function searchByIngredient(recipe, selectedIngredientTags) {
    // Filtre "selectedIngredientTags" pour ne garder que les recettes dont les ingrédients correspondent à "recipe". /
    return selectedIngredientTags.every((tag) => recipe.ingredients.some((ing) => removeAccents(ing.ingredient).toLowerCase().includes(tag.toLowerCase())))
}

// La fonction "searchByAppliance" a pour but de rechercher des recettes par appareil. /
export function searchByAppliance(recipe, selectedApplianceTags) {
    // Filtre "selectedApplianceTags" pour ne garder que les recettes dont l'appareil correspond à "recipe". /
    return selectedApplianceTags.every((tag) => removeAccents(recipe.appliance).toLowerCase().includes(tag.toLowerCase()))
}

// La fonction "searchByUstensil" a pour but de rechercher des recettes par ustensile. /
export function searchByUstensil(recipe, selectedUstensilTags) {
    // Filtre "selectedUstensilTags" pour ne garder que les recettes dont les ustensiles correspondent à "recipe". /
    return selectedUstensilTags.every((tag) => recipe.ustensils.some((ustensil) => removeAccents(ustensil).toLowerCase().includes(tag.toLowerCase())))
}
