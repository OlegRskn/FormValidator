class ValidationEngine {
  static validateEmail(value) {
    return value !== "" && /\S+@\S+\.\S+/.test(value);
  }

  static validatePhone(value) {
    return /^\+7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/.test(value);
  }

  static validateFile(file) {
    if (!file) return { valid: false, reason: "Файл не выбран" };
    const ext = file.name.split(".").pop();
    if (!["jpg", "jpeg"].includes(ext))
      return { valid: false, reason: "Файл должен быть jpeg" };
    return { valid: true };
  }
}

class ErrorRenderer {
  static showError(messageElement, containerElement, text) {
    messageElement.textContent = text;
    messageElement.style.color = "#dc2626";
    containerElement.classList.add("input-error");
  }

  static clearError(messageElement, containerElement) {
    messageElement.textContent = "";
    containerElement.classList.remove("input-error");
  }
}

class FormValidator {
  constructor({ formId, fields }) {
    this.form = document.forms.namedItem(formId);
    this.fields = fields.map((field) => {
      const input = this.form.querySelector(field.selector);
      const messageEl = document.querySelector(field.messageSelector);

      return {
        ...field,
        input,
        messageEl,
        containerEl: input,
      };
    });
  }

  showFieldsData() {
    const formData = new FormData(this.form);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  }

  validateField(field, value) {
    if (field.isComplex) {
      const { valid, reason } = field.validate(value);
      if (!valid) {
        ErrorRenderer.showError(field.messageEl, field.containerEl, reason);
        return false;
      } else {
        ErrorRenderer.clearError(field.messageEl, field.containerEl);
      }
    } else {
      if (!field.validate(value)) {
        ErrorRenderer.showError(
          field.messageEl,
          field.containerEl,
          field.errorMessage
        );
        return false;
      } else {
        ErrorRenderer.clearError(field.messageEl, field.containerEl);
        return true;
      }
    }
  }
  validate() {
    let isValid = true;

    for (const field of this.fields) {
      const value =
        field.input.type === "file" ? field.input.files[0] : field.input.value;
      if (!this.validateField(field, value)) {
        isValid = false;
      }
    }
    return isValid;
  }

  attachLiveValidation() {
    for (const field of this.fields) {
      const eventType = field.input.type === "file" ? "change" : "input";

      field.input.addEventListener(eventType, () => {
        const value =
          field.input.type === "file"
            ? field.input.files[0]
            : field.input.value;

        this.validateField(field, value);
      });
    }
  }
}

export { ValidationEngine, ErrorRenderer, FormValidator };
