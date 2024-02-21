export default class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig;
    this.formElement = formElement;
  }

  _hideInputError(form, errorSelector) {
    const errorElement = form.querySelector(errorSelector);
    errorElement.textContent = "";
    errorElement.classList.remove(this.validationConfig.errorClass);
  }

  _showInputError(form, errorSelector, config, errorMessage) {
    const errorElement = form.querySelector(errorSelector);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }

  _checkInputValidity(input, config) {
    if (input.validity.valid) {
      this._hideInputError(input.form, `#input__error-${input.name}`, config);
    } else {
      this._showInputError(
        input.form,
        `#input__error-${input.name}`,
        this.validationConfig,
        input.validationMessage
      );
    }
    this._toggleButton(input.form, config);
  }

  _toggleButton(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    if (inputs.every((item) => item.validity.valid)) {
      submitButton.disabled = false;
      submitButton.classList.remove(config.inactiveButtonClass);
    } else {
      submitButton.disabled = true;
      submitButton.classList.add(config.inactiveButtonClass);
    }
  }

  enableValidation(config) {
    const forms = Array.from(document.forms);

    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
      });

      const inputs = Array.from(
        form.querySelectorAll(this.validationConfig.inputSelector)
      );
      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          this._checkInputValidity(input, this.validationConfig);
        });
      });
      this._toggleButton(form, this.validationConfig);
    });
  }
}
