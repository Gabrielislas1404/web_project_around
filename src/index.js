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
  saveButtonAvatar,
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
  api.addCard().then(() => {
    const card = new Card(
      inputValues.title,
      inputValues.link,
      "#card-template",
      [],
      false,
      {
        handleCardClick: () => {
          popupImage.open(inputValues.link, inputValues.title);
        },
      }
    );
    elements.prepend(card.generateCard());
  });
}).catch((error) => {
  console.warn(`error:${error.message}`);
});

/* const popupAddButton = new PopupWithForm(popupAddSelector, (inputValues) => {
  const card = new Card(
    inputValues.title,
    inputValues.link,
    "#card-template",
    [],
    false,
    {
      handleCardClick: () => {
        popupImage.open(inputValues.link, inputValues.title);
      },
    }
  );
  elements.prepend(card.generateCard());
}); */

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
        // check if the card is liked by the current user from the server data
        const isLikedByCurrentUser = checkIsLiked(item.likes, userId);
        const card = new Card(
          item.name,
          item.link,
          "#card-template",
          item.likes,
          isLikedByCurrentUser,
          {
            handleCardClick: () => {
              popupImage.open(item.link, item.name);
            },
            //this function is called when the like button is clicked
            handleLikeButtonClick: (likesNumberElement) => {
              // check if the card is liked by the current user
              const isLikedByCurrentUser = card.getIsLikedByCurrentUser();
              if (isLikedByCurrentUser) {
                // if the card is liked by the current user, then remove the like
                api
                  .unlikeCard(item._id)
                  .then((res) => {
                    // set the card as not liked by the current user
                    card.setIsLikedByCurrentUser(false);
                    // update the number of likes
                    likesNumberElement.textContent = res.likes.length;
                  })
                  .catch((error) => console.warn(error));
              } else {
                // if the card is not liked by the current user, then add the like
                api
                  .likeCard(item._id)
                  .then((res) => {
                    // set the card as liked by the current user
                    card.setIsLikedByCurrentUser(true);
                    // update the number of likes
                    likesNumberElement.textContent = res.likes.length;
                  })
                  .catch((error) => console.warn(error));
              }
            },
          }
        );
        cardsSection.addItem(card.generateCard());
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
    api.addCard(nameCard, linkCard).then((card) => {
      let userId = card.owner._id;
      const createOneCard = new Card(
        card,
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
  saveButtonAvatar.textContent = "Guardando...";
  api
    .updateAvatar(avatarInput.value)
    .then((res) => {
      profilePicture.src = res.avatar;
      profilePicture.alt = "Avatar";
      saveButtonAvatar.textContent = "Guardar";
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
