export class FormValidator {
    constructor(configs, formSelect){
        this._configs = configs
        this._formSelect = formSelect
        this._inputList = Array.from(this._formSelect.querySelectorAll(this._configs.inputSelector));
        this._buttonElement = this._formSelect.querySelector(this._configs.submitButtonSelector);
    }

    _showInputError(inputElement){
        const errorMessage = inputElement.validationMessage;
        const errorElement = this._formSelect.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._configs.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._configs.errorClass);
    }

    _hideInputError(inputElement){
        const errorElement = this._formSelect.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._configs.inputErrorClass);
        errorElement.classList.remove(this._configs.errorClass);
        errorElement.textContent = '';
      };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement);
        } else {
          this._hideInputError(inputElement);
        }
      };

    _setEventListeners() {
    // чтобы проверить состояние кнопки в самом начале
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this.toggleButtonState();
            });
        });
    }; 
     
    validationErrorMessage() {
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
      }
       
    enableValidation(){
        this._formSelect.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
  };

    _hasInvalidInput(){
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  toggleButtonState(){
    if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._configs.inactiveButtonClass);
    } else {
        this._buttonElement.classList.remove(this._configs.inactiveButtonClass);
    }
  }; 
}