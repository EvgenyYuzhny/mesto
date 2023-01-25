export class FormValidator {
  
    constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      //находим список инпутов
      this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
      // делаем кнопку неактивной
      this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    // Метод для проверки валидности поля
    //Проверяем, есть ли у полей input свойство validity
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        // Если поле проходит валидацию, скроем ошибку
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        // Если поле не проходит валидацию, покажем ошибку
        this._hideInputError(inputElement);
      }
    };

    // метод, который проходит по всем инпутам и выявляет их валидность
    _hasInvalidInput() {
       return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };

     // Метод для показа ошибки
    // ищем спан, получаем id элемента span, добавляем ему класс ошибки, добавляем ему текст ошибки
    _showInputError(inputElement, errorMessage) {
      // находим спан
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.classList.add(this._config.errorClass);
      errorElement.textContent = errorMessage;
    };

    // Метод для скрытия ошибки
    // удаляем классы, стирая текст ошибки
    _hideInputError(inputElement) {
      // находим спан
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = '';
    };
  
    // метод чтобы установить активное/неактивное состояние кнопки
    // в параметры передаем список инпутов и конфиг
    // список инпутов нужен для проверки каждого инпута на валидность
    /*если все инпуты валидны, метод возвращает фолс, если НЕвалиден хотябы один инпут в форме, 
    то возвращает тру. Метод some принимает на вход колбек функцию. 
    Параметром передаем элемент массива inputElement*/
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
      } else {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.disabled = false;
      }
    };

    // Метод установки слушателей
    //метод передаем форму и конфиг(?)
    _setEventListeners() {
      // вызываем функцию toggleButtonState чтобы при обновлении страницы обновлялось состояние кнопки
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          // вызываем функцию checkInputValidity, которая проверяет инпут на валидность
          this._checkInputValidity(inputElement);
          // вызываем функцию чтобы установить активное/неактивное состояние кнопки
          this._toggleButtonState();
        });
      });
    };
  
   // публичный метод enableValidation отвечает за включение валидации всех форм
    enableValidation() {
      this._setEventListeners();
    };
  
    //метод для очистки ошибок и управления кнопкой
    resetValidation() {
      
      //очищаем ошибки с инпутов
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
      //управляем кнопкой
      this._toggleButtonState();
    };
    
  }
  
