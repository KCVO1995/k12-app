// stylelint-config-standard-scss: stylelint 默认规则只能格式化 css，这里我们使用该插件的规则来格式化 scss。
// stylelint-config-prettier: 避免 stylelint 与 prettier 冲突的插件。
// stylelint-order: 给属性排序的插件。属性会按照 rules 里 order/properties-order 所定义的顺序排序。

module.exports = {
  root: true,
  plugins: ['stylelint-order'],
  // *继承推荐规范配置
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-html/vue',
    'stylelint-config-recess-order',
    'stylelint-config-prettier'
  ],
  // *指定不同文件对应的解析器
  rules: {
    'declaration-block-no-redundant-longhand-properties': null,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'import-notation': null,
    // *允许 global 、export 、v-deep等伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep']
      }
    ],
    'color-function-notation': ['legacy'],
    'color-no-invalid-hex': true,
    'annotation-no-unknown': true,
    'function-calc-no-unspaced-operator': true,
    'function-no-unknown': true,
    'block-no-empty': true,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'unit-allowed-list': ['rpx', 'em', 'rem', 's', 'ms', '%', 'px', 'vw', 'vh', 'deg'],
    'no-duplicate-selectors': true,
    'selector-class-pattern': null,
    'alpha-value-notation': 'number',

    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/^uni-||scroll-view||pages/', '/^page/', '/^checkbox/']
      }
    ],
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
}
