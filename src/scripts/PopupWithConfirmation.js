import Popup from "./Popup.js";
import { removeCard } from "./utils.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, apiInstance) {
    super(popupSelector);
    this._handleConfirm = this._handleConfirm.bind(this);
    this._handleClickConfirm = this._handleClickConfirm.bind(this);
    this._api = apiInstance;
    this._buttonDelete = document.querySelector(".popup__save-button_delete");
  }
  _handleConfirm(event) {
    event.preventDefault();
  }

  _handleClickConfirm() {
    this._buttonDelete.textContent = "Eliminando...";
    this._api.deleteCard(this._idCard).then(() => {
      removeCard(this._cardElement);
      this.close();
    });
  }

  openPopup(idCard, cardElement) {
    this._cardElement = cardElement;
    super.open();
    this._buttonDelete.textContent = "Sí";
    this._idCard = idCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector("form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this._handleClickConfirm();
      });

    /* this._buttonDelete.addEventListener("click", this._handleClickConfirm); */
  }
}
