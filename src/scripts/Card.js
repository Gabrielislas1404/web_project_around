import { removeCard, toggleLike } from "./utils.js";

export default class Card {
  constructor(
    name,
    link,
    templateSelector,
    likes,
    isLikedByCurrentUser,
    { handleCardClick, handleLikeButtonClick }
  ) {
    this.likes = likes;
    this.isLikedByCurrentUser = isLikedByCurrentUser;
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  _getTemplate() {
    const likesNumber = this.likes.length;
    const cardTemplate = document.querySelector(this.templateSelector).content;
    const cardElement = cardTemplate
      .querySelector(".elements__container")
      .cloneNode(true);
    cardElement.querySelector(".elements__text").textContent = this.name;
    const heartIcon = cardElement.querySelector(".elements__heart");
    this.isLikedByCurrentUser &&
      heartIcon.classList.add("elements__black-heart");
    const heartLikes = cardElement.querySelector(".elements__like");
    heartLikes.textContent = likesNumber <= 0 ? "0" : likesNumber;

    const cardImage = cardElement.querySelector(".elements__image");
    cardImage.src = this.link;
    cardImage.alt = this.name;

    return cardElement;
  }

  setIsLikedByCurrentUser(isLikedByCurrentUser) {
    //expects a boolean
    this.isLikedByCurrentUser = isLikedByCurrentUser;
  }

  getIsLikedByCurrentUser() {
    return this.isLikedByCurrentUser;
  }

  _setEventListeners() {
    const openImage = this._cardElement.querySelector(".elements__image");

    const buttonLike = this._cardElement.querySelector(".elements__heart");

    const buttonDelete = this._cardElement.querySelector(".elements__trash");

    const likeNumber = this._cardElement.querySelector(".elements__like");

    buttonDelete.addEventListener("click", () => {
      removeCard(this._cardElement);
    });

    openImage.addEventListener("click", this._handleCardClick);

    buttonLike.addEventListener("click", () => {
      toggleLike(buttonLike);
      this._handleLikeButtonClick(likeNumber);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    return this._cardElement;
  }
}
