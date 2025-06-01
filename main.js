import {
  ValidationEngine,
  ErrorRenderer,
  FormValidator,
} from "./validation.js";

window.addEventListener("load", () => {
  const submitBtn = document.getElementById("submit-button");
  const validator = new FormValidator({
    formId: "contact-form",
    fields: [
      {
        name: "email",
        selector: "#contact-email",
        messageSelector: "#email-error",
        validate: ValidationEngine.validateEmail,
        errorMessage: "Введите корректный email.",
      },
      {
        name: "phone",
        selector: "#contact-phone",
        messageSelector: "#phone-error",
        validate: ValidationEngine.validatePhone,
        errorMessage: "Телефон должен быть в формате +7 (XXX) XXX-XXXX",
      },
      {
        name: "file",
        selector: "#contact-file",
        messageSelector: "#file-error",
        validate: ValidationEngine.validateFile,
        isComplex: true,
      },
    ],
  });

  validator.attachLiveValidation();

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const isValid = validator.validate();

    if (isValid) {
      alert("Форма успешно отправлена");
    }
  });
});
