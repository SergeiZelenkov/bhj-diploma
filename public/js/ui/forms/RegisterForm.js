/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState('user-logged')
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (response) => {
      if (response && response.success) {
        App.setState('user-logged');
        this.element.reset(); 
        const modal = App.getModal('register');
        if (modal) {
          modal.close();
        }
      } else {
        console.error('Ошибка регистрации:', response.error || 'Неизвестная ошибка');
      }
    });
  }
}
