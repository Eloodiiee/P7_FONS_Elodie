import { searchByIngredient } from "./searchByFilter.js"
import { searchByAppliance } from "./searchByFilter.js"
import { searchByUstensil } from "./searchByFilter.js"

export function searchRecipes(recipeRequest, allRecipes) {
    let recipesFiltered = []
    let searchedRecipes = []
    for (let i = 0; i < allRecipes.length; i++) {
        const recipe = allRecipes[i]
        if (recipe.name.toLowerCase().includes(recipeRequest)) {
            recipesFiltered.splice(0, 0, recipe)
        }
    }
    searchedRecipes = searchByIngredient(recipeRequest, allRecipes)
    recipesFiltered.splice(0, 0, searchedRecipes)
    searchedRecipes = searchByAppliance(recipeRequest, allRecipes)
    recipesFiltered.splice(0, 0, searchedRecipes)
    searchedRecipes = searchByUstensil(recipeRequest, allRecipes)
    recipesFiltered.splice(0, 0, searchedRecipes)
    recipesFiltered = recipesFiltered.flat()
    recipesFiltered = [...new Set(recipesFiltered)]
    return recipesFiltered
}
