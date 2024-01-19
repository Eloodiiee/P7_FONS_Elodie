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
let filterFunc = "" // Cette variable sert à stocker la fonction de filtrage des listes de filtres
let filterList = [] // Variable qui stocke les listes de filtres
let filterLowerCased = "" // Variable qui stocke les filtres en minuscule pour leur reformatage
let combined = [] // Permet de stocker les résultats de recherche par tags combinés
let combinedResults = [] // Permet de stocker les résultats de recherche par tags combinés après avoir retiré les doublons

const recipesContainer = document.querySelector(".recipesContainer") // Je sélectionne le container des recettes.
const numberOfRecipes = document.querySelector(".number_of_recipes") // Je sélectionne le span du nombre de recettes.
const inputSearchBar = document.querySelector("#inputSearchBar") // Je sélectionne la barre de recherche principale.
const advancedFilters = document.querySelectorAll(".advancedFilter") // Je sélectionne les filtres avancés pour les menus dropdown.
const tagsContainer = document.querySelector(".tags") // Je selectionne le container des tags.

//////////////////////////////////////////////////////////////// Tags jaune remis au debut de mon code et réécrit  ////////////////////////////////////////////////////////////////////////////////////////
let tagResults = {} // C'est un tableau d'objet qui va regrouper les recettes correspondantes a tout les tags.

/** La fonction "tagHandler" permet de pouvoir effectuer une recherche à partir des tags sélectionnés (tags jaunes).  **/
/** Chaque tag a une clé unique qui permet de les différencier les uns des autres. **/
/** La const "searchFunctions" regroupe les fonctions de recherche avancées **/
/** La fonction de recherche par tag s'exécute après que la gestion des tags ait été effectué. **/
/** La fonction de fermeture des tags est appelée pour pouvoir les fermer. **/
function tagHandler(recipeRequest, filterID) {
    const lowerCaseRequest = recipeRequest.toLowerCase()

    const existingTag = [...tagsContainer.children].some((tag) => {
        /** Permet de s'assurer que l'utilisateur ne peux pas ajouter deux fois le même tag. **/
        /** S'assure que tagKey est défini **/
        if (!tag.dataset.tagKey) {
            return false
        }

        const tagKeyParts = tag.dataset.tagKey.split("_")
        const tagText = tag.children[0].innerText.toLowerCase()
        return tagText === lowerCaseRequest && tagKeyParts[1] === filterID
    })
    /** Après avoir vérifié que le tag n'est pas un doublon, exécute le code du tag normalement. **/
    if (!existingTag) {
        const tag = createTag(recipeRequest)
        tagsContainer.appendChild(tag)
        tag.dataset.tagKey = lowerCaseRequest + "_" + filterID

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
}

/** La fonction "searchWithTag" exécute "advancedSearch" pour affiner les recherches déjà effectué dans la barre de recherche principale  **/
/** S'il n 'y a pas eu de recherche principale effectuée alors, la recherche s'exécute avec l'ensemble des recettes de la base de données. **/
/** Une fois la recherche effectuée les résultats sont compilés dans "tagResults". **/
/** Puis la fonction "updateRecipesDisplay" est exécutée. **/
function searchWithTag(tag, filterFunction) {
    recipeRequest = tag.children[0].innerText.toLowerCase()
    if (recipesFiltered == "") {
        recipesFiltered = recipes
    }
    const tagKey = tag.dataset.tagKey // utilise une clé unique pour le référencement dans tagResults
    tagResults[tagKey] = advancedSearch(recipeRequest, recipesFiltered, filterFunction)
    updateRecipesDisplay()
}

/** La fontcion "updateRecipesDisplay" récupère les résultats de tous les tags actifs et met à jour l'affichage. **/
/** S'il n'y a plus de tag, l'affichage se met à jour en affichant toutes les recettes (comme à l'ouverture de ma page). **/
function updateRecipesDisplay() {
    combinedResults = combineTagResults()
    fillContainer(combinedResults)
}

/** La fonction "combineTagResults" combine les résultats de recherche de tous les tags,  **/
/** et appelle la fonction qui retire les doublons. **/
function combineTagResults() {
    combined = []
    for (let tag in tagResults) {
        combined = combined.concat(tagResults[tag])
    }
    return unique(combined)
}

/** La fonction "unique" élimine les doublons dans un tableau. **/
function unique(array) {
    return [...new Set(array)]
}

/** La fonction "handleTagClose" permet de gérer la fermeture des tags. **/
/** Elle supprime le bon tag de tagResults que l'utilisateur aura retiré. **/
/** Puis met à jour l'affichage des recettes. **/
function handleTagClose(e) {
    const tagElement = e.target.closest(".tag")
    if (tagElement) {
        const tagKey = tagElement.dataset.tagKey // utilise une clé unique pour le référencement dans tagResults
        tagsContainer.removeChild(tagElement)
        delete tagResults[tagKey]
        updateRecipesDisplay()
    }
    if (tagsContainer.childNodes.length === 0) {
        inputSearchBar.value = ""
        recipeRequest = ""
        searchBy(recipeRequest, searchRecipes)
        return
    }
}

/** La fonction "closeTag" supprime  et remet à zéro les EventListener existants, **/
/** et les remplace par des nouveaux EventListener pour éviter qu'il y ait plusieurs EventListener par tag. **/
function closeTag() {
    const allCloseBtns = tagsContainer.querySelectorAll(".fa-xmark")
    allCloseBtns.forEach((closeBtn) => {
        closeBtn.removeEventListener("click", handleTagClose)
    })
    allCloseBtns.forEach((closeBtn) => {
        closeBtn.addEventListener("click", handleTagClose)
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Gestion des menus dropdDown. **/
/** Je parcours mes filtres avancés. **/
/** Au clic le menu s'ouvre et exécute la function toggleFilter avec le filtre en question en parametre **/
advancedFilters.forEach((advancedFilter) => {
    advancedFilter.children[0].addEventListener("click", () => {
        toggleFilter(advancedFilter)
    })
    updateFilterList(advancedFilter)
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
}

/** La fonction "createFilterList" sert à créer la liste de suggestion des filtres avancés. **/
/** Chaque filtre est changé en miniscule puis la première lettre est remise en majuscule **/
/** pour retirer les doublons qui ont une casse différentes et qui ont besoin d'être reformaté pour être filtré**/
function createFilterList(recipes, filterFunc) {
    filterList = recipes.map(filterFunc).flat()
    filterList = filterList.map((filter) => {
        filterLowerCased = filter.toLowerCase()
        return filter.charAt(0).toUpperCase() + filterLowerCased.slice(1)
    })
    filterList = unique(filterList)
    return filterList
}

/** La fonction "updateFilterList" sert à mettre à jour la liste de filtres. **/
/** Je sélectionne tous les éléments avec la classe ".input-tag" et ".li-list" dans "advancedFilter". **/
function updateFilterList(advancedFilter) {
    const inputTags = advancedFilter.querySelectorAll(".input-tag")
    const liLists = advancedFilter.querySelectorAll(".li-list")
    /** La boucle forEach "inputTags" permet de déterminer la fonction de tri des suggestion des filtres avancés. **/
    inputTags.forEach((inputTag) => {
        switch (inputTag.id) {
            case "ingredients":
                filterFunc = (recipe) => recipe.ingredients.map((ing) => ing.ingredient)
                break
            case "appliances":
                filterFunc = (recipe) => recipe.appliance
                break
            case "ustensils":
                filterFunc = (recipe) => recipe.ustensils
                break
        }

        /** Une fois la liste de suggestion créée les dupliqués sont supprimés. **/
        /** L'EventListener "inputTag" permet de récupérer ce qui a été écrit dans le champ du filtre et appelle la fonction de mise à jour la liste de suggestion. **/
        const filterList = createFilterList(recipes, filterFunc)
        inputTag.addEventListener("input", (e) => {
            recipeRequest = e.target.value.toLowerCase()
            const filteredList = filterList.filter((item) => item.toLowerCase().includes(recipeRequest))
            updateLiList(filteredList, liLists[0], inputTag)
        })
        console.log("listes créées")
        updateLiList(filterList, liLists[0], inputTag) // Initialise avec la liste complète.
    })
}

/** La fonction "updateLiList" permet de mettre à jour la liste des suggestion en fonction de ce qui est ecrit dans le champ du filtre. **/
function updateLiList(filterList, liList, inputTag) {
    liList.innerHTML = "" // Nettoie les suggestions précédentes.
    filterList.forEach((filter) => {
        const li = document.createElement("li")
        li.textContent = filter
        liList.appendChild(li)
        li.addEventListener("click", () => {
            inputTag.value = "" // Réinitialise le champs après selection du tag.
            tagHandler(filter, inputTag.id) // Gére la sélection.
        })
    })
}
///////////////////////////////////////////////////////////////
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
