// 主要 JavaScript 檔案
// 遵循 ES2020+ 語法和前端開發規範

class ProjectManager {
  constructor() {
    this.components = [];
    this.init();
  }

  // 初始化應用程式
  async init() {
    try {
      // 等待 DOM 完全載入
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () =>
          this.initializeComponents()
        );
      } else {
        this.initializeComponents();
      }
    } catch (error) {
      console.error('初始化失敗:', error);
    }
  }

  // 初始化所有組件
  initializeComponents() {
    console.log('🚀 開始初始化組件...');

    // 初始化導航組件
    this.initNavigation();

    // 初始化表單處理
    this.initForms();

    // 初始化動畫效果
    this.initAnimations();

    // 初始化響應式圖片
    this.initResponsiveImages();

    // 初始化第三方套件
    this.initThirdPartyLibraries();

    // 初始化全域事件監聽器
    this.initGlobalEventListeners();

    console.log('✅ 所有組件初始化完成');
  }

  // 導航組件初始化
  initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');

    // 漢堡選單切換
    if (navToggler && navCollapse) {
      navToggler.addEventListener('click', this.handleNavToggle.bind(this));
    }

    // 滾動時導航列變化
    if (navbar) {
      window.addEventListener('scroll', this.handleNavScroll.bind(this));
    }

    // 平滑滾動到錨點
    this.initSmoothScrolling();

    // 回到頂部按鈕
    this.initBackToTop();
  }

  // 處理導航切換
  handleNavToggle(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', !isExpanded);

    // 添加動畫效果
    button.classList.toggle('active');
  }

  // 處理導航滾動效果
  handleNavScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) {
      return;
    }

    const scrollTop = window.pageYOffset;

    if (scrollTop > 100) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  // 初始化平滑滾動
  initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();

        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100; // 導航高度補償

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // 初始化回到頂部按鈕
  initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      });

      backToTopBtn.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // 表單處理初始化
  initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      // 表單驗證
      form.addEventListener('submit', this.handleFormSubmit.bind(this));

      // 即時驗證
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', this.handleInputValidation.bind(this));
        input.addEventListener('input', this.handleInputChange.bind(this));
      });
    });
  }

  // 處理表單提交
  async handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    // 禁用提交按鈕
    this.setButtonLoading(submitBtn, true);

    try {
      // 驗證表單
      const isValid = this.validateForm(form);

      if (!isValid) {
        this.setButtonLoading(submitBtn, false);
        return;
      }

      // 收集表單資料
      const formData = this.collectFormData(form);

      // 發送請求（這裡需要根據實際 API 調整）
      const response = await this.submitFormData(formData);

      if (response.success) {
        this.showAlert('成功', '表單提交成功！', 'success');
        form.reset();
      } else {
        this.showAlert(
          '錯誤',
          response.message || '提交失敗，請稍後再試。',
          'error'
        );
      }
    } catch (error) {
      console.error('表單提交錯誤:', error);
      this.showAlert('錯誤', '網路錯誤，請稍後再試。', 'error');
    } finally {
      this.setButtonLoading(submitBtn, false);
    }
  }

  // 表單驗證
  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll(
      'input[required], textarea[required], select[required]'
    );

    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  // 單一輸入驗證
  validateInput(input) {
    const value = input.value.trim();
    const { type } = input;
    let isValid = true;
    let errorMessage = '';

    // 必填驗證
    if (input.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = '此欄位為必填';
    }

    // 郵件驗證
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = '請輸入有效的郵件地址';
      }
    }

    // 電話驗證
    if (type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = '請輸入有效的電話號碼';
      }
    }

    // 更新 UI
    this.updateInputValidationUI(input, isValid, errorMessage);

    return isValid;
  }

  // 更新輸入驗證 UI
  updateInputValidationUI(input, isValid, errorMessage) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.error-message');

    if (formGroup) {
      formGroup.classList.toggle('has-error', !isValid);
      formGroup.classList.toggle('has-success', isValid);
    }

    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = errorMessage ? 'block' : 'none';
    }

    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid);
  }

  // 收集表單資料
  collectFormData(form) {
    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    return data;
  }

  // 提交表單資料
  async submitFormData(data) {
    // 這裡需要根據實際 API 端點調整
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await response.json();
  }

  // 設置按鈕載入狀態
  setButtonLoading(button, isLoading) {
    if (!button) {
      return;
    }

    if (isLoading) {
      button.disabled = true;
      button.classList.add('btn-loading');
      button.setAttribute('aria-busy', 'true');
    } else {
      button.disabled = false;
      button.classList.remove('btn-loading');
      button.removeAttribute('aria-busy');
    }
  }

  // 顯示警告訊息
  showAlert(title, message, type = 'info') {
    // 使用 SweetAlert 或自訂警告組件
    if (typeof swal !== 'undefined') {
      swal(title, message, type);
    } else {
      // 備用方案
      const alertType = type === 'error' ? 'danger' : type;
      this.showBootstrapAlert(message, alertType);
    }
  }

  // Bootstrap 警告訊息
  showBootstrapAlert(message, type = 'info') {
    const alertContainer =
      document.querySelector('.alert-container') || document.body;
    const alert = document.createElement('div');

    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertContainer.appendChild(alert);

    // 自動移除警告
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  // 初始化動畫效果
  initAnimations() {
    // 檢查是否有 AOS 套件
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 120
      });
    }

    // 自訂滾動動畫
    this.initScrollAnimations();
  }

  // 初始化滾動動畫
  initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  // 初始化響應式圖片
  initResponsiveImages() {
    // 延遲載入圖片
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // 初始化第三方套件
  initThirdPartyLibraries() {
    // 輪播套件 (Swiper)
    this.initSwiper();

    // 日期選擇器 (Flatpickr)
    this.initFlatpickr();

    // 下拉選單 (TomSelect)
    this.initTomSelect();

    // 燈箱 (Fslightbox)
    this.initFslightbox();

    // 拖拉排序 (SortableJS)
    this.initSortable();
  }

  // 初始化 Swiper
  initSwiper() {
    const swiperElements = document.querySelectorAll('.swiper');

    swiperElements.forEach(element => {
      if (typeof Swiper !== 'undefined') {
        const config = this.getSwiperConfig(element);
        const swiper = new Swiper(element, config);
        this.components.push(swiper);
      }
    });
  }

  // 獲取 Swiper 配置
  getSwiperConfig(element) {
    const defaultConfig = {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    };

    // 合併自訂配置
    const customConfig = element.dataset.swiperConfig
      ? JSON.parse(element.dataset.swiperConfig)
      : {};

    return { ...defaultConfig, ...customConfig };
  }

  // 初始化 Flatpickr
  initFlatpickr() {
    const dateInputs = document.querySelectorAll('[data-flatpickr]');

    dateInputs.forEach(input => {
      if (typeof flatpickr !== 'undefined') {
        const config = input.dataset.flatpickr
          ? JSON.parse(input.dataset.flatpickr)
          : {};

        const fp = flatpickr(input, {
          dateFormat: 'Y-m-d',
          locale: 'zh_tw',
          ...config
        });

        this.components.push(fp);
      }
    });
  }

  // 初始化 TomSelect
  initTomSelect() {
    const selectElements = document.querySelectorAll('[data-tom-select]');

    selectElements.forEach(select => {
      if (typeof TomSelect !== 'undefined') {
        const config = select.dataset.tomSelect
          ? JSON.parse(select.dataset.tomSelect)
          : {};

        const ts = new TomSelect(select, {
          create: false,
          ...config
        });

        this.components.push(ts);
      }
    });
  }

  // 初始化 Fslightbox
  initFslightbox() {
    // Fslightbox 自動初始化，這裡只需要處理動態內容
    const lightboxElements = document.querySelectorAll('[data-fslightbox]');

    if (
      lightboxElements.length > 0 &&
      typeof refreshFsLightbox !== 'undefined'
    ) {
      refreshFsLightbox();
    }
  }

  // 初始化 SortableJS
  initSortable() {
    const sortableElements = document.querySelectorAll('[data-sortable]');

    sortableElements.forEach(element => {
      if (typeof Sortable !== 'undefined') {
        const sortable = Sortable.create(element, {
          animation: 150,
          ghostClass: 'sortable-ghost',
          onEnd: evt => {
            console.log('排序變更:', evt.oldIndex, '->', evt.newIndex);
            this.handleSortChange(evt);
          }
        });

        this.components.push(sortable);
      }
    });
  }

  // 處理排序變更
  handleSortChange(event) {
    // 這裡可以發送 AJAX 請求保存新的排序
    const { oldIndex, newIndex } = event;
    console.log(`項目從位置 ${oldIndex} 移動到位置 ${newIndex}`);
  }

  // 初始化全域事件監聽器
  initGlobalEventListeners() {
    // 統一點擊事件處理
    document.addEventListener('click', this.handleGlobalClick.bind(this));

    // 鍵盤事件處理
    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));

    // 視窗調整大小事件
    window.addEventListener(
      'resize',
      this.debounce(this.handleWindowResize.bind(this), 250)
    );
  }

  // 全域點擊事件處理
  handleGlobalClick(event) {
    const { target } = event;

    // 處理具有特定 data 屬性的元素
    if (target.matches('[data-action]')) {
      const { action } = target.dataset;
      this.handleDataAction(action, target, event);
    }

    // 關閉下拉選單
    if (!target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.show').forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    }
  }

  // 處理 data-action 屬性
  handleDataAction(action, element, event) {
    switch (action) {
      case 'toggle':
        this.handleToggle(element, event);
        break;
      case 'modal':
        this.handleModal(element, event);
        break;
      case 'alert':
        this.handleAlert(element, event);
        break;
      default:
        console.warn('未知的 action:', action);
    }
  }

  // 處理切換功能
  handleToggle(element, event) {
    event.preventDefault();

    const { target } = element.dataset;
    const targetElement = document.querySelector(target);

    if (targetElement) {
      targetElement.classList.toggle('show');
      const isExpanded = targetElement.classList.contains('show');
      element.setAttribute('aria-expanded', isExpanded);
    }
  }

  // 處理模態框
  handleModal(element, event) {
    event.preventDefault();

    const modalId = element.dataset.target;
    const modal = document.querySelector(modalId);

    if (modal && typeof bootstrap !== 'undefined') {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  // 處理警告
  handleAlert(element, event) {
    event.preventDefault();

    const config = element.dataset.alert
      ? JSON.parse(element.dataset.alert)
      : { title: '提示', text: '操作完成', icon: 'info' };

    this.showAlert(config.title, config.text, config.icon);
  }

  // 全域鍵盤事件處理
  handleGlobalKeydown(event) {
    // ESC 鍵關閉模態框
    if (event.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal.show');
      openModals.forEach(modal => {
        if (typeof bootstrap !== 'undefined') {
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        }
      });
    }
  }

  // 視窗調整大小處理
  handleWindowResize() {
    // 重新計算組件大小
    this.components.forEach(component => {
      if (component.update) {
        component.update();
      }
    });

    // 重新初始化 AOS
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }

  // 防抖函數
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 清理資源
  destroy() {
    this.components.forEach(component => {
      if (component.destroy) {
        component.destroy();
      }
    });

    this.components = [];

    // 移除事件監聽器
    document.removeEventListener('click', this.handleGlobalClick);
    document.removeEventListener('keydown', this.handleGlobalKeydown);
    window.removeEventListener('resize', this.handleWindowResize);

    console.log('🗑️ 專案管理器已清理');
  }
}

// 初始化應用程式
const projectManager = new ProjectManager();

// 將管理器暴露到全域作用域供調試使用
window.projectManager = projectManager;

// 服務工作者註冊 (PWA) - 僅在生產環境啟用
if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('SW 註冊成功:', registration);
      })
      .catch(registrationError => {
        console.log('SW 註冊失敗:', registrationError);
      });
  });
}

// 導出管理器類別供其他模組使用
export { ProjectManager };
