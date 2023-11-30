import { recipes } from "../data/recipes.js"
import { displayRecipes } from "./factories/recipesFactory.js"
import { searchRecipes } from "./factories/searchRecipesFactory.js"
console.log(recipes)

displayRecipes(recipes)
let recipesFiltered = []
const searchBtnIcon = document.querySelector("#searchBtnIcon")
const inputSearchBar = document.querySelector("#inputSearchBar")
const recipesContainer = document.querySelector(".recipesContainer")
searchBtnIcon.addEventListener("click", () => {
    searchRecipesHeader()
})
inputSearchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchRecipesHeader()
    }
})
function searchRecipesHeader() {
    recipesFiltered = searchRecipes(recipes)
    recipesContainer.innerHTML = ""
    displayRecipes(recipesFiltered)
}
