import {initialCards} from './js/initialCards';
import {Card} from './js/Card';
import {CardList} from './js/CardList';
import {FormValidator} from './js/FormValidator';
import {Popup} from './js/Popup';
import {UserInfo} from './js/UserInfo';

const placesList = document.querySelector('.places-list');
const newPlaceButton = document.querySelector('.user-info__button');
const userInfoEditButton = document.querySelector('.user-info__edit-button');
const nameUser = document.querySelector('.user-info__name');
const jobUser = document.querySelector('.user-info__job');
const root = document.querySelector('.root');
// DOM попапа
const popupEl = document.querySelector('.popup');
const popupTitleEl = document.querySelector('.popup__title');
const popupImage = document.querySelector('#popup-image');

const form = document.forms.form;

// Создаем объект из стартовых картинок, у которого будет метод create()
const startCards = initialCards.map((card) => {
  const cardConstructor = new Card();
  return cardConstructor.create(card.name, card.link);
})

const cardList = new CardList(placesList, startCards);
const userInfo = new UserInfo(form, nameUser, jobUser);
const card = new Card();
const formValidator = new FormValidator(form);
const popup = new Popup(popupEl, popupTitleEl, popupImage, form, card, cardList, userInfo, root);

// открытие формы для добавления карточки
newPlaceButton.addEventListener('click', popup.open.bind(popup));
// открытие формы для редактирования профиля
userInfoEditButton.addEventListener('click', popup.open.bind(popup));
// открытие картинки
placesList.addEventListener('click', popup.open.bind(popup))

//Отрисовка карточек из коробки
cardList.render();

//Валидация форм
formValidator.setEventListeners();
