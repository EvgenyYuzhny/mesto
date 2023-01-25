import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input", 
  submitButtonSelector: ".popup__save", 
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error", 
  errorClass: "popup__input-error_active",
};

// Объявляем переменные через DOM

// Попап редактирования профайла
const profilePopup = document.querySelector("#user-popup");

// Кнопка редактирования профайла
const popupProfileOpenButton = document.querySelector(".profile__button-edit");

// Элементы профайла заголовка и текста на странице
const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");

// Форма редактирования профайла в попапе 
const popupFormEdit = document.querySelector("#user");
const nameInput = document.querySelector("#nameInput");
const aboutInput = document.querySelector("#aboutInput");

// Попап добавления карточки
const cardsPopup = document.querySelector("#place-popup");

// Кнопка добавления карточки 
const cardsButtonAdd = document.querySelector(".profile__button-plus");

// Форма добавления карточки 
const formAddCard = document.querySelector("#place"); 
const nameInputCard = document.querySelector("#input-img-title"); 
const linkInputCard = document.querySelector("#input-link");

// Попап увеличения картинок
const imgPopup = document.querySelector('#img-popup');
const imgPopupImage = imgPopup.querySelector('.popup__img');
const imgPopupTitle = imgPopup.querySelector('.popup__title-down');

// Контейнер карточек
const cardsList= document.querySelector(".elements__list");

// Кнопки закрытия попапов
const popupCloseButtons = document.querySelectorAll(".popup__close");

// Все попапы
const popups = document.querySelectorAll('.popup')

// массив инпутов попапов для добавления карточки
const arrayPopupInputsAddCard = Array.from(cardsPopup.querySelectorAll('.popup__input'));
// кнопка сохранить в попапе добавления карточки
const saveButtonAddCard = formAddCard.querySelector('.popup__save');


// Создаем экземпляры класса FormValidator для каждой валидируемой формы:
const editProfileFormValidator = new FormValidator(validationConfig, popupFormEdit);
const newPlaceFormValidator = new FormValidator(validationConfig, formAddCard);

editProfileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();


// Клик по кнопке редактировать профайл
popupProfileOpenButton.addEventListener('click', function() {
  openPopup(profilePopup)
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileText.textContent;
  editProfileFormValidator.resetValidation();
});


// функция отправляет изменения в профайле
function sendFormEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = aboutInput.value;
  closePopup(profilePopup)
}

// отправка данных из формы редактирования профайла
popupFormEdit.addEventListener('submit', sendFormEditProfile); 


function renderCard (item) {
  const card = new Card(item, '#templateCard', openBigImgCard);// передаём объект аргументом
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем и монтируем ее в начало секции с карточками в DOM
  cardsList.prepend(cardElement);
}

// Вставляем начальные карточки из массива:
initialCards.forEach(renderCard);


// Клик по кнопке добавить карточку
cardsButtonAdd.addEventListener('click', () => {
  openPopup(cardsPopup);
  formAddCard.reset();
  // переключение кнопки при невалидных полях
  newPlaceFormValidator.resetValidation();
  // Скрыть спаны ошибок
});

// отправка данных из формы добавления новой карточки(Добавление нового места)
formAddCard.addEventListener('submit', sendFormAddCard); 

// функция принимает из формы данные для создания новой карточки
function sendFormAddCard(evt) {
  // отменяем действие по умолчанию, чтобы не перезагружать страницу:
  evt.preventDefault();
  const name = nameInputCard.value;
  const link = linkInputCard.value;
  const item = {name: name, link: link}

  renderCard(item);

  closePopup(cardsPopup)
}
 
// Функция увеличения картинки
function openBigImgCard(img, title) {

  openPopup(imgPopup)
  imgPopupImage.src = img.src;
  imgPopupImage.alt = `${title}.`;
  imgPopupTitle.textContent = title;
}

// Функция Открытия попапов
function openPopup(popup) {

  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscape)
}

// Функция Закрытие попапов
function closePopup(popup) {

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape)
}

// Вешаем один обработчик на все кнопки закрытия
popupCloseButtons.forEach(button => {

  button.addEventListener('click', (evt) => {
    closePopup(evt.currentTarget.closest('.popup'));
  })
})

// Закрываем нажатием на Esc

function closeEscape(evt) {
  const key = evt.key;
  if (key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
};

// Закрываем попапы нажатием на оверлей 

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
    })
});