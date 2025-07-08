# 導航組件製作規範

## 核心原則

### 必須遵循 (MUST)
- 使用 Bootstrap Navbar + Offcanvas 作為基礎結構
- 支援鍵盤導航和螢幕閱讀器
- 實作適當的 ARIA 屬性
- 提供視覺焦點指示
- 支援行動裝置觸控操作

### 禁止 (MUST NOT)
- 使用純 CSS 實作複雜的多層選單
- 忽略無障礙設計考量
- 在小螢幕上使用懸停式選單
- 缺少鍵盤操作支援
- 忽略語意化標記

### 建議 (SHOULD)
- 優先考慮單層次導航
- 使用漸進式增強策略
- 提供清楚的視覺回饋
- 考慮觸控裝置的使用體驗
- 實作適當的載入狀態

## 基本導航結構

### ✅ Bootstrap Navbar + Offcanvas 標準結構

```html
<!-- 主導航容器 -->
<nav class="navbar navbar-expand-lg navbar-light bg-light" role="navigation">
  <div class="container">
    <!-- 品牌標誌 -->
    <a class="navbar-brand" href="/">
      <img src="logo.png" alt="網站標誌" width="120" height="40">
    </a>
    
    <!-- 手機選單觸發按鈕 -->
    <button 
      class="navbar-toggler" 
      type="button" 
      data-bs-toggle="offcanvas" 
      data-bs-target="#navbarOffcanvas"
      aria-controls="navbarOffcanvas"
      aria-expanded="false"
      aria-label="切換導航選單"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <!-- 桌面選單 -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">首頁</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">關於我們</a>
        </li>
        <li class="nav-item dropdown">
          <a 
            class="nav-link dropdown-toggle" 
            href="#" 
            role="button" 
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            產品服務
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/products/web">網站開發</a></li>
            <li><a class="dropdown-item" href="/products/app">手機應用</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/products/consulting">顧問服務</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/contact">聯絡我們</a></li>
      </ul>
    </div>
  </div>
</nav>

<!-- 手機側邊選單 -->
<div 
  class="offcanvas offcanvas-end" 
  tabindex="-1" 
  id="navbarOffcanvas"
  aria-labelledby="navbarOffcanvasLabel"
>
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="navbarOffcanvasLabel">導航選單</h5>
    <button 
      type="button" 
      class="btn-close" 
      data-bs-dismiss="offcanvas"
      aria-label="關閉選單"
    ></button>
  </div>
  
  <div class="offcanvas-body">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/">首頁</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/about">關於我們</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/products" data-bs-toggle="collapse" 
           data-bs-target="#productsSubmenu" aria-expanded="false">
          產品服務
        </a>
        <div class="collapse" id="productsSubmenu">
          <ul class="list-unstyled ms-3">
            <li><a class="nav-link" href="/products/web">網站開發</a></li>
            <li><a class="nav-link" href="/products/app">手機應用</a></li>
            <li><a class="nav-link" href="/products/consulting">顧問服務</a></li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/contact">聯絡我們</a>
      </li>
    </ul>
  </div>
</div>
```

## 單層次導航實作

### ✅ 簡潔單層導航

```html
<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
  <div class="container">
    <a class="navbar-brand" href="/">
      <img src="logo.svg" alt="Company Logo" height="32">
    </a>
    
    <button class="navbar-toggler border-0" type="button" 
            data-bs-toggle="offcanvas" data-bs-target="#mobileNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <!-- 桌面導航 -->
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link fw-medium" href="/">首頁</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-medium" href="/services">服務項目</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-medium" href="/portfolio">作品集</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-medium" href="/blog">部落格</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-medium" href="/contact">聯絡我們</a>
        </li>
        <li class="nav-item ms-2">
          <a class="btn btn-primary" href="/quote">免費諮詢</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

## 多層次選單實作

### ✅ Mega Menu 實作

```html
<!-- 具有 Mega Menu 的導航 -->
<nav class="navbar navbar-expand-lg navbar-light bg-white">
  <div class="container">
    <a class="navbar-brand" href="/">Logo</a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" 
            data-bs-target="#megaMenuOffcanvas">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">首頁</a>
        </li>
        
        <!-- Mega Menu 項目 -->
        <li class="nav-item dropdown position-static">
          <a class="nav-link dropdown-toggle" href="#" role="button" 
             data-bs-toggle="dropdown" aria-expanded="false">
            產品與服務
          </a>
          
          <!-- Mega Menu 內容 -->
          <div class="dropdown-menu w-100 mt-0 border-0 shadow">
            <div class="container">
              <div class="row py-4">
                <div class="col-lg-3">
                  <h6 class="dropdown-header">網站開發</h6>
                  <a class="dropdown-item" href="/web-design">網站設計</a>
                  <a class="dropdown-item" href="/web-development">網站開發</a>
                  <a class="dropdown-item" href="/ecommerce">電商網站</a>
                  <a class="dropdown-item" href="/cms">內容管理</a>
                </div>
                
                <div class="col-lg-3">
                  <h6 class="dropdown-header">行動應用</h6>
                  <a class="dropdown-item" href="/mobile-app">手機應用</a>
                  <a class="dropdown-item" href="/progressive-web-app">PWA</a>
                  <a class="dropdown-item" href="/hybrid-app">混合應用</a>
                </div>
                
                <div class="col-lg-3">
                  <h6 class="dropdown-header">數位行銷</h6>
                  <a class="dropdown-item" href="/seo">SEO 優化</a>
                  <a class="dropdown-item" href="/social-media">社群媒體</a>
                  <a class="dropdown-item" href="/content-marketing">內容行銷</a>
                </div>
                
                <div class="col-lg-3">
                  <h6 class="dropdown-header">技術支援</h6>
                  <a class="dropdown-item" href="/hosting">主機服務</a>
                  <a class="dropdown-item" href="/maintenance">維護服務</a>
                  <a class="dropdown-item" href="/consultation">技術諮詢</a>
                </div>
              </div>
            </div>
          </div>
        </li>
        
        <li class="nav-item">
          <a class="nav-link" href="/about">關於我們</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/contact">聯絡我們</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

## JavaScript 功能增強

### ✅ 導航功能增強腳本

```javascript
class NavigationManager {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.offcanvas = document.querySelector('.offcanvas');
    this.dropdowns = document.querySelectorAll('.navbar .dropdown');
    this.mobileMenuLinks = document.querySelectorAll('.offcanvas .nav-link');
    
    this.init();
  }
  
  init() {
    this.setupScrollBehavior();
    this.setupKeyboardNavigation();
    this.setupMobileMenuBehavior();
    this.setupDropdownBehavior();
    this.setupActiveStates();
  }
  
  // 滾動時導航列行為
  setupScrollBehavior() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 滾動方向檢測
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 向下滾動，隱藏導航列
        this.navbar.classList.add('navbar-hidden');
      } else {
        // 向上滾動，顯示導航列
        this.navbar.classList.remove('navbar-hidden');
      }
      
      // 滾動時添加陰影
      if (scrollTop > 0) {
        this.navbar.classList.add('navbar-scrolled');
      } else {
        this.navbar.classList.remove('navbar-scrolled');
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  // 鍵盤導航支援
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      // ESC 鍵關閉選單
      if (event.key === 'Escape') {
        this.closeAllDropdowns();
        this.closeMobileMenu();
      }
      
      // Tab 鍵焦點管理
      if (event.key === 'Tab') {
        this.handleTabNavigation(event);
      }
      
      // Arrow 鍵導航
      if (event.key.startsWith('Arrow')) {
        this.handleArrowNavigation(event);
      }
    });
  }
  
  handleTabNavigation(event) {
    const focusableElements = this.getFocusableElements();
    const currentIndex = focusableElements.indexOf(document.activeElement);
    
    if (event.shiftKey) {
      // Shift + Tab (向前)
      if (currentIndex === 0) {
        event.preventDefault();
        focusableElements[focusableElements.length - 1].focus();
      }
    } else {
      // Tab (向後)
      if (currentIndex === focusableElements.length - 1) {
        event.preventDefault();
        focusableElements[0].focus();
      }
    }
  }
  
  handleArrowNavigation(event) {
    const activeElement = document.activeElement;
    const dropdown = activeElement.closest('.dropdown');
    
    if (dropdown) {
      event.preventDefault();
      const items = dropdown.querySelectorAll('.dropdown-item');
      const currentIndex = Array.from(items).indexOf(activeElement);
      
      if (event.key === 'ArrowDown') {
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex].focus();
      } else if (event.key === 'ArrowUp') {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex].focus();
      }
    }
  }
  
  // 手機選單行為
  setupMobileMenuBehavior() {
    // 點擊連結後關閉手機選單
    this.mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (!link.hasAttribute('data-bs-toggle')) {
          this.closeMobileMenu();
        }
      });
    });
    
    // 點擊背景關閉選單
    if (this.offcanvas) {
      this.offcanvas.addEventListener('click', (event) => {
        if (event.target === this.offcanvas) {
          this.closeMobileMenu();
        }
      });
    }
  }
  
  // 下拉選單行為優化
  setupDropdownBehavior() {
    this.dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      // 滑鼠懸停延遲顯示
      let hoverTimer;
      
      dropdown.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
          if (window.innerWidth >= 992) { // 只在桌面版啟用
            bootstrap.Dropdown.getOrCreateInstance(toggle).show();
          }
        }, 150);
      });
      
      dropdown.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
          if (window.innerWidth >= 992) {
            bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
          }
        }, 300);
      });
      
      // 防止選單外點擊時意外關閉
      menu?.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    });
  }
  
  // 設定啟用狀態
  setupActiveStates() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
  
  // 輔助方法
  getFocusableElements() {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    return Array.from(document.querySelectorAll(selectors.join(', ')))
      .filter(el => el.offsetParent !== null);
  }
  
  closeAllDropdowns() {
    this.dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
    });
  }
  
  closeMobileMenu() {
    if (this.offcanvas) {
      const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(this.offcanvas);
      offcanvasInstance.hide();
    }
  }
}

// 初始化導航管理器
document.addEventListener('DOMContentLoaded', () => {
  new NavigationManager();
});
```

## 無障礙設計要點

### ✅ 無障礙性最佳實踐

```html
<!-- 語意化導航結構 -->
<nav role="navigation" aria-label="主導航">
  <h2 class="visually-hidden">主要導航選單</h2>
  
  <!-- 跳轉連結（螢幕閱讀器） -->
  <a class="visually-hidden-focusable" href="#main-content">
    跳轉到主要內容
  </a>
  
  <!-- 導航項目 -->
  <ul class="navbar-nav" role="menubar">
    <li class="nav-item" role="none">
      <a class="nav-link" href="/" role="menuitem" 
         aria-current="page">首頁</a>
    </li>
    
    <!-- 下拉選單項目 -->
    <li class="nav-item dropdown" role="none">
      <a class="nav-link dropdown-toggle" href="#" 
         role="menuitem" 
         aria-haspopup="true" 
         aria-expanded="false"
         id="servicesMenu">
        服務項目
      </a>
      
      <ul class="dropdown-menu" role="menu" 
          aria-labelledby="servicesMenu">
        <li role="none">
          <a class="dropdown-item" href="/web-design" 
             role="menuitem">網站設計</a>
        </li>
        <li role="none">
          <a class="dropdown-item" href="/development" 
             role="menuitem">程式開發</a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
```

### ✅ 焦點管理

```scss
// 自訂焦點樣式
.nav-link {
  position: relative;
  transition: all 0.2s ease;
  
  &:focus {
    outline: 2px solid $primary;
    outline-offset: 2px;
    background-color: rgba($primary, 0.1);
  }
  
  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }
}

// 鍵盤導航指示
.dropdown-item {
  &:focus {
    background-color: $primary;
    color: white;
    outline: none;
  }
}

// 跳轉連結樣式
.visually-hidden-focusable {
  position: absolute;
  top: -40px;
  left: 6px;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  
  &:active,
  &:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 8px 16px;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
    background-color: $primary;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
}
```

## 響應式設計

### ✅ 響應式導航樣式

```scss
// 基本導航樣式
.navbar {
  transition: all 0.3s ease;
  
  &.navbar-scrolled {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  &.navbar-hidden {
    transform: translateY(-100%);
  }
}

// 桌面版導航
@include media-breakpoint-up(lg) {
  .navbar-nav {
    .nav-link {
      padding: 0.5rem 1rem;
      margin: 0 0.25rem;
      border-radius: 6px;
      
      &:hover {
        background-color: rgba($primary, 0.1);
      }
    }
  }
  
  // Mega Menu 樣式
  .dropdown-menu {
    border: none;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    
    .dropdown-header {
      color: $primary;
      font-weight: 600;
      border-bottom: 1px solid $gray-200;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
}

// 手機版導航
@include media-breakpoint-down(lg) {
  .offcanvas {
    .nav-link {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid $gray-100;
      
      &:hover {
        background-color: $gray-50;
      }
    }
    
    // 手機版子選單
    .collapse {
      .nav-link {
        padding: 0.5rem 1rem 0.5rem 2rem;
        font-size: 0.9rem;
        color: $gray-600;
      }
    }
  }
}

// 觸控裝置優化
@media (hover: none) and (pointer: coarse) {
  .dropdown:hover .dropdown-menu {
    display: none;
  }
  
  .nav-link {
    min-height: 44px; // 符合觸控標準
    display: flex;
    align-items: center;
  }
}
```

## 效能優化

### ✅ 載入優化

```javascript
// 延遲載入非關鍵導航功能
const loadNavigationEnhancements = () => {
  // 只在需要時載入複雜的導航功能
  if (document.querySelectorAll('.dropdown').length > 0) {
    import('./modules/dropdown-enhancements.js');
  }
  
  if (document.querySelector('.mega-menu')) {
    import('./modules/mega-menu.js');
  }
};

// 使用 Intersection Observer 優化
const observeNavigation = () => {
  const navbar = document.querySelector('.navbar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navbar.classList.remove('navbar-scrolled');
      } else {
        navbar.classList.add('navbar-scrolled');
      }
    });
  }, { threshold: 0.1 });
  
  // 觀察頁面頂部
  const sentinel = document.createElement('div');
  sentinel.style.height = '1px';
  document.body.insertBefore(sentinel, document.body.firstChild);
  observer.observe(sentinel);
};

// 條件式載入
document.addEventListener('DOMContentLoaded', () => {
  // 基本導航功能立即載入
  new NavigationManager();
  
  // 進階功能延遲載入
  requestIdleCallback(() => {
    loadNavigationEnhancements();
    observeNavigation();
  });
});
```

## 程式碼品質檢查

### 導航組件檢查清單
- [ ] 使用語意化 HTML 結構
- [ ] 實作完整的鍵盤導航支援
- [ ] 提供適當的 ARIA 屬性
- [ ] 支援螢幕閱讀器
- [ ] 響應式設計在所有裝置正常運作
- [ ] 觸控裝置操作體驗良好
- [ ] 效能優化實施完整
- [ ] 跨瀏覽器相容性測試通過
- [ ] 無障礙性標準符合 WCAG 2.1
- [ ] 視覺設計與 UX 一致

### 手動測試項目
- [ ] 所有連結功能正常
- [ ] 下拉選單在不同裝置正確顯示
- [ ] 鍵盤 Tab 順序邏輯正確
- [ ] 螢幕閱讀器朗讀內容適當
- [ ] 手機選單開關功能正常
- [ ] 滾動行為符合預期
- [ ] 載入效能在可接受範圍

---

*遵循這些導航組件規範能確保使用者體驗優質且符合無障礙標準* 