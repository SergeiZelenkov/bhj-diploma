class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    Account.list({}, (err, response) => {
      if (err) {
        console.error('Ошибка:', err);
        return;
      }

      const accountSelect = this.element.querySelector('select[name="account_id"]');
      accountSelect.innerHTML = '';

      if (response && response.success) {
        const optionsHtml = response.data.reduce((html, account) => {
          return html + `<option value="${account.id}">${account.name}</option>`;
        }, `<option value="">Выберите счёт</option>`);

        accountSelect.innerHTML = optionsHtml;
      }
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (err) {
        console.error('Ошибка:', err);
        return;
      }

      if (response && response.success) {
        this.element.reset();

        const modal = this.element.closest('.modal');
        if (modal) {
          const modalInstance = App.getModal(modal.id);
          if (modalInstance) {
            modalInstance.close();
          }
        }

        App.update();
      } else {
        console.error('Ошибка создания транзакции:', response?.error || 'Неизвестная ошибка');
      }
    });
  }
}



