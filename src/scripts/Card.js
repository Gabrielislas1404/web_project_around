import { removeCard, toggleLike } from "./utils.js";

export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    //valores para card-template
    const cardTemplate = document.querySelector(this.templateSelector).content;
    const cardElement = cardTemplate
      .querySelector(".elements__container")
      .cloneNode(true);
    // <h3 class="elements__text"></h3>
    cardElement.querySelector(".elements__text").textContent = this.name;
    //<img class="elements__image" src="" alt="" />
    const cardImage = cardElement.querySelector(".elements__image");
    cardImage.src = this.link;
    cardImage.alt = this.name;

    return cardElement;
  }

  _setEventListeners() {
    const openImage = this._cardElement.querySelector(".elements__image");
    // <button class="elements__heart"></button>
    const buttonLike = this._cardElement.querySelector(".elements__heart");
    // <button class="elements__trash"></button>
    const buttonDelete = this._cardElement.querySelector(".elements__trash");

    buttonDelete.addEventListener("click", () => {
      removeCard(this._cardElement);
    });

    // Se  sustituye por handleCardClick????
    //openImage.addEventListener("click", () => {
    // openPopup(popupImage, this.link, this.name);
    //togglePopup(popupImage);
    //});

    openImage.addEventListener("click", this.handleCardClick);

    buttonLike.addEventListener("click", () => {
      toggleLike(buttonLike);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    return this._cardElement;
  }
}
