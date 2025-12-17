import Api from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import {
  profileDescription,
  profileImage,
  profileTitle,
} from "../utils/constants.js";
import { Card } from "../components/Cards.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";

let currentUserId;

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "48bb3a7b-1538-4dc6-b018-106d48ee35e2",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
deleteCardPopup.setEventListeners();

function createCard(data) {
  const card = new Card(
    { ...data, userId: currentUserId },
    "#template__cards",

    (name, link) => {
      imagePopup.open(name, link);
    },

    (cardId, isLiked) => {
      const request = isLiked ? api.removeLike(cardId) : api.addLike(cardId);

      request
        .then((res) => {
          card.setLikeState(res.isLiked);
        })
        .catch(console.log);
    },

    (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.remove();
            deleteCardPopup.close();
          })
          .catch(console.log);
      });
    }
  );

  return card.getView();
}

const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  ".cards__list"
);

const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  api
    .updateUserInfo({
      name: formData.name,
      about: formData.description,
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
      editProfilePopup.close();
    })
    .catch(console.log);
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  api
    .addCard({
      name: formData["place-name"],
      link: formData.link,
    })
    .then((cardData) => {
      cardsSection.addItem(createCard(cardData));
      addCardPopup.close();
    })
    .catch(console.log);
});
addCardPopup.setEventListeners();

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

const editAvatarPopup = new PopupWithForm("#edit-avatar-popup", (formData) => {
  api
    .updateAvatar(formData.avatar)
    .then((userData) => {
      profileImage.src = userData.avatar;
      editAvatarPopup.close();
    })
    .catch(console.log);
});

editAvatarPopup.setEventListeners();

document
  .querySelector(".profile__avatar-edit")
  .addEventListener("click", () => {
    editAvatarPopup.open();
  });

api
  .getUserInfo()
  .then((userData) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;
  })
  .catch(console.log);

api
  .getCards()
  .then((cards) => {
    cards.forEach((item) => {
      cardsSection.addItem(createCard(item));
    });
  })
  .catch(console.log);
