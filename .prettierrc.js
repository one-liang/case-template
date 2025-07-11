// Prettier 配置 - 代碼格式化
export default {
  // 基本設定
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  
  // 換行設定
  endOfLine: 'lf',
  
  // HTML 設定
  htmlWhitespaceSensitivity: 'css',
  
  // SCSS/CSS 設定
  singleAttributePerLine: false,
  
  // 檔案類型覆蓋設定
  overrides: [
    {
      files: '*.html',
      options: {
        printWidth: 120,
        tabWidth: 2,
        htmlWhitespaceSensitivity: 'ignore'
      }
    },
    {
      files: ['*.scss', '*.css'],
      options: {
        printWidth: 100,
        tabWidth: 2,
        singleQuote: false
      }
    },
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
        tabWidth: 2
      }
    },
    {
      files: '*.yml',
      options: {
        tabWidth: 2,
        singleQuote: false
      }
    }
  ]
};