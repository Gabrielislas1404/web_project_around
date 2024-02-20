//variables para abrir y cerrar popup
export const buttonEdit = document.querySelector(".profile__button");

export const closeButton = document.querySelector(".popup__close-button");
//varables para llenar formulario de nombre y ocupación
export const profileName = document.querySelector(".profile__name");
export const profileOccupation = document.querySelector(".profile__about-me");
export const formProfile = document.querySelector(".popup__content");
export const inputName = document.querySelector(".popup__input_name");
export const inputOccupation = document.querySelector(
  ".popup__input_occupation"
);
//variables para llenar formulario de titulo y enlace
export const inputTitle = document.querySelector(".popup__input_title");
export const inputLink = document.querySelector(".popup__input_link");
export const pictureForm = document.querySelector(".popup__content_add");
//variables para abrir y cerrar popup de profile__add-button
export const addButton = document.querySelector(".profile__add-button");
export const popupAddSelector = document.querySelector(".popup_add-button");
export const closeAddprofile = popupAddSelector.querySelector(
  ".popup__close-button"
);

//variable botón corazón
export const buttonHeart = document.querySelector(".elements__heart");

//variable para cerrar popup de imágen
export const closeImage = document.querySelector(".popup__close-button");
//variable de overlay para poder cerrar popups con click fuera de formulario
export const overlays = document.querySelectorAll(".popup__overlay");

//container de cards <section class ="elements" </section>
export const elements = document.querySelector(".elements");

export const popupImageSelector = ".popup_image";
export const popupProfileSelector = document.querySelector(".popup");
export const profileForm = document.forms.edit;
export const occupation = profileForm.elements.occupation;

export const initialCards = [
  {
    name: "Puente de Brooklyn",
    link: "../images/brooklyn.jpg",
  },
  {
    name: "Times Square",
    link: "../images/timessquare.jpg",
  },
  {
    name: "Washington D.C",
    link: "../images/washington.jpg",
  },
  {
    name: "Cloud Gate",
    link: "../images/cloudgate.jpg",
  },
  {
    name: "Miami Beach, Florida",
    link: "../images/Miamibeach.jpg",
  },
  {
    name: "Golden Gate, San Francisco",
    link: "../images/goldengate.jpg",
  },
];
