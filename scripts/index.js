import { recipes } from "../data/recipes.js"
import { displayRecipes } from "./factories/recipesFactory.js"
import { searchRecipes } from "./factories/searchRecipesFactory.js"
import { searchByIngredient } from "./factories/searchRecipesFactory.js"
import { searchByAppliance } from "./factories/searchRecipesFactory.js"
import { searchByUstensil } from "./factories/searchRecipesFactory.js"

displayRecipes(recipes)
let recipesFiltered = []
let recipesRequest = ""
const inputSearchBar = document.querySelector("#inputSearchBar")
const recipesContainer = document.querySelector(".recipesContainer")

inputSearchBar.addEventListener("input", (e) => {
    recipesRequest = e.target.value
    let recipeRequestUpperCased = recipesRequest.toUpperCase()
    const regexQuery = new RegExp(`${recipeRequestUpperCased}`)
    recipesFiltered = searchRecipes(recipes, recipesRequest, regexQuery)
    displayFilteredRecipes(recipesFiltered)
})
function displayFilteredRecipes() {
    recipesContainer.innerHTML = ""
    displayRecipes(recipesFiltered)
}
const advancedFilters = document.querySelectorAll(".advancedFilter")
const filterTitlesIngredients = advancedFilters[0].querySelector(".advancedFilter-nameChevron")
const filterTitlesAppliances = advancedFilters[1].querySelector(".advancedFilter-nameChevron")
const filterTitlesUstensils = advancedFilters[2].querySelector(".advancedFilter-nameChevron")

filterTitlesIngredients.addEventListener("click", () => {
    const chevron = advancedFilters[0].querySelector(".fa-chevron-down")
    const filterList = advancedFilters[0].querySelector(".li-list")
    const ingredientsInputTag = advancedFilters[0].querySelector(".input-tag")
    chevron.classList.toggle("rotate")
    filterList.classList.toggle("open")
    ingredientsInputTag.addEventListener("input", (e) => {
        recipesRequest = e.target.value
        let recipeRequestUpperCased = recipesRequest.toUpperCase()
        const regexQuery = new RegExp(`${recipeRequestUpperCased}`)
        recipesFiltered = searchByIngredient(recipes, recipesRequest, regexQuery)
        displayFilteredRecipes(recipesFiltered)
    })
})
filterTitlesAppliances.addEventListener("click", () => {
    const chevron = advancedFilters[1].querySelector(".fa-chevron-down")
    const filterList = advancedFilters[1].querySelector(".li-list")
    const appliancesInputTag = advancedFilters[1].querySelector(".input-tag")
    chevron.classList.toggle("rotate")
    filterList.classList.toggle("open")
    appliancesInputTag.addEventListener("input", (e) => {
        recipesRequest = e.target.value
        let recipeRequestUpperCased = recipesRequest.toUpperCase()
        const regexQuery = new RegExp(`${recipeRequestUpperCased}`)
        recipesFiltered = searchByAppliance(recipes, recipesRequest, regexQuery)
        displayFilteredRecipes(recipesFiltered)
    })
})
filterTitlesUstensils.addEventListener("click", () => {
    const chevron = advancedFilters[2].querySelector(".fa-chevron-down")
    const filterList = advancedFilters[2].querySelector(".li-list")
    const ustensilsInputTag = advancedFilters[2].querySelector(".input-tag")
    chevron.classList.toggle("rotate")
    filterList.classList.toggle("open")
    ustensilsInputTag.addEventListener("input", (e) => {
        recipesRequest = e.target.value
        let recipeRequestUpperCased = recipesRequest.toUpperCase()
        const regexQuery = new RegExp(`${recipeRequestUpperCased}`)
        recipesFiltered = searchByUstensil(recipes, recipesRequest, regexQuery)
        displayFilteredRecipes(recipesFiltered)
    })
})
