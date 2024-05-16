import { removeCard, toggleLike } from "./utils.js";

export default class Card {
  constructor(
    data,
    selector,
    handleCardClick,
    handleLike,
    handleRemoveLike,
    userId,
    popupConfirm
  ) {
    this.data = data;
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleRemoveLike = handleRemoveLike;
    this._idCard = data._id;
    this._likes = data._likes;
    this._owner = data.owner;
    this._counter = this._likes.length;
    this._userId = userId;
    this._popupConfirm = popupConfirm;
    this.deleteCard = this.deleteCard.bind(this);
  }

  /* export default class Card {
  constructor(name, link, templateSelector, { handleCardClick }) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
 */
  _getTemplate() {
    const cardTemplate = document.querySelector(this.selector).content;
    const cardElement = cardTemplate
      .querySelector(".elements__container")
      .cloneNode(true);
    return cardElement;

    /* cardElement.querySelector(".elements__text").textContent = this.name;

    const cardImage = cardElement.querySelector(".elements__image");
    cardImage.src = this.link;
    cardImage.alt = this.name;

    return cardElement; */
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    if (this._userId !== this._owner._id) {
      this._cardElement.querySelector(".elements__trash").remove();
    }
    if (this.hasOwnerLike()) {
      const buttonLike = this._cardElement.querySelector(".elements__heart");
      buttonLike.classList.add(".elements__black-heart");
    }
    this._cardElement.querySelector(".elements__text").textContent = this._name;
    this._cardElement.querySelector(".elements__image").src = this._link;
    this._cardElement.querySelector(".elements__image").alt = this._name;
    this._cardElement.querySelector(".elements__like").textContent =
      this._counter;
    return this._cardElement;
  }

  deleteCard() {
    this._cardElement.remove();
  }
  hasOwnerLike() {
    return this._likes.some((item) => {
      return item._id === this._userId;
    });
  }

  _setEventListeners() {
    const openImage = this._cardElement.querySelector(".elements__image");

    const buttonLike = this._cardElement.querySelector(".elements__heart");

    const counterLike = this._cardElement.querySelector(".elements__like");
    buttonLike.addEventListener("click", () => {
      if (this.hasOwnerLike()) {
        this._handleRemoveLike(this._idCard, buttonLike, (res) => {
          buttonLike.classList.remove(".elements__black-heart");
          this._likes = res.likes;
          counterLike.textContent = this._counter;
        });
      } else {
        this._handleLike(
          this._idCard,
          THIS.hasOwnerLike(),
          buttonLike,
          (res) => {
            buttonLike.classList.add(".elements__black-heart");
            this._likes = res.likes;
            counterLike.textContent = this._counter + 1;
          }
        );
      }
    });

    const buttonDelete = this._cardElement.querySelector(".elements__trash");

    buttonDelete.addEventListener("click", () => {
      removeCard(this._cardElement);
    });

    openImage.addEventListener("click", this._handleCardClick);

    buttonLike.addEventListener("click", () => {
      toggleLike(buttonLike);
    });
  }
}
