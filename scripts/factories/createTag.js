import { createElementWithClass } from "../utils/createHTMLElement.js"

export function createTag(recipeRequest) {
    const tag = createElementWithClass("div", "tag", "")
    const tagName = createElementWithClass("span", "tagName", "", recipeRequest)
    const closeBtn = createElementWithClass("i", "fa-solid", "fa-xmark")

    tag.appendChild(tagName)
    tag.appendChild(closeBtn)
    return tag
}
