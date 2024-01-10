/** La fonction createElementWithClass permet de créer un élément HTML avec une classe et un contenu textuel optionnels. **/
export function createElementWithClass(type, className, textContent = "") {
    /** Je crée un élément HTML du type spécifié. **/
    const element = document.createElement(type)
    /** J'ajoute une classe à l'élément si un nom de classe est fourni. **/
    if (className) {
        element.classList.add(className)
    }
    /** Je définis le texte de l'élément si un texte est fourni.**/
    if (textContent) {
        element.textContent = textContent
    }
    /** Je retourne l'élément HTML créé. **/
    return element
}
