//variable para imágen de elements
export const popupImage = document.querySelector(".popup_image");

export function removeCard(cardElement) {
  cardElement.remove();
}

//función para cambiar color de corazón (hacer like)
export function toggleLike(buttonHeart) {
  buttonHeart.classList.toggle("elements__black-heart");
}

//función para abrir y cerrar popup
export function togglePopup(popup) {
  popup.classList.toggle("popup_hide");
}

//hacer click y abrir popup de imágen
export function openPopup(popupImage, link, name) {
  //popupImage.classList.toggle("popup_hide");
  popupImage.querySelector("img").src = link;
  popupImage.querySelector(".popup__card-name").textContent = name;
  popupImage.querySelector("img").setAttribute("alt", name);
}

//función para cerrar popups con tecla Esc
export function closePopups(event) {
  if (event.key === "Escape") {
    const popups = document.querySelectorAll(".popup");
    popups.forEach((popup) => {
      if (popup.classList.contains("popup_hide")) {
        togglePopup(popup);
      }
    });
  }
}
document.addEventListener("keydown", closePopups);

//validacion del form
export const validationConfig = {
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonclass: ".popup__save-button:disabled",
  inputErrorClass: ".popup__input:invalid",
  errorClass: ".popup__line",
};
