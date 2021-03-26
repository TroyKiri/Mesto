class Card {
  create(name, link) {
    // Создание элементов
    const placeCard = document.createElement('div'); //карточка
    const placeCardImage = document.createElement('div'); //картинка карточки
    const placeCardDeleteIcon = document.createElement('button'); //кнопка удаления
    const placeCardDescription = document.createElement('div'); // описание под картинкой
    const placeCardName = document.createElement('h3'); // название карточки
    const placeCardLikeIcon = document.createElement('button'); // кнопка лайка

    // Присвоение элементам нужных классов
    placeCard.classList.add('place-card');
    placeCardImage.classList.add('place-card__image');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');
    placeCardDescription.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');
    placeCardLikeIcon.classList.add('place-card__like-icon');

    // Заполнение данными
    placeCardImage.style.backgroundImage = `url(${link})`;
    placeCardName.textContent = name;
    
    // Добавление в DOM
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeIcon);
    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);

    this.card = placeCard;
    this.card.addEventListener('click', this.like);
    this.card.addEventListener('click', this.remove);

    return placeCard
  }
  like(event) {
    const target = event.target.classList;
    if (target.contains('place-card__like-icon')) {
      target.toggle('place-card__like-icon_liked');
    }
  }
  remove(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {
      this.remove();
      //this в данном случае равен значению объекта, на котором вызван (this.card)
    }
  }
}