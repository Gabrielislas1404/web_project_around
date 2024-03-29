export const buttonEdit = document.querySelector(".profile__button");
export const profileName = document.querySelector(".profile__name");
export const profileOccupation = document.querySelector(".profile__about-me");
export const profileForm = document.forms.edit;
export const inputName = document.querySelector(".popup__input_name");
export const inputOccupation = document.querySelector(
  ".popup__input_occupation"
);
export const addButton = document.querySelector(".profile__add-button");
export const elements = document.querySelector(".elements");
export const popupImageSelector = ".popup_image";
export const popupAddSelector = ".popup_add-button";
export const popupProfileSelector = ".popup";
export const pictureForm = document.querySelector(".popup__content_add");
export const formProfile = document.querySelector(".popup__content");

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
