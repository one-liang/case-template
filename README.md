# case-template

## 專案描述

靜態切版專用打包工具 - 基於 Bootstrap 5.3+ 和現代前端技術的高品質靜態網站開發框架。

## 技術棧

- **CSS 框架**: Bootstrap 5.3+
- **CSS 預處理器**: SCSS/Sass
- **JavaScript**: ES2020+ (原生 JavaScript)
- **HTML**: 語意化 HTML5
- **響應式設計**: Mobile First 策略
- **無障礙設計**: WCAG 2.1 AA 標準

## 推薦套件

本專案採用精選的第三方套件以提供最佳的開發體驗：

- **輪播**: Swiper
- **燈箱**: Fslightbox
- **彈窗**: SweetAlert (v1)
- **日期選擇**: Flatpickr
- **下拉選單**: TomSelect
- **動畫**: AOS (Animate On Scroll)
- **編輯器**: TinyMCE
- **拖拉排序**: SortableJS
- **AJAX**: Axios

## 專案結構

```
case-template/
├── assets/
│   ├── css/
│   │   ├── scss/
│   │   │   ├── _variables.scss      # Bootstrap 變數覆蓋
│   │   │   ├── _mixins.scss         # 自訂 mixins
│   │   │   ├── style.scss           # 主要樣式檔案
│   │   │   ├── components/          # 組件樣式
│   │   │   │   ├── _buttons.scss
│   │   │   │   ├── _cards.scss
│   │   │   │   ├── _navigation.scss
│   │   │   │   ├── _forms.scss
│   │   │   │   ├── _hero.scss
│   │   │   │   └── _footer.scss
│   │   │   └── pages/               # 頁面特定樣式
│   │   │       ├── _home.scss
│   │   │       ├── _about.scss
│   │   │       └── _contact.scss
│   │   └── style.css                # 編譯後的 CSS
│   ├── js/
│   │   ├── modules/                 # 功能模組
│   │   ├── pages/                   # 頁面特定腳本
│   │   ├── vendor/                  # 第三方套件
│   │   └── main.js                  # 主要 JavaScript 檔案
│   └── images/
│       ├── src/                     # 原始圖片
│       └── optimized/               # 優化後圖片
├── components/                      # 可重用組件
├── pages/                           # 頁面檔案
├── layouts/                         # 版面模板
├── public/                          # 公開資源
├── docs/                            # 專案文檔
├── rules/                           # 開發規範
│   ├── base-rules.md
│   ├── css-rules.md
│   ├── javascript-rules.md
│   ├── package-selection.md
│   ├── delivery-standards.md
│   └── navigation-components.md
└── CLAUDE.md                        # Claude Code 規範
```

## 開發指南

### 先閱讀重要文件

1. **CLAUDE.md** - 包含 Claude Code 的重要規則和開發規範
2. **rules/** 目錄 - 詳細的前端開發規範和標準

### 核心原則

- **始終先搜尋** 再建立新檔案
- **擴展現有** 功能而不是重複建立
- **使用任務代理** 用於 >30 秒的操作
- **所有功能的單一真實來源**
- **遵循 BEM 命名規範**
- **符合 WCAG 2.1 AA 無障礙標準**

### 開發工作流程

1. **Design System 建立** - 設定色彩、字體、間距系統
2. **組件開發** - 建立可重用的 UI 組件
3. **頁面實作** - 基於組件系統建立頁面
4. **測試驗證** - 確保跨瀏覽器相容性和無障礙性
5. **效能優化** - 圖片優化、程式碼壓縮
6. **品質檢查** - 符合 Lighthouse 和 WCAG 標準

## 安裝與執行

### 環境需求

- Node.js 16+
- npm 或 yarn
- Git

### 開發設定

```bash
# 克隆專案
git clone https://github.com/one-liang/case-template.git

# 進入專案目錄
cd case-template

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build
```

### 常用指令

```bash
# 開發模式
npm run dev

# 生產建置
npm run build

# 程式碼檢查
npm run lint

# 格式化程式碼
npm run format

# 測試
npm run test

# 預覽生產版本
npm run preview
```

## 品質標準

### 效能指標

- 載入時間 < 3 秒
- Lighthouse Performance > 90
- First Contentful Paint < 1.8s
- Time to Interactive < 3.8s

### 無障礙標準

- WCAG 2.1 AA 合規
- 鍵盤導航支援
- 螢幕閱讀器相容
- 適當的 ARIA 屬性

### 瀏覽器支援

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 部署

### 推薦部署方案

- **Vercel** - 自動部署，全球 CDN
- **Netlify** - 表單處理，分支預覽
- **GitHub Pages** - 免費靜態託管
- **Cloudflare Pages** - 高效能全球分發

### 部署步驟

1. 建置生產版本：`npm run build`
2. 上傳 `dist/` 目錄到託管服務
3. 設定自訂域名（可選）
4. 設定 SSL 憑證

## 維護與更新

### 定期維護

- 每月檢查套件更新
- 季度效能評估
- 年度技術棧檢視

### 更新程序

1. 備份現有版本
2. 更新依賴套件
3. 測試所有功能
4. 部署到正式環境

## 貢獻指南

### 開發規範

- 遵循 CLAUDE.md 中的規則
- 提交前進行程式碼檢查
- 使用英文進行 commit 訊息
- 每個功能建立獨立分支

### Commit 規範

```
<type>(<scope>): <subject>

<body>

<footer>
```

類型：

- `feat`: 新功能
- `fix`: 錯誤修復
- `docs`: 文檔變更
- `style`: 代碼格式變更
- `refactor`: 代碼重構
- `test`: 測試相關
- `chore`: 建置工具變更

## 聯絡資訊

- **開發者**: Claude Code
- **專案**: case-template
- **GitHub**: https://github.com/one-liang/case-template
- **最後更新**: 2025-01-08

## 授權

本專案採用 MIT 授權條款。

---

_本專案遵循現代前端開發最佳實踐，致力於提供高品質、可維護的靜態網站開發解決方案。_
