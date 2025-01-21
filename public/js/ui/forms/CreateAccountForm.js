class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (err) {
        console.error('Ошибка', err);
        return;
      }

      if (response && response.success) {
        this.element.reset();

        const modal = document.getElementById('modal-new-account');
        if (modal) {
          $(modal).modal('hide');
        }
        App.update();
      } else {
        console.error('Ошибка', response?.error || 'ошибка');
      }
    });
  }
}
