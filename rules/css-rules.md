# CSS/SCSS 編程規範

## 核心原則

### 必須遵循 (MUST)
- 統一使用 Bootstrap 5.3+ 作為基礎框架
- 使用 SCSS 編寫所有自訂樣式
- 修改 Bootstrap 變數而非覆蓋樣式
- 遵循 BEM 命名規範或 OOCSS 命名風格
- 使用現代化 Flexbox/Grid 排版

### 禁止 (MUST NOT)
- 直接覆蓋 Bootstrap 樣式
- 使用 `!important` 除非絕對必要
- 濫用 `bg-dark` + `text-white` 組合
- 嵌套超過 3 層的 BEM element
- 使用過時的 float 排版

### 建議 (SHOULD)
- 優先使用 Bootstrap 內建 utility classes
- 使用 CSS 自訂屬性 (CSS Variables)
- 保持選擇器特異性低
- 使用語意化的 class 命名

## SCSS 檔案結構

```scss
// ✅ 正確的 SCSS 結構
// 1. Bootstrap 變數覆蓋
@import "variables";

// 2. Bootstrap 函式和 mixins
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";

// 3. 自訂 mixins
@import "mixins";

// 4. Bootstrap 組件選擇性載入
@import "bootstrap/scss/bootstrap";

// 5. 自訂組件
@import "components/header";
@import "components/footer";
@import "components/buttons";

// 6. 頁面特定樣式
@import "pages/home";
@import "pages/about";
```

## Bootstrap 變數客製化

### ✅ 正確做法

```scss
// _variables.scss
// 修改主色系
$primary: #007bff;
$secondary: #6c757d;
$success: #28a745;

// 添加自訂顏色
$custom-colors: (
  "brand": #ff6b35,
  "accent": #4ecdc4
);

// 合併到 theme-colors
$theme-colors: map-merge($theme-colors, $custom-colors);

// 字體設定
$font-family-base: "Noto Sans TC", -apple-system, BlinkMacSystemFont, sans-serif;
$font-size-base: 1rem;
$line-height-base: 1.6;

// 斷點客製化
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

### ❌ 錯誤做法

```scss
// 不要直接覆蓋樣式
.btn-primary {
  background-color: #ff6b35 !important;
  border-color: #ff6b35 !important;
}

// 不要使用 !important
.navbar {
  background-color: white !important;
}
```

## BEM 命名規範

### 基本結構
```scss
// Block (組件)
.c-card { }

// Element (元素)
.c-card__header { }
.c-card__body { }
.c-card__footer { }

// Modifier (修飾符)
.c-card--featured { }
.c-card--large { }
.c-card__header--transparent { }
```

### Namespace 系統
```scss
// Components (組件)
.c-button { }
.c-modal { }
.c-navbar { }

// Layout (版面)
.l-header { }
.l-sidebar { }
.l-main { }

// Helpers (輔助)
.h-center { }
.h-hidden { }
.h-clearfix { }

// State (狀態)
.is-active { }
.is-loading { }
.is-disabled { }

// JavaScript hooks (JS 掛鉤)
.js-toggle { }
.js-modal-trigger { }
```

### 實際範例
```scss
// ✅ 正確的 BEM 結構
.c-product-card {
  border: 1px solid $gray-300;
  border-radius: $border-radius;
  
  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  &__title {
    font-size: $h5-font-size;
    font-weight: $font-weight-semibold;
  }
  
  &__price {
    color: $primary;
    font-weight: $font-weight-bold;
  }
  
  &--featured {
    border-color: $primary;
    box-shadow: 0 4px 8px rgba($primary, 0.15);
  }
  
  &--large {
    .c-product-card__image {
      height: 300px;
    }
  }
}
```

## 深色模式處理

### ✅ 使用 Bootstrap 深色模式

```scss
// 正確使用 data-bs-theme
.hero-section {
  &[data-bs-theme="dark"] {
    background-color: var(--bs-dark);
    color: var(--bs-light);
  }
}

// 使用 CSS 變數
.custom-component {
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  border-color: var(--bs-border-color);
}
```

### ❌ 避免硬編碼深色樣式

```scss
// 不要這樣做
.dark-section {
  background-color: #212529;
  color: #ffffff;
}
```

## 響應式設計

### ✅ 正確的斷點使用

```scss
// 使用 Bootstrap mixins
.custom-component {
  padding: 1rem;
  
  @include media-breakpoint-up(md) {
    padding: 2rem;
  }
  
  @include media-breakpoint-up(lg) {
    padding: 3rem;
  }
}

// 使用 Bootstrap 斷點變數
.hero-title {
  font-size: 2rem;
  
  @media (min-width: map-get($grid-breakpoints, md)) {
    font-size: 3rem;
  }
  
  @media (min-width: map-get($grid-breakpoints, lg)) {
    font-size: 4rem;
  }
}
```

## 常見錯誤與解決方案

### 問題：按鈕文字顏色不正確

```scss
// ❌ 問題代碼
$primary: #ff6b35;
// 按鈕文字可能不易閱讀

// ✅ 解決方案
$primary: #ff6b35;
$primary-rgb: to-rgb($primary);

// 自動計算適當的文字顏色
.btn-primary {
  color: color-contrast($primary);
}
```

### 問題：Bootstrap Grid 使用錯誤

```html
<!-- ❌ 錯誤 -->
<div class="col-12 col-md-6 col-lg-4">
  <div class="row">
    <div class="col-6">內容</div>
  </div>
</div>

<!-- ✅ 正確 -->
<div class="col-12 col-md-6 col-lg-4">
  <div class="row">
    <div class="col-6">內容</div>
    <div class="col-6">內容</div>
  </div>
</div>
```

### 問題：Utility Classes 濫用

```html
<!-- ❌ 過度使用 -->
<div class="d-flex justify-content-center align-items-center flex-column bg-primary text-white p-4 mb-3 rounded shadow">

<!-- ✅ 建議創建組件 -->
<div class="c-info-card c-info-card--primary">
```

## 程式碼品質檢查

### 自動檢查清單
- [ ] 使用 Bootstrap 5.3+ 變數系統
- [ ] SCSS 編譯無錯誤或警告
- [ ] 遵循 BEM 命名規範
- [ ] 響應式設計在所有斷點正常運作
- [ ] 深色模式支援正確
- [ ] 無多餘的 `!important` 使用
- [ ] CSS 選擇器特異性合理
- [ ] 程式碼格式化一致

### 手動檢查清單
- [ ] 設計稿還原度高
- [ ] 瀏覽器相容性良好
- [ ] 無障礙設計符合 a11y 標準
- [ ] 效能表現良好（CSS 檔案大小合理）
- [ ] 維護性良好（程式碼易讀易改）

## 工具建議

### 必要工具
- **Sass/SCSS 編譯器** - 處理 SCSS 檔案
- **Autoprefixer** - 自動添加瀏覽器前綴
- **CSSnano** - CSS 壓縮優化

### 推薦工具
- **Stylelint** - CSS/SCSS 語法檢查
- **Prettier** - 程式碼格式化
- **Browser Sync** - 即時預覽

### 編輯器設定
```json
// .vscode/settings.json
{
  "css.validate": false,
  "scss.validate": false,
  "stylelint.enable": true,
  "editor.formatOnSave": true
}
```

## 效能最佳化

### CSS 載入優化
```html
<!-- 關鍵 CSS 內聯 -->
<style>
  /* 首屏關鍵樣式 */
</style>

<!-- 非關鍵 CSS 延遲載入 -->
<link rel="preload" href="style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### SCSS 編譯優化
```scss
// 只載入需要的 Bootstrap 組件
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";

// 只載入使用的組件
@import "bootstrap/scss/grid";
@import "bootstrap/scss/buttons";
@import "bootstrap/scss/navbar";
// 不載入未使用的組件
```

---

*遵循這些 CSS/SCSS 規範能確保程式碼的品質、維護性和團隊協作效率* 