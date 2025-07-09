// 工具函數庫 - 使用 ES2020+ 語法
// 提供各種通用的輔助函數

/**
 * 防抖函數 - 延遲執行函數直到停止調用
 * @param {Function} func - 要執行的函數
 * @param {number} wait - 延遲時間（毫秒）
 * @param {boolean} immediate - 是否立即執行
 * @returns {Function} 防抖後的函數
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

/**
 * 節流函數 - 限制函數執行頻率
 * @param {Function} func - 要執行的函數
 * @param {number} limit - 時間間隔（毫秒）
 * @returns {Function} 節流後的函數
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * 深拷貝對象
 * @param {any} obj - 要拷貝的對象
 * @returns {any} 拷貝後的對象
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * 格式化數字為千分位
 * @param {number} num - 要格式化的數字
 * @param {string} separator - 分隔符
 * @returns {string} 格式化後的字串
 */
export const formatNumber = (num, separator = ',') => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

/**
 * 格式化日期
 * @param {Date|string} date - 日期對象或字串
 * @param {string} format - 格式字串
 * @returns {string} 格式化後的日期
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * 獲取 URL 查詢參數
 * @param {string} param - 參數名稱
 * @param {string} url - URL（可選，預設為當前 URL）
 * @returns {string|null} 參數值
 */
export const getURLParam = (param, url = window.location.href) => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(param);
};

/**
 * 設置 URL 查詢參數
 * @param {string} param - 參數名稱
 * @param {string} value - 參數值
 * @param {boolean} pushState - 是否更新瀏覽器歷史
 */
export const setURLParam = (param, value, pushState = true) => {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  
  if (pushState) {
    window.history.pushState({}, '', url);
  } else {
    window.history.replaceState({}, '', url);
  }
};

/**
 * 生成隨機 ID
 * @param {number} length - ID 長度
 * @returns {string} 隨機 ID
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substr(2, length);
};

/**
 * 檢查元素是否在視窗內
 * @param {Element} element - DOM 元素
 * @param {number} threshold - 閾值（0-1）
 * @returns {boolean} 是否在視窗內
 */
export const isElementInViewport = (element, threshold = 0) => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const vertInView = (rect.top <= windowHeight * (1 - threshold)) && 
                     ((rect.top + rect.height) >= windowHeight * threshold);
  const horInView = (rect.left <= windowWidth * (1 - threshold)) && 
                    ((rect.left + rect.width) >= windowWidth * threshold);
  
  return vertInView && horInView;
};

/**
 * 平滑滾動到元素
 * @param {Element|string} target - 目標元素或選擇器
 * @param {number} offset - 偏移量
 * @param {number} duration - 動畫時長
 */
export const scrollToElement = (target, offset = 0, duration = 800) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  
  const targetPosition = element.offsetTop + offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();
  
  const easeInOutQuart = t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  
  const animation = currentTime => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuart(progress);
    
    window.scrollTo(0, startPosition + distance * ease);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };
  
  requestAnimationFrame(animation);
};

/**
 * 載入外部腳本
 * @param {string} src - 腳本 URL
 * @param {object} options - 載入選項
 * @returns {Promise} 載入結果
 */
export const loadScript = (src, options = {}) => {
  return new Promise((resolve, reject) => {
    // 檢查是否已載入
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.async = options.async !== false;
    script.defer = options.defer || false;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    document.head.appendChild(script);
  });
};

/**
 * 載入外部樣式表
 * @param {string} href - 樣式表 URL
 * @returns {Promise} 載入結果
 */
export const loadStylesheet = (href) => {
  return new Promise((resolve, reject) => {
    // 檢查是否已載入
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
    
    document.head.appendChild(link);
  });
};

/**
 * 檢查設備類型
 * @returns {object} 設備信息
 */
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  return {
    isMobile: /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent),
    isTablet: /tablet|ipad/i.test(userAgent),
    isDesktop: !/mobile|android|iphone|ipod|blackberry|iemobile|opera mini|tablet|ipad/i.test(userAgent),
    isIOS: /iphone|ipad|ipod/i.test(userAgent),
    isAndroid: /android/i.test(userAgent),
    isSafari: /safari/i.test(userAgent) && !/chrome/i.test(userAgent),
    isChrome: /chrome/i.test(userAgent),
    isFirefox: /firefox/i.test(userAgent),
    isEdge: /edge/i.test(userAgent)
  };
};

/**
 * 本地存儲管理
 */
export const storage = {
  /**
   * 設置本地存儲
   * @param {string} key - 鍵名
   * @param {any} value - 值
   * @param {number} expires - 過期時間（天數）
   */
  set(key, value, expires = null) {
    const data = {
      value,
      expires: expires ? Date.now() + expires * 24 * 60 * 60 * 1000 : null
    };
    localStorage.setItem(key, JSON.stringify(data));
  },
  
  /**
   * 獲取本地存儲
   * @param {string} key - 鍵名
   * @returns {any} 值
   */
  get(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (!data) return null;
      
      if (data.expires && Date.now() > data.expires) {
        localStorage.removeItem(key);
        return null;
      }
      
      return data.value;
    } catch {
      return null;
    }
  },
  
  /**
   * 移除本地存儲
   * @param {string} key - 鍵名
   */
  remove(key) {
    localStorage.removeItem(key);
  },
  
  /**
   * 清空本地存儲
   */
  clear() {
    localStorage.clear();
  }
};

/**
 * Cookie 管理
 */
export const cookie = {
  /**
   * 設置 Cookie
   * @param {string} name - Cookie 名稱
   * @param {string} value - Cookie 值
   * @param {number} days - 過期天數
   * @param {string} path - 路徑
   */
  set(name, value, days = 7, path = '/') {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=${path}`;
  },
  
  /**
   * 獲取 Cookie
   * @param {string} name - Cookie 名稱
   * @returns {string|null} Cookie 值
   */
  get(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    
    return null;
  },
  
  /**
   * 移除 Cookie
   * @param {string} name - Cookie 名稱
   * @param {string} path - 路徑
   */
  remove(name, path = '/') {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=${path}`;
  }
};

/**
 * 事件發射器
 */
export class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  /**
   * 監聽事件
   * @param {string} event - 事件名稱
   * @param {Function} callback - 回調函數
   */
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }
  
  /**
   * 監聽事件（只執行一次）
   * @param {string} event - 事件名稱
   * @param {Function} callback - 回調函數
   */
  once(event, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }
  
  /**
   * 移除事件監聽
   * @param {string} event - 事件名稱
   * @param {Function} callback - 回調函數
   */
  off(event, callback) {
    if (!this.events.has(event)) return;
    
    const callbacks = this.events.get(event);
    const index = callbacks.indexOf(callback);
    
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }
  
  /**
   * 觸發事件
   * @param {string} event - 事件名稱
   * @param {...any} args - 參數
   */
  emit(event, ...args) {
    if (!this.events.has(event)) return;
    
    this.events.get(event).forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error('Event callback error:', error);
      }
    });
  }
  
  /**
   * 移除所有事件監聽
   */
  removeAllListeners() {
    this.events.clear();
  }
}

/**
 * 非同步延遲函數
 * @param {number} ms - 延遲時間（毫秒）
 * @returns {Promise} Promise 對象
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 重試函數
 * @param {Function} fn - 要重試的函數
 * @param {number} retries - 重試次數
 * @param {number} delay - 重試間隔（毫秒）
 * @returns {Promise} 執行結果
 */
export const retry = async (fn, retries = 3, delayMs = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await delay(delayMs);
      return retry(fn, retries - 1, delayMs);
    }
    throw error;
  }
};

/**
 * 格式化檔案大小
 * @param {number} bytes - 位元組數
 * @param {number} decimals - 小數位數
 * @returns {string} 格式化後的檔案大小
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};