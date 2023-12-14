//variables para abrir y cerrar popup
const buttonEdit = document.querySelector(".profile__button");
const popupProfile = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
//varables para llenar formulario de nombre y ocupación
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__about-me");
const formProfile = document.querySelector(".popup__content");
const inputName = popupProfile.querySelector(".popup__name");
const inputOccupation = popupProfile.querySelector(".popup__occupation");

//función para abrir y cerrar popup
function togglePopup(popup) {
  popup.classList.toggle("popup_hide");
}

buttonEdit.addEventListener("click", function () {
  togglePopup(popupProfile);
});

closeButton.addEventListener("click", function () {
  togglePopup(popupProfile);
});

//evento para cambiar nombre y ocupación
formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  formProfile.reset();
  togglePopup(popupProfile);
});

// array cards
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

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
  //Clonar nodo
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

  return cardElement;
}
