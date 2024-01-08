import { recipes } from "../data/recipes.js"
import { displayCards } from "./factories/cardFactory.js"

let card = [] // Initialisation de la variable qui stocke les donnés de chaque carte recette une par une.
let allCards = [] // Initialisation de la variable qui récupère toutes les cartes de recettes.
let nbOfRecipe = 0 // Variable qui permet de stocker le nombre de recettes pour pouvoir l'afficher

const recipesContainer = document.querySelector(".recipesContainer") // Je sélectionne le container des recettes
const numberOfRecipes = document.querySelector(".number_of_recipes") // Je sélectionne le span du nombre de recettes

/** Function fillContainer qui permet d'afficher toutes les cartes de recette 
    au chargement de la page et en fonction du résultat de la recherche. **/

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

/** Function displayNumberOfRecipe qui permet d'afficher le nombre de recettes en temps réel
    Cette function se base sur le nombre de recettes de recipes.js **/

function displayNumberOfRecipe(nbOfRecipe) {
    numberOfRecipes.textContent = `${nbOfRecipe} recettes`
    if (nbOfRecipe == 1) {
        numberOfRecipes.textContent = "1 recette"
    } else if (nbOfRecipe == 0) {
        numberOfRecipes.textContent = "Aucune recette"
    }
}
