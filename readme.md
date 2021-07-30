# npm 实现 monorepo

## 一、版本

yarn 最先用 workspaces 实现了 monorepo，而**npm 则要在 7.x 版本后才可以使用**

```json
"engines": {
  "npm": ">= 7.0.0"
}
```

## 二、workspaces

根目录的`package.json`配置

```js
{
  "name": "monorepo-demo",
  "workspaces": [
    "package1" // "packages/*" 以目录为单位
  ],
  ...
}
```

目录：

```shell
.
├── package.json
└── package1
    └── package.json
```

预期的效果是，在根目录下执行`npm install `命令，**文件夹`package1` 会被符号链接到根目录的`node_modules`** 文件夹下。对于包的使用和查找，和正常安装这个包并无差别。

这个例子如果执行`npm install`后，得到的目录结构如下：

```shell
.
├── node_modules
│   └── package1 -> ../package1
├── package-lock.json
├── package.json
└── package1
    └── package.json
```

注意：**最好将子目录的 private 设置为 true**

## 三、批量运行子目录命令

如子目录 package.json 如下所示：

```js
// packages/package1/package.json
{
  "name": "@demo/package1",
  "scripts": {
    "test": "node index.test.js"
  }
  // ...
}

// packages/package2/package.json
{
  "name": "@demo/package2",
  "scripts": {
    "test": "node index.test.js"
  }
  // ...
}
```

都有 test 命令，此时就可以使用如下命令，批量运行 test

```shell
# Run "test" script on all packages
npm run test --workspaces

# Tip - this also works:
npm run test  -ws
```

## 四、总结

综上，npm 7.x 版本提供了`worksapces`配置，当我们在其中配置了相关子目录后，`npm install`时，子目录就会被符号链接到根目录的`node_modules`中，这样就像是我们在根目录装了一个`npm link`的三方包。

需要注意的是，如果是想搞个小的 monorepo 项目，可以直接使用 npm workspaces，但是如果是大型项目，涉及到子项目的依赖控制和发布，npm workspaces 可能就显得捉襟见肘，此时需要借助 lerna 这类的工具库。
