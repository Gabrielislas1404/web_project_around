export function removeCard(cardElement) {
  cardElement.remove();
}

export function toggleLike(buttonHeart) {
  buttonHeart.classList.toggle("elements__black-heart");
}

export function checkIsLiked(likes, userId) {
  return likes.find((like) => {
    return like._id === userId;
  });
}

export const validationConfig = {
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonclass: ".popup__save-button:disabled",
  inputErrorClass: ".popup__input:invalid",
  errorClass: ".popup__line",
};
