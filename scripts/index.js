import { recipes } from "../data/recipes.js"
import { displayCards } from "./factories/cardFactory.js"
import { displayRecipes } from "./factories/cardFactory.js"
import { searchByIngredient } from "./utils/searchByFilter.js"
import { searchByAppliance } from "./utils/searchByFilter.js"
import { searchByUstensil } from "./utils/searchByFilter.js"
import { searchRecipes } from "./utils/searchRecipes.js"

/*
import { searchByIngredient } from "./factories/searchRecipesFactory.js"
import { searchByAppliance } from "./factories/searchRecipesFactory.js"
import { searchByUstensil } from "./factories/searchRecipesFactory.js" */

let card = []
let allCards = []
let recipesJSON = []
let recipesFiltered = []
let recipeRequest = ""
const inputSearchBar = document.querySelector("#inputSearchBar")
const recipesContainer = document.querySelector(".recipesContainer")
const numberOfRecipe = document.querySelector(".number_of_recipes")

recipesJSON = JSON.stringify(recipes)
recipesJSON = JSON.parse(recipesJSON)

function fillContainer(recipesToBeDisplayed) {
    recipesContainer.innerHTML = ""
    recipesToBeDisplayed.forEach((recipe) => {
        card = displayCards(recipe)
        recipesContainer.appendChild(card.element)
        allCards.splice(0, 0, card)
        displayRecipes(card)
    })
    allCards.reverse()
    console.log(allCards)
}
fillContainer(recipesJSON)

inputSearchBar.addEventListener("input", (e) => {
    recipeRequest = e.target.value.toLowerCase()
    searchBy(recipeRequest, searchRecipes)
})
function searchBy(recipeRequest, functionSearch) {
    recipesFiltered = functionSearch(recipeRequest, recipesJSON)
    recipesFiltered.reverse()
    allCards = []
    fillContainer(recipesFiltered)
}
const advancedFilters = document.querySelectorAll(".advancedFilter")

advancedFilters.forEach((advancedFilter) => {
    const chevron = advancedFilter.querySelector(".fa-chevron-down")
    const filterList = advancedFilter.querySelector(".filterSearchList")
    const inputTags = advancedFilter.querySelectorAll(".input-tag")
    advancedFilter.children[0].addEventListener("click", () => {
        chevron.classList.toggle("rotate")
        filterList.classList.toggle("open")
        inputTags.forEach((inputTag) => {
            switch (inputTag.id) {
                case (inputTag.id = "ingredients"):
                    let allIngredients = []
                    let ingredientsList = []
                    const liListIng = document.querySelector("#ingredients-list")
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
                        liListIng.appendChild(li)
                    }
                    inputTag.addEventListener("input", (e) => {
                        recipeRequest = e.target.value.toLowerCase()
                        searchBy(recipeRequest, searchByIngredient)
                    })
                    break
                case (inputTag.id = "appliances"):
                    let allAppliances = []
                    let appliancesList = []
                    const liListApp = document.querySelector("#appliances-list")
                    for (let i = 0; i < recipes.length; i++) {
                        allAppliances.push(recipes[i].appliance)
                    }
                    appliancesList = [...new Set(allAppliances)]
                    for (let i = 0; i < appliancesList.length; i++) {
                        const appliance = appliancesList[i]
                        const li = document.createElement("li")
                        li.textContent = appliance
                        liListApp.appendChild(li)
                    }
                    inputTag.addEventListener("input", (e) => {
                        recipeRequest = e.target.value.toLowerCase()
                        searchBy(recipeRequest, searchByAppliance)
                    })
                    break
                case (inputTag.id = "ustensils"):
                    let allUstensils = []
                    let ustensilsList = []
                    const liListUst = document.querySelector("#ustensils-list")
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
                        liListUst.appendChild(li)
                    }
                    inputTag.addEventListener("input", (e) => {
                        recipeRequest = e.target.value.toLowerCase()
                        searchBy(recipeRequest, searchByUstensil)
                    })
                    break
            }
        })
    })
})
