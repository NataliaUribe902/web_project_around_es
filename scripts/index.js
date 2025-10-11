const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (card) {
  console.log(card.name);
});
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const popupClose = editPopup.querySelector(".popup__close");
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
popupClose.addEventListener("click", () => closeModal(editPopup));

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
