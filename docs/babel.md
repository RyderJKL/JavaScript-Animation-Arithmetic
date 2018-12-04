# Babel 7 使用指南

现代前端工程，Babel 已经是不可或缺的了，Babel 的详细介绍请参考官方文档，在此不多赘述，本文的只是介一些核心的概念，并如何配置一个可以在实际业务中使用的 `.babelrc` 配置。

Babel 是 JavaScript 编译器，通过它，可以使用一些在浏览器中尚未实现的新方法或者目前尚在草案阶段的 API。

## Babel 配置文件

目前 Babel 7 支持三种配置方式:

* Babel.config.js
* package.json
* .babelrc

### Babel.config.js

```js
// Babel.config.js
module.exports = function () {
  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```

官方推荐使用 `Babel.config.js` 的配置方式。

### package.json

```json
// package.json
"Babel": {
    "presets": [
      [
        "env",
        {
          "modules": false,
          "targets": {
            "node": "current"
          }
        }
      ],
      "stage-2"
    ]
  }
```

### .babelrc

```json
// .babelrc
{
 "presets": ["@Babel/preset-env"],
 "plugins": [
   "@Babel/plugin-transform-runtime",
   "@Babel/plugin-syntax-dynamic-import"
 ]
}
```

本文使用 `.babelrc` 方式配置 Babel

## 使用 preset-env

presets 就是 plugins 的组合，可以理解为是套餐，而通过 ``

## 配置 async/await

`async/await` 是 ES7 中的标准，babel 实现 `async/await` 需要 `plugin-transform-runtime`，插件的支持，而该插件依赖 `@Babel/runtime`：

```bash
cnpm i @Babel/plugin-transform-runtime @Babel/runtime --save-dev
```

```json
// .babelrc
{
"plugins": [
   "@Babel/plugin-transform-runtime"
 ]
}
```

## Webpack 中使用 Babel-loader

在 Webpack 中使用 `Babel-loader`

```js
// webpack.config.js
module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules',
        use: [
          {
            loader: 'Babel-loader'
          },
          'eslint-loader'
          '...more Items loader'
        ]
      }
    ]
}
```

## reference

[babel官方文档-英文](https://Babel.docschina.org/docs/en/usage)
[babel中文文档](https://www.babeljs.cn/docs/plugins/preset-env/)
[babel中核心模块讲解](https://juejin.im/entry/59ba1a3c5188255e723b8cae)
