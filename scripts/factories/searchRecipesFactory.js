export function searchRecipes(recipes, recipeRequest, regexQuery) {
    let recipesFiltered = []
    for (let i = 0; i < recipes.length; i++) {
        let ustensils = recipes[i].ustensils
        let ingredients = recipes[i].ingredients
        if (recipeRequest == "" || regexQuery.test(recipes[i].name.toUpperCase()) || regexQuery.test(recipes[i].appliance.toUpperCase())) {
            recipesFiltered.push(recipes[i])
        }
        for (let i = 0; i < recipes.length; i++) {
            let ingredients = recipes[i].ingredients
            for (let ingredientsIndex = 0; ingredientsIndex < ingredients.length; ingredientsIndex++) {
                const ingredient = ingredients[ingredientsIndex].ingredient
                if (regexQuery.test(ingredient.toUpperCase())) {
                    recipesFiltered.push(recipes[i])
                }
            }
        }
        for (let i = 0; i < recipes.length; i++) {
            let ustensils = recipes[i].ustensils
            for (let ustensilsIndex = 0; ustensilsIndex < ustensils.length; ustensilsIndex++) {
                const ustensil = ustensils[ustensilsIndex]
                if (regexQuery.test(ustensil.toUpperCase())) {
                    recipesFiltered.push(recipes[i])
                }
            }
        }
    }
    recipesFiltered = recipesFiltered.filter((item, index) => recipesFiltered.indexOf(item) === index)
    return recipesFiltered
}
export function searchByIngredient(recipes, recipeRequest, regexQuery) {
    let recipesFiltered = []
    for (let i = 0; i < recipes.length; i++) {
        let ingredients = recipes[i].ingredients
        for (let ingredientsIndex = 0; ingredientsIndex < ingredients.length; ingredientsIndex++) {
            const ingredient = ingredients[ingredientsIndex].ingredient
            if (regexQuery.test(ingredient.toUpperCase())) {
                recipesFiltered.push(recipes[i])
            }
        }
    }
    recipesFiltered = recipesFiltered.filter((item, index) => recipesFiltered.indexOf(item) === index)
    return recipesFiltered
}
export function searchByAppliance(recipes, recipeRequest, regexQuery) {
    let recipesFiltered = []

    for (let i = 0; i < recipes.length; i++) {
        if (regexQuery.test(recipes[i].appliance.toUpperCase())) {
            recipesFiltered.push(recipes[i])
        }
    }
    recipesFiltered = recipesFiltered.filter((item, index) => recipesFiltered.indexOf(item) === index)
    return recipesFiltered
}
export function searchByUstensil(recipes, recipeRequest, regexQuery) {
    let recipesFiltered = []
    for (let i = 0; i < recipes.length; i++) {
        let ustensils = recipes[i].ustensils
        for (let ustensilsIndex = 0; ustensilsIndex < ustensils.length; ustensilsIndex++) {
            const ustensil = ustensils[ustensilsIndex]
            if (regexQuery.test(ustensil.toUpperCase())) {
                recipesFiltered.push(recipes[i])
            }
        }
    }
    recipesFiltered = recipesFiltered.filter((item, index) => recipesFiltered.indexOf(item) === index)
    return recipesFiltered
}
