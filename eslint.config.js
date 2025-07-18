// ESLint 配置 - JavaScript 代碼檢查
import importPlugin from 'eslint-plugin-import';

export default [
  {
    plugins: {
      import: importPlugin
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        // 瀏覽器環境全域變數
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        // Node.js 環境全域變數
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        // 第三方函式庫全域變數
        bootstrap: 'readonly',
        Swiper: 'readonly',
        AOS: 'readonly',
        flatpickr: 'readonly',
        TomSelect: 'readonly',
        Sortable: 'readonly',
        swal: 'readonly',
        refreshFsLightbox: 'readonly'
      }
    },
    rules: {
      // 代碼品質
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': 'error',
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',

      // ES6+ 語法
      'arrow-spacing': 'error',
      'template-curly-spacing': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-destructuring': [
        'warn',
        {
          array: true,
          object: true
        }
      ],

      // 函數
      'function-paren-newline': 'off',
      'no-param-reassign': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',

      // 導入/導出
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',

      // 代碼風格 (由 Prettier 處理格式，ESLint 僅處理邏輯)
      indent: 'off',
      quotes: 'off', 
      semi: 'off',
      'comma-dangle': 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',

      // 最佳實踐
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'dot-notation': 'error',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-implicit-coercion': 'error',
      'no-return-assign': 'error',
      'no-return-await': 'warn',
      'no-throw-literal': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-return': 'error',
      'prefer-promise-reject-errors': 'error',
      'require-await': 'warn',

      // 無障礙設計
      'no-restricted-globals': [
        'error',
        {
          name: 'event',
          message: 'Use local parameter instead.'
        }
      ]
    }
  },
  {
    files: ['*.config.js', '*.config.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly'
      }
    }
  },
  {
    files: ['src/assets/js/vendor/**/*.js'],
    rules: {
      // 第三方檔案放寬檢查
      'no-console': 'off',
      'no-undef': 'off'
    }
  }
];
