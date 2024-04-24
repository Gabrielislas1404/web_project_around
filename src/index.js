import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { validationConfig } from "./scripts/utils.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import "./pages/index.css";

import {
  pictureButton,
  buttonEdit,
  profileName,
  profileOccupation,
  profilePicture,
  formProfile,
  inputName,
  inputOccupation,
  pictureForm,
  addButton,
  initialCards,
  elements,
  popupAddSelector,
  popupProfileSelector,
  popupPictureSelector,
  popupImageSelector,
} from "./scripts/Const.js";
import { api } from "./utils/Api.js";

function getUser() {
  api.getUserInfo().then((userData) => {
    profileName.textContent = userData.name;
    profileOccupation.textContent = userData.about;
    profilePicture.src = userData.avatar;
    profilePicture.alt = userData.name;
  });
}

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

pictureButton.addEventListener("click", () => {
  popupPictureProfile.open();
  formValidatorCard.enableValidation();
});

const popupImage = new PopupWithImage(popupImageSelector);
const popupProfile = new PopupWithForm(popupProfileSelector, (inputValues) => {
  profileName.textContent = inputValues.name;
  profileOccupation.textContent = inputOccupation.value;
  popupProfile.close();
});

const popupPictureProfile = new PopupWithForm(
  popupPictureSelector,
  (inputValues) => {
    profilePicture.src = inputValues.link;
    popupPictureProfile.close();
  }
);

const popupAddButton = new PopupWithForm(popupAddSelector, (inputValues) => {
  const newCard = new Card(
    inputValues.title,
    inputValues.link,
    "#card-template",
    {
      handleCardClick: () => {
        popupImage.open(inputValues.link, inputValues.title);
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
