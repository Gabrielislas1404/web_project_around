import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { validationConfig } from "./scripts/utils.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import "./pages/index.css";

import {
  avatarInput,
  popupAvatarForm,
  saveButton,
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

//METODOS DEL SERVER

function getUser() {
  api
    .getUserInfo()
    .then((userData) => {
      profileName.textContent = userData.name;
      profileOccupation.textContent = userData.about;
      profilePicture.src = userData.avatar;
      profilePicture.alt = userData.name;
      /* const userId = userData._id;
      createCard(userId);
      return userId; */
      return userData;
    })
    .catch((error) => {
      console.warn(`error:${error.message}`);
    });
}
getUser();

function createCard(userId) {
  const cardSection = new Section({
    items: initialCards,
    renderer: (data) => {
      const newCard = new Card(data, ".card", function () {
        popupImage.open(data.name, data.link);
      });
    },
  });
}

const newUserInfo = new UserInfo(profileName, profileOccupation);
buttonEdit.addEventListener("click", () => {
  profileForm.open();
  saveButton.textContent = "Guardar";
  profileForm._getInputValues();
});

const profileForm = new PopupWithForm(".popup", () => {
  saveButton.textContent = "Guardando...";
  const inputValues = profileForm._getInputValues;

  console.log(inputName, inputName.value);
  api
    .updateUser(inputName.value, inputOccupation.value)
    .then((newUser) => {
      newUserInfo.setUserInfo({
        name: inputName.value,
        about: inputOccupation.value,
      });
    })
    .catch((error) => {
      console.error("Ha surgido un error", error);
    });
});

popupAvatarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveButton.textContent = "Guardando...";
  api
    .updateAvatar(avatarInput.value)
    .then((avatarUrl) => {
      profilePicture.src = avatarUrl.profilePicture;
      profilePicture.alt = "Avatar";
      saveButton.textContent = "Guardar";
      avatarInput.value = "";
    })
    .catch((error) => {
      console.error("Error", error);
    });
});

/* export function formSubmitHandler(formValues) {
  const name = formValues["input-name"];
  const about = formValues["occupation"];
  saveButton.textContent = "Guardando...";
  api
    .updateUser(name, about)
    .then((userData) => {
      userInfo.setUserInfo({
        userName: userData.name,
        userOccupation: userData.about,
      });
      saveButton.textContent = "Guardar";
    })
    .catch((error) => {
      console.error("Ha surgido un error:", error);
    });

  popupProfileSelector.close();
} */

const FormValidatorProfile = new FormValidator(validationConfig, formProfile);
FormValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(validationConfig, pictureForm);
formValidatorCard.enableValidation();
