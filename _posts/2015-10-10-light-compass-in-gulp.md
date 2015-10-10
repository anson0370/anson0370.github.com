---
layout: post
title:  "在 gulp 中轻量使用 compass"
date:   2015-10-10 11:08:00
---

打开 blog 工程，发现上一篇文章还是 2013-12-04 的时候，一偷懒快两年就过去了。今天也是心血来潮突然想写一篇，也许下篇又是两年后了。

总之正文在下面。

---

我们知道 compass 以及底下的 sass 编译器都是 ruby 实现的，一个比较显著的问题就是性能。sass 官方为了解决这个问题，做了一个 C++ 的实现 libSass 。

在 gulp 中，gulp-sass 插件用的就是 libSass 。但 compass 本身还没有将 sass engine 替换成 libSass ，而 gulp-compass 是直接调用 compass 命令行的，因此也无法享受到 libSass 带来的提升。

然而性能只是影响速度，不影响使用。但这里还有一个问题导致 gulp-compass 不是很好用。一个典型的使用方式是这样的：

```js
gulp.src('./src/*.scss')
  .pipe(compass({
    config_file: './config.rb',
    css: 'stylesheets',
    sass: 'sass'
  }))
  .pipe(gulp.dest('app/assets/temp'));
```

这个 pipeline 的目的是将 scss 文件用 compass 预处理后放到 `app/assets/temp` 目录下。先不说那个奇怪的 `config.rb` ，问题在于 compass 会在 `stylesheets` 中生成一份 css 文件，然后才由 gulp 输出到目标目录。也就是说，你会得到一份你并不想要的 css 文件。

这种事强迫症怎么能忍！但是没关系，我们有办法。

有一个 npm package 叫做 compass-mixins ，是由纯 sass 写的 compass 的所有 mixin ，我们可以借由这个 package 组合 gulp-sass 来编译。

首先引入开发依赖：

```json
"devDependencies": {
  "gulp-sass": "^2.0.4",
  "compass-mixins": "^0.12.7"
}
```

或者 `npm install --save-dev gulp-sass compass-mixins` 。

接着在 sass 这一步将 compass-mixins 加入 path 中：

```js
gulp.src('./src/*.scss')
  .pipe(sass({includePaths: [`${__dirname}/node_modules/compass-mixins/lib`]}))
  .pipe(gulp.dest(DEST));
```

好了到这似乎就没问题了，但实际上我们会发现生成的 css 表现不正常。比如 `@include transition(0.1s linear left);` 会被变成这样的东西：

```css
-webkit-transition: compact(compact(0.1s linear left, false, false, false, false, false, false, false, false, false) false false);
-moz-transition: compact(compact(0.1s linear left, false, false, false, false, false, false, false, false, false) false false false);
-o-transition: compact(compact(0.1s linear left, false, false, false, false, false, false, false, false, false) false false false);
transition: compact(0.1s linear left, false, false, false, false, false, false, false, false, false);
```

等等，这是坨什么鬼？！其实这 compact 是一个 compass 的方法，在这里没有被正确调用，从而变成了一堆很奇怪的东西。

为什么会这样？两边代码一看，其实很简单。在 compass 中，compact 是 ruby 实现的方法，被直接注入到了 sass engine 中。而 compass-mixins 中，compact 是纯 sass 的方法，需要被 `@import` 进来才能被识别。然而如果手写这个 import ，强迫症怎么受得了？

解决方法也很简单，使用 gulp-header 加一行就行啦：

```js
gulp.src('./src/*.scss')
  .pipe(header('@import "compass/functions";\n'))
  .pipe(sass({includePaths: [`${__dirname}/node_modules/compass-mixins/lib`]}))
  .pipe(gulp.dest(DEST));
```

这下爽啦：

```css
-webkit-transition: 0.1s linear left;
-moz-transition: 0.1s linear left;
-o-transition: 0.1s linear left;
transition: 0.1s linear left;
```
