import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const popupEdit = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
export const popupImage = document.querySelector('.popup_type_image')

const popupFormEdit = document.querySelector('.popup__form_edit'); //наша форма попапа для заполнения данных пользователя
const popupFormCard = document.querySelector('.popup__form_card');
const popupSubButton = popupNewCard.querySelector('.popup__add-button')

const editButton = document.querySelector('.profile__edit-button'); // нашли кнопку открытия попапа 
const closeButtonEdit = document.querySelector('.popup__close-button_edit'); //кнопка закрытия формы
const closeButtonCard = document.querySelector('.popup__close-button_card');
const closeButtonImage = document.querySelector('.popup__close-button_image');
const addButton = document.querySelector('.profile__add-button');// кнопка открытия попапа для добавления карточки

export const imageLink = document.querySelector('.popup__image');
export const imageText = document.querySelector('.popup__caption');

const profileName = document.querySelector('.profile__name'); // нашли место куда вставляется текст имени
const profileHobby = document.querySelector('.profile__hobby'); // нашли место куда вставляется текст хобби


const inputTextName = document.querySelector('.popup__input_name_name'); // инпут имени
const inputTextHobby = document.querySelector('.popup__input_name_hobby'); // инпут хобби
const inputTextTitle = document.querySelector('.popup__input_name_title'); // инпут заголовка картинки
const inputTextLink = document.querySelector('.popup__input_name_link'); //инпут ссылки на картинку

const elementsList = document.querySelector('.elements'); //нашли место спауна карточек


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__add-button',
  inactiveButtonClass: 'popup__add-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//функция отправки формы добавления карточки
function submitNewCardPopup (evt) {
  evt.preventDefault();
  const data = {name: inputTextTitle.value, link: inputTextLink.value};
  const cardItem = new Card (data, '.element-template');
  const cardElement = cardItem.generateCard();

  prependCard(elementsList, cardElement)
  closePopup(popupNewCard);
};

function prependCard (section, card){
  section.prepend(card);
}

//функция добавления карточек из массива 
function appendCard(initialCards){
  initialCards.forEach(function (item) {
  const card = new Card (item, '.element-template');
  const cardItem = card.generateCard();
  elementsList.append(cardItem);
});
}

function resetPopupForm(form) {
  form.reset();
}

//функция открытия попапа, добавляющего картинки
function openNewCardPopup() {
  popupSubButton.classList.add("popup__add-button_inactive");
  resetPopupForm(popupFormCard);
  openPopup(popupNewCard);
}

//функция закрытия попапа, добавляющего картинки
function closeNewCardPopup() {
  closePopup(popupNewCard);
}



//функция отправки формы юзера
function submitEditPopup (evt) {
  evt.preventDefault();
  profileName.textContent = inputTextName.value;
  profileHobby.textContent = inputTextHobby.value;
  closePopup(popupEdit);
  };
   
  //функция открытия попапа юзера
  function openEditPopup() {
  inputTextName.value = profileName.textContent;
  inputTextHobby.value = profileHobby.textContent;
  openPopup(popupEdit);
  };
  
  //функция закрытия попапа юзера
  function closeEditPopup() {
  closePopup(popupEdit);
  };

  function closeImagePopup() {
  closePopup(popupImage);
  };

  //функция открытия попапа, принимающая на вход заданное значение
  export function openPopup (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
}

//функция закрытия попапа, принимающая на вход заданное значение
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}


//закрытие при нажатии на Esc
function closeByEsc (event){
  if (event.key === 'Escape'){
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

//закрытие при клике вне попапа
function closeByClick (evt){
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

appendCard(initialCards);


const editFormValidator = new FormValidator(enableValidation, popupFormEdit)
editFormValidator.enableValidation()

const cardFormValidator = new FormValidator(enableValidation, popupFormCard)
cardFormValidator.enableValidation()


//обработчики 
addButton.addEventListener('click', openNewCardPopup);
closeButtonCard.addEventListener('click', closeNewCardPopup);
popupFormCard.addEventListener('submit', submitNewCardPopup);
editButton.addEventListener('click', openEditPopup);
closeButtonEdit.addEventListener('click', closeEditPopup);
popupFormEdit.addEventListener('submit', submitEditPopup);
closeButtonImage.addEventListener('click', closeImagePopup);
document.addEventListener('click', closeByClick)
