# JavaScript/TypeScript 編程規範

## 核心原則

### 必須遵循 (MUST)
- 使用 ES2020+ 語法特性
- 優先使用現代瀏覽器原生 API
- 遵循函數式編程理念
- 使用 `const` 和 `let`，避免 `var`
- 事件處理函數以 `handle` 前綴命名

### 禁止 (MUST NOT)
- 不要將所有功能打包成單一檔案
- 避免過度依賴 jQuery
- 不要使用已棄用的 API
- 避免全域變數污染
- 不要忽略錯誤處理

### 建議 (SHOULD)
- 優先使用 Browser/UMD 版本套件
- 使用 TypeScript 提供型別安全
- 採用模組化開發
- 使用現代化的事件處理方式
- 實作適當的錯誤邊界

## 檔案管理結構

### ✅ 正確的檔案結構
```
js/
├── lib/                    # 第三方函式庫
│   ├── bootstrap.min.js
│   ├── swiper.min.js
│   └── axios.min.js
├── modules/                # 功能模組
│   ├── navigation.js
│   ├── carousel.js
│   ├── modal.js
│   └── form-validation.js
├── pages/                  # 頁面特定腳本
│   ├── home.js
│   ├── about.js
│   └── contact.js
├── utils/                  # 工具函數
│   ├── helpers.js
│   ├── api.js
│   └── constants.js
└── main.js                 # 主要初始化腳本
```

### ❌ 錯誤的檔案結構
```
js/
└── all.min.js             # 所有功能打包在一起
```

## 現代 JavaScript 語法

### ✅ 推薦語法

```javascript
// 使用 const/let
const API_BASE_URL = 'https://api.example.com';
let currentUser = null;

// 使用箭頭函數
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('獲取用戶數據失敗:', error);
    throw error;
  }
};

// 使用解構賦值
const { name, email, avatar } = userData;
const [firstName, lastName] = name.split(' ');

// 使用模板字面量
const welcomeMessage = `歡迎回來，${firstName}！`;

// 使用展開運算符
const updatedUser = {
  ...currentUser,
  lastLogin: new Date(),
  isActive: true
};

// 使用可選鏈操作符
const userEmail = user?.profile?.email ?? '未提供';

// 使用 nullish coalescing
const displayName = user.displayName ?? user.username ?? '匿名用戶';
```

### ❌ 避免的舊語法

```javascript
// 避免使用 var
var userName = 'John'; // ❌

// 避免使用 function 宣告在現代場景
function getUserData() { } // ❌ 在模組中

// 避免使用 callback hell
getData(function(result) {
  processData(result, function(processed) {
    saveData(processed, function(saved) {
      // 回調地獄
    });
  });
}); // ❌
```

## 事件處理規範

### ✅ 正確的事件處理

```javascript
// 事件處理函數命名
const handleLoginClick = (event) => {
  event.preventDefault();
  // 處理登入邏輯
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  try {
    await submitForm(formData);
    showSuccessMessage('提交成功！');
  } catch (error) {
    showErrorMessage('提交失敗，請重試');
  }
};

// 使用現代事件監聽
document.addEventListener('DOMContentLoaded', () => {
  // DOM 載入完成後初始化
  initializeApp();
});

// 事件委派
document.addEventListener('click', (event) => {
  if (event.target.matches('.js-toggle-menu')) {
    handleMenuToggle(event);
  }
  
  if (event.target.matches('.js-modal-trigger')) {
    handleModalOpen(event);
  }
});
```

### ❌ 避免的事件處理方式

```javascript
// 避免內聯事件處理
// <button onclick="doSomething()">按鈕</button> ❌

// 避免直接綁定到元素
button.onclick = function() { }; // ❌

// 避免 jQuery 風格（除非必要）
$('.button').click(function() { }); // ❌
```

## 模組化開發

### ✅ ES6 模組語法

```javascript
// utils/api.js
export const API_CONFIG = {
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const apiClient = axios.create(API_CONFIG);

export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`API 請求失敗: ${endpoint}`, error);
    throw error;
  }
};

// modules/navigation.js
import { apiClient } from '../utils/api.js';

export class NavigationManager {
  constructor() {
    this.menuToggle = document.querySelector('.js-menu-toggle');
    this.mobileMenu = document.querySelector('.js-mobile-menu');
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupKeyboardNavigation();
  }
  
  bindEvents() {
    this.menuToggle?.addEventListener('click', this.handleMenuToggle.bind(this));
  }
  
  handleMenuToggle = (event) => {
    event.preventDefault();
    this.mobileMenu.classList.toggle('is-open');
    
    // 更新 ARIA 屬性
    const isOpen = this.mobileMenu.classList.contains('is-open');
    this.menuToggle.setAttribute('aria-expanded', isOpen);
  }
  
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }
  
  closeMobileMenu() {
    this.mobileMenu.classList.remove('is-open');
    this.menuToggle.setAttribute('aria-expanded', 'false');
  }
}

// main.js
import { NavigationManager } from './modules/navigation.js';
import { CarouselManager } from './modules/carousel.js';
import { FormValidator } from './modules/form-validation.js';

class App {
  constructor() {
    this.navigation = null;
    this.carousel = null;
    this.formValidator = null;
  }
  
  async init() {
    try {
      // 初始化核心組件
      this.navigation = new NavigationManager();
      this.carousel = new CarouselManager();
      this.formValidator = new FormValidator();
      
      // 載入頁面特定功能
      await this.loadPageSpecificModules();
      
      console.log('應用程式初始化完成');
    } catch (error) {
      console.error('應用程式初始化失敗:', error);
    }
  }
  
  async loadPageSpecificModules() {
    const pageName = document.body.dataset.page;
    
    if (pageName) {
      try {
        const pageModule = await import(`./pages/${pageName}.js`);
        if (pageModule.default) {
          new pageModule.default();
        }
      } catch (error) {
        console.warn(`無法載入頁面模組: ${pageName}`, error);
      }
    }
  }
}

// 啟動應用程式
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
```

## 錯誤處理與偵錯

### ✅ 適當的錯誤處理

```javascript
// API 錯誤處理
const handleApiError = (error, context = '') => {
  const errorInfo = {
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
    context,
    timestamp: new Date().toISOString()
  };
  
  console.error('API 錯誤:', errorInfo);
  
  // 根據錯誤類型顯示適當訊息
  if (error.response?.status === 401) {
    redirectToLogin();
  } else if (error.response?.status >= 500) {
    showErrorMessage('伺服器錯誤，請稍後再試');
  } else {
    showErrorMessage('操作失敗，請檢查網路連線');
  }
};

// 表單驗證錯誤處理
const validateForm = (formData) => {
  const errors = [];
  
  if (!formData.get('email')) {
    errors.push({ field: 'email', message: '請輸入電子郵件' });
  } else if (!isValidEmail(formData.get('email'))) {
    errors.push({ field: 'email', message: '請輸入有效的電子郵件格式' });
  }
  
  if (!formData.get('password')) {
    errors.push({ field: 'password', message: '請輸入密碼' });
  } else if (formData.get('password').length < 8) {
    errors.push({ field: 'password', message: '密碼長度至少 8 字元' });
  }
  
  return errors;
};

// 全域錯誤處理
window.addEventListener('error', (event) => {
  console.error('全域錯誤:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('未處理的 Promise 拒絕:', event.reason);
  event.preventDefault(); // 防止錯誤顯示在控制台
});
```

## 效能最佳化

### ✅ 效能優化技巧

```javascript
// 防抖動 (Debounce)
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// 搜尋輸入防抖動
const handleSearchInput = debounce((event) => {
  const query = event.target.value;
  if (query.length >= 2) {
    performSearch(query);
  }
}, 300);

// 節流 (Throttle)
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// 滾動事件節流
const handleScroll = throttle(() => {
  const scrollTop = window.pageYOffset;
  updateScrollIndicator(scrollTop);
}, 100);

// 懶加載圖片
const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
};

// 記憶化 (Memoization)
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// 昂貴計算的記憶化
const expensiveCalculation = memoize((data) => {
  // 複雜計算邏輯
  return data.reduce((acc, item) => acc + item.value, 0);
});
```

## TypeScript 支援

### ✅ TypeScript 最佳實踐

```typescript
// types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export type EventHandler<T = Event> = (event: T) => void | Promise<void>;

// services/userService.ts
import { User, ApiResponse } from '../types/index.js';

export class UserService {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async getUser(id: number): Promise<User> {
    try {
      const response = await fetch(`${this.baseURL}/users/${id}`);
      const result: ApiResponse<User> = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message);
      }
      
      return result.data;
    } catch (error) {
      console.error('獲取用戶失敗:', error);
      throw error;
    }
  }
  
  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${this.baseURL}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      
      const result: ApiResponse<User> = await response.json();
      return result.data;
    } catch (error) {
      console.error('更新用戶失敗:', error);
      throw error;
    }
  }
}

// components/userProfile.ts
import { User, EventHandler } from '../types/index.js';
import { UserService } from '../services/userService.js';

export class UserProfile {
  private container: HTMLElement;
  private userService: UserService;
  private currentUser: User | null = null;
  
  constructor(container: HTMLElement, userService: UserService) {
    this.container = container;
    this.userService = userService;
    this.init();
  }
  
  private init(): void {
    this.bindEvents();
  }
  
  private bindEvents(): void {
    const editButton = this.container.querySelector('.js-edit-profile');
    editButton?.addEventListener('click', this.handleEditClick);
  }
  
  private handleEditClick: EventHandler = async (event) => {
    event.preventDefault();
    
    if (!this.currentUser) {
      console.warn('沒有當前用戶數據');
      return;
    }
    
    try {
      await this.showEditModal(this.currentUser);
    } catch (error) {
      console.error('編輯用戶失敗:', error);
    }
  }
  
  async loadUser(userId: number): Promise<void> {
    try {
      this.currentUser = await this.userService.getUser(userId);
      this.render();
    } catch (error) {
      this.renderError('載入用戶資料失敗');
    }
  }
  
  private render(): void {
    if (!this.currentUser) return;
    
    this.container.innerHTML = `
      <div class="user-profile">
        <img src="${this.currentUser.avatar || '/default-avatar.png'}" 
             alt="${this.currentUser.name}" 
             class="user-avatar">
        <h3>${this.currentUser.name}</h3>
        <p>${this.currentUser.email}</p>
        <button class="btn btn-primary js-edit-profile">編輯資料</button>
      </div>
    `;
  }
  
  private renderError(message: string): void {
    this.container.innerHTML = `
      <div class="alert alert-danger" role="alert">
        ${message}
      </div>
    `;
  }
  
  private async showEditModal(user: User): Promise<void> {
    // 編輯模態框邏輯
  }
}
```

## 無障礙設計

### ✅ JavaScript 無障礙支援

```javascript
// 鍵盤導航支援
const setupKeyboardNavigation = () => {
  document.addEventListener('keydown', (event) => {
    const { key, target } = event;
    
    // ESC 鍵關閉模態框
    if (key === 'Escape') {
      const openModal = document.querySelector('.modal.show');
      if (openModal) {
        closeModal(openModal);
      }
    }
    
    // Enter 或 Space 啟動按鈕
    if ((key === 'Enter' || key === ' ') && target.role === 'button') {
      event.preventDefault();
      target.click();
    }
    
    // Tab 鍵焦點管理
    if (key === 'Tab') {
      manageFocusWithinModal(event);
    }
  });
};

// ARIA 屬性管理
const updateAriaAttributes = (element, attributes) => {
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(`aria-${key}`, value);
  });
};

// 動態內容通知螢幕閱讀器
const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // 移除元素避免累積
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// 焦點管理
const trapFocusInModal = (modal) => {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleTabKey = (event) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };
  
  modal.addEventListener('keydown', handleTabKey);
  firstElement?.focus();
  
  return () => {
    modal.removeEventListener('keydown', handleTabKey);
  };
};
```

## 程式碼品質檢查

### 自動檢查清單
- [ ] 使用 ES2020+ 語法特性
- [ ] 遵循函數式編程原則
- [ ] 適當的錯誤處理
- [ ] 事件處理函數正確命名
- [ ] 模組化結構清晰
- [ ] TypeScript 型別定義完整
- [ ] 無障礙設計支援
- [ ] 效能優化實施

### 手動檢查清單
- [ ] 程式碼可讀性良好
- [ ] 函數單一職責
- [ ] 變數命名語意清楚
- [ ] 註解適當且有意義
- [ ] 錯誤訊息用戶友善
- [ ] 無記憶體洩漏
- [ ] 跨瀏覽器相容性
- [ ] 行動裝置支援良好

### 工具建議

```json
// package.json
{
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "eslint-config-prettier": "^9.0.0",
    "prettier": "^3.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^14.0.0"
  },
  "scripts": {
    "lint": "eslint src/**/*.{js,ts}",
    "lint:fix": "eslint src/**/*.{js,ts} --fix",
    "format": "prettier --write src/**/*.{js,ts}",
    "type-check": "tsc --noEmit"
  }
}

// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "prefer-const": "error",
    "no-var": "error",
    "prefer-arrow-callback": "error",
    "no-console": "warn"
  }
}
```

---

*遵循這些 JavaScript/TypeScript 規範能確保程式碼現代化、可維護和高品質* 