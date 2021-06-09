import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initial-cards.js' 
import {validationConfig} from './validation-config.js' 
export { imageLink, imageText, buttonDisabled, openPopup, popupImage};

const popupEdit = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const popupImage = document.querySelector('.popup_type_image')

const popupFormEdit = document.querySelector('.popup__form_edit'); //наша форма попапа для заполнения данных пользователя
const popupFormCard = document.querySelector('.popup__form_card');
const popupSubButton = popupNewCard.querySelector('.popup__add-button')

const editButton = document.querySelector('.profile__edit-button'); // нашли кнопку открытия попапа 
const closeButtonEdit = document.querySelector('.popup__close-button_edit'); //кнопка закрытия формы
const closeButtonCard = document.querySelector('.popup__close-button_card');
const closeButtonImage = document.querySelector('.popup__close-button_image');
const addButton = document.querySelector('.profile__add-button');// кнопка открытия попапа для добавления карточки

const imageLink = document.querySelector('.popup__image');
const imageText = document.querySelector('.popup__caption');

const profileName = document.querySelector('.profile__name'); // нашли место куда вставляется текст имени
const profileHobby = document.querySelector('.profile__hobby'); // нашли место куда вставляется текст хобби

const inputTextName = document.querySelector('.popup__input_name_name'); // инпут имени
const inputTextHobby = document.querySelector('.popup__input_name_hobby'); // инпут хобби
const inputTextTitle = document.querySelector('.popup__input_name_title'); // инпут заголовка картинки
const inputTextLink = document.querySelector('.popup__input_name_link'); //инпут ссылки на картинку

const elementsList = document.querySelector('.elements'); //нашли место спауна карточек

function renderCard (data) {
  const cardItem = new Card (data, '.element-template');
const cardElement = cardItem.generateCard();
return cardElement
}

//функция отправки формы добавления карточки
function submitNewCardPopup (evt) {
  evt.preventDefault();
  const data = {name: inputTextTitle.value, link: inputTextLink.value};
  prependCard(elementsList, renderCard (data))
  closePopup(popupNewCard);
};

function prependCard (section, card){
  section.prepend(card);
}

//функция добавления карточек из массива 
function appendCard(initialCards){
  initialCards.forEach(function (data) {
  elementsList.append(renderCard (data));
});
}

function resetPopupForm(form) {
  form.reset();
}

//функция открытия попапа, добавляющего картинки
function openNewCardPopup() {
  popupSubButton.classList.add("popup__add-button_inactive");
  buttonDisabled(popupSubButton);
  resetPopupForm(popupFormCard);
  openPopup(popupNewCard);
}

function buttonDisabled(item){
  item.setAttribute('disabled', true);
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
  function openPopup (popup) {
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

const editFormValidator = new FormValidator(validationConfig, popupFormEdit)
editFormValidator.enableValidation()

const cardFormValidator = new FormValidator(validationConfig, popupFormCard)
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
