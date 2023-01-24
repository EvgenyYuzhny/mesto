import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

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

// Теймплейт карточки
const cardsTemplate = document.querySelector('#templateCard').content.querySelector('.card'); // значения берутся из свёрстанного попапа теймплейт
const cardsList= document.querySelector(".elements__list");

// Кнопка закрытия попапов
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


initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item);// передаём объект аргументом
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.body.append(cardElement);
});


// Клик по кнопке добавить карточку
cardsButtonAdd.addEventListener('click', () => {
  openPopup(cardsPopup);
  formAddCard.reset();
  // переключение кнопки при невалидных полях
  toggleButtonState(arrayPopupInputsAddCard, saveButtonAddCard, validationConfig.inactiveButtonClass);
  // Скрыть спаны ошибок
  arrayPopupInputsAddCard.forEach((errorSpan) => {
      hideInputError(cardsPopup, errorSpan, validationConfig)
  })
});

// функция добавления начальных изображений из массива
function addStartCards(initialCards) {
  initialCards.forEach(({name, link}) => {
    createCard(name, link);
  })
}

// Запускаем
addStartCards(initialCards);

//  Функция создания карточки 
function createCard(name, link) {
  const card = new Card (name, link);
  cardsList.prepend(card);
}

function takeCard(name, link) {

  const card = cardsTemplate.cloneNode(true); // Клонируем шаблон
  const cardImg = card.querySelector('.card__img');
  const cardLike = card.querySelector('.card__like');
  const cardDelete = card.querySelector('.card__delete');

  card.querySelector('.card__title').textContent = name;
  cardImg.src = link;
  cardImg.alt = `${name}.`;
  
  cardDelete.addEventListener('click', () => {
    card.remove();
    }); 

  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('card__like_active')
    }); 

  cardImg.addEventListener('click', () => {
    openBigImgCard(cardImg, name);
    });

    return card;
}

// отправка данных из формы добавления новой карточки
formAddCard.addEventListener('submit', sendFormAddCard); 

// функция принимает из формы данные для создания новой карточки
function sendFormAddCard(evt) {
  evt.preventDefault();
  const name = nameInputCard.value;
  const link = linkInputCard.value;
  createCard(name, link); 
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

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input", 
  submitButtonSelector: ".popup__save", 
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error", 
  errorClass: "popup__input-error_active",
};


