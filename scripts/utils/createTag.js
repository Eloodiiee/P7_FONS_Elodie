import { createElementWithClass } from "./createHTMLElement.js"

export function createTag(recipeRequest) {
    const tagsContainer = document.querySelector(".tags")
    if (!tagsContainer) {
        console.error("Tags container not found")
        return
    }

    const tag = createElementWithClass("div", "tag")
    const tagName = createElementWithClass("span", "tagName", recipeRequest)
    const closeBtn = createElementWithClass("i", "fa-solid fa-xmark")

    tag.appendChild(tagName)
    tag.appendChild(closeBtn)
    tagsContainer.appendChild(tag)
}
