// Передаем данные в класс Card в виде объекта item, а в самом классе присваиваем полям нужные свойства.

export class Card {
  
  constructor(item, templateSelector, handleImageClick) {
    this._name = item.name;
    this._link = item.link;

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }


  /* Чтобы получить нужную разметку, добавляем классу Card метод _getTemplate, который:
     извлечёт его содержимое,
     в содержимом найдёт элемент с классом card, клонирует его,
     вернёт клонированный элемент. 
     Приватный метод, возвращающий разметку из template-элемента через return */
  _getTemplate() {
       // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector).content
      .querySelector(".card").cloneNode(true);

      // вернём DOM-элемент карточки
    return cardElement;
  }

    // Функция создания карточки
    generateCard() {

      this._element = this._getTemplate();
      // Объявим классовые переменные 
      this._elementLikeButton = this._element.querySelector(".card__like");
      this._elementDeleteButton = this._element.querySelector(".card__delete");
      this._elementImage = this._element.querySelector(".card__img"); 
      this._elementTitle = this._element.querySelector(".card__title");

      this._setEventListeners();
  
      // Добавление картинки
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
  
      // Добавление названия
      this._elementTitle.textContent = this._name;
  
      return this._element;
    }
    
  _setEventListeners(){

    this._elementLikeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._elementDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._elementImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeClick() {
    this._elementLikeButton.classList.toggle("card__like_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }
}


