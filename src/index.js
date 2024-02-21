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
  profileName,
  profileOccupation,
  formProfile,
  inputName,
  inputOccupation,
  pictureForm,
  addButton,
  initialCards,
  elements,
  popupAddSelector,
  popupProfileSelector,
  popupImageSelector,
} from "./scripts/Const.js";

buttonEdit.addEventListener("click", function () {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.userName;
  inputOccupation.value = userData.userOccupation;
  popupProfile.open();
  FormValidatorProfile.enableValidation();
});

addButton.addEventListener("click", () => {
  popupAddButton.open();
  formValidatorCard.enableValidation();
});

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

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  occupationSelector: ".profile__about-me",
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

const FormValidatorProfile = new FormValidator(validationConfig, formProfile);
FormValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(validationConfig, pictureForm);
formValidatorCard.enableValidation();
