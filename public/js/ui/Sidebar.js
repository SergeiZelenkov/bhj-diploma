/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector("body");
    const button = document.querySelector(".sidebar-toggle");
  
    button.addEventListener("click", (e) => {
      e.preventDefault();
      body.classList.toggle("sidebar-open");
      body.classList.toggle("sidebar-collapse");
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState('init')
   * */
  static initAuthLinks() {
    const registerButton = document.querySelector('.menu-item_register');
    const loginButton = document.querySelector('.menu-item_login');
    const logoutButton = document.querySelector('.menu-item_logout');
  
    if (registerButton) {
      registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('register');
        if (modal) {
          modal.open();
        }
      });
    }

    if (loginButton) {
      loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('login');
        if (modal) {
          modal.open();
        }
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        User.logout((response) => {
          if (response && response.success) {
            App.setState('init');
          } else {
            console.error('Ошибка выхода');
          }
        });
      });
    }
  }
}
