export function displayCards(data) {
    const cardsContainer = document.querySelector("[data-cards-container]")
    const cardTemplate = document.querySelector("[data-template]")
    const card = cardTemplate.content.cloneNode(true).children[0]
    const cardImg = card.querySelector("[data-img]")
    const cardName = card.querySelector("[data-name]")
    const cardDetailsContainer = card.querySelector("[data-details-container]")
    const cardChip = card.querySelector("[data-chip]")
    cardsContainer.appendChild(card)
    return {
        element: card,
        img: cardImg,
        title: cardName,
        detailsContainer: cardDetailsContainer,
        chip: cardChip,
        image: data.image,
        name: data.name,
        time: data.time,
        description: data.description,
        ingredients: data.ingredients,
        ustensils: data.ustensils,
        appliance: data.appliance,
    }
}
