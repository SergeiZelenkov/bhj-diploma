/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState('user-logged') и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (response) => {
      if (response && response.success) {
        App.setState('user-logged');
        this.element.reset();
        const modal = App.getModal('login');
        if (modal) {
          modal.close(); 
        }
      } else {
        console.error('Ошибка авторизации:', response.error || 'Неизвестная ошибка');
      }
    });
  }
}
