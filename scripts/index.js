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

initialCards.forEach(function (card) {
  console.log(card.name);
});
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButtons = document.querySelectorAll(".popup__close");
const popupInputTypeName = editPopup.querySelector(".popup__input_type_name");
const popupInputTypeDescription = editPopup.querySelector(
  ".popup__input_type_description"
);
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

profileEditButton.addEventListener("click", handleOpenEditModal);
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

let formElement = editPopup.querySelector(".popup__form");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = popupInputTypeName.value;
  const jobValue = popupInputTypeDescription.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(editPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg"
) {
  const templateCards = document.querySelector("#template__cards").content;
  const cardElement = templateCards.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardLikeButton.addEventListener("click", () => {
    handleLikeButton(cardLikeButton);
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}
function renderCard(name, link, container) {
  const card = getCardElement(name, link);
  container.append(card);
}
const cardsContainer = document.querySelector(".cards__list");
initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsContainer);
});
const newCardPopup = document.querySelector("#new-card-popup");
const profileAddButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");
const popupInputTypeCardName = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeUrl = newCardForm.querySelector(".popup__input_type_url");

profileAddButton.addEventListener("click", () => openModal(newCardPopup));

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = popupInputTypeCardName.value;
  const urlValue = popupInputTypeUrl.value;

  const newCard = getCardElement(nameValue, urlValue);
  cardsContainer.prepend(newCard);

  closeModal(newCardPopup);
}
newCardForm.addEventListener("submit", handleCardFormSubmit);

function handleLikeButton(button) {
  button.classList.toggle("card__like-button_is-active");
}
