const popupUser = document.querySelector('.popup'); // наш попап для заполнения данных пользователя
const popupUserForm = document.querySelector('.popup__form'); //наша форма попапа для заполнения данных пользователя
const popupAdd = document.querySelector('.popup-add'); //наш попап, добавляющий карточку
const popupAddForm = document.querySelector('.popup-add__form'); //наша форма, добавляющая карточку
const popupImage = document.querySelector('.popup-image');//попап, открывающий картинки из карточек

const editButton = document.querySelector('.profile__edit-button'); // нашли кнопку открытия попапа 
const closeButtonUser = document.querySelector('.popup__close-button'); //кнопка закрытия формы
const closeButtonAdd = document.querySelector('.popup-add__close-button'); //кнопка закрытия формы
const closeButtonImage = document.querySelector('.popup-image__close-button');
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

  const imageButton = document.querySelector('.element__image-button');
  imageButton.addEventListener('click', function() {
  openPopup(popupImage);
  const imageLink = document.querySelector('.popup-image__image');
  const imageText = document.querySelector('.popup-image__title');
  imageText.textContent = item.name;
  imageText.alt = item.name;
  imageLink.src = item.link;
  });

  return cardElement;
};

function cardAdd(item) {
  const card = createCard(item);
  elementsList.append(card);
};

//функция добавления карточек из массива 
  initialCards.forEach(function (item) {
  const card = createCard(item);
  elementsList.append(card);
});

//функция открытия попапа, принимающая на вход заданное значение
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия попапа, принимающая на вход заданное значение
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

//функция открытия попапа, добавляющего картинки
function openAddForm() {
  openPopup(popupAdd);
}

//функция закрытия попапа, добавляющего картинки
function closeAddForm() {
  closePopup(popupAdd);
}

//функция отправки формы добавления карточки
function submitAddForm (evt) {
  evt.preventDefault();
  const item = {name: inputTextTitle.value, link: inputTextLink.value};
  createCard(item);
  closePopup(popupAdd);
};

//функция отправки формы юзера
function submitUserForm (evt) {
  evt.preventDefault();
  profileName.textContent = inputTextName.value;
  profileHobby.textContent = inputTextHobby.value;
  closePopup(popupUser);
  };
   
  //функция открытия попапа юзера
  function openUserForm() {
  inputTextName.value = profileName.textContent;
  inputTextHobby.value = profileHobby.textContent;
  openPopup(popupUser);
  };
  
  //функция закрытия попапа юзера
  function closeUserForm() {
  closePopup(popupUser);
  };

  function closeImageForm() {
  closePopup(popupImage);
  };

//обработчики 
addButton.addEventListener('click', openAddForm);
closeButtonAdd.addEventListener('click', closeAddForm);
popupAddForm.addEventListener('submit', submitAddForm);
editButton.addEventListener('click', openUserForm);
closeButtonUser.addEventListener('click', closeUserForm);
popupUserForm.addEventListener('submit', submitUserForm);
closeButtonImage.addEventListener('click', closeImageForm);
