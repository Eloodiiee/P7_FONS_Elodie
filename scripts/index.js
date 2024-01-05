import { recipes } from "../data/recipes.js"
import { displayCards } from "./factories/cardFactory.js"
import { searchByIngredient } from "./utils/searchByFilter.js"
import { searchByAppliance } from "./utils/searchByFilter.js"
import { searchByUstensil } from "./utils/searchByFilter.js"
import { searchRecipes } from "./utils/searchRecipes.js"
import { createTag } from "./utils/createTag.js"

let card = []
let allCards = []
let recipesJSON = []
let recipesFiltered = []
let recipeRequest = ""
let nbOfRecipe = 0
const inputSearchBar = document.querySelector("#inputSearchBar")
const recipesContainer = document.querySelector(".recipesContainer")
const numberOfRecipes = document.querySelector(".number_of_recipes")
const tagsContainer = document.querySelector(".tags")

recipesJSON = JSON.stringify(recipes)
recipesJSON = JSON.parse(recipesJSON)

function fillContainer(recipesToBeDisplayed) {
    recipesContainer.innerHTML = ""
    recipesToBeDisplayed.forEach((recipe) => {
        card = displayCards(recipe)
        recipesContainer.appendChild(card)
        allCards.splice(0, 0, card)
    })
    allCards.reverse()
    console.log(allCards)
    nbOfRecipe = allCards.length
    displayNumberOfRecipe(nbOfRecipe)
}
fillContainer(recipesJSON)

inputSearchBar.addEventListener("input", (e) => {
    recipeRequest = e.target.value.toLowerCase()
    if (inputSearchBar.value.length > 2) {
        searchBy(recipeRequest, searchRecipes)
    }
    if (inputSearchBar.value.length == 0) {
        searchBy(recipeRequest, searchRecipes)
    }
})
function searchBy(recipeRequest, functionSearch) {
    recipesFiltered = functionSearch(recipeRequest, recipesJSON)
    allCards = []
    fillContainer(recipesFiltered)
}

function displayNumberOfRecipe(nbOfRecipe) {
    if (nbOfRecipe == 50) {
        numberOfRecipes.textContent = `${nbOfRecipe + 1450} recettes`
    } else if (nbOfRecipe == 1) {
        numberOfRecipes.textContent = `${nbOfRecipe} recette`
    } else if (nbOfRecipe == 0) {
        numberOfRecipes.textContent = "Aucune recette"
    } else {
        numberOfRecipes.textContent = `${nbOfRecipe} recettes`
    }
}

function closeTag() {
    if (tagsContainer.childNodes.length > 0) {
        tagsContainer.childNodes.forEach((tag) => {
            const tagCloseBtn = tag.lastChild
            tagCloseBtn.addEventListener("click", () => {
                searchBy("", searchRecipes)
                tag.remove()
            })
        })
    }
}

const advancedFilters = document.querySelectorAll(".advancedFilter")

advancedFilters.forEach((advancedFilter) => {
    const chevron = advancedFilter.querySelector(".fa-chevron-down")
    const filterList = advancedFilter.querySelector(".filterSearchList")
    const inputTags = advancedFilter.querySelectorAll(".input-tag")
    const liLists = advancedFilter.querySelectorAll(".li-list")
    advancedFilter.children[0].addEventListener("click", () => {
        chevron.classList.toggle("rotate")
        filterList.classList.toggle("open")
        inputTags.forEach((inputTag) => {
            let filterList = []
            if (inputTag.id == "ingredients") {
                recipesJSON.filter((recipe) => recipe.ingredients.forEach((ing) => filterList.push(ing.ingredient)))
            }
            if (inputTag.id == "appliances") {
                recipesJSON.filter((recipe) => filterList.push(recipe.appliance))
            }
            if (inputTag.id == "ustensils") {
                recipesJSON.filter((recipe) => recipe.ustensils.forEach((ust) => filterList.push(ust)))
            }
            filterList = [...new Set(filterList)]
            liLists.forEach((liList) => {
                filterList.forEach((filter) => {
                    const li = document.createElement("li")
                    li.textContent = filter
                    liList.appendChild(li)
                    li.addEventListener("click", (e) => {
                        recipeRequest = e.target.innerText.toLowerCase()
                        createTag(recipeRequest)
                        searchBy(recipeRequest, searchRecipes)
                        closeTag()
                    })
                })
            })
        })
    })
})
