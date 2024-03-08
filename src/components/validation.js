const isValid = (formElement, inputElement, restConfig) => {
  if (inputElement.validity.patternMismatch) {
    showInputError(formElement, inputElement, inputElement.dataset.errorPattern, restConfig);
  } else if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, restConfig);
  }
  else {
    hideInputError(formElement, inputElement, restConfig);
  };
};

const showInputError = (formElement, inputElement, errorMessage, restConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const {inputErrorClass} = restConfig;
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};
  
const hideInputError = (formElement, inputElement, restConfig) => {
  const {inputErrorClass} = restConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};
  
const enableValidation = (validationConfig) => {
  const {formSelector, ...formConfig} = validationConfig;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, formConfig);
  });
};
  
const toggleButtonState = (inputList, buttonElement, restConfig) => {
  const {inactiveButtonClass} = restConfig;
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};
  
const setEventListeners = (formElement, formConfig) => {
  const {inputSelector, submitButtonSelector, ...restConfig} = formConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, restConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, restConfig);
      toggleButtonState(inputList, buttonElement, restConfig);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};
  
const clearValidation = (form, validationConfig) => {
  const {inputSelector, submitButtonSelector, ...restConfig} = validationConfig;
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, restConfig);
  });
  form.reset();
  toggleButtonState(inputList, buttonElement, restConfig);
};

export {enableValidation, clearValidation}