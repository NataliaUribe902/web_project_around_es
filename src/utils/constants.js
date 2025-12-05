export const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
};

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");

export const editPopup = document.querySelector("#edit-popup");
export const newCardPopup = document.querySelector("#new-card-popup");
export const imagePopup = document.querySelector("#image-popup");

export const editProfileForm = document.querySelector("#edit-profile-form");
export const newCardForm = document.querySelector("#new-card-form");

export const popupImage = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");

export const initialCards = [
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
