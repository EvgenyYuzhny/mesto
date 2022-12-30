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
const popupCloseButtons = document.querySelectorAll(".popup__close");


// Клик по кнопке редактировать профайл
editProfileButton.addEventListener('click', function() {

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

// отправка данных из формы редактирования профиля
editFormPopup.addEventListener('submit', sendFormEditProfile); 

// Клик по кнопке добавить карточку
addCardsButton.addEventListener('click', () => {

  openPopup(cardsPopup)
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
  const cardItem = takeCard(name, link);
  cardsList.prepend(cardItem);
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


// функция принимает из формы данные для создания новой карточки
function sendFormAddCard(evt) {

  evt.preventDefault();
  const name = nameInputCard.value;
  const link = linkInputCard.value;
  createCard(name, link);
  closePopup(cardsPopup)
}

// отправка данных из формы добавления новой карточки
addFormCard.addEventListener('submit', sendFormAddCard); 

 
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
}

// Функция Закрытие попапов
function closePopup(popup) {

  popup.classList.remove('popup_opened');
}

// Вешаем один обработчик на все кнопки закрытия
popupCloseButtons.forEach(button => {

  button.addEventListener('click', (evt) => {
    closePopup(evt.currentTarget.closest('.popup'));
  })
})


