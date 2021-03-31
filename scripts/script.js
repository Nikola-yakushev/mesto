let popupForm = document.querySelector('.popup'); // наш попап

let editButton = document.querySelector('.profile__edit-button'); // нашли кнопку открытия попапа 
let closeButton = document.querySelector('.popup__close-button'); //кнопка закрытия формы

let profileName = document.querySelector('.profile__name'); // нашли место куда вставляется текст имени
let profileHobby = document.querySelector('.profile__hobby'); // нашли место куда вставляется текст хобби

let inputTextName = document.querySelector('.popup__input_name_name');
let inputTextHobby = document.querySelector('.popup__input_name_hobby');


function openForm() {
    popupForm.classList.add('popup_display_active');
    inputTextName.value = profileName.textContent;
    inputTextHobby.value = profileHobby.textContent;
}

function closeForm() {
    popupForm.classList.remove('popup_display_active');
}

function submitForm (evt) {
  evt.preventDefault();
  profileName.textContent = inputTextName.value;
  profileHobby.textContent = inputTextHobby.value;
  closeForm();
}

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
popupForm.addEventListener('submit', submitForm);



