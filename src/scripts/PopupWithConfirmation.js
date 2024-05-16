import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, apiInstance, callback) {
    super(popupSelector);
    this._handleConfirm = this._handleConfirm.bind(this);
    this._handleClickConfirm = this._handleClickConfirm.bind(this);
    this._api = apiInstance;
    this._buttonDelete = document.querySelector(".popup__save-button_delete");
    this._callback = callback;
  }
  _handleConfirm(event) {
    event.preventDefault();
  }

  _handleClickConfirm() {
    this._api.deleteCard(this._idCard).then(() => {
      this._buttonDelete.textContent = "Eliminando...";
      this.close();
      this._callback();
    });
  }

  openPopup(idCard, callback) {
    super.open();
    this._buttonDelete.textContent = "Sí";
    this._idCard = idCard;
    this._callback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector("form")
      .addEventListener("submit", this._handleConfirm);
    /* this._buttonDelete.addEventListener("click", this._handleClickConfirm); */
  }
}
