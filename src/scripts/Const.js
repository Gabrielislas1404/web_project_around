import PopupWithConfirmation from "./PopupWithConfirmation.js";
import { api } from "../utils/Api.js";

export const pictureButton = document.querySelector(".profile__picture-button");
export const buttonEdit = document.querySelector(".profile__button");
export const profileName = document.querySelector(".profile__name");
export const profileOccupation = document.querySelector(".profile__about-me");
export const profilePicture = document.querySelector(".profile__picture");
export const profileForm = document.forms.edit;
export const inputName = document.querySelector(".popup__input_name");
export const inputOccupation = document.querySelector(
  ".popup__input_occupation"
);
export const inputTitle = document.querySelector(".popup__input_title");
export const inputUrl = document.querySelector(".popup__input_link");
export const addButton = document.querySelector(".profile__add-button");
export const elements = document.querySelector(".elements");
export const buttonLike = document.querySelector(".elements__heart");
export const popupImageSelector = ".popup_image";
export const popupAddSelector = ".popup_add-button";
export const popupProfileSelector = ".popup";
export const popupPictureSelector = ".popup_profile-button";
export const pictureForm = document.querySelector(".popup__content_add");
export const formProfile = document.querySelector(".popup__content");
export const saveButton = document.querySelector(".popup__save-button");
export const saveButtonAvatar = document.querySelector(
  ".popup__save-button_avatar"
);
export const saveButtonPicture = document.querySelector(
  ".popup__save-button_picture"
);
export const popupAvatarForm = document.querySelector(".popup_profile-button");
export const avatarForm = document.querySelector(".popup__content_profile");
export const avatarInput = document.querySelector("#popup__avatar-input");
export const popupConfirm = new PopupWithConfirmation(
  ".popup_erase-photo",
  api
);

import Brooklyn from "../images/brooklyn.jpg";
import TimesSquare from "../images/timessquare.jpg";
import Washington from "../images/washington.jpg";
import CloudGate from "../images/cloudgate.jpg";
import MiamiBeach from "../images/Miamibeach.jpg";
import GoldenGate from "../images/goldengate.jpg";

export const initialCards = [
  {
    name: "Puente de Brooklyn",
    link: Brooklyn,
  },
  {
    name: "Times Square",
    link: TimesSquare,
  },
  {
    name: "Washington D.C",
    link: Washington,
  },
  {
    name: "Cloud Gate",
    link: CloudGate,
  },
  {
    name: "Miami Beach, Florida",
    link: MiamiBeach,
  },
  {
    name: "Golden Gate, San Francisco",
    link: GoldenGate,
  },
];
