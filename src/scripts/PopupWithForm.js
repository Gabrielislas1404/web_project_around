import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._submitCallBack = callback;
  }

  _getInputValues() {
    const form = this._popupElement.querySelector("form");
    const inputs = form.querySelectorAll(".popup__input");
    const inputValues = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    {
      const form = this._popupElement.querySelector("form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        this._submitCallBack(this._getInputValues());
        this.close();
      });
    }
  }

  close() {
    super.close();
    const form = this._popupElement.querySelector("form");
    form.reset();
  }
}
