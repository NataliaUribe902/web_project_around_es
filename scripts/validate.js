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
