import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll(".popup__input");
    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);

      this._handleFormSubmit(this._getInputValues()).finally(() =>
        this.renderLoading(false)
      );
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
