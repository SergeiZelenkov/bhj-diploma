class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error("Передан пустой элемент в конструктор AsyncForm");
    }
    this.element = element;
    this.registerEvents();
  }
  registerEvents() {
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  }

  onSubmit(options) {
    console.error("Метод onSubmit должен быть реализован в наследуемом классе");
  }

  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }
}
