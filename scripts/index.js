import { recipes } from "../data/recipes.js"
import { displayCards } from "./factories/cardFactory.js"
import { searchRecipes } from "./utils/searchRecipes.js"

let card = [] // Initialisation de la variable qui stocke les donnés de chaque carte recette une par une.
let allCards = [] // Initialisation de la variable qui récupère toutes les cartes de recettes.
let nbOfRecipe = 0 // Variable qui permet de stocker le nombre de recettes pour pouvoir l'afficher.
let recipesFiltered = [] // Permet de stocker les recettes filtrés.
let recipeRequest = "" // Requête de recherche des recettes.

const recipesContainer = document.querySelector(".recipesContainer") // Je sélectionne le container des recettes.
const numberOfRecipes = document.querySelector(".number_of_recipes") // Je sélectionne le span du nombre de recettes.
const inputSearchBar = document.querySelector("#inputSearchBar") // Je sélectionne la barre de recherche principale.

/** Function fillContainer qui permet d'afficher toutes les cartes de recette, **/
/** au chargement de la page et en fonction du résultat de la recherche. **/
function fillContainer(recipesToBeDisplayed) {
    recipesContainer.innerHTML = ""
    recipesToBeDisplayed.forEach((recipe) => {
        card = displayCards(recipe)
        recipesContainer.appendChild(card)
        allCards.splice(0, 0, card)
    })
    nbOfRecipe = allCards.length
    displayNumberOfRecipe(nbOfRecipe)
}

/** Exécution de la funtion fillContainer au chargement de la page **/
fillContainer(recipes)

/** Function displayNumberOfRecipe qui permet d'afficher le nombre de recettes en temps réel **/
/** Cette function se base sur le nombre de recettes de recipes.js **/
function displayNumberOfRecipe(nbOfRecipe) {
    numberOfRecipes.textContent = `${nbOfRecipe} recettes`
    if (nbOfRecipe == 1) {
        numberOfRecipes.textContent = "1 recette"
    } else if (nbOfRecipe == 0) {
        numberOfRecipes.textContent = "Aucune recette"
    }
}
/** La function searchBy prend deux paramètres : recipeRequest qui une chaîne de caractères représentant la requête de recherche, **/
/** et la functionSearch qui est une function variable qui s'adapte en fonction de celle donnée dans les paramètres. **/
/** Appel de la functionSearch en lui passant recipeRequest et les recettes. **/
/** Le résultat de cette recherche est stocké dans recipesFiltered. **/
/** Réinitialise allCards pour nettoyer la liste des cartes. **/
/** Appelle la fonction fillContainer en lui passant les recettes filtrées. **/
function searchBy(recipeRequest, functionSearch) {
    recipesFiltered = functionSearch(recipeRequest, recipes)
    allCards = []
    fillContainer(recipesFiltered)
}
/** Effectue la recherche si la longueur de la chaîne est supérieure à 2 ou si l'utilisateur appuie sur Backspace. **/
inputSearchBar.addEventListener("input", (e) => {
    recipeRequest = e.target.value.toLowerCase()
    if (inputSearchBar.value.length > 2 || e.inputType === "deleteContentBackward") {
        searchBy(recipeRequest, searchRecipes)
    }
})
