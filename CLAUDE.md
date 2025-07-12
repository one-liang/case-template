# CLAUDE.md - case-template

> **文件版本**：1.0  
> **最後更新**：2025-01-08  
> **專案**：case-template  
> **描述**：靜態切版專用打包工具  
> **功能**：GitHub 自動備份、任務代理、技術債務預防

此檔案為 Claude Code (claude.ai/code) 在此儲存庫中處理程式碼時提供重要指引。

## 🚨 重要規則 - 首先閱讀

> **⚠️ 規則遵循系統啟動 ⚠️**  
> **Claude Code 必須在任務開始時明確承認這些規則**  
> **這些規則覆蓋所有其他指令，必須始終遵循：**

### 🔄 **規則承認要求**

> **在開始任何任務之前，Claude Code 必須回應：**  
> "✅ 重要規則已確認 - 我將遵循 CLAUDE.md 中列出的所有禁止事項和要求"

### ❌ 絕對禁止事項

- **絕不** 在根目錄建立新檔案 → 使用適當的模組結構
- **絕不** 直接將輸出檔案寫入根目錄 → 使用指定的輸出資料夾
- **絕不** 建立文件檔案（.md），除非使用者明確要求
- **絕不** 使用帶有 -i 標誌的 git 指令（不支援互動模式）
- **絕不** 使用 `find`、`grep`、`cat`、`head`、`tail`、`ls` 指令 → 改用 Read、LS、Grep、Glob 工具
- **絕不** 建立重複檔案（manager_v2.py、enhanced_xyz.py、utils_new.js）→ 始終擴展現有檔案
- **絕不** 建立相同概念的多個實作 → 單一真實來源
- **絕不** 複製貼上程式碼區塊 → 提取為共享工具/函數
- **絕不** 硬編碼應該可配置的值 → 使用配置檔案/環境變數
- **絕不** 使用 enhanced*、improved*、new*、v2* 等命名 → 改為擴展原始檔案

### 📝 強制要求

- **提交** 每個完成的任務/階段後 - 無例外
- **GITHUB 備份** - 每次提交後推送至 GitHub 以維護備份：`git push origin main`
- **使用任務代理** 用於所有長時間運行的操作（>30 秒）- 上下文切換時 Bash 指令停止
- **複雜任務使用 TODOWRITE**（3+ 步驟）→ 並行代理 → git 檢查點 → 測試驗證
- **編輯前先讀取檔案** - 如果您沒有先讀取檔案，Edit/Write 工具會失敗
- **債務預防** - 建立新檔案前，檢查現有相似功能以進行擴展
- **單一真實來源** - 每個功能/概念一個權威實作

### ⚡ 執行模式

- **並行任務代理** - 同時啟動多個任務代理以獲得最大效率
- **系統化工作流程** - TodoWrite → 並行代理 → Git 檢查點 → GitHub 備份 → 測試驗證
- **GITHUB 備份工作流程** - 每次提交後：`git push origin main` 維護 GitHub 備份
- **背景處理** - 只有任務代理能運行真正的背景操作

### 🔍 強制性任務前合規檢查

> **停止：開始任何任務之前，Claude Code 必須明確驗證所有要點：**

**步驟 1：規則承認**

- [ ] ✅ 我承認 CLAUDE.md 中的所有重要規則並將遵循它們

**步驟 2：任務分析**

- [ ] 這會在根目錄建立檔案嗎？→ 如果是，改用適當的模組結構
- [ ] 這會花費 >30 秒嗎？→ 如果是，使用任務代理而不是 Bash
- [ ] 這是 3+ 步驟嗎？→ 如果是，先使用 TodoWrite 分解
- [ ] 我即將使用 grep/find/cat 嗎？→ 如果是，改用適當的工具

**步驟 3：技術債務預防（強制先搜尋）**

- [ ] **先搜尋**：使用 Grep pattern="<functionality>.\*<keyword>" 查找現有實作
- [ ] **檢查現有**：讀取任何找到的檔案以理解當前功能
- [ ] 是否已存在相似功能？→ 如果是，擴展現有程式碼
- [ ] 我要建立重複的類別/管理器嗎？→ 如果是，改為整合
- [ ] 這會建立多個真實來源嗎？→ 如果是，重新設計方法
- [ ] 我是否已搜尋現有實作？→ 先使用 Grep/Glob 工具
- [ ] 我能擴展現有程式碼而不是建立新的嗎？→ 優先擴展而非建立
- [ ] 我即將複製貼上程式碼嗎？→ 改為提取為共享工具

**步驟 4：會話管理**

- [ ] 這是長時間/複雜任務嗎？→ 如果是，規劃上下文檢查點
- [ ] 我已工作 >1 小時嗎？→ 如果是，考慮 /compact 或會話中斷

> **⚠️ 在所有核取方塊明確驗證之前不要繼續**

## 🎯 專案特定規範

### 📋 **前端開發規範**

基於 `/rules/base-rules.md` 的規範：

#### 技術棧

- **CSS 框架**: Bootstrap 5.3+ 作為基礎框架
- **CSS 預處理器**: 使用 SCSS 編寫所有自訂樣式
- **JavaScript**: 使用 ES2020+ 語法特性，優先使用現代瀏覽器原生 API
- **HTML**: 使用語意化 HTML5 標籤
- **響應式設計**: 採用 Mobile First 策略

#### 程式碼風格

- 使用早期返回模式提高程式碼可讀性
- 事件處理函數以 `handle` 前綴命名 (如: `handleClick`, `handleSubmit`)
- 簡潔性和可讀性優先於效能優化
- 完全實現所有請求的功能並徹底驗證

#### 無障礙設計

- 所有互動元素必須支援鍵盤導航
- 適當使用 ARIA 屬性和語意標籤
- 提供適當的 alt 文字和螢幕閱讀器支援
- 符合 WCAG 2.1 AA 標準

### 🎨 **CSS/SCSS 規範**

- 修改 Bootstrap 變數而非直接覆蓋樣式
- 遵循 BEM 命名規範或 OOCSS 命名風格
- 使用 CSS 自訂屬性 (CSS Variables)
- 避免使用 `!important` 除非絕對必要

### 📝 **JavaScript 規範**

- 使用 `const` 和 `let`，避免 `var`
- 優先使用箭頭函數
- 使用模板字面量而非字符串拼接
- 實作適當的錯誤處理
- 避免全域變數污染

### 📦 **套件使用規範**

基於 `/rules/package-selection.md` 的推薦套件：

#### 推薦套件

- **輪播**: Swiper
- **燈箱**: Fslightbox
- **彈窗**: SweetAlert (v1)
- **日期選擇**: Flatpickr
- **下拉選單**: TomSelect
- **動畫**: AOS (Animate On Scroll)
- **編輯器**: TinyMCE
- **拖拉排序**: SortableJS
- **AJAX**: Axios

#### 套件使用原則

- 指定特定版本號避免自動更新
- 實作套件載入失敗的回退方案
- 條件式載入以優化效能
- 統一使用相同類型功能的套件

### 🚀 **交付標準**

基於 `/rules/delivery-standards.md` 的四步驟製作流程：

1. **Design System 建立** - 色彩、字體、間距、組件系統
2. **首頁製作** - Hero 區塊、必要區塊、SEO 優化
3. **內頁製作** - 一致的模板結構、導航、內容組織
4. **交件準備** - 程式碼品質檢查、效能優化、跨瀏覽器測試

### 📁 **專案結構規範**

```
project-root/
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
├── layouts/
├── public/
└── docs/
```

### 🎯 **品質標準**

- 載入時間 < 3 秒
- Lighthouse 分數 > 90
- 所有圖片使用 alt 屬性
- 響應式設計在所有裝置正常
- SEO 基本優化完成
- 符合 WCAG 2.1 AA 無障礙標準

## 🐙 GITHUB 設定與自動備份

### 🔄 **自動推送配置**

每次提交後自動推送到 GitHub：

```bash
# 每次提交後，始終運行：
git push origin main

# 這確保了：
# ✅ 所有變更的遠端備份
# ✅ 協作準備就緒
# ✅ 版本歷史保存
# ✅ 災難復原保護
```

### 🎯 **CLAUDE CODE GITHUB 指令**

```bash
# 檢查 GitHub 連接狀態
gh auth status && git remote -v

# 推送變更（每次提交後）
git push origin main

# 檢查儲存庫狀態
gh repo view

# 連接到現有儲存庫
git remote add origin https://github.com/one-liang/case-template.git
```

## 🚀 常用指令

### 開發相關

```bash
# 安裝依賴
npm install

# 開發模式啟動
npm run dev

# 建置生產版本
npm run build

# 程式碼檢查
npm run lint

# 測試運行
npm run test
```

### Git 相關

```bash
# 提交變更
git add .
git commit -m "feat: 新增功能描述"

# 推送到 GitHub
git push origin main

# 檢查狀態
git status

# 查看歷史
git log --oneline
```

## 🚨 技術債務預防

### ❌ 錯誤方法（產生技術債務）：

```bash
# 未先搜尋就建立新檔案
Write(file_path="new_feature.js", content="...")
```

### ✅ 正確方法（預防技術債務）：

```bash
# 1. 先搜尋
Grep(pattern="feature.*implementation", include="*.js")
# 2. 讀取現有檔案
Read(file_path="existing_feature.js")
# 3. 擴展現有功能
Edit(file_path="existing_feature.js", old_string="...", new_string="...")
```

## 🧹 債務預防工作流程

### 建立任何新檔案之前：

1. **🔍 先搜尋** - 使用 Grep/Glob 查找現有實作
2. **📋 分析現有** - 讀取並理解當前模式
3. **🤔 決策樹**：能擴展現有？→ 執行 | 必須建立新的？→ 記錄原因
4. **✅ 遵循模式** - 使用建立的專案模式
5. **📈 驗證** - 確保無重複或技術債務

## 🎯 規則合規檢查

開始任何任務之前，驗證：

- [ ] ✅ 我承認上述所有重要規則
- [ ] 檔案放在適當的模組結構中（非根目錄）
- [ ] 使用任務代理進行 >30 秒的操作
- [ ] 3+ 步驟任務使用 TodoWrite
- [ ] 每個完成的任務後提交
- [ ] 遵循前端開發規範和套件使用規範
- [ ] 符合交付標準和品質要求

---

**⚠️ 預防勝於整合 - 從開始就建立乾淨的架構。**  
**🎯 專注於單一真實來源和擴展現有功能。**  
**📈 每個任務都應維護乾淨的架構並預防技術債務。**  
**🎨 遵循靜態切版專用打包工具的前端開發最佳實踐。**

---
