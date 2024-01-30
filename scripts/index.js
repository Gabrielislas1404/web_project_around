import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { validationConfig, popupImage, togglePopup } from "./utils.js";

//variables para abrir y cerrar popup
const buttonEdit = document.querySelector(".profile__button");
const popupProfile = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
//varables para llenar formulario de nombre y ocupación
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__about-me");
const formProfile = document.querySelector(".popup__content");
const inputName = popupProfile.querySelector(".popup__input_name");
const inputOccupation = popupProfile.querySelector(".popup__input_occupation");
//variables para llenar formulario de titulo y enlace
const inputTitle = document.querySelector(".popup__input_title");
const inputLink = document.querySelector(".popup__input_link");
const pictureForm = document.querySelector(".popup__content_add");
//variables para abrir y cerrar popup de profile__add-button
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add-button");
const closeAddprofile = popupAdd.querySelector(".popup__close-button");

//variable botón corazón
const buttonHeart = document.querySelector(".elements__heart");

//variable para cerrar popup de imágen
const closeImage = popupImage.querySelector(".popup__close-button");
//variable de overlay para poder cerrar popups con click fuera de formulario
const overlays = document.querySelectorAll(".popup__overlay");

// array cards
const initialCards = [
  {
    name: "Puente de Brooklyn",
    link: "./images/brooklyn.jpg",
  },
  {
    name: "Times Square",
    link: "./images/timessquare.jpg",
  },
  {
    name: "Washington D.C",
    link: "./images/washington.jpg",
  },
  {
    name: "Cloud Gate",
    link: "./images/cloudgate.jpg",
  },
  {
    name: "Miami Beach, Florida",
    link: "./images/Miamibeach.jpg",
  },
  {
    name: "Golden Gate, San Francisco",
    link: "./images/goldengate.jpg",
  },
];

//container de cards <section class ="elements" </section>
const elements = document.querySelector(".elements");

//Iterar función de flecha
initialCards.forEach((item) => {
  const newCard = new Card(item.name, item.link, "#card-template");
  elements.append(newCard.generateCard());
});

//evento para abrir popup de profile
buttonEdit.addEventListener("click", function () {
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
  togglePopup(popupProfile);
});

//evento para cerrar popup de profile
closeButton.addEventListener("click", function () {
  togglePopup(popupProfile);
});

//evento para cerrar popup de imágen
closeImage.addEventListener("click", function () {
  togglePopup(popupImage);
});

//evento para cambiar nombre y ocupación
formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  //formProfile.reset();
  togglePopup(popupProfile);
});

//evento para agregar imágen y su título
pictureForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newCard = new Card(inputTitle.value, inputLink.value, "#card-template");
  elements.prepend(newCard.generateCard());
  //pictureForm.reset();
  togglePopup(popupAdd);
});

//evento para abrir popup addprofile
addButton.addEventListener("click", function () {
  togglePopup(popupAdd);
});

//evento para cerrar popup addprofile
closeAddprofile.addEventListener("click", function () {
  togglePopup(popupAdd);
});

//función de flecha para cerrar popups con click apartir de variable overlays
overlays.forEach((overlay) => {
  overlay.addEventListener("click", function (event) {
    const popup = overlay.closest(".popup");
    togglePopup(popup);
  });
});

const FormValidatorProfile = new FormValidator(validationConfig, formProfile);
FormValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(validationConfig, pictureForm);
formValidatorCard.enableValidation();
