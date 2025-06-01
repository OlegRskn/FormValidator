import { FormValidator } from "./validation.js";

window.addEventListener("load", () => {
  const submitBtn = document.getElementById("submit-button");
  const validator = new FormValidator({
    formId: "contact-form",
    fields: [
      {
        name: "email",
        selector: "#contact-email",
        messageSelector: "#email-error",
      },
      {
        name: "phone",
        selector: "#contact-phone",
        messageSelector: "#phone-error",
      },
      {
        name: "file",
        selector: "#contact-file",
        messageSelector: "#file-error",
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
