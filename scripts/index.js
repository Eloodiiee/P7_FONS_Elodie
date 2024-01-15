import { recipes } from "../data/recipes.js"
import { displayCards } from "./factories/cardFactory.js"
import { searchRecipes } from "./utils/searchRecipes.js"
import { searchByFilter, searchByIngredient, searchByAppliance, searchByUstensil } from "./utils/searchByFilter.js"
import { createTag } from "./utils/createTag.js"

let card = [] // Initialisation de la variable qui stocke les donnés de chaque carte recette une par une.
let allCards = [] // Initialisation de la variable qui récupère toutes les cartes de recettes.
let nbOfRecipe = 0 // Variable qui permet de stocker le nombre de recettes pour pouvoir l'afficher.
let recipesFiltered = [] // Permet de stocker les recettes filtrés.
let recipeRequest = "" // Requête de recherche des recettes.
let recipesWithFilter = [] // Permet de stocker les recettes filtrés comportant des filtres additionnels.

const recipesContainer = document.querySelector(".recipesContainer") // Je sélectionne le container des recettes.
const numberOfRecipes = document.querySelector(".number_of_recipes") // Je sélectionne le span du nombre de recettes.
const inputSearchBar = document.querySelector("#inputSearchBar") // Je sélectionne la barre de recherche principale.
const advancedFilters = document.querySelectorAll(".advancedFilter") // Je sélectionne les filtres avancés pour les menus dropdown.
const tagsContainer = document.querySelector(".tags") // Je selectionne le container des tags.

//////////////////////////////////////////////////////////////// Tags jaune remis au debut de mon code et réécrit  ////////////////////////////////////////////////////////////////////////////////////////
let tagResults = {}

function tagHandler(recipeRequest, filterID) {
    const tag = createTag(recipeRequest)
    tagsContainer.appendChild(tag)

    tag.dataset.tagKey = recipeRequest + "_" + filterID // Assigne une clé unique au tag

    const searchFunctions = {
        ingredients: searchByIngredient,
        appliances: searchByAppliance,
        ustensils: searchByUstensil,
    }

    const searchWithTagFunction = searchFunctions[filterID]
    if (searchWithTagFunction) {
        searchWithTag(tag, searchWithTagFunction)
    }

    closeTag()
}

function searchWithTag(tag, filterFunction) {
    const recipeRequest = tag.children[0].innerText.toLowerCase()
    if (recipesFiltered == "") {
        recipesFiltered = recipes
    }
    const tagKey = tag.dataset.tagKey // utilise une clé unique pour le référencement dans tagResults
    tagResults[tagKey] = advancedSearch(recipeRequest, recipesFiltered, filterFunction)
    console.log(tagResults[tagKey])
    updateRecipesDisplay()
}

function updateRecipesDisplay() {
    // Combine ici les résultats de tous les tags actifs et met à jour l'affichage
    let combinedResults = combineTagResults()
    fillContainer(combinedResults)
    if (combinedResults.length === 0) {
        recipeRequest = ""
        searchBy(recipeRequest, searchRecipes)
        return
    }
}

function combineTagResults() {
    // Combine les résultats de recherche de tous les tags ici
    let combined = []
    for (let tag in tagResults) {
        combined = combined.concat(tagResults[tag])
    }
    // Elimine les doublons si nécessaire
    return unique(combined)
}

function unique(array) {
    // Cette fonction élimine les doublons dans un tableau
    return [...new Set(array)]
}

function handleTagClose(e) {
    const tagElement = e.target.closest(".tag")
    if (tagElement) {
        const tagKey = tagElement.dataset.tagKey // utilise une clé unique pour le référencement dans tagResults
        tagsContainer.removeChild(tagElement)
        delete tagResults[tagKey] // Supprime le bon tag de tagResults
        updateRecipesDisplay() // Met à jour l'affichage des recettes
    }
}
function closeTag() {
    const allCloseBtns = tagsContainer.querySelectorAll(".fa-xmark")
    // Supprime les EventListener existants
    allCloseBtns.forEach((closeBtn) => {
        closeBtn.removeEventListener("click", handleTagClose)
    })

    // Ajoute des nouveaux EventListener
    allCloseBtns.forEach((closeBtn) => {
        closeBtn.addEventListener("click", handleTagClose)
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Function fillContainer qui permet d'afficher toutes les cartes de recette, **/
/** au chargement de la page et en fonction du résultat de la recherche. **/
function fillContainer(recipesToBeDisplayed) {
    recipesContainer.innerHTML = ""
    allCards = []
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
    numberOfRecipes.textContent = nbOfRecipe + (nbOfRecipe <= 1 ? " recette" : " recettes")
}

/** La function searchBy prend deux paramètres : recipeRequest qui est une chaîne de caractères représentant le champ de recherche, **/
/** et la functionSearch qui est une function variable qui s'adapte en fonction de celle donnée dans les paramètres. **/
/** Appel de la functionSearch en lui passant recipeRequest et les recettes. **/
/** Le résultat de cette recherche est stocké dans recipesFiltered. **/
/** Réinitialise allCards pour nettoyer la liste des cartes. **/
/** Appelle la fonction fillContainer en lui passant les recettes filtrées. **/
function searchBy(recipeRequest) {
    recipesFiltered = searchRecipes(recipeRequest, recipes)
    fillContainer(recipesFiltered)
}
//////////////////////////////////////////////////////////////// searchBy permet de faire la recherche et  advancedSearch permet d'affiner la recherche //////////////////////////////////////////////////////////
function advancedSearch(recipeRequest, recipesFiltered, filterFunction) {
    recipesWithFilter = searchByFilter(recipeRequest, recipesFiltered, filterFunction)
    fillContainer(recipesWithFilter)
    return recipesWithFilter
}

/** Effectue la recherche si la longueur de la chaîne est supérieure à 2 ou si l'utilisateur appuie sur Backspace. **/
inputSearchBar.addEventListener("input", (e) => {
    recipeRequest = e.target.value.toLowerCase()
    if (inputSearchBar.value.length > 2 || e.inputType === "deleteContentBackward") {
        searchBy(recipeRequest)
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
            advancedSearch(recipeRequest, recipesFiltered, filterFunction)
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
            inputTag.addEventListener("input", (e) => {
                recipeRequest = e.target.value.toLowerCase()
                addInputEventListener(inputTag, searchByIngredient)
            })
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
            if (liList.children.length > 0) {
                liList.textContent = ""
            }
            filterList.forEach((filter) => {
                const li = document.createElement("li")
                li.textContent = filter
                liList.appendChild(li)
                li.addEventListener("click", (e) => {
                    recipeRequest = e.target.innerText.toLowerCase()
                    tagHandler(recipeRequest, inputTag.id)
                })
            })
        })
    })
}
