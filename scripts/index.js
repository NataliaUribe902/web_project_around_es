import { Card } from "./Cards.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
};

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");
const imagePopup = document.querySelector("#image-popup");

const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const cardsContainer = document.querySelector(".cards__list");

// --- TARJETAS INICIALES --- //
const initialCards = [
  {
    name: "Lago di Braies, Italia",
    link: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Sabana africana",
    link: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Desierto de Nevada, EE. UU.",
    link: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Playa de Maldivas",
    link: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Parque Yosemite, EE. UU.",
    link: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Dubái, Emiratos Árabes",
    link: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
  },
];

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function renderCard(name, link) {
  const card = new Card(name, link, "#template__cards", handleImageClick);
  const cardElement = card.getView();
  cardsContainer.append(cardElement);
}

initialCards.forEach((item) => renderCard(item.name, item.link));

function fillProfileForm() {
  editProfileForm.name.value = profileTitle.textContent;
  editProfileForm.description.value = profileDescription.textContent;
}

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(editPopup);
});

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = editProfileForm.name.value;
  profileDescription.textContent = editProfileForm.description.value;
  closeModal(editPopup);
});

profileAddButton.addEventListener("click", () => {
  newCardForm.reset();
  openModal(newCardPopup);
});

newCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderCard(newCardForm["place-name"].value, newCardForm.link.value);
  closeModal(newCardPopup);
});

const editValidator = new FormValidator(config, editProfileForm);
editValidator.enableValidation();

const cardValidator = new FormValidator(config, newCardForm);
cardValidator.enableValidation();
