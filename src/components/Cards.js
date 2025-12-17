export class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;

    this._ownerId = data.owner; // 👈 del servidor
    this._userId = data.userId; // 👈 usuario actual

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });

    this._image.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  setLikeState(isLiked) {
    this._isLiked = isLiked;
    this._likeBtn.classList.toggle("card__like-button_is-active", isLiked);
  }

  getView() {
    this._element = this._getTemplate();

    this._title = this._element.querySelector(".card__title");
    this._image = this._element.querySelector(".card__image");
    this._likeBtn = this._element.querySelector(".card__like-button");
    this._deleteBtn = this._element.querySelector(".card__delete-button");

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    if (this._ownerId !== this._userId) {
      this._deleteBtn.remove();
      this._deleteBtn = null;
    }

    if (this._isLiked) {
      this._likeBtn.classList.add("card__like-button_is-active");
    }

    this._setEventListeners();

    return this._element;
  }
  remove() {
    this._element.remove();
    this._element = null;
  }
}
