export class CardList {
  constructor(container, initialCards) {
    this.container = container;
    this.initialCards = initialCards;
  }

  addCard(card) {
    this.container.appendChild(card);
  }

  render() {
    this.initialCards.forEach((card) => {
      this.addCard(card);
    })
  }
}
