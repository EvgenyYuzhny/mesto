let popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__form");
let editButton = document.querySelector(".profile__button-edit");
let closeButton = document.querySelector(".popup__close");
let nameInput = document.querySelector(".popup__input_type_name");
let aboutInput = document.querySelector(".popup__input_type_about");
let profileTitle = document.querySelector(".profile__title");
let profileText = document.querySelector(".profile__text");

function openPopup() {
  popup.classList.add("popup_opened")
  nameInput.value = profileTitle.textContent
  aboutInput.value = profileText.textContent
}

function closePopup() {
  popup.classList.remove("popup_opened")
}

function sendForm(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileText.textContent = aboutInput.value
  closePopup()
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", sendForm);