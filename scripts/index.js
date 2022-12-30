// Объявляем переменные через DOM

// Попап редактирования профайла
const profilePopup = document.querySelector("#user-popup");

// Кнопка редактирования профайла
const editProfileButton = document.querySelector(".profile__button-edit");

// Элементы профайла заголовка и текста на странице
const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");

// Форма редактирования профайла в попапе 
const editFormPopup = document.querySelector("#user");
const nameInput = document.querySelector("#nameInput");
const aboutInput = document.querySelector("#aboutInput");


// Попап добавления карточки
const cardsPopup = document.querySelector("#place-popup");

// Кнопка добавления карточки 
const addCardsButton = document.querySelector(".profile__button-plus");


// Форма добавления карточки 
const addFormCard = document.querySelector("#place"); 
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
const popupCloseButton = document.querySelectorAll(".popup__close");


// Клик по кнопке редактировать профайл
editProfileButton.addEventListener('click', function() {

  profilePopup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileText.textContent;
});


// функция отправляет изменения в профайле

function sendFormEditProfile(evt) {

  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = aboutInput.value;
  profilePopup.classList.remove('popup_opened');
}

// отправка данных из формы редактирования профиля
editFormPopup.addEventListener('submit', sendFormEditProfile); 

// Клик по кнопке добавить карточку
addCardsButton.addEventListener('click', () => {

  cardsPopup.classList.add('popup_opened');
  addFormCard.reset();
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

  const card = cardsTemplate.cloneNode(true); // Клонируем шаблон
  const cardImg = card.querySelector('.card__img');
  const cardLike = card.querySelector('.card__like');
  const cardDelete = card.querySelector('.card__delete');

  card.querySelector('.card__title').textContent = name;
  cardImg.src = link;
  
  cardDelete.addEventListener('click', () => {
    card.remove();
    }); 

  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('card__like_active')
    }); 

  cardImg.addEventListener('click', () => {
    bigImgCard(cardImg, name);
    });

  cardsList.prepend(card); 
}


// функция принимает из формы данные для создания новой карточки
function sendFormAddCard(evt) {

  evt.preventDefault();
  const name = nameInputCard.value;
  const link = linkInputCard.value;
  createCard(name, link);
  cardsPopup.classList.remove('popup_opened');
}

// отправка данных из формы добавления новой карточки
addFormCard.addEventListener('submit', sendFormAddCard); 

 
// Функция увеличения картинки
function bigImgCard(img, title) {

  imgPopup.classList.add('popup_opened');
  imgPopupImage.src = img.src;
  imgPopupTitle.textContent = title;
}
// Функция Закрытие попапов
function closePopup(popup) {

  popup.classList.remove('popup_opened');
}

// Вешаем один обработчик на все кнопки закрытия
popupCloseButton.forEach(button => {

  button.addEventListener('click', (evt) => {
    closePopup(evt.currentTarget.closest('.popup'));
  })
})


