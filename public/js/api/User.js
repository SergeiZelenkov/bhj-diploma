/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 */
class User {
  static URL = '/user';

  /**
   * Устанавливает текущего пользователя в localStorage
   */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет текущего пользователя из localStorage
   */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего пользователя из localStorage
   */
  static current() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : undefined;
  }

  /**
   * Получает данные текущего пользователя с сервера
   */
  static fetch(callback) {
    createRequest({
      url: `${this.URL}/current`,
      method: 'GET',
      callback: (err, response) => {
        if (err) {
          console.error('Ошибка:', err);
        }

        if (response && response.success) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }

        callback(err, response);
      },
    });
  }

  /**
   * Универсальный метод для login и register
   */
  static handleAuth(endpoint, data, callback) {
    createRequest({
      url: `${this.URL}/${endpoint}`,
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (err) {
          console.error(`Ошибка в ${endpoint}:`, err);
        }

        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        }

        callback(err, response);
      },
    });
  }

  /**
   * Выполняет авторизацию пользователя
   */
  static login(data, callback) {
    this.handleAuth('login', data, callback);
  }

  /**
   * Выполняет регистрацию пользователя
   */
  static register(data, callback) {
    this.handleAuth('register', data, callback);
  }

  /**
   * Выполняет выход пользователя
   */
  static logout(callback) {
    createRequest({
      url: `${this.URL}/logout`,
      method: 'POST',
      responseType: 'json',
      callback: (err, response) => {
        if (err) {
          console.error('Ошибка при выходе:', err);
        }

        if (response && response.success) {
          this.unsetCurrent();
        }

        callback(err, response);
      },
    });
  }
}
