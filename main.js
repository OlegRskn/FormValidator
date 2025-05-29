class FormValidator {
  constructor(formId) {
    this.form = document.forms.namedItem(formId);
    this.formData = new FormData(this.form);
    this.fields = {
      email: this.form.querySelector("#contact-email"),
      phone: this.form.querySelector("#contact-phone"),
      file: this.form.querySelector("#contact-file"),
    };
    this.emailMessage = document.getElementById("email-error");
    this.emailContainer = document.getElementById("contact-email");
    this.phoneMessage = document.getElementById("phone-error");
    this.phoneContainer = document.getElementById("contact-phone");
    this.fileMessage = document.getElementById("file-error");
    this.fileContainer = document.getElementById("contact-file");
  }

  showFieldsData() {
    const formData = new FormData(this.form);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  }

  validate() {
    const email = this.fields.email.value.trim();
    const phone = this.fields.phone.value.trim();

    let emailIsValid = true;
    let phoneIsValid = true;
    let fileIsValid = true;

    this.#clearError("email");

    this.#clearError("phone");

    this.#clearError("file");

    if (!email || !this.fields.email.checkValidity()) {
      this.#showEmailError("Введите корректный email.");
      emailIsValid = false;
    }

    const phonePattern = /^\+7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
    if (!phonePattern.test(phone)) {
      this.#showPhoneError("Телефон должен быть в формате +7 (XXX) XXX-XXXX");
      phoneIsValid = false;
    }

    const file = this.fields.file.files[0];
    if (!file) {
      this.#showFileError("Файл не выбран");
      fileIsValid = false;
    } else {
      const fileName = this.#getFileExt(file);
      if (fileName !== "jpeg" && fileName !== "jpg") {
        this.#showFileError("Файл должен быть в формате jpeg");
        fileIsValid = false;
      }
    }

    return true;
  }

  #getFileExt(file) {
    let fileName = file.name;
    return fileName.split(".").pop();
  }

  #showEmailError(text) {
    this.emailMessage.textContent = text;
    this.emailMessage.style.color = "#dc2626";
    this.emailContainer.classList.add("input-error");
  }

  #showPhoneError(text) {
    this.phoneMessage.textContent = text;
    this.phoneMessage.style.color = "#dc2626";
    this.phoneContainer.classList.add("input-error");
  }

  #showFileError(text) {
    this.fileMessage.textContent = text;
    this.fileMessage.style.color = "#dc2626";
    this.fileContainer.classList.add("input-error");
  }

  #clearError(arg) {
    if (arg === "email") {
      this.emailMessage.textContent = "";
      this.emailContainer.classList.remove("input-error");
    } else if (arg === "phone") {
      this.phoneMessage.textContent = "";
      this.phoneContainer.classList.remove("input-error");
    } else if (arg === "file") {
      this.fileMessage.textContent = "";
      this.fileContainer.classList.remove("input-error");
    }
  }
}

window.addEventListener("load", () => {
  const submitBtn = document.getElementById("submit-button");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const validator = new FormValidator("contact-form");
    validator.validate();
    if (validator.validate()) {
      alert("Форма успешно отправлена");
    }
  });
});
