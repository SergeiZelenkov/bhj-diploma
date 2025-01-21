/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element.
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents().
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не найден");
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта.
   * При нажатии на один из существующих счетов
   * вызывает AccountsWidget.onSelectAccount().
   */
  registerEvents() {
    const createAccountButton = this.element.querySelector('.create-account');
    if (createAccountButton) {
      createAccountButton.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('createAccount');
        if (modal) {
          modal.open();
        }
      });
    }

    this.element.addEventListener('click', (e) => {
      const accountElement = e.target.closest('.account');
      if (accountElement) {
        this.onSelectAccount(accountElement);
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям.
   * Если пользователь авторизован, получает список счетов через Account.list().
   * При успешном ответе очищает список через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью метода renderItem().
   */
  update() {
    const currentUser = User.current();
    if (!currentUser) {
      return;
    }
  
    Account.list(currentUser, (err, response) => {
      if (err) {
        console.error("Ошибка при получении списка счетов:", err);
        return;
      }
  
      if (response && response.success) {
        this.clear();
        response.data.forEach((account) => {
          this.renderItem(account);
        });
      } else {
        console.error("Не удалось получить список счетов", response?.error || "Неизвестная ошибка");
      }
    });
  }
  

  /**
   * Очищает список ранее отображённых счетов.
   * Удаляет все элементы .account в боковой колонке.
   */
  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach((account) => account.remove());
  }

  /**
   * Срабатывает в момент выбора счёта.
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage('transactions', { account_id: id_счёта }).
   */
  onSelectAccount(element) {
    const activeAccount = this.element.querySelector('.account.active');
    if (activeAccount) {
      activeAccount.classList.remove('active');
    }
    element.classList.add('active');

    const accountId = element.dataset.id;
    App.showPage('transactions', { account_id: accountId });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте.
   */
  getAccountHTML(item) {
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</span>
        </a>
      </li>
    `;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета.
   */
  renderItem(data) {
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  }
}

