---
layout: post
title:  "Play with Sass's list"
date:   2013-11-02 01:26:00
---

list 在 Sass 中可以做到很多事情，简化你的 css 编写。

#### 创建一个空的 list ：

```scss
$l: ();
```

#### 创建带内容的 list ：

```scss
$l: element1 element2 element3;
$l: element1, element2, element3;
$l: "element1", "element2", "element3";
```

前两个是等价的，空格和逗号都可以作为分隔符使用；最后一个和前两个在某种程度上是等价的，如果没有特殊字符的话 Sass 是允许不加引号的。如果加了引号，那么在需要的时候使用 `unquote()` 解开就可以了。

#### 我们还能创建嵌套的 list ，混用空格和逗号就行了：

```scss
$l: e1 e2, e3 e4, e5 e6, e7 e8;
```

#### 另外我们还有一堆方法来操作 list ：

`length($list)`, `nth($list, $index)`, `index($list, $value)`, `append($list, $value[, $separator])`, `join($list, $list-2[, $separator])`, `zip(*$lists)`

#### 简单应用一下，假设我们要写一个 12 列的网格系统：

```scss
$cols: ();

@for $i from 1 through 12 {
  $cols: $cols, unquote(".col-#{$i}"); // $cols: append($cols, unquote(".col-#{$i}"), comma); 的隐式写法
  .col-#{$i} {
    width: 100px * $i;
  }
}

#{$cols} {
  display: block;
  float: left;
}
```

不用手写 `.col-1` 到 `.col-12`，而且可以随时在后面需要的时候直接把 `$cols` 拿来用。

生成的 css 如下：

```css
.col-1 {
  width: 100px;
}
.col-2 {
  width: 200px;
}
.col-3 {
  width: 300px;
}
/* ... 太长了 orz ... */
.col-11 {
  width: 1100px;
}
.col-12 {
  width: 1200px;
}
.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
  display: block;
  float: left;
}
```

#### 再来个例子：

```scss
$colors: container #eee, grid #ccc, row #aaa, col #999;

@each $color in $colors {
  .#{nth($color, 1)} {
    border-color: nth($color, 2);
  }
}
```

生成的 css 如下：

```css
.container {
  border-color: #eeeeee;
}
.grid {
  border-color: #cccccc;
}
.row {
  border-color: #aaaaaa;
}
.col {
  border-color: #999999;
}
```
