//funcion oculta mensaje de error de input y form (se utiliza en funcion para validar entradas)
function hideInputError(form, errorSelector, config) {
  const errorElement = form.querySelector(errorSelector);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

//funcion muestra mensaje de error de input y form (se utiliza en funcion para validar entradas)
function showInputError(form, errorSelector, config, errorMessage) {
  const errorElement = form.querySelector(errorSelector);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

//validar inputs de form
function checkInputValidity(input, config) {
  if (input.validity.valid) {
    hideInputError(input.form, `#input__error-${input.name}`, config);
  } else {
    showInputError(
      input.form,
      `#input__error-${input.name}`,
      config,
      input.validationMessage
    );
  }
  toggleButton(input.form, config);

  console.log(checkInputValidity);
}

//mostrar botón de guardar y crear si la info es correcta
function toggleButton(form, config) {
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

//funcion validacionform
function enableValidation(config) {
  const forms = Array.from(document.forms);

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, config);
      });
    });
    toggleButton(form, config);
  });
}

//validacion del form
enableValidation({
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonclass: ".popup__save-button:disabled",
  inputErrorClass: ".popup__input:invalid",
  errorClass: ".popup__line",
});
