class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error("пустой элемент");
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
    return Object.fromEntries(new FormData(this.element).entries());
  }

  onSubmit(options) {
    console.error("Метод onSubmit");
  }

  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }
}

