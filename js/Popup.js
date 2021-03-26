class Popup {
  constructor(popup, title, image, form, card, cardList, userInfo, root) {
    this.popup = popup;
    this.title = title;
    this.form = form;
    this.image = image;
    this.card = card;
    this.cardList = cardList;
    this.userInfo = userInfo;
    this.root = root;
    this.elements = this.form.elements;
    this.submitCardBind = this.submitCard.bind(this);
    this.updateInfoBind = this.submitUserInfo.bind(this);
  }

  open(event) {
    // метод открытия попапов

    if (event.target.classList.contains('user-info__button')) {
      // если нажали на кнопку '+'
      // удаляем обработчики добавления карточки и обновления данных
      this.form.removeEventListener('submit', this.submitCardBind);
      this.form.removeEventListener('submit', this.updateInfoBind);

      // сброс формы
      this.form.reset();
      //открытие попапа
      this.popup.classList.add('popup_is-opened');
      // заполнение содержимым и удаление полей с ошибками
      this.title.textContent = 'Новое место';

      Array.from(this.elements).forEach((element, index) => {
        switch (index) {
          case 0: element.setAttribute('placeholder', 'Название');
                  element.nextElementSibling.classList.add('popup__input-error_valid');
                  break;
          case 1: element.removeAttribute('minlength');
                  element.removeAttribute('maxlength');
                  element.setAttribute('type', 'url');
                  element.setAttribute('name', 'link');
                  element.setAttribute('placeholder', 'Ссылка на картинку');
                  element.nextElementSibling.classList.add('popup__input-error_valid');
                  break;
          case 2: element.classList.remove('popup__button_save');
                  element.classList.remove('popup__button_active');
                  element.classList.add('popup__button_new');
                  element.textContent = '+'
        }
      });
      // слушатель добавления карточки
      this.form.addEventListener('submit', this.submitCardBind);
      // слушатель закрытия попапа
      this.popup.addEventListener('click', this.close);

    } else if (event.target.classList.contains('user-info__edit-button')) {
      // если нажали на 'edit'
      // удаляем обработчики добавления карточки и обновления данных
      this.form.removeEventListener('submit', this.submitCardBind);
      this.form.removeEventListener('submit', this.updateInfoBind);

      //открытие попапа
      this.popup.classList.add('popup_is-opened');
      // заполнение содержимым и удаление полей с ошибками
      this.title.textContent = 'Редактировать профиль';
      this.form.removeAttribute('name');
      this.form.setAttribute('name', 'profile');
      Array.from(this.elements).forEach((element, index) => {
        switch (index) {
          case 0: element.setAttribute('placeholder', 'Имя');
                  element.nextElementSibling.classList.add('popup__input-error_valid');
                  break;
          case 1: element.setAttribute('type', 'text');
                  element.setAttribute('name', 'info');
                  element.setAttribute('placeholder', 'О себе');
                  element.setAttribute('minlength', '2');
                  element.setAttribute('maxlength', '30');
                  element.nextElementSibling.classList.add('popup__input-error_valid');
                  break;
          case 2: element.classList.remove('popup__button_new');
                  element.classList.add('popup__button_save');
                  element.classList.add('popup__button_active')
                  element.textContent = 'Сохранить';
        }
      });
      // заполнение инпутов информацией о пользователе
      this.userInfo.setUserInfo();
      // слушатель обновления информации о пользователе
      this.form.addEventListener('submit',this.updateInfoBind)
      this.popup.addEventListener('click', this.close);
      
    } else if (event.target.classList.contains('place-card__image')) {
      // картинка
      const url = event.target.style.backgroundImage;
      const link = url.substr(5, url.length-7);
      this.image.classList.add('popup_is-opened');
      this.image.firstElementChild.firstElementChild.src = link;
      this.image.addEventListener('click', this.close);
    }
  }

  close(event) {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup__button')) {
      this.classList.remove('popup_is-opened');
    }
  }

  submitCard(event) {
    event.preventDefault();
    this.cardList.addCard(this.card.create(this.elements[0].value, this.elements[1].value));
    event.target.removeEventListener('submit', this.submitCardBind);
  }

  submitUserInfo(event) {
    event.preventDefault();
    const name = event.target.elements[0].value;
    const info = event.target.elements[1].value;
    this.userInfo.updateUserInfo(name, info);
    event.target.removeEventListener('submit', this.updateInfoBind);
  }
}