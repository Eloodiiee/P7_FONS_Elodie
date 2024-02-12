import { recipes } from "../data/recipes.js"
import { displayCards } from "./factories/cardFactory.js"
import { searchRecipes } from "./utils/searchRecipes.js"
import { searchInFilter, searchByIngredient, searchByAppliance, searchByUstensil } from "./utils/searchInFilter.js"
import { createTag } from "./factories/createTag.js"
import { removeAccents } from "./utils/removeAccent.js"

let card = [] // Initialisation de la variable qui stocke les donnés de chaque carte recette une par une.
let nbOfRecipe = 0 // Variable qui permet de stocker le nombre de recettes pour pouvoir l'afficher.
let recipesFiltered = recipes // Permet de stocker les recettes filtrés.
let recipeRequest = "" // Requête de recherche des recettes.
let filterFunc = "" // Cette variable sert à stocker la fonction de filtrage des listes de filtres
let selectedIngredientTags = [] // Variable qui stocke les tags d'ingrédients sélectionnés
let selectedApplianceTags = [] // Variable qui stocke les tags d'appareils sélectionnés
let selectedUstensilTags = [] // Variable qui stocke les tags d'ustensiles sélectionnés
let filteredByTags = []

const recipesContainer = document.querySelector(".recipesContainer") // Je sélectionne le container des recettes.
const numberOfRecipes = document.querySelector(".number_of_recipes") // Je sélectionne le span du nombre de recettes.
const inputSearchBar = document.querySelector("#inputSearchBar") // Je sélectionne la barre de recherche principale.
const advancedFilters = document.querySelectorAll(".advancedFilter") // Je sélectionne les filtres avancés pour les menus dropdown.
const tagsContainer = document.querySelector(".tags") // Je selectionne le container des tags.

/** La fonction addTag permet d'assigner un tag à sa catégorie et d'être stocké dans sa variable (selectedIngredientTags, selectedApplianceTags ou selectedUstensilTags) **/
function addTag(tag, category) {
    switch (category) {
        case "ingredients":
            selectedIngredientTags.push(tag)
            break
        case "appliances":
            selectedApplianceTags.push(tag)
            break
        case "ustensils":
            selectedUstensilTags.push(tag)
            break
    }
    // Mise à jour de l'affichage des recettes en fonction des tags sélectionnés
    updateRecipesByTags()
    advancedFilters.forEach(updateFilterList) // Met à jour les listes de filtres
}
/** La fonction removeTag permet de supprimer le tag dans sa variable (selectedIngredientTags, selectedApplianceTags ou selectedUstensilTags) **/
function removeTag(tag, category) {
    let index
    switch (category) {
        case "ingredients":
            index = selectedIngredientTags.indexOf(tag)
            if (index > -1) selectedIngredientTags.splice(index, 1)
            break
        case "appliances":
            index = selectedApplianceTags.indexOf(tag)
            if (index > -1) selectedApplianceTags.splice(index, 1)
            break
        case "ustensils":
            index = selectedUstensilTags.indexOf(tag)
            if (index > -1) selectedUstensilTags.splice(index, 1)
            break
    }
    // Mise à jour de l'affichage des recettes en fonction des tags sélectionnés
    recipesFiltered = searchRecipes(recipeRequest, recipes)
    updateRecipesByTags()
    advancedFilters.forEach(updateFilterList) // Met à jour les listes de filtres
}

/** La fonction "updateRecipesByTags" permet de rechercher les recettes en fonction de la grande barre de recherche, **/
/** et en fonction des tas sélectionnés **/
function updateRecipesByTags() {
    // Filtre d'abord les recettes en fonction des tags sélectionnés
    filteredByTags = recipesFiltered.filter(
        (recipe) =>
            searchInFilter(recipe, selectedIngredientTags, searchByIngredient) &&
            searchInFilter(recipe, selectedApplianceTags, searchByAppliance) &&
            searchInFilter(recipe, selectedUstensilTags, searchByUstensil)
    )
    recipesFiltered = filteredByTags

    fillContainer() // Met à jour l'affichage avec les recettes filtrées
}

/** La fonction "tagHandler" permet de pouvoir effectuer une recherche à partir des tags sélectionnés.  **/
/** Chaque tag a une clé unique qui permet de les différencier les uns des autres. **/
/** La fonction de recherche par tag s'exécute après que la gestion des tags ait été effectué. **/
/** La fonction de fermeture des tags est appelée pour pouvoir les fermer. **/
function tagHandler(recipeRequest, filterID) {
    const lowerCaseRequest = removeAccents(recipeRequest.toLowerCase())
    /** Permet de s'assurer que l'utilisateur ne peux pas ajouter deux fois le même tag. **/
    const existingTag = [...tagsContainer.children].some((tag) => {
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
        tagsContainer.appendChild(tag)
        tag.dataset.tagKey = lowerCaseRequest + "_" + filterID
        addTag(lowerCaseRequest, filterID)
        closeTag()
    }
}

/** La fonction "handleTagClose" permet de gérer la fermeture des tags. **/
/** Elle supprime le bon tag que l'utilisateur aura retiré. **/
/** Puis met à jour l'affichage des recettes. **/
function handleTagClose(e) {
    const tagElement = e.target.closest(".tag")
    if (tagElement) {
        const tagKey = tagElement.dataset.tagKey
        const [tagText, category] = tagKey.split("_")

        // Appel de la fonction removeTag
        removeTag(tagText, category)

        tagsContainer.removeChild(tagElement)
    }
}

/** La fonction "closeTag" supprime et remet à zéro les EventListener existants, **/
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

/** Gestion des menus dropdDown. **/
/** Je parcours mes filtres avancés. **/
/** Au clic le menu s'ouvre et exécute la function toggleFilter avec le filtre en question en parametre **/
advancedFilters.forEach((advancedFilter) => {
    const nameChevron = advancedFilter.querySelector(".advancedFilter-nameChevron")
    const filterName = advancedFilter.querySelector(".advancedFilterName")
    const chevron = advancedFilter.querySelector(".fa-chevron-down")
    const filterList = advancedFilter.querySelector(".filterSearchList")

    /** Permet de fermer la liste de filtres en cliquant en dehors sinon exécute la fontion d'ouverture et de fermeture des listes de filtres**/
    document.body.addEventListener("click", (e) => {
        if (e.target !== nameChevron && e.target !== chevron && e.target !== filterName) {
            closeFilter(chevron, filterList)
        } else {
            toggleFilter(chevron, filterList)
        }
    })
    /** boucle if qui permet d'empecher l'eventListener de se propager sur les barres de recherche de filtres **/
    const inputSearch = advancedFilter.querySelector(".input-tag")
    if (inputSearch) {
        inputSearch.addEventListener("click", (e) => {
            e.stopPropagation()
        })
    }
    updateFilterList(advancedFilter)
})

/** Fonction qui permet de fermer les listes de filtres **/
function closeFilter(chevron, filterList) {
    chevron.classList.remove("rotate")
    filterList.classList.remove("open")
}

/** La Fonction toggleFilter sert a basculer l'affichage d'un filtre avancé. **/
/** Je fais Basculer avec la classe "rotate" sur le chevron pour l'animation. **/
/** et avec la classe "open" sur "filterList" pour afficher ou masquer la liste. **/
function toggleFilter(chevron, filterList) {
    chevron.classList.toggle("rotate")
    filterList.classList.toggle("open")
}

/** La fonction "createFilterList" sert à créer la liste de suggestion des filtres avancés. **/
/** Chaque filtre est changé en miniscule puis la première lettre est remise en majuscule **/
/** pour retirer les doublons qui ont une casse différentes et qui ont besoin d'être reformaté pour être filtré**/
function createFilterList(recipes, filterFunc, selectedTags) {
    let filterList = recipes.map(filterFunc).flat()
    filterList = filterList.map((filter) => {
        let filterLowerCased = filter.toLowerCase()
        return filter.charAt(0).toUpperCase() + filterLowerCased.slice(1)
    })
    filterList = [...new Set(filterList)]

    // Exclut les tags sélectionnés de la liste
    filterList = filterList.filter((filter) => !selectedTags.includes(filter.toLowerCase()))

    return filterList
}

/** La fonction "updateFilterList" sert à mettre à jour la liste de filtres. **/
/** Je sélectionne tous les éléments avec la classe ".input-tag" et ".li-list" dans "advancedFilter". **/
function updateFilterList(advancedFilter) {
    const inputTags = advancedFilter.querySelectorAll(".input-tag")
    const liLists = advancedFilter.querySelectorAll(".li-list")

    inputTags.forEach((inputTag) => {
        let selectedTags
        switch (inputTag.id) {
            case "ingredients":
                filterFunc = (recipe) => recipe.ingredients.map((ing) => ing.ingredient)
                selectedTags = selectedIngredientTags
                break
            case "appliances":
                filterFunc = (recipe) => recipe.appliance
                selectedTags = selectedApplianceTags
                break
            case "ustensils":
                filterFunc = (recipe) => recipe.ustensils
                selectedTags = selectedUstensilTags
                break
        }

        const filterList = createFilterList(recipesFiltered, filterFunc, selectedTags)
        /** Une fois la liste de suggestion créée les dupliqués sont supprimés. **/
        /** L'EventListener "inputTag" permet de récupérer ce qui a été écrit dans le champ du filtre et appelle la fonction de mise à jour la liste de suggestion. **/
        inputTag.addEventListener("input", (e) => {
            recipeRequest = removeAccents(e.target.value.toLowerCase())
            const filteredList = filterList.filter((item) => removeAccents(item).toLowerCase().includes(recipeRequest))
            updateLiList(filteredList, liLists[0], inputTag, advancedFilter)
        })
        updateLiList(filterList, liLists[0], inputTag, advancedFilter) // Initialise avec la liste complète.
    })
}

/** La fonction "updateLiList" permet de mettre à jour la liste des suggestion en fonction de ce qui est ecrit dans le champ du filtre. **/
function updateLiList(filterList, liList, inputTag, advancedFilter) {
    liList.innerHTML = "" // Nettoie les suggestions précédentes.
    filterList.forEach((filter) => {
        const li = document.createElement("li")
        li.textContent = filter
        liList.appendChild(li)
        li.addEventListener("click", () => {
            inputTag.value = "" // Réinitialise le champs après selection du tag.
            tagHandler(filter, inputTag.id) // Gére la sélection.
            updateFilterList(advancedFilter) // Réactualise l'affichage des listes de filtres quand un tag est sélectionné.
        })
    })
}

/** Function fillContainer permet d'afficher toutes les cartes de recette, **/
/** au chargement de la page et en fonction du résultat de la recherche. **/
function fillContainer() {
    recipesContainer.innerHTML = ""
    recipesFiltered.forEach((recipe) => {
        card = displayCards(recipe)
        recipesContainer.appendChild(card)
    })
    nbOfRecipe = recipesFiltered.length
    displayNumberOfRecipe(nbOfRecipe)
}
/** Exécution de la funtion fillContainer au chargement de la page **/
fillContainer()

/** Function displayNumberOfRecipe qui permet d'afficher le nombre de recettes en temps réel **/
/** Cette function se base sur le nombre de recettes de recipes.js **/
function displayNumberOfRecipe(nbOfRecipe) {
    numberOfRecipes.textContent = nbOfRecipe + (nbOfRecipe <= 1 ? " recette" : " recettes")
}

/** Effectue la recherche si la longueur de la chaîne est supérieure à 2 ou si l'utilisateur appuie sur Backspace. **/
inputSearchBar.addEventListener("input", (e) => {
    if (inputSearchBar.value.length > 2 || e.inputType === "deleteContentBackward") {
        recipeRequest = removeAccents(e.target.value.toLowerCase())
        if (tagsContainer.childNodes.length == 0) {
            recipesFiltered = searchRecipes(recipeRequest, recipes)
            advancedFilters.forEach(updateFilterList)
        } else {
            recipesFiltered = searchRecipes(recipeRequest, recipes)
            updateRecipesByTags()
            advancedFilters.forEach(updateFilterList)
        }
        fillContainer()
    }
})
