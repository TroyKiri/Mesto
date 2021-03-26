class FormValidator {
  constructor(form) {
    this.form = form;
  }

  checkInputValidity(input, error){
    let isValid = true;
    if (input.validity.valueMissing) {
      isValid = false;
      this.addError(error);
      error.textContent = 'Это обязательное поле';
      this.addInputMargin(input);
    } else if (input.validity.tooLong || input.validity.tooShort) {
      isValid = false;
      this.addError(error);
      error.textContent = 'Должно быть от 2 до 30 символов';
      this.addInputMargin(input);
    } else if (input.validity.typeMismatch) {
      isValid = false;
      this.addError(error);
      error.textContent = 'Здесь должна быть ссылка';
      this.addInputMargin(input);
    } else {
      error.classList.add('popup__input-error_valid');
      input.classList.add('popup__input_valid');
      input.classList.remove('popup__input_invalid');
      error.textContent = '';
    }
    return isValid
  }

  setSubmitButtonState(button, status) {
    if (status === true) {
      button.classList.add('popup__button_active');
      button.removeAttribute('disabled', 'true');
    } else {
      button.classList.remove('popup__button_active');
      button.setAttribute('disabled', 'true');
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', this.checkValid.bind(this));
  }

  checkValid() {
    let isFormValid = true;
    this.button = this.chooseButton();
    Array.from(form.elements).forEach((item) => {
      if (item.classList.contains('popup__input')) {
        const isValid = this.checkInputValidity(item, item.nextElementSibling);
        if (!isValid) {
          isFormValid = false
        }
        this.setSubmitButtonState(this.button, isFormValid);
      }
    })
  }

  chooseButton() {
    return Array.from(this.form.elements).find((elem) => {
      return elem.classList.contains('button');
    })
  }

  addError(error) {
    error.classList.remove('popup__input-error_valid');
  }
  addInputMargin(input) {
    input.classList.remove('popup__input_valid');
    input.classList.add('popup__input_invalid');
  }
}