// Stylelint 配置 - SCSS/CSS 代碼檢查
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss'
  ],
  plugins: [],
  rules: {
    // SCSS 特定規則
    'scss/at-import-partial-extension': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'scss/dollar-variable-pattern': '^[a-z][a-zA-Z0-9-]*$',
    'scss/percent-placeholder-pattern': '^[a-z][a-zA-Z0-9-]*$',
    'scss/at-mixin-pattern': '^[a-z][a-zA-Z0-9-]*$',
    'scss/at-function-pattern': '^[a-z][a-zA-Z0-9-]*$',
    
    // 選擇器規則
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*(__[a-z0-9]+((-[a-z0-9]+)*)*)?(--[a-z0-9]+((-[a-z0-9]+)*)*)?$',
      {
        message: 'Expected class selector to follow BEM naming convention'
      }
    ],
    'selector-id-pattern': '^[a-z][a-zA-Z0-9-]*$',
    'selector-max-id': 1,
    'selector-max-universal': 1,
    'selector-max-type': 2,
    'selector-max-class': 4,
    'selector-max-attribute': 2,
    'selector-max-pseudo-class': 3,
    'selector-no-qualifying-type': [true, {
      ignore: ['attribute', 'class']
    }],
    
    // 屬性規則
    'property-no-vendor-prefix': [true, {
      ignoreProperties: ['appearance', 'user-select', 'backdrop-filter']
    }],
    'value-no-vendor-prefix': [true, {
      ignoreValues: ['box', 'inline-box']
    }],
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    
    // 值和單位
    'unit-allowed-list': [
      'px', 'em', 'rem', '%', 'vh', 'vw', 'vmin', 'vmax',
      'deg', 'rad', 'turn', 's', 'ms', 'fr'
    ],
    'number-max-precision': 3,
    'length-zero-no-unit': true,
    'color-hex-length': 'short',
    'color-named': 'never',
    
    // 代碼組織
    'declaration-empty-line-before': 'never',
    'rule-empty-line-before': ['always', {
      except: ['first-nested'],
      ignore: ['after-comment']
    }],
    'comment-empty-line-before': ['always', {
      except: ['first-nested'],
      ignore: ['stylelint-commands']
    }],
    
    // 順序規則
    'order/properties-alphabetical-order': null,
    'declaration-property-value-no-unknown': true,
    
    // 媒體查詢
    'media-feature-name-no-vendor-prefix': true,
    'custom-media-pattern': '^[a-z][a-zA-Z0-9-]*$',
    
    // 自訂屬性
    'custom-property-pattern': '^[a-z][a-zA-Z0-9-]*$',
    
    // 函數
    'function-url-quotes': 'always',
    'function-allowed-list': null,
    
    // 註解
    'comment-word-disallowed-list': [
      ['todo', 'fixme', 'hack'],
      {
        severity: 'warning'
      }
    ],
    
    // 禁用規則
    'no-descending-specificity': null,
    'alpha-value-notation': null,
    'color-function-notation': null,
    'shorthand-property-no-redundant-values': null,
    
    // Bootstrap 相容性
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['ng-deep']
    }],
    
    // 無障礙設計
    'a11y/media-prefers-reduced-motion': null,
    'a11y/no-outline-none': null
  },
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['assets/css/scss/vendor/**/*.scss'],
      rules: {
        // 第三方檔案放寬檢查
        'selector-class-pattern': null,
        'selector-id-pattern': null,
        'property-no-vendor-prefix': null,
        'value-no-vendor-prefix': null
      }
    }
  ],
  ignoreFiles: [
    'dist/**/*',
    'node_modules/**/*',
    'assets/css/style.css'
  ]
};