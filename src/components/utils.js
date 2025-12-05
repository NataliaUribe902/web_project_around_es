export function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closeModal(popup);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closeModal(openedPopup);
  }
});
