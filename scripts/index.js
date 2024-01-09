import { recipes } from "../data/recipes.js"
import { displayCards } from "./factories/cardFactory.js"
import { searchRecipes } from "./utils/searchRecipes.js"
import { searchByIngredient, searchByAppliance, searchByUstensil } from "./utils/searchByFilter.js"

let card = [] // Initialisation de la variable qui stocke les donnés de chaque carte recette une par une.
let allCards = [] // Initialisation de la variable qui récupère toutes les cartes de recettes.
let nbOfRecipe = 0 // Variable qui permet de stocker le nombre de recettes pour pouvoir l'afficher.
let recipesFiltered = [] // Permet de stocker les recettes filtrés.
let recipeRequest = "" // Requête de recherche des recettes.

const recipesContainer = document.querySelector(".recipesContainer") // Je sélectionne le container des recettes.
const numberOfRecipes = document.querySelector(".number_of_recipes") // Je sélectionne le span du nombre de recettes.
const inputSearchBar = document.querySelector("#inputSearchBar") // Je sélectionne la barre de recherche principale.
const advancedFilters = document.querySelectorAll(".advancedFilter") // Je sélectionne les filtres avancés pour les menus dropdown.

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

/** Gestion des menus dropdDown. **/
/** Je parcours mes filtres avancés. **/
/** Au clic le menu s'ouvre et exécute la function toggleFilter avec le filtre en question en parametre **/
advancedFilters.forEach((advancedFilter) => {
    advancedFilter.children[0].addEventListener("click", () => {
        toggleFilter(advancedFilter)
    })
})

/** La Fonction toggleFilter sert a basculer l'affichage d'un filtre avancé. **/
/** Je Sélectionne le chevron et le cadre de la liste dans advancedFilter. **
/** Je fais Basculer avec la classe "rotate" sur le chevron pour l'animation. **/
/** et avec la classe "open" sur "filterList" pour afficher ou masquer la liste. **/
/** Je mets à jour la liste de filtres pour le "advancedFilter" spécifié, en appelant updateFilterList. **/
function toggleFilter(advancedFilter) {
    const chevron = advancedFilter.querySelector(".fa-chevron-down")
    const filterList = advancedFilter.querySelector(".filterSearchList")

    chevron.classList.toggle("rotate")
    filterList.classList.toggle("open")

    updateFilterList(advancedFilter)
}

/** La fonction updateFilterList sert à mettre à jour la liste de filtres. **/
/** Je sélectionne tous les éléments avec la classe ".input-tag" et ".li-list" dans "advancedFilter". **/
function updateFilterList(advancedFilter) {
    const inputTags = advancedFilter.querySelectorAll(".input-tag")
    const liLists = advancedFilter.querySelectorAll(".li-list")

    /** La Fonction createFilterList sert à créer une liste de filtres à partir des recettes. **/
    /** J'utilise "map" et "flat" pour transformer et aplatir l'array de recettes. **/
    const createFilterList = (recipes, filterFunc) => {
        return recipes.map(filterFunc).flat()
    }

    /** La Fonction addInputEventListener a pour but d'ajouter un eventListener aux "input" des filtres avancés. **/
    /** Lorsqu'on saisit des données, les résultats de recherche sont mis à jour. **/
    const addInputEventListener = (inputTag, filterFunction) => {
        inputTag.addEventListener("input", (e) => {
            recipeRequest = e.target.value.toLowerCase()
            searchBy(recipeRequest, searchByFilter, filterFunction)
        })
    }

    /** Je parcours les "inputTags". **/
    /** Je vérifie l'ID des "inputTags" et exécute la logique correspondante. **/
    inputTags.forEach((inputTag) => {
        let filterList = []
        if (inputTag.id === "ingredients") {
            /** Je crée une liste de filtres pour les ingrédients, les appareils et les ustensiles . **/
            /** Ajoutez d'un eventListener pour la recherche d'ingrédients, d'appareils, d'ustensiles. **/
            filterList = createFilterList(recipes, (recipe) => recipe.ingredients.map((ing) => ing.ingredient))
            addInputEventListener(inputTag, searchByIngredient)
        } else if (inputTag.id === "appliances") {
            filterList = createFilterList(recipes, (recipe) => recipe.appliance)
            addInputEventListener(inputTag, searchByAppliance)
        } else if (inputTag.id === "ustensils") {
            filterList = createFilterList(recipes, (recipe) => recipe.ustensils)
            addInputEventListener(inputTag, searchByUstensil)
        }

        /** J'enlève les doublons de la liste des filtres. **/
        filterList = [...new Set(filterList)]

        /** Je parcours les Listes des filtres et j'ajoute les éléments des filtres. **/
        /** Je crée un élément "li" pour chaque éléments de la liste des filtres et les ajoute à la liste. **/
        liLists.forEach((liList) => {
            filterList.forEach((filter) => {
                const li = document.createElement("li")
                li.textContent = filter
                liList.appendChild(li)
            })
        })
    })
}
