import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { validationConfig, checkIsLiked } from "./scripts/utils.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import "./pages/index.css";

import {
  avatarInput,
  popupAvatarForm,
  saveButton,
  saveButtonPicture,
  pictureButton,
  buttonEdit,
  profileName,
  profileOccupation,
  profilePicture,
  formProfile,
  inputName,
  inputOccupation,
  inputTitle,
  inputUrl,
  pictureForm,
  addButton,
  initialCards,
  elements,
  popupAddSelector,
  popupProfileSelector,
  popupPictureSelector,
  popupImageSelector,
  popupConfirm,
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

//METODOS DEL SERVER

api
  .getUserInfo()
  .then((userData) => {
    profileName.textContent = userData.name;
    profileOccupation.textContent = userData.about;
    profilePicture.src = userData.avatar;
    profilePicture.alt = userData.name;
    userInfo.setUserId(userData._id);
  })
  .catch((error) => {
    console.warn(`error:${error.message}`);
  });

api.getInitialCards().then((cards) => {
  const userId = userInfo.getUserId();

  const cardsSection = new Section(
    {
      items: cards,
      renderer: (item) => {
        /* const isLiked = item.likes.find((like) => {
          return like._id === userId;
        }); */
        const isLiked = checkIsLiked(item.likes, userId);
        const newCard = new Card(
          item.name,
          item.link,
          "#card-template",
          item.likes,
          isLiked,
          {
            handleCardClick: () => {
              popupImage.open(item.link, item.name);
            },
            handleLike: (likesNumberElement) => {
              const isLiked = checkIsLiked(item.likes, userId);
              api
                .likeCard(item._id, isLiked)
                .then((res) => {
                  console.log(res);
                  likesNumberElement.textContent = res.likes.length;
                })

                .catch((error) => console.warn(error));
            },
          }
        );
        cardsSection.addItem(newCard.generateCard());
      },
    },
    ".elements"
  );

  cardsSection.renderer();
});

const newUserInfo = new UserInfo(profileName, profileOccupation);
buttonEdit.addEventListener("click", () => {
  profileForm.open();
  saveButton.textContent = "Guardar";
  profileForm._getInputValues();
});

const profileForm = new PopupWithForm(".popup", (inputValues) => {
  saveButton.textContent = "Guardando...";

  api.updateUser(inputValues.name, inputValues.occupation);
  /*   .then((newUser) => {
      newUserInfo.setUserInfo({
        name: inputValues.name,
        about: inputValues.occupation,
      });
    })
    .catch((error) => {
      console.error("Ha surgido un error", error);
    }); */
});

function containerCard(cardSection) {
  const pictureForm = new PopupWithForm(".popup_add-button", () => {
    const nameCard = inputTitle.value;
    const linkCard = inputUrl.value;
    saveButton.textContent = "Guardando...";
    api.addCard(nameCard, linkCard).then((newCard) => {
      let userId = newCard.owner._id;
      const createOneCard = new Card(
        newCard,
        "#card-template",
        function () {
          popupImage.open(nameCard, linkCard);
        },
        remoteLike,
        remoteRemoveLike,
        userId,
        popupConfirm
      );
      const cardElement = createOneCard.generateCard();
      cardSection.addItem(cardElement, true);
      saveButtonPicture.textContent = "Crear";
      inputTitle.value = "";
      inputUrl.value = "";
    });
  });
  addButton.addEventListener("click", () => {
    pictureForm.open();
  });
  saveButtonPicture.addEventListener("click", () => {
    pictureForm.close();
  });
}

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
