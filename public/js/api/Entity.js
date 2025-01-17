/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 */
class Entity {
  /**
   * Базовое URL для запросов, должно быть переопределено в наследниках.
   */
  static URL = '';

  
  static list(data, callback) {
    createRequest({
      url: this.URL,
      method: 'GET',
      data: data,
      callback: callback,
    });
  }

  
  static create(data, callback) {
    createRequest({
      url: this.URL,
      method: 'PUT',
      data: data,
      callback: callback,
    });
  }

  static remove(data, callback) {
    createRequest({
      url: this.URL,
      method: 'DELETE',
      data: data,
      callback: callback,
    });
  }
}

