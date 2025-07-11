// HTML Validate 配置 - HTML 驗證
export default {
  extends: ['html-validate:recommended'],
  
  rules: {
    // 無障礙設計規則
    'require-sri': 'off',
    'no-trailing-whitespace': 'error',
    'close-attr': 'error',
    'close-order': 'error',
    'doctype-style': 'error',
    'element-required-attributes': 'error',
    'element-permitted-content': 'error',
    'empty-heading': 'error',
    'empty-title': 'error',
    'heading-level': 'error',
    'input-missing-label': 'error',
    'missing-doctype': 'error',
    'no-dup-attr': 'error',
    'no-dup-id': 'error',
    'no-missing-references': 'error',
    'no-redundant-for': 'error',
    'no-redundant-role': 'error',
    'no-unknown-elements': 'error',
    'require-csp-nonce': 'off',
    'script-type': 'off',
    'svg-focusable': 'error',
    'wcag/h30': 'error',
    'wcag/h32': 'error',
    'wcag/h36': 'error',
    'wcag/h37': 'error',
    'wcag/h67': 'error',
    'wcag/h71': 'error',
    
    // 語意化 HTML
    'prefer-button': 'error',
    'prefer-tbody': 'warn',
    'no-implicit-close': 'error',
    'void-style': ['error', { style: 'omit' }],
    
    // 屬性規則
    'attr-case': ['error', { style: 'lowercase' }],
    'attr-quotes': ['error', { style: 'double', unquoted: false }],
    'attribute-allowed-values': 'error',
    'attribute-boolean-style': ['error', { style: 'omit' }],
    'deprecated': 'error',
    'deprecated-rule': 'error',
    
    // 元素規則
    'element-case': ['error', { style: 'lowercase' }],
    'no-conditional-comment': 'error',
    'no-dup-class': 'error',
    'no-inline-style': 'warn',
    'no-raw-characters': ['error', { relaxed: false }],
    'no-style-tag': 'warn',
    'no-utf8-byte-order-mark': 'error',
    
    // 表單規則
    'form-dup-name': 'error',
    'input-attributes': 'error',
    'long-title': ['error', { maxlength: 70 }],
    'meta-refresh': 'error',
    'multiple-labeled-controls': 'error',
    
    // SEO 規則
    'meta-viewport': 'error',
    'unrecognized-char-ref': 'error'
  },
  
  elements: [
    'html5',
    {
      // 自訂元素定義
      'custom-element': {
        attributes: {
          'data-*': {
            boolean: false,
            omit: false
          }
        }
      }
    }
  ],
  
  plugins: [],
  
  transform: {
    // 預處理器配置
    '^.*\\.html$': [
      'html-validate:document',
      {
        // 允許 Vite 的特殊語法
        processAttribute: (name, value) => {
          if (name.startsWith('data-') || name.startsWith('aria-')) {
            return { name, value };
          }
          return null;
        }
      }
    ]
  }
};