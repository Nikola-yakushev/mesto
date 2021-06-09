import { openPopup, popupImage, imageLink, imageText} from "./index.js";

export class Card{
    constructor(data, cardSelector){
        this._cardName = data.name;
        this._cardLink = data.link;
        this._cardSelector = cardSelector
    }

    _getTemplate(){
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard(){
        //нашли темплейт
        this._element = this._getTemplate();
        this._setEventListeners();
        //определили содержание карточки
        this._cardText = this._element.querySelector('.element__text');
        this._cardImage = this._element.querySelector('.element__image');
        //наполнили карточку данными 
        this._cardText.textContent = this._cardName;
        this._cardImage.alt = this._cardName;
        this._cardImage.src = this._cardLink;
        //вернули карточку
        return this._element;
    }

    _setEventListeners(){
        //поставим обработчик на кнопку лайка 
        this._likeButton = this._element.querySelector('.element__like');
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
          });
        //поставим обработчик на кнопку удаления карточки
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick();
          });
        //поставим обработчик на кнопку открывающую попап с картинкой
        this._imageButton = this._element.querySelector('.element__image-button');
        this._imageButton.addEventListener('click', () => {
            this._handlePopupImageClick();
          });
    }

    //функция позволяет ставить лайки
    _handleLikeClick(){
        this._likeButton.classList.toggle('element__like_active');
    }
    //функция позволяет удалять карточку
    _handleDeleteClick(){
        this._element.remove();
        this._element = null;
    }
    //функция позволяет открывать попап с картинкой
    _handlePopupImageClick(){
        openPopup(popupImage);
        imageText.textContent = this._cardName
        imageText.alt = this._cardName
        imageLink.src = this._cardLink
    }
}


