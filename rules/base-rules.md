# 前端開發規範 - Cursor Rules

## 基本原則

### 編程語言和技術棧

- **CSS 框架**: 統一使用 Bootstrap 5.3+ 作為基礎框架
- **CSS 預處理器**: 使用 SCSS 編寫所有自訂樣式
- **JavaScript**: 使用 ES2020+ 語法特性，優先使用現代瀏覽器原生 API
- **HTML**: 使用語意化 HTML5 標籤
- **響應式設計**: 採用 Mobile First 策略

### 程式碼風格

- 使用早期返回模式提高程式碼可讀性
- 事件處理函數以 `handle` 前綴命名 (如: `handleClick`, `handleSubmit`)
- 簡潔性和可讀性優先於效能優化
- 完全實現所有請求的功能並徹底驗證

### 無障礙設計

- 所有互動元素必須支援鍵盤導航
- 適當使用 ARIA 屬性和語意標籤
- 提供適當的 alt 文字和螢幕閱讀器支援
- 符合 WCAG 2.1 AA 標準

## CSS/SCSS 規範

### 必須遵循

- 修改 Bootstrap 變數而非直接覆蓋樣式
- 遵循 BEM 命名規範或 OOCSS 命名風格
- 使用 CSS 自訂屬性 (CSS Variables)
- 避免使用 `!important` 除非絕對必要

### SCSS 結構

```scss
// 1. Bootstrap 變數覆蓋
@import 'variables';

// 2. Bootstrap 函式和 mixins
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

// 3. 自訂 mixins
@import 'mixins';

// 4. Bootstrap 組件
@import 'bootstrap/scss/bootstrap';

// 5. 自訂組件
@import 'components/*';
```

### BEM 命名規範

- **Components**: `.c-component-name`
- **Layout**: `.l-layout-name`
- **Helpers**: `.h-helper-name`
- **State**: `.is-state-name`
- **JavaScript hooks**: `.js-hook-name`

## JavaScript 規範

### 必須遵循

- 使用 `const` 和 `let`，避免 `var`
- 優先使用箭頭函數
- 使用模板字面量而非字符串拼接
- 實作適當的錯誤處理
- 避免全域變數污染

### 事件處理

```javascript
// ✅ 正確命名
const handleButtonClick = event => {
  event.preventDefault();
  // 處理邏輯
};

// ✅ 事件委派
document.addEventListener('click', event => {
  if (event.target.matches('.js-toggle')) {
    handleToggle(event);
  }
});
```

### 模組化開發

```javascript
// ✅ ES6 模組
export class ComponentManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // 事件綁定
  }
}
```

## HTML 規範

### 語意化標籤

```html
<!-- ✅ 正確結構 -->
<main id="main-content">
  <article>
    <header>
      <h1>文章標題</h1>
      <time datetime="2024-01-01">發布日期</time>
    </header>
    <section>
      <h2>章節標題</h2>
      <p>內容段落</p>
    </section>
  </article>
</main>
```

### 無障礙屬性

```html
<!-- ✅ 適當的 ARIA 屬性 -->
<button type="button" aria-expanded="false" aria-controls="menu" aria-label="切換選單">選單</button>

<nav aria-label="主導航">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/">首頁</a>
    </li>
  </ul>
</nav>
```

## 套件選用規範

### 推薦套件

- **輪播**: Swiper
- **燈箱**: Fslightbox
- **彈窗**: SweetAlert (v1)
- **日期選擇**: Flatpickr
- **下拉選單**: TomSelect
- **動畫**: AOS (Animate On Scroll)
- **編輯器**: TinyMCE
- **拖拉排序**: SortableJS
- **AJAX**: Axios

### 套件使用原則

- 指定特定版本號避免自動更新
- 實作套件載入失敗的回退方案
- 條件式載入以優化效能
- 統一使用相同類型功能的套件

## 專案結構規範

### 標準檔案結構

```
project/
├── assets/
│   ├── css/
│   │   ├── scss/
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   └── components/
│   │   └── style.css
│   ├── js/
│   │   ├── modules/
│   │   ├── pages/
│   │   └── main.js
│   └── images/
├── components/
├── pages/
└── docs/
```

## 效能最佳化

### 圖片優化

```html
<!-- ✅ 響應式圖片 -->
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="描述" loading="lazy" />
</picture>
```

### 資源載入

```html
<!-- ✅ 關鍵資源預載 -->
<link rel="preload" href="fonts/main.woff2" as="font" type="font/woff2" crossorigin />

<!-- ✅ 非關鍵 CSS 延遲載入 -->
<link
  rel="preload"
  href="non-critical.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>

<!-- ✅ JavaScript 延遲載入 -->
<script src="main.js" defer></script>
```

## 程式碼品質要求

### 自動檢查項目

- HTML 語法驗證
- CSS/SCSS 語法檢查
- JavaScript ESLint 檢查
- 無障礙性檢查 (pa11y)
- 效能檢查 (Lighthouse)

### 手動檢查項目

- 跨瀏覽器相容性
- 響應式設計測試
- 鍵盤導航測試
- 螢幕閱讀器測試
- 載入效能驗證

## Git Commit 規範

使用英文進行 commit，遵循以下格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

- `feat`: 新功能
- `fix`: 錯誤修復
- `docs`: 文檔變更
- `style`: 代碼格式變更
- `refactor`: 代碼重構
- `test`: 測試相關
- `chore`: 建置工具或輔助工具變更

### 範例

```
feat(navigation): add mobile menu toggle functionality

- Implement hamburger menu for mobile devices
- Add keyboard navigation support
- Update ARIA attributes for accessibility

Fixes #123
```

## 回應規範

### 使用繁體中文回應

- 預設使用台灣常用的正體中文或繁體中文
- 不使用簡體中文
- 提供最新且可靠的資訊

### 回應格式

- 提供具體的程式碼範例
- 說明正確和錯誤的做法對比
- 包含相關的無障礙考量
- 提供效能優化建議

### 問題解決方式

- 分析問題根本原因
- 提供多種解決方案
- 說明各方案的優缺點
- 給出最佳實踐建議

當收到編程相關問題時，請：

1. **分析需求**：理解使用者的具體需求和技術背景
2. **提供解決方案**：給出符合規範的完整程式碼實作
3. **解釋原理**：說明為什麼這樣做是最佳實踐
4. **考慮無障礙**：確保方案符合 a11y 標準
5. **效能考量**：提及效能優化的可能性
6. **提供替代方案**：如果有多種實作方式，說明各自優缺點

記住：簡潔性和程式碼可讀性高於效能，完全實現所有請求的功能，徹底驗證最終結果。
