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
const numberOfRecipe = document.querySelector(".number_of_recipes")

inputSearchBar.addEventListener("input", (e) => {
    recipesRequest = e.target.value
    let recipeRequestUpperCased = recipesRequest.toUpperCase()
    const regexQuery = new RegExp(`${recipeRequestUpperCased}`)
    recipesFiltered = searchRecipes(recipes, recipesRequest, regexQuery)
    numberOfRecipe.textContent = `${recipesFiltered.length} recettes`
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
    const filterList = advancedFilters[0].querySelector(".filterSearchList")
    const ingredientsInputTag = advancedFilters[0].querySelector(".input-tag")
    chevron.classList.toggle("rotate")
    filterList.classList.toggle("open")
    let allIngredients = []
    let ingredientsList = []
    const liList = document.querySelector("#ingredients-list")
    for (let i = 0; i < recipes.length; i++) {
        let ingredients = recipes[i].ingredients
        for (let ingredientsIndex = 0; ingredientsIndex < ingredients.length; ingredientsIndex++) {
            const ingredient = ingredients[ingredientsIndex].ingredient
            allIngredients.push(ingredient)
        }
    }
    ingredientsList = [...new Set(allIngredients)]
    for (let i = 0; i < ingredientsList.length; i++) {
        const ingredient = ingredientsList[i]
        const li = document.createElement("li")
        li.textContent = ingredient
        liList.appendChild(li)
    }
    ingredientsInputTag.addEventListener("input", (e) => {
        recipesRequest = e.target.value
        let recipeRequestUpperCased = recipesRequest.toUpperCase()
        const regexQuery = new RegExp(`${recipeRequestUpperCased}`)
        recipesFiltered = searchByIngredient(recipes, recipesRequest, regexQuery)
        numberOfRecipe.textContent = `${recipesFiltered.length} recettes`
        displayFilteredRecipes(recipesFiltered)
    })
})
filterTitlesAppliances.addEventListener("click", () => {
    const chevron = advancedFilters[1].querySelector(".fa-chevron-down")
    const filterList = advancedFilters[1].querySelector(".filterSearchList")
    const appliancesInputTag = advancedFilters[1].querySelector(".input-tag")
    chevron.classList.toggle("rotate")
    filterList.classList.toggle("open")
    let allAppliances = []
    let appliancesList = []
    const liList = document.querySelector("#appliances-list")
    for (let i = 0; i < recipes.length; i++) {
        allAppliances.push(recipes[i].appliance)
    }
    appliancesList = [...new Set(allAppliances)]
    for (let i = 0; i < appliancesList.length; i++) {
        const appliance = appliancesList[i]
        const li = document.createElement("li")
        li.textContent = appliance
        liList.appendChild(li)
    }
    appliancesInputTag.addEventListener("input", (e) => {
        recipesRequest = e.target.value
        let recipeRequestUpperCased = recipesRequest.toUpperCase()
        const regexQuery = new RegExp(`${recipeRequestUpperCased}`)
        recipesFiltered = searchByAppliance(recipes, recipesRequest, regexQuery)
        numberOfRecipe.textContent = `${recipesFiltered.length} recettes`
        displayFilteredRecipes(recipesFiltered)
    })
})
filterTitlesUstensils.addEventListener("click", () => {
    const chevron = advancedFilters[2].querySelector(".fa-chevron-down")
    const filterList = advancedFilters[2].querySelector(".filterSearchList")
    const ustensilsInputTag = advancedFilters[2].querySelector(".input-tag")
    chevron.classList.toggle("rotate")
    filterList.classList.toggle("open")
    let allUstensils = []
    let ustensilsList = []
    const liList = document.querySelector("#ustensils-list")
    for (let i = 0; i < recipes.length; i++) {
        let ustensils = recipes[i].ustensils
        for (let ustensilsIndex = 0; ustensilsIndex < ustensils.length; ustensilsIndex++) {
            const ustensil = ustensils[ustensilsIndex]
            allUstensils.push(ustensil)
        }
    }
    ustensilsList = [...new Set(allUstensils)]
    for (let i = 0; i < ustensilsList.length; i++) {
        const ustensil = ustensilsList[i]
        const li = document.createElement("li")
        li.textContent = ustensil
        liList.appendChild(li)
    }
    ustensilsInputTag.addEventListener("input", (e) => {
        recipesRequest = e.target.value
        let recipeRequestUpperCased = recipesRequest.toUpperCase()
        const regexQuery = new RegExp(`${recipeRequestUpperCased}`)
        recipesFiltered = searchByUstensil(recipes, recipesRequest, regexQuery)
        numberOfRecipe.textContent = `${recipesFiltered.length} recettes`
        displayFilteredRecipes(recipesFiltered)
    })
})
