const showInputError = (formElement, inputElement, errorMessage, selector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selector.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selector.errorClass);
};
const hideInputError = (formElement, inputElement, selector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selector.inputErrorClass);
  errorElement.classList.remove(selector.errorClass);
  errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement, selector) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selector);
  } else {
    hideInputError(formElement, inputElement, selector);
  }
};

const setEventListeners = (formElement, selector) => {
  const inputList = Array.from(formElement.querySelectorAll(selector.inputSelector));
  const buttonElement = formElement.querySelector(selector.submitButtonSelector);
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, selector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selector);
      toggleButtonState(inputList, buttonElement, selector);
    });
  });
}; 

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, object);
  });
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};
const toggleButtonState = (inputList, buttonElement, selector) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selector.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(selector.inactiveButtonClass);
  }
}; 

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__add-button',
  inactiveButtonClass: 'popup__add-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
})