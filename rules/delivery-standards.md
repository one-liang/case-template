# 專案交付規範

## 核心原則

### 必須遵循 (MUST)
- 使用 Bootstrap 5.3+ 作為基礎框架
- 採用 SCSS 作為 CSS 預處理器
- JavaScript 使用 ES2020+ 語法
- 遵循響應式設計原則
- 實作無障礙設計 (a11y)

### 禁止 (MUST NOT)
- 使用過時的前端框架或語法
- 忽略行動裝置適配
- 缺少無障礙設計考量
- 提供無組織的程式碼結構
- 忽略效能優化

### 建議 (SHOULD)
- 使用靜態網站產生器 (SSG)
- 採用漸進式增強策略
- 實作適當的 SEO 優化
- 提供完整的文檔說明
- 考慮維護性和擴展性

## 技術標準要求

### 🎨 前端技術棧

#### 必要技術
```yaml
CSS框架: Bootstrap 5.3+
CSS預處理: SCSS/Sass
JavaScript: ES2020+ (原生JS優先)
瀏覽器支援: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
響應式設計: Mobile First 策略
```

#### 推薦技術
```yaml
建置工具: Vite, Webpack, 或 Parcel
版本控制: Git
套件管理: npm 或 yarn
靜態生成: Astro, Nuxt, Next.js, 或 VitePress
圖片優化: WebP, AVIF 格式支援
```

### 📁 專案結構要求

#### ✅ 標準檔案結構

```
project-name/
├── assets/                 # 靜態資源
│   ├── css/
│   │   ├── scss/           # SCSS 源碼
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── components/
│   │   │   └── pages/
│   │   └── style.css       # 編譯後 CSS
│   ├── js/
│   │   ├── modules/        # 功能模組
│   │   ├── pages/         # 頁面特定腳本
│   │   ├── vendor/        # 第三方套件
│   │   └── main.js        # 主要腳本
│   └── images/
│       ├── src/           # 原始圖片
│       └── optimized/     # 優化後圖片
├── components/            # 可重用組件 (如使用 SSG)
├── pages/                # 頁面檔案
├── layouts/              # 版面模板
├── public/               # 公開資源
├── docs/                 # 專案文檔
│   ├── README.md
│   ├── SETUP.md
│   └── DEPLOYMENT.md
├── package.json
├── .gitignore
├── .editorconfig
└── vite.config.js        # 或其他建置工具配置
```

#### ❌ 避免的結構

```
project-name/
├── css/
│   └── all.min.css       # 所有樣式混在一起
├── js/
│   └── script.js         # 所有功能混在一起
└── index.html            # 缺少組織結構
```

### 開發階段與生產階段的檔案
- 開發階段用 html or vue, scss, bootstrap 5.3+, javascript 來開發
- 開發階段有共用的區塊可以用組件方式不重複
- 最後生產階段用 html, css, javascript 沒有壓縮過的版本，圖片也是

## 四步驟製作流程

### 📋 Step 1: Design System 建立

#### 必要建立項目
```scss
// 1. 色彩系統
$primary: #your-brand-color;
$secondary: #your-secondary-color;
$theme-colors: (
  "primary": $primary,
  "secondary": $secondary,
  "brand": #custom-brand-color
);

// 2. 字體系統
$font-family-base: "Your-Font", -apple-system, BlinkMacSystemFont, sans-serif;
$h1-font-size: 2.5rem;
$h2-font-size: 2rem;

// 3. 間距系統
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,
  2: $spacer * 0.5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3
);

// 4. 斷點系統
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

#### 組件庫建立
```html
<!-- 按鈕組件 -->
<button class="btn btn-primary">主要按鈕</button>
<button class="btn btn-secondary">次要按鈕</button>
<button class="btn btn-outline-primary">外框按鈕</button>

<!-- 卡片組件 -->
<div class="card">
  <div class="card-header">標題</div>
  <div class="card-body">內容</div>
  <div class="card-footer">底部</div>
</div>

<!-- 表單組件 -->
<div class="mb-3">
  <label for="email" class="form-label">電子郵件</label>
  <input type="email" class="form-control" id="email" required>
  <div class="invalid-feedback">請輸入有效的電子郵件</div>
</div>
```

### 🏠 Step 2: 首頁製作

#### 首頁必要區塊
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="網站描述，限制在 160 字元內">
  <title>首頁標題 - 網站名稱</title>
  
  <!-- SEO 優化 -->
  <meta property="og:title" content="首頁標題">
  <meta property="og:description" content="網站描述">
  <meta property="og:image" content="/images/og-image.jpg">
  
  <!-- 樣式 -->
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <!-- 跳轉連結 (無障礙) -->
  <a href="#main-content" class="visually-hidden-focusable">跳轉到主要內容</a>
  
  <!-- 導航 -->
  <nav class="navbar navbar-expand-lg">
    <!-- 導航內容 -->
  </nav>
  
  <!-- 主要內容 -->
  <main id="main-content">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1>主要標題</h1>
        <p class="lead">描述文字</p>
        <a href="#cta" class="btn btn-primary btn-lg">行動按鈕</a>
      </div>
    </section>
    
    <!-- 其他區塊 -->
  </main>
  
  <!-- 頁尾 -->
  <footer class="bg-dark text-light">
    <!-- 頁尾內容 -->
  </footer>
  
  <!-- 腳本 -->
  <script src="/assets/js/main.js"></script>
</body>
</html>
```

#### 首頁品質標準
- [ ] 載入時間 < 3 秒
- [ ] Lighthouse 分數 > 90
- [ ] 所有圖片使用 alt 屬性
- [ ] 響應式設計在所有裝置正常
- [ ] SEO 基本優化完成

### 📄 Step 3: 內頁製作

#### 內頁模板結構
```html
<!-- 內頁模板 -->
<main id="main-content">
  <!-- 頁面標題區 -->
  <section class="page-header bg-light py-5">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">首頁</a></li>
          <li class="breadcrumb-item active" aria-current="page">關於我們</li>
        </ol>
      </nav>
      <h1>關於我們</h1>
      <p class="lead">頁面描述</p>
    </div>
  </section>
  
  <!-- 內容區 -->
  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <!-- 主要內容 -->
          <article>
            <h2>內容標題</h2>
            <p>內容文字...</p>
          </article>
        </div>
        <div class="col-lg-4">
          <!-- 側邊欄 -->
          <aside>
            <div class="card">
              <div class="card-body">
                <h3>相關連結</h3>
                <!-- 側邊內容 -->
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>
</main>
```

#### 內頁必要元素
- [ ] 正確的 HTML5 語意標籤
- [ ] 適當的標題層次 (h1-h6)
- [ ] 完整的 breadcrumb 導航
- [ ] 清楚的內容結構
- [ ] 相關連結或 CTA

### 📦 Step 4: 交件準備

#### 程式碼品質檢查
```bash
# HTML 驗證
npx html-validate "**/*.html"

# CSS 語法檢查
npx stylelint "**/*.scss"

# JavaScript 語法檢查
npx eslint "**/*.js"

# 無障礙檢查
npx pa11y "http://localhost:3000"

# 效能檢查
npx lighthouse "http://localhost:3000" --output=html
```

#### 最終交件清單
- [ ] 所有頁面功能正常運作
- [ ] 響應式設計在各裝置完整測試
- [ ] 程式碼已格式化且無語法錯誤
- [ ] 圖片已優化且使用適當格式
- [ ] SEO 基本設定完成
- [ ] 無障礙設計符合 WCAG 2.1 AA 標準
- [ ] 載入效能達到標準
- [ ] 跨瀏覽器相容性測試完成

## 檔案命名規範

### ✅ 正確命名方式

```
# HTML 檔案
index.html
about.html
contact.html
product-detail.html

# CSS/SCSS 檔案
style.scss
_variables.scss
_mixins.scss
_components.scss

# JavaScript 檔案
main.js
navigation.js
form-validation.js
product-carousel.js

# 圖片檔案
hero-banner.jpg
product-image-01.jpg
icon-facebook.svg
logo-company.png
```

### ❌ 避免的命名方式

```
# 避免中文或特殊字元
關於我們.html
產品圖片.jpg

# 避免空格
about us.html
product image.jpg

# 避免不明確的命名
page1.html
img1.jpg
script.js
```

## 連結路徑規範

### ✅ 正確的連結寫法

```html
<!-- 相對路徑 (推薦) -->
<a href="about.html">關於我們</a>
<a href="products/web-design.html">網站設計</a>
<a href="../contact.html">聯絡我們</a>

<!-- 絕對路徑 (根目錄) -->
<a href="/about">關於我們</a>
<a href="/products/web-design">網站設計</a>

<!-- 資源連結 -->
<link rel="stylesheet" href="/assets/css/style.css">
<script src="/assets/js/main.js"></script>
<img src="/assets/images/logo.png" alt="公司標誌">
```

### ❌ 避免的連結寫法

```html
<!-- 避免硬編碼完整 URL -->
<a href="https://yourdomain.com/about.html">關於我們</a>

<!-- 避免錯誤的相對路徑 -->
<a href="./about.html">關於我們</a>
<a href="/folder/../about.html">關於我們</a>
```

## 效能優化要求

### 🚀 載入效能標準

```html
<!-- 圖片最佳化 -->
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="主視覺圖片" 
       width="1200" height="600"
       loading="lazy">
</picture>

<!-- 資源預載 -->
<link rel="preload" href="/assets/fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/css/critical.css" as="style">

<!-- 延遲載入非關鍵資源 -->
<link rel="preload" href="/assets/css/non-critical.css" as="style" 
      onload="this.onload=null;this.rel='stylesheet'">

<!-- JavaScript 優化載入 -->
<script src="/assets/js/critical.js"></script>
<script src="/assets/js/main.js" defer></script>
```

### 📊 效能指標要求

```yaml
Core Web Vitals:
  LCP (Largest Contentful Paint): < 2.5s
  FID (First Input Delay): < 100ms
  CLS (Cumulative Layout Shift): < 0.1

Lighthouse 分數:
  Performance: > 90
  Accessibility: > 95
  Best Practices: > 90
  SEO: > 90

其他指標:
  First Contentful Paint: < 1.8s
  Time to Interactive: < 3.8s
  Total Blocking Time: < 200ms
```

## 無障礙設計要求

### ♿ 無障礙檢查項目

```html
<!-- 語意化標籤 -->
<main role="main">
  <article>
    <header>
      <h1>文章標題</h1>
      <time datetime="2024-01-01">2024年1月1日</time>
    </header>
    <section>
      <h2>章節標題</h2>
      <p>內容段落</p>
    </section>
  </article>
</main>

<!-- ARIA 標籤 -->
<button aria-expanded="false" aria-controls="menu">選單</button>
<div id="menu" aria-hidden="true">選單內容</div>

<!-- 表單無障礙 -->
<label for="email">電子郵件 <span aria-label="必填">*</span></label>
<input type="email" id="email" aria-required="true" aria-describedby="email-help">
<div id="email-help">請輸入有效的電子郵件格式</div>

<!-- 圖片替代文字 -->
<img src="chart.png" alt="2024年銷售成長圖表，顯示第四季成長15%">
<img src="decoration.png" alt="" role="presentation">
```

### 🔍 無障礙測試工具

```bash
# 自動化測試
npx pa11y http://localhost:3000
npx axe-cli http://localhost:3000

# 手動測試
# 1. 鍵盤導航測試 (Tab, Shift+Tab, Enter, Space, Arrow keys)
# 2. 螢幕閱讀器測試 (NVDA, JAWS, VoiceOver)
# 3. 高對比度模式測試
# 4. 放大鏡功能測試 (至少 200%)
```

## 品質保證流程

### ✅ 交件前檢查清單

#### 功能檢查
- [ ] 所有連結可正常點擊
- [ ] 表單提交功能正常
- [ ] 圖片載入正常
- [ ] JavaScript 功能運作正常
- [ ] 購物車/搜尋等特殊功能運作

#### 相容性檢查
- [ ] Chrome (最新版本)
- [ ] Firefox (最新版本)
- [ ] Safari (最新版本)
- [ ] Edge (最新版本)
- [ ] 行動版瀏覽器 (iOS Safari, Android Chrome)

#### 響應式檢查
- [ ] 手機 (320px-767px)
- [ ] 平板 (768px-1023px)
- [ ] 桌機 (1024px 以上)
- [ ] 大螢幕 (1400px 以上)

#### 效能檢查
- [ ] 首頁載入時間 < 3 秒
- [ ] 圖片優化完成
- [ ] CSS/JS 檔案已壓縮
- [ ] 無多餘的請求

#### 內容檢查
- [ ] 無錯字或語法錯誤
- [ ] 所有圖片有適當 alt 文字
- [ ] 聯絡資訊正確
- [ ] 版權資訊完整

## 部署與維護

### 🚀 建議的部署方案

#### 靜態網站託管 (推薦)
```yaml
# 適合一般展示型網站
Vercel: 
  - 優點: 自動部署, CDN, 免費方案
  - 適用: Vue, 靜態網站

Netlify:
  - 優點: 表單處理, 分支預覽, 免費方案
  - 適用: JAMstack, 靜態網站

GitHub Pages:
  - 優點: 與 Git 整合, 免費
  - 適用: 開源專案, 簡單網站

Cloudflare Pages:
  - 優點: 全球 CDN, 快速, 免費方案
  - 適用: 靜態網站, 邊緣運算
```

#### 傳統主機託管
```yaml
# 適合需要後端功能的網站
VPS 主機:
  - 需要: Linux 系統知識
  - 適用: 自訂需求高的專案

共享主機:
  - 優點: 管理簡單, 成本低
  - 適用: 小型企業網站
```

### 📋 維護計畫建議

#### 定期維護項目
```yaml
每月:
  - 檢查網站功能正常
  - 更新安全套件版本
  - 備份網站資料
  - 檢查網站載入速度

每季:
  - 檢查無障礙性
  - 更新過時內容
  - 檢查 SEO 表現
  - 瀏覽器相容性測試

每年:
  - 更新前端框架版本
  - 重新評估效能
  - 檢查設計是否過時
  - 規劃功能改進
```

## 專案文檔要求

### 📖 必要文檔

#### README.md
```markdown
# 專案名稱

## 專案描述
簡短描述專案目的和主要功能

## 技術棧
- Bootstrap 5.3+
- SCSS
- JavaScript ES2020+
- [其他使用的技術]

## 安裝與執行
1. 克隆專案: `git clone [repository-url]`
2. 安裝依賴: `npm install`
3. 啟動開發伺服器: `npm run dev`
4. 建置產品版本: `npm run build`

## 專案結構
[說明主要資料夾和檔案的用途]

## 部署說明
[說明如何部署到正式環境]

## 維護聯絡
- 開發者: [姓名]
- 聯絡方式: [email]
- 最後更新: [日期]
```

#### SETUP.md
```markdown
# 環境設置指南

## 開發環境需求
- Node.js 16+
- npm 或 yarn
- Git

## 本地開發設置
[詳細的設置步驟]

## 常見問題
[開發過程中可能遇到的問題和解決方案]
```

#### DEPLOYMENT.md
```markdown
# 部署指南

## 建置步驟
[詳細的建置和部署步驟]

## 環境變數設定
[需要設定的環境變數]

## 域名和SSL設定
[域名指向和SSL憑證設定]
```

## Junior/Senior 開發建議

### 👨‍🎓 Junior 開發者指引

#### 學習重點
```yaml
第一階段 (1-3個月):
  - 熟練 HTML5 語意標籤
  - 掌握 Bootstrap 5 組件使用
  - 學會基礎 SCSS 語法
  - 了解響應式設計原理

第二階段 (3-6個月):
  - 學習 JavaScript ES6+ 語法
  - 理解無障礙設計原則
  - 掌握 Git 版本控制
  - 學習效能優化技巧

第三階段 (6-12個月):
  - 學習前端建置工具 (Vite, Webpack)
  - 了解 SSG 靜態網站生成
  - 學習進階 JavaScript 模式
  - 培養程式碼品質意識
```

#### 實作建議
- 從模仿現有設計開始
- 重視程式碼可讀性勝過效能
- 多使用註解說明程式邏輯
- 定期進行程式碼重構
- 積極尋求程式碼審查

### 👨‍💼 Senior 開發者期望

#### 責任範圍
```yaml
技術領導:
  - 制定技術規範和最佳實踐
  - 進行程式碼審查和指導
  - 選擇適當的技術棧
  - 解決複雜的技術問題

專案管理:
  - 評估專案時程和資源
  - 與客戶溝通技術需求
  - 確保專案品質標準
  - 規劃長期維護策略

知識分享:
  - 培訓 Junior 開發者
  - 撰寫技術文檔
  - 分享最新技術趨勢
  - 建立團隊開發流程
```

#### 進階技能期望
- 具備全端開發能力
- 熟悉 DevOps 和部署流程
- 了解使用者體驗設計
- 具備專案架構設計能力
- 能夠進行技術選型決策

---

*遵循這些交付規範能確保專案品質一致且符合業界標準* 