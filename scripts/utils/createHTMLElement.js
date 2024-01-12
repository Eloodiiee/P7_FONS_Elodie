/** La fonction createElementWithClass permet de créer un élément HTML avec une classe et un contenu textuel optionnels. **/
export function createElementWithClass(type, className, secondClassName, textContent = "") {
    /** Je crée un élément HTML du type spécifié. **/
    const element = document.createElement(type)
    /** J'ajoute une classe à l'élément si un nom de classe est fourni. **/
    /** Les croix des tags fonctionnent avec deux classes fa-solid et fa-xmark donc besoin de creation de deux classes differentes **/
    if (className) {
        element.classList.add(className)
        if (secondClassName != "") {
            element.classList.add(secondClassName)
        }
    }
    /** Je définis le texte de l'élément si un texte est fourni.**/
    if (textContent) {
        element.textContent = textContent
    }
    /** Je retourne l'élément HTML créé. **/
    return element
}
