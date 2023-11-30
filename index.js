const buttonEdit = document.querySelector(".profile__button");
const popupProfile = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__about-me");
const formProfile = document.querySelector(".popup__content");
const inputName = popupProfile.querySelector(".popup__name");
const inputOccupation = popupProfile.querySelector(".popup__occupation");

function togglePopup(popup) {
  popup.classList.toggle("popup_hide");
}

buttonEdit.addEventListener("click", function () {
  togglePopup(popupProfile);
});

closeButton.addEventListener("click", function () {
  togglePopup(popupProfile);
});

formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  formProfile.reset();
  togglePopup(popupProfile);
});
