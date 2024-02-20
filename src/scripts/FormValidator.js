export default class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig;
    this.formElement = formElement;
  }

  // oculta mensaje de error de input y form (se utiliza en funcion para validar entradas)
  _hideInputError(form, errorSelector) {
    const errorElement = form.querySelector(errorSelector);
    errorElement.textContent = "";
    errorElement.classList.remove(this.validationConfig.errorClass);
  }

  //muestra mensaje de error de input y form (se utiliza en funcion para validar entradas)
  _showInputError(form, errorSelector, config, errorMessage) {
    const errorElement = form.querySelector(errorSelector);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }

  //validar inputs de form
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

  //mostrar botón de guardar y crear si la info es correcta
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

  //validacion del form
  enableValidation(config) {
    const forms = Array.from(document.forms);

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
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
