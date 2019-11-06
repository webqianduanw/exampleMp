module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  globals: {
    Promise: true,
    axios: true,
    android: true,
    ActiveXObject: true
  },
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    "vue/max-attributes-per-line": [2, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/attribute-hyphenation": 1,
    "vue/attributes-order": 0,
    "vue/html-self-closing": 0,
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/require-valid-default-prop": 0,
    "accessor-pairs": 2,
    "arrow-spacing": 2,
    "block-spacing": [2, "always"],
    "brace-style": [2, "1tbs", {
      "allowSingleLine": true
    }],
    "global-require": 0,
    "linebreak-style": [0 ,"error", "windows"],
    "no-console": 1,
    "no-debugger": 1,
    "no-alert": 0,
    "no-param-reassign": 0,
    "camelcase": 2,
    "max-len": 0,
    "comma-dangle": ["error", "never"],
    "comma-spacing": [2, {
      "before": false,
      "after": true
    }],
    "comma-style": [2, "last"],
    "curly": [2, "multi-line"],
    "dot-location": [2, "property"],
    "eol-last": 2,
    "object-shorthand": 2,
    "eqeqeq": 2,
    "indent": ["error", 4],
    "jsx-quotes": [2, "prefer-single"],
    "import/prefer-default-export": 0,
    "no-underscore-dangle": 1,
    "key-spacing": [2, {
      "beforeColon": false,
      "afterColon": true
    }],
    "keyword-spacing": [2, {
      "before": true,
      "after": true
    }],
    "new-cap": [2, {
      "newIsCap": true,
      "capIsNew": false
    }],
    "new-parens": 2,
    "no-template-curly-in-string": 2,
    "prefer-template": 2,
    "no-array-constructor": 2,
    "no-class-assign": 2,
    "no-const-assign": 2,
    "no-control-regex": 2,
    "no-dupe-args": 2,
    "no-dupe-class-members": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty-character-class": 2,
    "no-empty-pattern": 2,
    "no-eval": 2,
    "no-ex-assign": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": [2, "functions"],
    "no-fallthrough": 2,
    "no-floating-decimal": 2,
    "no-func-assign": 2,
    "no-implied-eval": 2,
    "no-inner-declarations": [2, "functions"],
    "no-invalid-regexp": 2,
    "no-irregular-whitespace": 2,
    "no-iterator": 2,
    "no-label-var": 2,
    "no-lone-blocks": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-multi-spaces": 2,
    "no-multi-str": 2,
    "no-multiple-empty-lines": 2,
    "no-global-assign": 2,
    "no-unsafe-negation": 2,
    "no-new": 0,
    "no-new-object": 2,
    "no-new-require": 2,
    "no-new-symbol": 2,
    "no-new-wrappers": 2,
    "no-obj-calls": 2,
    "no-octal": 2,
    "no-octal-escape": 2,
    "no-path-concat": 2,
    "no-proto": 2,
    "no-redeclare": 2,
    "no-regex-spaces": 2,
    "no-return-assign": [2, "except-parens"],
    "no-self-assign": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-shadow-restricted-names": 2,
    "func-call-spacing": 2,
    "no-sparse-arrays": 2,
    "no-this-before-super": 2,
    "no-throw-literal": 2,
    "no-trailing-spaces": 1,
    "no-undef": 2,
    "no-undef-init": 2,
    "no-unexpected-multiline": 2,
    "no-unmodified-loop-condition": 2,
    "no-unneeded-ternary": [2, {
      "defaultAssignment": false
    }],
    "no-unreachable": 2,
    "no-unsafe-finally": 2,
    "no-unused-vars": 2,
    "no-useless-call": 2,
    "no-useless-computed-key": 2,
    "no-useless-constructor": 2,
    "no-useless-escape": 0,
    "no-whitespace-before-property": 2,
    "no-with": 2,
    "one-var": [2, {
      "initialized": "never"
    }],
    "operator-linebreak": [2, "after", {
      "overrides": {
        "?": "before",
        ":": "before"
      }
    }],
    "padded-blocks": [0, "never"],
    "quotes": [2, "single", {
      "avoidEscape": true,
      "allowTemplateLiterals": true
    }],
    "semi": 2,
    "semi-spacing": [2, {
      "before": false,
      "after": true
    }],
    "space-before-blocks": [2, "always"],
    "space-before-function-paren": [2, "never"],
    "space-in-parens": [2, "never"],
    "space-infix-ops": 2,
    "space-unary-ops": [2, {
      "words": true,
      "nonwords": false
    }],
    "spaced-comment": 2,
    "template-curly-spacing": [2, "never"],
    "use-isnan": 2,
    "valid-typeof": 2,
    "wrap-iife": [2, "any"],
    "yield-star-spacing": [2, "both"],
    "prefer-const": 2,
    "no-var": 2,
    "object-curly-spacing": [2, "always", {
      "objectsInObjects": false
    }],
    "array-bracket-spacing": 2
  },
  parserOptions: {
    parser: 'babel-eslint',
  }
};
