import { Card } from "../components/Cards.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { openModal, closeModal } from "../components/utils.js";
import {
  config,
  profileTitle,
  profileDescription,
  profileEditButton,
  profileAddButton,
  editPopup,
  newCardPopup,
  imagePopup,
  editProfileForm,
  newCardForm,
  popupImage,
  popupCaption,
  initialCards,
} from "../utils/constants.js";

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        "#template__cards",
        handleImageClick
      );
      const cardElement = card.getView();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();
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

  const name = newCardForm["place-name"].value;
  const link = newCardForm.link.value;

  const card = new Card(name, link, "#template__cards", handleImageClick);
  const cardElement = card.getView();

  cardSection.addItem(cardElement);

  closeModal(newCardPopup);
});

const editValidator = new FormValidator(config, editProfileForm);
editValidator.enableValidation();

const cardValidator = new FormValidator(config, newCardForm);
cardValidator.enableValidation();
