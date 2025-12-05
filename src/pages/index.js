import { initialCards } from "../utils/constants.js";
import { Card } from "../components/Cards.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.description,
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const cardElement = createCard(formData["place-name"], formData.link);
  cardsSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

function createCard(name, link) {
  const card = new Card(
    name,
    link,
    "#template__cards",
    (cardName, cardLink) => {
      imagePopup.open(cardName, cardLink);
    }
  );

  return card.getView();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link);
      cardsSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardsSection.renderItems();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    document.querySelector(".popup__input_type_name").value = currentUser.name;
    document.querySelector(".popup__input_type_description").value =
      currentUser.job;
    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});

const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

document.querySelectorAll(selectors.formSelector).forEach((formElement) => {
  const validator = new FormValidator(selectors, formElement);
  validator.enableValidation();
});
