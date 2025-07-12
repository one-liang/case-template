// 表單處理模組 - 使用 ES2020+ 語法
// 負責處理表單驗證、提交和用戶體驗

class FormManager {
  constructor() {
    this.forms = new Map();
    this.validationRules = {
      required: value => value.trim() !== '',
      email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      phone: value => /^[\d\s\-\+\(\)]+$/.test(value),
      url: value => /^https?:\/\/[^\s]+$/.test(value),
      minLength: (value, min) => value.length >= min,
      maxLength: (value, max) => value.length <= max,
      pattern: (value, pattern) => new RegExp(pattern).test(value)
    };
    this.init();
  }

  // 初始化表單管理器
  init() {
    this.discoverForms();
    this.bindGlobalEvents();
  }

  // 發現並註冊所有表單
  discoverForms() {
    const forms = document.querySelectorAll('form[data-form]');

    forms.forEach(form => {
      const formId =
        form.id ||
        `form-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      form.id = formId;

      this.registerForm(formId, form);
    });
  }

  // 註冊單一表單
  registerForm(formId, formElement) {
    const formConfig = {
      element: formElement,
      fields: new Map(),
      validators: [],
      hooks: {
        beforeValidate: [],
        afterValidate: [],
        beforeSubmit: [],
        afterSubmit: [],
        onSuccess: [],
        onError: []
      }
    };

    // 發現表單欄位
    this.discoverFormFields(formConfig);

    // 綁定表單事件
    this.bindFormEvents(formConfig);

    // 儲存表單配置
    this.forms.set(formId, formConfig);

    console.log(`Form registered: ${formId}`);
  }

  // 發現表單欄位
  discoverFormFields(formConfig) {
    const inputs = formConfig.element.querySelectorAll(
      'input, textarea, select'
    );

    inputs.forEach(input => {
      const fieldConfig = {
        element: input,
        rules: this.parseValidationRules(input),
        errorElement: this.getErrorElement(input),
        isValid: true,
        isDirty: false,
        value: input.value
      };

      formConfig.fields.set(input.name || input.id, fieldConfig);
    });
  }

  // 解析驗證規則
  parseValidationRules(input) {
    const rules = [];

    // 必填
    if (input.hasAttribute('required')) {
      rules.push({ type: 'required', message: '此欄位為必填' });
    }

    // 類型驗證
    switch (input.type) {
      case 'email':
        rules.push({ type: 'email', message: '請輸入有效的電子郵件地址' });
        break;
      case 'tel':
        rules.push({ type: 'phone', message: '請輸入有效的電話號碼' });
        break;
      case 'url':
        rules.push({ type: 'url', message: '請輸入有效的網址' });
        break;
    }

    // 長度限制
    if (input.hasAttribute('minlength')) {
      const min = parseInt(input.getAttribute('minlength'));
      rules.push({
        type: 'minLength',
        value: min,
        message: `至少需要 ${min} 個字元`
      });
    }

    if (input.hasAttribute('maxlength')) {
      const max = parseInt(input.getAttribute('maxlength'));
      rules.push({
        type: 'maxLength',
        value: max,
        message: `最多 ${max} 個字元`
      });
    }

    // 自訂規則
    if (input.hasAttribute('pattern')) {
      const pattern = input.getAttribute('pattern');
      const message =
        input.getAttribute('data-pattern-message') || '格式不正確';
      rules.push({ type: 'pattern', value: pattern, message });
    }

    return rules;
  }

  // 獲取錯誤顯示元素
  getErrorElement(input) {
    const formGroup = input.closest('.c-form__group');
    let errorElement = formGroup?.querySelector('.c-form__error');

    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'c-form__error';
      errorElement.setAttribute('role', 'alert');
      errorElement.setAttribute('aria-live', 'polite');

      // 插入到適當位置
      if (formGroup) {
        formGroup.appendChild(errorElement);
      } else {
        input.parentNode.insertBefore(errorElement, input.nextSibling);
      }
    }

    return errorElement;
  }

  // 綁定表單事件
  bindFormEvents(formConfig) {
    const { element } = formConfig;

    // 表單提交
    element.addEventListener('submit', event => {
      this.handleFormSubmit(event, formConfig);
    });

    // 欄位事件
    formConfig.fields.forEach((fieldConfig, fieldName) => {
      const { element: input } = fieldConfig;

      // 即時驗證
      input.addEventListener('blur', () => {
        this.validateField(fieldConfig, formConfig);
      });

      // 值變更
      input.addEventListener('input', () => {
        fieldConfig.isDirty = true;
        fieldConfig.value = input.value;

        // 如果已經顯示錯誤，即時重新驗證
        if (!fieldConfig.isValid) {
          this.validateField(fieldConfig, formConfig);
        }
      });
    });
  }

  // 綁定全域事件
  bindGlobalEvents() {
    // 按 Enter 鍵提交表單
    document.addEventListener('keydown', event => {
      if (
        event.key === 'Enter' &&
        event.target.matches('input:not([type="textarea"])')
      ) {
        const form = event.target.closest('form');
        if (form && this.isFormRegistered(form)) {
          event.preventDefault();
          this.submitForm(form.id);
        }
      }
    });
  }

  // 驗證單一欄位
  validateField(fieldConfig, formConfig) {
    const { element, rules } = fieldConfig;
    const value = element.value.trim();

    // 執行 beforeValidate hooks
    this.executeHooks(formConfig.hooks.beforeValidate, {
      field: fieldConfig,
      form: formConfig
    });

    let isValid = true;
    let errorMessage = '';

    // 執行驗證規則
    for (const rule of rules) {
      const validator = this.validationRules[rule.type];

      if (!validator) {
        continue;
      }

      let ruleResult;
      if (rule.value !== undefined) {
        ruleResult = validator(value, rule.value);
      } else {
        ruleResult = validator(value);
      }

      if (!ruleResult) {
        isValid = false;
        errorMessage = rule.message;
        break;
      }
    }

    // 更新欄位狀態
    fieldConfig.isValid = isValid;
    this.updateFieldUI(fieldConfig, errorMessage);

    // 執行 afterValidate hooks
    this.executeHooks(formConfig.hooks.afterValidate, {
      field: fieldConfig,
      form: formConfig,
      isValid,
      errorMessage
    });

    return isValid;
  }

  // 更新欄位 UI
  updateFieldUI(fieldConfig, errorMessage) {
    const { element, errorElement, isValid } = fieldConfig;
    const formGroup = element.closest('.c-form__group');

    // 更新欄位類別
    element.classList.toggle('is-invalid', !isValid);
    element.classList.toggle('is-valid', isValid && fieldConfig.isDirty);

    // 更新表單群組類別
    if (formGroup) {
      formGroup.classList.toggle('has-error', !isValid);
      formGroup.classList.toggle('has-success', isValid && fieldConfig.isDirty);
    }

    // 更新錯誤訊息
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = errorMessage ? 'block' : 'none';
    }

    // 設置 ARIA 屬性
    if (errorMessage) {
      element.setAttribute('aria-invalid', 'true');
      element.setAttribute('aria-describedby', errorElement.id || 'error');
    } else {
      element.removeAttribute('aria-invalid');
      element.removeAttribute('aria-describedby');
    }
  }

  // 驗證整個表單
  validateForm(formConfig) {
    let isFormValid = true;

    formConfig.fields.forEach(fieldConfig => {
      const isFieldValid = this.validateField(fieldConfig, formConfig);
      if (!isFieldValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  // 處理表單提交
  async handleFormSubmit(event, formConfig) {
    event.preventDefault();

    const { element } = formConfig;
    const submitBtn = element.querySelector('button[type="submit"]');

    try {
      // 執行 beforeSubmit hooks
      await this.executeHooks(formConfig.hooks.beforeSubmit, {
        form: formConfig,
        event
      });

      // 驗證表單
      const isValid = this.validateForm(formConfig);

      if (!isValid) {
        this.focusFirstError(formConfig);
        return;
      }

      // 設置載入狀態
      this.setSubmitButtonLoading(submitBtn, true);

      // 收集表單數據
      const formData = this.collectFormData(formConfig);

      // 提交表單
      const response = await this.submitFormData(formData, formConfig);

      // 執行成功 hooks
      await this.executeHooks(formConfig.hooks.onSuccess, {
        form: formConfig,
        response,
        formData
      });

      // 執行 afterSubmit hooks
      await this.executeHooks(formConfig.hooks.afterSubmit, {
        form: formConfig,
        response,
        success: true
      });

      // 顯示成功訊息
      this.showAlert('成功', '表單提交成功！', 'success');

      // 重置表單
      this.resetForm(formConfig);
    } catch (error) {
      console.error('Form submission error:', error);

      // 執行錯誤 hooks
      await this.executeHooks(formConfig.hooks.onError, {
        form: formConfig,
        error
      });

      // 顯示錯誤訊息
      this.showAlert('錯誤', error.message || '提交失敗，請稍後再試', 'error');
    } finally {
      this.setSubmitButtonLoading(submitBtn, false);
    }
  }

  // 收集表單數據
  collectFormData(formConfig) {
    const data = {};
    const formData = new FormData(formConfig.element);

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    return data;
  }

  // 提交表單數據
  async submitFormData(data, formConfig) {
    const { element } = formConfig;
    const action = element.getAttribute('action') || '/api/form';
    const method = element.getAttribute('method') || 'POST';

    const response = await fetch(action, {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  // 設置提交按鈕載入狀態
  setSubmitButtonLoading(button, isLoading) {
    if (!button) {
      return;
    }

    if (isLoading) {
      button.disabled = true;
      button.classList.add('is-loading');
      button.setAttribute('aria-busy', 'true');
    } else {
      button.disabled = false;
      button.classList.remove('is-loading');
      button.removeAttribute('aria-busy');
    }
  }

  // 聚焦到第一個錯誤欄位
  focusFirstError(formConfig) {
    for (const [fieldName, fieldConfig] of formConfig.fields) {
      if (!fieldConfig.isValid) {
        fieldConfig.element.focus();
        break;
      }
    }
  }

  // 重置表單
  resetForm(formConfig) {
    formConfig.element.reset();

    formConfig.fields.forEach(fieldConfig => {
      fieldConfig.isValid = true;
      fieldConfig.isDirty = false;
      fieldConfig.value = '';
      this.updateFieldUI(fieldConfig, '');
    });
  }

  // 執行 hooks
  async executeHooks(hooks, context) {
    for (const hook of hooks) {
      try {
        await hook(context);
      } catch (error) {
        console.error('Hook execution error:', error);
      }
    }
  }

  // 添加 hook
  addHook(formId, hookType, callback) {
    const formConfig = this.forms.get(formId);
    if (formConfig && formConfig.hooks[hookType]) {
      formConfig.hooks[hookType].push(callback);
    }
  }

  // 顯示警告訊息
  showAlert(title, message, type = 'info') {
    // 發送自訂事件
    document.dispatchEvent(
      new CustomEvent('form:alert', {
        detail: { title, message, type }
      })
    );

    // 備用方案
    console.log(`${type.toUpperCase()}: ${title} - ${message}`);
  }

  // 檢查表單是否已註冊
  isFormRegistered(formElement) {
    for (const [formId, formConfig] of this.forms) {
      if (formConfig.element === formElement) {
        return true;
      }
    }
    return false;
  }

  // 提交指定表單
  submitForm(formId) {
    const formConfig = this.forms.get(formId);
    if (formConfig) {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      formConfig.element.dispatchEvent(event);
    }
  }

  // 銷毀表單管理器
  destroy() {
    this.forms.clear();
    console.log('FormManager destroyed');
  }
}

// 導出模組
export default FormManager;
