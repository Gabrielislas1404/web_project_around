import { removeCard, toggleLike } from "./utils.js";

export default class Card {
  constructor(
    name,
    link,
    templateSelector,
    likes,
    cardId,
    userId,
    { handleCardClick }
  ) {
    this.likes = likes;
    this._cardId = cardId;
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this.userId = userId;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const likesNumber = this.likes.length;
    const cardTemplate = document.querySelector(this.templateSelector).content;
    const heartLikes = cardTemplate.querySelector(".elements__like");
    const cardElement = cardTemplate
      .querySelector(".elements__container")
      .cloneNode(true);
    cardElement.querySelector(".elements__text").textContent = this.name;
    heartLikes.textContent = likesNumber <= 0 ? "" : likesNumber;

    const cardImage = cardElement.querySelector(".elements__image");
    cardImage.src = this.link;
    cardImage.alt = this.name;

    return cardElement;
  }

  _remoteRemoveLike(idCard, buttonLike, callback) {
    return api
      .deleteLikeCard(idCard)
      .then((res) => {
        buttonLike.classList.remove("elements__black-heart");
        callback(res);
      })
      .catch((error) => console.warn(error));
  }

  _remoteLike(idCard, isLiked, buttonLike, callback) {
    api
      .likeCard(idCard, isLiked)
      .then((res) => {
        buttonLike.classList.add("elements__black-heart");
        callback(res);
      })
      .catch((error) => console.warn(error));
  }

  _setEventListeners() {
    const isLiked = this.likes.find((item) => {
      return item._id === this.userId;
    });
    console.log(isLiked);

    const openImage = this._cardElement.querySelector(".elements__image");

    const buttonLike = this._cardElement.querySelector(".elements__heart");

    const buttonDelete = this._cardElement.querySelector(".elements__trash");

    buttonDelete.addEventListener("click", () => {
      removeCard(this._cardElement);
    });

    openImage.addEventListener("click", this._handleCardClick);

    buttonLike.addEventListener("click", () => {
      toggleLike(buttonLike);

      this._remoteLike(this._cardId, isLiked);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    return this._cardElement;
  }
}
