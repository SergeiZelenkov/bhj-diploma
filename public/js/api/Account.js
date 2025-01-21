/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 */
class Account extends Entity {
  
  static URL = '/account';

  static get(id = '', callback) {
    const url = `${this.URL}/${id}`;
    
    createRequest({
      url: url,
      method: 'GET',
      callback 
    });
  }
}


