export function createTag(recipeRequest) {
    const tagsContainer = document.querySelector(".tags")
    const tag = document.createElement("div")
    tag.classList.add("tag")
    const tagName = document.createElement("span")
    tagName.classList.add("tagName")
    tagName.textContent = recipeRequest
    const closeBtn = document.createElement("i")
    closeBtn.classList.add("fa-solid")
    closeBtn.classList.add("fa-xmark")
    tag.appendChild(tagName)
    tag.appendChild(closeBtn)
    tagsContainer.appendChild(tag)
}
