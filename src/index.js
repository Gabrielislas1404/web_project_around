import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { validationConfig, checkIsLiked } from "./scripts/utils.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import "./pages/index.css";
import PopupWithConfirmation from "./scripts/PopupWithConfirmation.js";
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
  pictureForm,
  addButton,
  elements,
  popupAddSelector,
  popupProfileSelector,
  popupPictureSelector,
  popupImageSelector,
} from "./scripts/Const.js";
import { api } from "./utils/Api.js";

const popupConfirm = new PopupWithConfirmation(".popup_erase-photo", api);

buttonEdit.addEventListener("click", function () {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.userName;
  inputOccupation.value = userData.userOccupation;
  saveButton.textContent = "Guardar";
  popupProfile.open();
  FormValidatorProfile.enableValidation();
});

addButton.addEventListener("click", () => {
  saveButtonPicture.textContent = "Crear";
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
  saveButtonPicture.textContent = "Creando...";
  api
    .addCard(inputValues.title, inputValues.link)
    .then((res) => {
      const card = new Card(
        res.name,
        res.link,
        "#card-template",
        [],
        false,
        true,
        {
          handleCardClick: () => {
            popupImage.open(res.link, res.name);
          },

          handleLikeButtonClick: (likesNumberElement) => {
            const isLikedByCurrentUser = card.getIsLikedByCurrentUser();
            if (isLikedByCurrentUser) {
              api
                .unlikeCard(res._id)
                .then((likeRes) => {
                  card.setIsLikedByCurrentUser(false);

                  likesNumberElement.textContent = likeRes.likes.length;
                })
                .catch((error) => console.warn(error));
            } else {
              api
                .likeCard(res._id)
                .then((likeRes) => {
                  card.setIsLikedByCurrentUser(true);

                  likesNumberElement.textContent = likeRes.likes.length;
                })
                .catch((error) => console.warn(error));
            }
          },
          handleDeleteClick: (cardElement) => {
            popupConfirm.openPopup(res._id, cardElement);
          },
        }
      );
      elements.prepend(card.generateCard());
    })
    .catch((error) => {
      console.warn(`error:${error.message}`);
    });
});

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  occupationSelector: ".profile__about-me",
});

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
        const isOwnedByUser = userId === item.owner._id;

        const isLikedByCurrentUser = checkIsLiked(item.likes, userId);
        const card = new Card(
          item.name,
          item.link,
          "#card-template",
          item.likes,
          isLikedByCurrentUser,
          isOwnedByUser,
          {
            handleCardClick: () => {
              popupImage.open(item.link, item.name);
            },

            handleLikeButtonClick: (likesNumberElement) => {
              const isLikedByCurrentUser = card.getIsLikedByCurrentUser();
              if (isLikedByCurrentUser) {
                api
                  .unlikeCard(item._id)
                  .then((res) => {
                    card.setIsLikedByCurrentUser(false);

                    likesNumberElement.textContent = res.likes.length;
                  })
                  .catch((error) => console.warn(error));
              } else {
                api
                  .likeCard(item._id)
                  .then((res) => {
                    card.setIsLikedByCurrentUser(true);

                    likesNumberElement.textContent = res.likes.length;
                  })
                  .catch((error) => console.warn(error));
              }
            },
            handleDeleteClick: (cardElement) => {
              popupConfirm.openPopup(item._id, cardElement);
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

const profileForm = new PopupWithForm(".popup", (inputValues) => {
  saveButton.textContent = "Guardando...";

  api.updateUser(inputValues.name, inputValues.occupation);
});

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

const FormValidatorProfile = new FormValidator(validationConfig, formProfile);
FormValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(validationConfig, pictureForm);
formValidatorCard.enableValidation();
