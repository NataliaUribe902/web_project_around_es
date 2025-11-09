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

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");
const imagePopup = document.querySelector("#image-popup");

const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const editProfileInputs = editProfileForm.querySelectorAll(".popup__input");
const newCardInputs = newCardForm.querySelectorAll(".popup__input");

const editProfileSubmit = editProfileForm.querySelector(".popup__button");
const addCardSubmit = newCardForm.querySelector(".popup__button");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const cardsContainer = document.querySelector(".cards__list");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closeModal(popup);
  });
});

document.querySelectorAll(".popup__close").forEach((btn) => {
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    closeModal(popup);
  });
});

function showInputError(form, input, errorMessage) {
  const errorSpan = form.querySelector(`.${input.name}-error`);
  errorSpan.textContent = errorMessage;
  input.classList.add("popup__input_type_error");
}

function hideInputError(form, input) {
  const errorSpan = form.querySelector(`.${input.name}-error`);
  errorSpan.textContent = "";
  input.classList.remove("popup__input_type_error");
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, button) {
  button.disabled = hasInvalidInput(inputList);
}

function fillProfileForm() {
  editProfileInputs.forEach((input) => {
    if (input.name === "name") input.value = profileTitle.textContent;
    if (input.name === "description")
      input.value = profileDescription.textContent;
  });
}
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  editProfileInputs.forEach((input) => hideInputError(editProfileForm, input));
  toggleButtonState(editProfileInputs, editProfileSubmit);
  openModal(editPopup);
});

editProfileInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showInputError(editProfileForm, input, input.validationMessage);
    } else {
      hideInputError(editProfileForm, input);
    }
    toggleButtonState(editProfileInputs, editProfileSubmit);
  });
});
editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = editProfileForm.name.value;
  profileDescription.textContent = editProfileForm.description.value;
  closeModal(editPopup);
});

console.log("Botón agregar tarjeta:", profileAddButton);
console.log("Popup nuevo lugar:", newCardPopup);
profileAddButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardInputs.forEach((input) => hideInputError(newCardForm, input));
  toggleButtonState(newCardInputs, addCardSubmit);
  openModal(newCardPopup);
});
newCardInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showInputError(newCardForm, input, input.validationMessage);
    } else {
      hideInputError(newCardForm, input);
    }
    toggleButtonState(newCardInputs, addCardSubmit);
  });
});

newCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = newCardForm["place-name"].value;
  const link = newCardForm.link.value;
  renderCard(name, link, cardsContainer);
  closeModal(newCardPopup);
});

function getCardElement(name, link) {
  const template = document.querySelector("#template__cards").content;
  const card = template.querySelector(".card").cloneNode(true);

  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const likeBtn = card.querySelector(".card__like-button");
  const deleteBtn = card.querySelector(".card__delete-button");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_is-active");
  });
  deleteBtn.addEventListener("click", () => card.remove());
  cardImage.addEventListener("click", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
  });
  return card;
}
function renderCard(name, link, container) {
  const card = getCardElement(name, link);
  container.append(card);
}
initialCards.forEach((item) =>
  renderCard(item.name, item.link, cardsContainer)
);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
});
