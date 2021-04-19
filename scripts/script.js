const popup = document.querySelector('.popup'); // наш попап для заполнения данных пользователя
const popupEdit = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const popupImage = document.querySelector('.popup_type_image')

const popupFormEdit = document.querySelector('.popup__form_edit'); //наша форма попапа для заполнения данных пользователя
const popupFormCard = document.querySelector('.popup__form_card');

const editButton = document.querySelector('.profile__edit-button'); // нашли кнопку открытия попапа 
let closeButtonEdit = document.querySelector('.popup__close-button_edit'); //кнопка закрытия формы
let closeButtonCard = document.querySelector('.popup__close-button_card');
let closeButtonImage = document.querySelector('.popup__close-button_image');
const addButton = document.querySelector('.profile__add-button');// кнопка открытия попапа для добавления карточки

const profileName = document.querySelector('.profile__name'); // нашли место куда вставляется текст имени
const profileHobby = document.querySelector('.profile__hobby'); // нашли место куда вставляется текст хобби


const inputTextName = document.querySelector('.popup__input_name_name'); // инпут имени
const inputTextHobby = document.querySelector('.popup__input_name_hobby'); // инпут хобби
const inputTextTitle = document.querySelector('.popup__input_name_title'); // инпут заголовка картинки
const inputTextLink = document.querySelector('.popup__input_name_link'); //инпут ссылки на картинку

const elementsList = document.querySelector('.elements'); //нашли место спауна карточек
const elementTemplate = document.querySelector('.element-template').content.querySelector('.element'); //создали константу template


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

//функция создания карточки из данных массива
function createCard(item) {
  const cardElement = elementTemplate.cloneNode(true);
  const cardText = cardElement.querySelector('.element__text');
  const cardImage = cardElement.querySelector('.element__image');
  cardText.textContent = item.name;
  cardText.alt = item.name;
  cardImage.src = item.link;
  elementsList.prepend(cardElement);

  //функция позволяющая ставить лайки
  const likeButton = document.querySelector('.element__like');
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__like_active');
  });
  //функция удаляющая карточки
  const deleteButton = cardElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', function() {
  cardElement.remove();
  });
  //открытие при нажатии на картинку 
  const imageButton = document.querySelector('.element__image-button');
  imageButton.addEventListener('click', function() {
  openPopup(popupImage);
  const imageLink = document.querySelector('.popup__image');
  const imageText = document.querySelector('.popup__caption');
  imageText.textContent = item.name;
  imageText.alt = item.name;
  imageLink.src = item.link;
  });

  return cardElement;
};
//функция добавление карточки
function cardAdd(item) {
  const card = createCard(item);
  elementsList.append(card);
};

//функция добавления карточек из массива 
  initialCards.forEach(function (item) {
  const card = createCard(item);
  elementsList.append(card);
});



//функция открытия попапа, добавляющего картинки
function openNewCardPopup() {
  openPopup(popupNewCard);
}

//функция закрытия попапа, добавляющего картинки
function closeNewCardPopup() {
  closePopup(popupNewCard);
}

//функция отправки формы добавления карточки
function submitNewCardPopup (evt) {
  evt.preventDefault();
  const item = {name: inputTextTitle.value, link: inputTextLink.value};
  createCard(item);
  closePopup(popupNewCard);
};

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
  popup.classList.add('popup_opened');
}

//функция закрытия попапа, принимающая на вход заданное значение
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

//обработчики 
addButton.addEventListener('click', openNewCardPopup);
closeButtonCard.addEventListener('click', closeNewCardPopup);
popupFormCard.addEventListener('submit', submitNewCardPopup);
editButton.addEventListener('click', openEditPopup);
closeButtonEdit.addEventListener('click', closeEditPopup);
popupFormEdit.addEventListener('submit', submitEditPopup);
closeButtonImage.addEventListener('click', closeImagePopup);
