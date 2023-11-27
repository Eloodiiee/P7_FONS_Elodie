import { recipes } from "../data/recipes.js"
import { displayRecipes } from "./factories/recipesFactory.js"
import { searchRecipes } from "./factories/searchRecipesFactory.js"
console.log(recipes)

displayRecipes(recipes)
let recipesFiltered = []
const searchBtnIcon = document.querySelector("#searchBtnIcon")
const inputSearchBar = document.querySelector("#inputSearchBar")
searchBtnIcon.addEventListener("click", () => {
    searchRecipesHeader()
})
function searchRecipesHeader() {
    recipesFiltered = searchRecipes(recipes)
    console.log(recipesFiltered)
}
