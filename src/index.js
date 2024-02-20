import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { validationConfig } from "./scripts/utils.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import "./pages/index.css";

import {
  buttonEdit,
  closeButton,
  profileName,
  profileOccupation,
  formProfile,
  inputName,
  inputOccupation,
  inputTitle,
  inputLink,
  pictureForm,
  addButton,
  closeAddprofile,
  buttonHeart,
  closeImage,
  overlays,
  profileForm,
  //occupation,
  initialCards,
  elements,
  popupAddSelector,
  popupProfileSelector,
  popupImageSelector,
} from "./scripts/Const.js";

//Iterar función de flecha
//initialCards.forEach((item) => {
//const newCard = new Card(item.name, item.link, "#card-template");
//elements.append(newCard.generateCard());
//});

//evento para abrir popup de profile
/*buttonEdit.addEventListener("click", function () {
inputName.value = profileName.textContent;
inputOccupation.value = profileOccupation.textContent;
togglePopup(popupProfile);
FormValidatorProfile.enableValidation();
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
pictureForm.reset();
togglePopup(popupAdd);
});

//evento para abrir popup addprofile
addButton.addEventListener("click", function () {
togglePopup(popupAdd);
formValidatorCard.enableValidation();
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
}); */

const popupImage = new PopupWithImage(popupImageSelector);
const popupProfile = new PopupWithForm(popupProfileSelector, (inputValues) => {
  profileName.textContent = inputValues.name;
  profileOccupation.textContent = inputOccupation.value;
  popupProfile.close();
});

const popupAddButton = new PopupWithForm(popupAddSelector, (inputValues) => {
  const newCard = new Card(
    inputValues.name,
    inputValues.link,
    "#card-template",
    {
      handleCardClick: () => {
        popupImage.open(inputValues.link, inputValues.name);
      },
    }
  );
  elements.prepend(newCard.generateCard());
});

buttonEdit.addEventListener("click", function () {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.userName;
  inputOccupation.value = userData.userOccupation;
  popupProfile.open();
});

addButton.addEventListener("click", () => {
  popupAddButton.open();
});

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item.name, item.link, "#card-template", {
        handleCardClick: () => {
          popupImage.open(item.link, item.name);
        },
      });
      cardsSection.addItem(newCard.generateCard());
    },
  },
  ".elements"
);

cardsSection.renderer();

const userInfo = new UserInfo("profile**name", ".profile**about-me");

const FormValidatorProfile = new FormValidator(validationConfig, formProfile);
FormValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(validationConfig, pictureForm);
formValidatorCard.enableValidation();
