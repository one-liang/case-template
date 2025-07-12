// 導航模組 - 使用 ES2020+ 語法
// 負責處理所有導航相關功能

class NavigationManager {
  constructor() {
    this.navbar = null;
    this.navToggler = null;
    this.navMenu = null;
    this.isMenuOpen = false;
    this.init();
  }

  // 初始化導航功能
  init() {
    this.cacheElements();
    this.bindEvents();
    this.initScrollBehavior();
    this.initKeyboardNavigation();
    this.handleActiveState();
  }

  // 快取 DOM 元素
  cacheElements() {
    this.navbar = document.querySelector('.c-navigation');
    this.navToggler = document.querySelector('.c-navigation__toggle');
    this.navMenu = document.querySelector('.c-navigation__menu');
    this.navLinks = document.querySelectorAll('.c-navigation__link');
    this.backToTopBtn = document.querySelector('.c-back-to-top');
  }

  // 綁定事件監聽器
  bindEvents() {
    // 漢堡選單切換
    this.navToggler?.addEventListener(
      'click',
      this.handleToggleMenu.bind(this)
    );

    // 導航連結點擊
    this.navLinks.forEach(link => {
      link.addEventListener('click', this.handleLinkClick.bind(this));
    });

    // 視窗調整大小
    window.addEventListener(
      'resize',
      this.debounce(this.handleResize.bind(this), 250)
    );

    // 點擊外部關閉選單
    document.addEventListener('click', this.handleOutsideClick.bind(this));

    // 回到頂部按鈕
    this.backToTopBtn?.addEventListener(
      'click',
      this.handleBackToTop.bind(this)
    );
  }

  // 處理選單切換
  handleToggleMenu(event) {
    event.preventDefault();
    event.stopPropagation();

    this.isMenuOpen = !this.isMenuOpen;

    // 更新 ARIA 狀態
    this.navToggler.setAttribute('aria-expanded', this.isMenuOpen);

    // 切換選單狀態
    this.navMenu.classList.toggle('is-open', this.isMenuOpen);

    // 切換漢堡選單動畫
    this.navToggler.classList.toggle('is-active', this.isMenuOpen);

    // 防止背景滾動
    document.body.classList.toggle('u-no-scroll', this.isMenuOpen);

    // 管理焦點
    if (this.isMenuOpen) {
      this.trapFocus();
    } else {
      this.releaseFocus();
    }

    // 觸發自訂事件
    this.dispatchCustomEvent('navigationToggle', { isOpen: this.isMenuOpen });
  }

  // 處理導航連結點擊
  handleLinkClick(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');

    // 如果是錨點連結，實施平滑滾動
    if (href?.startsWith('#')) {
      event.preventDefault();
      this.smoothScrollToAnchor(href);
    }

    // 在行動裝置上關閉選單
    if (this.isMenuOpen) {
      this.closeMenu();
    }

    // 更新活躍狀態
    this.updateActiveState(link);
  }

  // 平滑滾動到錨點
  smoothScrollToAnchor(anchor) {
    const targetElement = document.querySelector(anchor);

    if (!targetElement) {return;}

    const navHeight = this.navbar?.offsetHeight || 0;
    const offsetTop = targetElement.offsetTop - navHeight - 20;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    // 設置焦點到目標元素（無障礙設計）
    targetElement.setAttribute('tabindex', '-1');
    targetElement.focus();
    targetElement.addEventListener(
      'blur',
      () => {
        targetElement.removeAttribute('tabindex');
      },
      { once: true }
    );
  }

  // 初始化滾動行為
  initScrollBehavior() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateNavbarOnScroll();
          this.updateBackToTopButton();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // 滾動時更新導航列
  updateNavbarOnScroll() {
    if (!this.navbar) {return;}

    const scrollTop = window.pageYOffset;
    const threshold = 100;

    if (scrollTop > threshold) {
      this.navbar.classList.add('c-navigation--scrolled');
    } else {
      this.navbar.classList.remove('c-navigation--scrolled');
    }
  }

  // 更新回到頂部按鈕
  updateBackToTopButton() {
    if (!this.backToTopBtn) {return;}

    const scrollTop = window.pageYOffset;
    const threshold = 300;

    if (scrollTop > threshold) {
      this.backToTopBtn.classList.add('is-visible');
    } else {
      this.backToTopBtn.classList.remove('is-visible');
    }
  }

  // 回到頂部
  handleBackToTop(event) {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // 設置焦點到主要內容區域
    const main =
      document.querySelector('main') || document.querySelector('.l-main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
      main.addEventListener(
        'blur',
        () => {
          main.removeAttribute('tabindex');
        },
        { once: true }
      );
    }
  }

  // 初始化鍵盤導航
  initKeyboardNavigation() {
    // ESC 鍵關閉選單
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
        this.navToggler.focus();
      }
    });

    // Tab 鍵循環焦點
    this.navMenu?.addEventListener('keydown', event => {
      if (event.key === 'Tab' && this.isMenuOpen) {
        this.handleTabNavigation(event);
      }
    });
  }

  // 處理 Tab 導航
  handleTabNavigation(event) {
    const focusableElements = this.navMenu.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  // 鎖定焦點在選單內
  trapFocus() {
    const firstFocusable = this.navMenu.querySelector(
      'a[href], button:not([disabled])'
    );
    firstFocusable?.focus();
  }

  // 釋放焦點鎖定
  releaseFocus() {
    this.navToggler?.focus();
  }

  // 處理視窗調整大小
  handleResize() {
    // 在大螢幕時自動關閉行動選單
    if (window.innerWidth >= 992 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  // 處理外部點擊
  handleOutsideClick(event) {
    if (this.isMenuOpen && !this.navbar?.contains(event.target)) {
      this.closeMenu();
    }
  }

  // 關閉選單
  closeMenu() {
    this.isMenuOpen = false;
    this.navToggler?.setAttribute('aria-expanded', 'false');
    this.navMenu?.classList.remove('is-open');
    this.navToggler?.classList.remove('is-active');
    document.body.classList.remove('u-no-scroll');
  }

  // 處理活躍狀態
  handleActiveState() {
    // 根據當前 URL 設置活躍狀態
    const currentPath = window.location.pathname;

    this.navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      if (linkPath === currentPath) {
        this.updateActiveState(link);
      }
    });
  }

  // 更新活躍狀態
  updateActiveState(activeLink) {
    // 移除所有活躍狀態
    this.navLinks.forEach(link => {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');
    });

    // 設置新的活躍狀態
    activeLink.classList.add('is-active');
    activeLink.setAttribute('aria-current', 'page');
  }

  // 觸發自訂事件
  dispatchCustomEvent(type, detail) {
    const event = new CustomEvent(`navigation:${type}`, {
      detail,
      bubbles: true,
      cancelable: true
    });

    document.dispatchEvent(event);
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

  // 獲取當前狀態
  getState() {
    return {
      isMenuOpen: this.isMenuOpen,
      isScrolled:
        this.navbar?.classList.contains('c-navigation--scrolled') || false,
      activeLink:
        this.navMenu?.querySelector('.c-navigation__link.is-active')?.href ||
        null
    };
  }

  // 銷毀實例
  destroy() {
    // 移除事件監聽器
    this.navToggler?.removeEventListener('click', this.handleToggleMenu);
    this.navLinks.forEach(link => {
      link.removeEventListener('click', this.handleLinkClick);
    });

    // 重置狀態
    this.closeMenu();
    document.body.classList.remove('u-no-scroll');

    console.log('NavigationManager destroyed');
  }
}

// 導出模組
export default NavigationManager;
