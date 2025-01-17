/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не существует");
    }
    this.element = element;
    this.lastOptions = null;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта.
   * */
  registerEvents() {
    this.element.addEventListener("click", (event) => {
      if (event.target.closest(".remove-account")) {
        this.removeAccount();
      }
      if (event.target.closest(".transaction__remove")) {
        const transactionId = event.target
          .closest(".transaction__remove")
          .dataset.id;
        this.removeTransaction(transactionId);
      }
    });
  }

  /**
   * Удаляет счёт.
   * */
  removeAccount() {
    if (!this.lastOptions) return;

    if (confirm("Вы действительно хотите удалить счёт?")) {
      Account.remove({ id: this.lastOptions.account_id }, (err, response) => {
        if (response && response.success) {
          App.updateWidgets();
          App.updateForms();
          this.clear();
        }
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход).
   * */
  removeTransaction(id) {
    if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
      Transaction.remove({ id }, (err, response) => {
        if (response && response.success) {
          App.update();
        }
      });
    }
  }

  /**
   * Отображает данные страницы.
   * */
  render(options) {
    if (!options) return;

    this.lastOptions = options;

    Account.get(options.account_id, (err, response) => {
      if (response && response.success) {
        this.renderTitle(response.data.name);
      }
    });

    Transaction.list(options, (err, response) => {
      if (response && response.success) {
        this.renderTransactions(response.data);
      }
    });
  }

  /**
   * Очищает страницу.
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    const titleElement = this.element.querySelector(".content-title");
    if (titleElement) {
      titleElement.textContent = name;
    }
  }

  /**
   * Форматирует дату.
   * */
  formatDate(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("ru-RU", options).replace(",", " в");
  }

  /**
   * Формирует HTML-код транзакции.
   * */
  getTransactionHTML(item) {
    const formattedDate = this.formatDate(item.created_at);
    const transactionType = item.type === "income" ? "transaction_income" : "transaction_expense";

    return `
      <div class="transaction ${transactionType} row">
          <div class="col-md-7 transaction__details">
            <div class="transaction__icon">
                <span class="fa fa-money fa-2x"></span>
            </div>
            <div class="transaction__info">
                <h4 class="transaction__title">${item.name}</h4>
                <div class="transaction__date">${formattedDate}</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="transaction__summ">
                ${item.sum} <span class="currency">₽</span>
            </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                  <i class="fa fa-trash"></i>  
              </button>
          </div>
      </div>
    `;
  }

  /**
   * Отрисовывает список транзакций.
   * */
  renderTransactions(data) {
    const content = this.element.querySelector(".content");
    if (content) {
      content.innerHTML = data.map((item) => this.getTransactionHTML(item)).join("");
    }
  }
}
