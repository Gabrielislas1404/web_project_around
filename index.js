//variables para abrir y cerrar popup
const buttonEdit = document.querySelector(".profile__button");
const popupProfile = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
//varables para llenar formulario de nombre y ocupación
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__about-me");
const formProfile = document.querySelector(".popup__content");
const inputName = popupProfile.querySelector(".popup__input_name");
const inputOccupation = popupProfile.querySelector(".popup__input_occupation");
//variables para llenar formulario de titulo y enlace
const inputTitle = document.querySelector(".popup__input_title");
const inputLink = document.querySelector(".popup__input_link");
const pictureForm = document.querySelector(".popup__content_add");
//variables para abrir y cerrar popup de profile__add-button
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add-button");
const closeAddprofile = popupAdd.querySelector(".popup__close-button");

//variable botón corazón
const buttonHeart = document.querySelector(".elements__heart");

//variable para imágen de elements
const popupImage = document.querySelector(".popup_image");
//variable para cerrar popup de imágen
const closeImage = popupImage.querySelector(".popup__close-button");

// array cards
const initialCards = [
  {
    name: "Puente de Brooklyn",
    link: "./images/brooklyn.jpg",
  },
  {
    name: "Times Square",
    link: "./images/timessquare.jpg",
  },
  {
    name: "Washington D.C",
    link: "./images/washington.jpg",
  },
  {
    name: "Cloud Gate",
    link: "./images/cloudgate.jpg",
  },
  {
    name: "Miami Beach, Florida",
    link: "./images/Miamibeach.jpg",
  },
  {
    name: "Golden Gate, San Francisco",
    link: "./images/goldengate.jpg",
  },
];

//función para abrir y cerrar popup
function togglePopup(popup) {
  popup.classList.toggle("popup_hide");
}

//función para cambiar color de corazón (hacer like)
function toggleLike(buttonHeart) {
  buttonHeart.classList.toggle("elements__black-heart");
}
//evento para abrir popup de profile
buttonEdit.addEventListener("click", function () {
  togglePopup(popupProfile);
});

//evento para cerrar popup de profile
closeButton.addEventListener("click", function () {
  togglePopup(popupProfile);
});

//evento para cerrar popup de imágen
closeImage.addEventListener("click", function () {
  togglePopup(popupImage);
});

//evento para cambiar nombre y ocupación
formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  formProfile.reset();
  togglePopup(popupProfile);
});

//evento para agregar imágen y su título
pictureForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newCard = createCard(inputTitle.value, inputLink.value);
  elements.prepend(newCard);
  pictureForm.reset();
  togglePopup(popupAdd);
});

//evento para abrir popup addprofile
addButton.addEventListener("click", function () {
  togglePopup(popupAdd);
});

//evento para cerrar popup addprofile
closeAddprofile.addEventListener("click", function () {
  togglePopup(popupAdd);
});

//container de cards <section class ="elements" </section>
const elements = document.querySelector(".elements");

//Iterar función de flecha
initialCards.forEach((item) => {
  const newCard = createCard(item.name, item.link);
  elements.append(newCard);
});

//valores para card-template
function createCard(name, link) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".elements__container")
    .cloneNode(true);
  //<img class="elements__image" src="" alt="" />
  const cardImage = (cardElement.querySelector(".elements__image").src = link);
  // <h3 class="elements__text"></h3>
  const cardText = (cardElement.querySelector(".elements__text").textContent =
    name);
  // <button class="elements__heart"></button>
  const buttonLike = cardElement.querySelector(".elements__heart");
  // <button class="elements__trash"></button>
  const buttonDelete = cardElement.querySelector(".elements__trash");
  buttonDelete.addEventListener("click", function () {
    cardElement.remove();
  });

  // variable y evento para hacer click y abrir popup de imágen
  const openImage = cardElement.querySelector(".elements__image");
  openImage.addEventListener("click", function () {
    popupImage.classList.toggle("popup_hide");
    popupImage.querySelector("img").src = link;
    popupImage.querySelector(".popup__card-name").textContent = name;
  });

  //variable para que corazón reaccione
  const heartButton = cardElement.querySelector(".elements__heart");
  heartButton.addEventListener("click", function () {
    toggleLike(heartButton);
  });

  return cardElement;
}
