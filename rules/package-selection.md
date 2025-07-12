# 前端套件選用規範

## 核心原則

### 必須遵循 (MUST)

- 同類型功能統一使用相同套件
- 優先選擇有活躍社群支援的套件
- 考慮檔案大小和執行效率
- 確保跨瀏覽器相容性
- 選擇文檔完整的套件

### 禁止 (MUST NOT)

- 使用過時或已停止維護的套件
- 同時引入功能重複的套件
- 使用檔案過大且功能單一的套件
- 引入有安全漏洞的套件版本

### 建議 (SHOULD)

- 使用 CDN 進行開發，本地化用於正式環境
- 指定特定版本避免自動更新問題
- 使用 defer 或 async 屬性優化載入
- 實作套件載入失敗的回退方案

## 推薦套件清單

### 🎠 輪播/橫幅套件

#### 主要推薦：Swiper

```html
<!-- CDN 引入 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

```javascript
// ✅ 正確使用方式
const swiper = new Swiper('.swiper', {
  // 基本設定
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },

  // 分頁
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // 導航
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  // 響應式設定
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
});
```

**使用場景：**

- 主視覺輪播
- 產品展示輪播
- 圖片畫廊
- 響應式滑塊

### 🖼️ 燈箱/圖片檢視套件

#### 主要推薦：Fslightbox

```html
<!-- CDN 引入 -->
<script src="https://cdn.jsdelivr.net/npm/fslightbox@3.4.1/index.js"></script>
```

```javascript
// ✅ 基本使用
// HTML 中直接使用 data 屬性
// <a data-fslightbox="gallery" href="image1.jpg">
//   <img src="thumb1.jpg" alt="圖片 1">
// </a>

// 進階程式化控制
const lightbox = new FsLightbox();
lightbox.props.sources = ['image1.jpg', 'image2.jpg', 'https://www.youtube.com/watch?v=VIDEO_ID'];
lightbox.open();
```

**使用場景：**

- 圖片畫廊
- 產品詳細檢視
- 影片播放
- 文檔預覽

### ⚠️ 彈窗/提示套件

#### 主要推薦：SweetAlert (v1)

```html
<!-- 重要：使用第一版，不要使用 SweetAlert2 -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
```

```javascript
// ✅ 基本提示
swal('成功', '操作已完成！', 'success');

// ✅ 確認對話框
swal({
  title: '確定要刪除嗎？',
  text: '刪除後將無法復原！',
  icon: 'warning',
  buttons: ['取消', '確定'],
  dangerMode: true
}).then(willDelete => {
  if (willDelete) {
    swal('已刪除！', '資料已成功刪除', 'success');
  }
});

// ✅ 輸入框
swal('請輸入您的姓名:', {
  content: 'input'
}).then(value => {
  if (value) {
    swal(`您好，${value}！`);
  }
});
```

**使用場景：**

- 操作確認
- 成功/錯誤訊息
- 簡單輸入表單
- 警告提示

### 📅 日期選擇器套件

#### 主要推薦：Flatpickr

```html
<!-- CDN 引入 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
```

```javascript
// ✅ 基本日期選擇器
flatpickr('#datePicker', {
  dateFormat: 'Y-m-d',
  locale: 'zh_tw',
  defaultDate: 'today',
  minDate: 'today'
});

// ✅ 日期時間選擇器
flatpickr('#dateTimePicker', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true
});

// ✅ 日期範圍選擇器
flatpickr('#dateRangePicker', {
  mode: 'range',
  dateFormat: 'Y-m-d',
  minDate: 'today',
  maxDate: new Date().fp_incr(90) // 90天後
});
```

**使用場景：**

- 表單日期輸入
- 預訂系統
- 活動日期選擇
- 報表日期範圍

### 📋 下拉選單美化套件

#### 主要推薦：TomSelect

```html
<!-- CDN 引入 -->
<link
  href="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/css/tom-select.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/js/tom-select.complete.min.js"></script>
```

```javascript
// ✅ 基本下拉選單
new TomSelect('#select-country', {
  create: false,
  sortField: {
    field: 'text',
    direction: 'asc'
  }
});

// ✅ 多選下拉選單
new TomSelect('#select-tags', {
  plugins: ['remove_button'],
  create: true,
  persist: false,
  createOnBlur: true,
  placeholder: '選擇或輸入標籤...'
});

// ✅ AJAX 動態載入
new TomSelect('#select-users', {
  valueField: 'id',
  labelField: 'name',
  searchField: 'name',
  placeholder: '搜尋用戶...',
  load: function (query, callback) {
    if (!query.length) return callback();

    fetch(`/api/users/search?q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => callback(data))
      .catch(() => callback());
  }
});
```

**使用場景：**

- 單選/多選下拉
- 標籤輸入
- 搜尋式選單
- 動態載入選項

### ✨ 動畫特效套件

#### 主要推薦：AOS (Animate On Scroll)

```html
<!-- CDN 引入 -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
```

```javascript
// ✅ 初始化 AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false,
  offset: 120
});

// HTML 中使用
// <div data-aos="fade-up">淡入向上</div>
// <div data-aos="fade-down" data-aos-delay="100">淡入向下</div>
// <div data-aos="zoom-in" data-aos-duration="1000">縮放進入</div>
```

#### 替代方案：WOW.js + Animate.css

```html
<!-- 如果 AOS 無法滿足需求時使用 -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
```

```javascript
// ✅ WOW.js 初始化
new WOW({
  boxClass: 'wow',
  animateClass: 'animate__animated',
  offset: 0,
  mobile: true,
  live: true
}).init();

// HTML 中使用
// <div class="wow animate__fadeInUp">動畫內容</div>
```

**使用場景：**

- 滾動觸發動畫
- 元素進場效果
- 頁面載入動畫
- 使用者互動回饋

### 📝 富文本編輯器套件

#### 主要推薦：TinyMCE

```html
<!-- CDN 引入 (需要 API Key) -->
<script src="https://cdn.tiny.cloud/1/YOUR_API_KEY/tinymce/6/tinymce.min.js"></script>
```

```javascript
// ✅ TinyMCE 初始化
tinymce.init({
  selector: '#editor',
  height: 500,
  menubar: false,
  language: 'zh_TW',
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'help',
    'wordcount'
  ],
  toolbar:
    'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style:
    'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; }'
});
```

**使用場景：**

- 內容管理系統
- 部落格編輯器
- 文章撰寫
- 郵件編輯

### 🔄 拖拉排序套件

#### 主要推薦：SortableJS

```html
<!-- CDN 引入 -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
```

```javascript
// ✅ 基本排序
const sortable = Sortable.create(document.getElementById('sortable-list'), {
  animation: 150,
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag',

  // 事件處理
  onEnd: function (evt) {
    console.log('項目從位置', evt.oldIndex, '移動到位置', evt.newIndex);
    // 更新後端數據
    updateSortOrder(evt.oldIndex, evt.newIndex);
  }
});

// ✅ 多列表排序
Sortable.create(document.getElementById('list1'), {
  group: 'shared',
  animation: 150
});

Sortable.create(document.getElementById('list2'), {
  group: 'shared',
  animation: 150
});
```

**使用場景：**

- 清單項目排序
- 看板系統
- 圖片排序
- 選單項目管理

### 🌐 AJAX 請求套件

#### 主要推薦：Axios

```html
<!-- CDN 引入 -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

```javascript
// ✅ 基本配置
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ 請求攔截器
apiClient.interceptors.request.use(
  config => {
    // 添加認證 token
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// ✅ 回應攔截器
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 處理未授權錯誤
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

// ✅ API 調用範例
const fetchUserData = async userId => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('獲取用戶數據失敗:', error);
    throw error;
  }
};

const createUser = async userData => {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('創建用戶失敗:', error);
    throw error;
  }
};
```

**使用場景：**

- API 資料請求
- 表單提交
- 檔案上傳
- 即時資料更新

## 套件管理最佳實踐

### ✅ 版本控制策略

```html
<!-- 指定特定版本，避免自動更新造成問題 -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11.0.5/swiper-bundle.min.js"></script>

<!-- 避免使用 latest 標籤 -->
<!-- ❌ <script src="https://cdn.jsdelivr.net/npm/swiper@latest/swiper-bundle.min.js"></script> -->
```

### ✅ 效能優化

```html
<!-- 使用 defer 延遲載入非關鍵腳本 -->
<script src="vendor/swiper.min.js" defer></script>

<!-- 預載重要資源 -->
<link rel="preload" href="vendor/swiper.css" as="style" />
<link rel="preload" href="vendor/swiper.js" as="script" />

<!-- 關鍵 CSS 優先載入 -->
<link rel="stylesheet" href="critical.css" />
<link
  rel="preload"
  href="non-critical.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

### ✅ 回退方案

```javascript
// 檢查套件是否載入成功
const checkLibraryAndFallback = (libraryName, fallbackUrl, callback) => {
  if (typeof window[libraryName] === 'undefined') {
    console.warn(`${libraryName} 套件載入失敗，載入備用版本`);

    const script = document.createElement('script');
    script.src = fallbackUrl;
    script.onload = callback;
    script.onerror = () => {
      console.error(`${libraryName} 備用版本載入失敗`);
    };
    document.head.appendChild(script);
  } else {
    callback();
  }
};

// 使用範例
checkLibraryAndFallback('Swiper', '/local/swiper.min.js', () => {
  // 初始化 Swiper
  new Swiper('.swiper', {
    /* 配置 */
  });
});
```

### ✅ 條件載入

```javascript
// 根據需要動態載入套件
const loadLibraryIfNeeded = async (condition, libUrl, libName) => {
  if (condition && typeof window[libName] === 'undefined') {
    try {
      await loadScript(libUrl);
      console.log(`${libName} 載入成功`);
    } catch (error) {
      console.error(`${libName} 載入失敗:`, error);
    }
  }
};

const loadScript = url => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// 使用範例
document.addEventListener('DOMContentLoaded', async () => {
  // 只在有輪播元素時載入 Swiper
  const hasCarousel = document.querySelector('.swiper');
  await loadLibraryIfNeeded(
    hasCarousel,
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
    'Swiper'
  );

  // 只在有日期輸入時載入 Flatpickr
  const hasDatePicker = document.querySelector('[data-flatpickr]');
  await loadLibraryIfNeeded(hasDatePicker, 'https://cdn.jsdelivr.net/npm/flatpickr', 'flatpickr');

  // 初始化所有組件
  initializeComponents();
});
```

## 套件整合範例

### ✅ 完整整合示例

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>套件整合範例</title>

    <!-- CSS 套件 -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/css/tom-select.css"
    />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />

    <!-- 自訂樣式 -->
    <link rel="stylesheet" href="assets/css/style.css" />
  </head>
  <body>
    <!-- 頁面內容 -->

    <!-- JavaScript 套件 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/js/tom-select.complete.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/fslightbox@3.4.1/index.js"></script>

    <!-- 自訂腳本 -->
    <script src="assets/js/main.js"></script>
  </body>
</html>
```

```javascript
// assets/js/main.js
class ComponentManager {
  constructor() {
    this.components = [];
  }

  async init() {
    try {
      // 初始化各種組件
      this.initSwiper();
      this.initFlatpickr();
      this.initTomSelect();
      this.initAOS();
      this.initSortable();
      this.setupEventHandlers();

      console.log('所有組件初始化完成');
    } catch (error) {
      console.error('組件初始化失敗:', error);
    }
  }

  initSwiper() {
    const swiperElements = document.querySelectorAll('.swiper');
    swiperElements.forEach(element => {
      const swiper = new Swiper(element, {
        loop: true,
        autoplay: { delay: 3000 },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
      this.components.push(swiper);
    });
  }

  initFlatpickr() {
    const dateInputs = document.querySelectorAll('[data-flatpickr]');
    dateInputs.forEach(input => {
      const config = JSON.parse(input.dataset.flatpickr || '{}');
      const fp = flatpickr(input, {
        dateFormat: 'Y-m-d',
        locale: 'zh_tw',
        ...config
      });
      this.components.push(fp);
    });
  }

  initTomSelect() {
    const selectElements = document.querySelectorAll('[data-tom-select]');
    selectElements.forEach(select => {
      const config = JSON.parse(select.dataset.tomSelect || '{}');
      const ts = new TomSelect(select, {
        create: false,
        ...config
      });
      this.components.push(ts);
    });
  }

  initAOS() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  initSortable() {
    const sortableElements = document.querySelectorAll('[data-sortable]');
    sortableElements.forEach(element => {
      const sortable = Sortable.create(element, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: evt => {
          console.log('排序變更:', evt.oldIndex, '->', evt.newIndex);
        }
      });
      this.components.push(sortable);
    });
  }

  setupEventHandlers() {
    // 統一事件處理
    document.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    const target = event.target;

    // SweetAlert 提示
    if (target.matches('[data-swal]')) {
      event.preventDefault();
      const config = JSON.parse(target.dataset.swal);
      swal(config);
    }

    // AJAX 請求
    if (target.matches('[data-ajax]')) {
      event.preventDefault();
      this.handleAjaxClick(target);
    }
  }

  async handleAjaxClick(element) {
    const url = element.dataset.url;
    const method = element.dataset.method || 'GET';

    try {
      const response = await axios({ method, url });
      swal('成功', '操作完成', 'success');
    } catch (error) {
      swal('錯誤', '操作失敗', 'error');
    }
  }

  destroy() {
    // 清理所有組件
    this.components.forEach(component => {
      if (component.destroy) {
        component.destroy();
      }
    });
    this.components = [];
  }
}

// 初始化應用程式
document.addEventListener('DOMContentLoaded', () => {
  const manager = new ComponentManager();
  manager.init();

  // 將管理器暴露到全域作用域供調試使用
  window.componentManager = manager;
});
```

## 程式碼品質檢查

### 套件使用檢查清單

- [ ] 使用推薦的官方套件版本
- [ ] 指定特定版本號避免自動更新
- [ ] 實作套件載入失敗的回退方案
- [ ] 使用適當的載入策略（defer/async）
- [ ] 避免功能重複的套件
- [ ] 套件初始化錯誤處理完整
- [ ] 適當的套件生命週期管理
- [ ] 效能監控和優化

---

_遵循這些套件選用規範能確保專案的穩定性、效能和維護性_
