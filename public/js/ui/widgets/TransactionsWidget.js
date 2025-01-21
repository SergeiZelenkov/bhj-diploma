class TransactionsWidget {
  /**
   * Устанавливает полученный элемент в свойство element.
   * Если переданный элемент не существует, выбрасывает ошибку.
   */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не найден");
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Регистрирует обработчики событий на кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для соответствующего окна.
   */
  registerEvents() {
    const incomeButton = this.element.querySelector('.create-income-button');
    const expenseButton = this.element.querySelector('.create-expense-button');

    if (incomeButton) {
      incomeButton.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('newIncome');
        if (modal && modal.element) { 
          modal.open();
          this.renderAccountsList(modal.element);
        }
      });
    }

    if (expenseButton) {
      expenseButton.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = App.getModal('newExpense');
        if (modal && modal.element) { 
          modal.open();
          this.renderAccountsList(modal.element); 
        }
      });
    }
  }

  /**
   * Рендерит список счетов в select.
   * Метод вызывается каждый раз, когда открывается модальное окно.
   */
  renderAccountsList(modalElement) {
    const accountSelect = modalElement.querySelector('select[name="account_id"]');
    if (!accountSelect) {
      console.error("Select элемент не найден");
      return;
    }

    Account.list((err, response) => {
      if (err) {
        console.error("Ошибка", err);
        return;
      }

      accountSelect.innerHTML = '';

      if (response && response.success && response.data) {
        const optionsHtml = response.data.reduce((html, account) => {
          return html + `<option value="${account.id}">${account.name}</option>`;
        }, `<option value="">Выберите счёт</option>`);

        accountSelect.innerHTML = optionsHtml;

        console.log("Новый HTML для select:", accountSelect.innerHTML);
      } else {
        console.error("Некорректные данные");
      }
    });

    accountSelect.addEventListener('change', (e) => {
      const selectedAccount = e.target.value;
      if (selectedAccount) {
        const modal = App.getModal('newIncome') || App.getModal('newExpense');
        if (modal) {
          modal.close();
        }
      }
    });
  }
}

