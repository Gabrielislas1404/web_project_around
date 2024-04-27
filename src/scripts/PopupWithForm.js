import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._submitCallBack = callback;
  }

  close() {
    const form = this._popupElement.querySelector("form");
    super.close();
  }

  _getInputValues() {
    const inputValues = {};
    const form = this._popupElement.querySelector("form");
    Array.from(form.querySelectorAll("input")).forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    const form = this._popupElement.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitCallBack(this._getInputValues());
      this.close();
      /* form.reset(); */
    });
  }
}
