---
layout: post
title: A text overflow solution
data: 2013-08-31 15:53:00
categories: "stuff"
---

我们经常会遇到一段过长的文字需要在有限长度的空间中展示的场景，通常情况下我们会选择把它截断并使用省略号（…）来表示这不是全部，这种方式的好处在于可以通过纯 CSS 简单的搞定。

`text-overflow` 这个属性就是用来处理这一情况的，只不过它不会主动帮你使得文本溢出（意思是你需要自己保证文本确实会溢出），通常我们使用下面的 CSS 来处理。

```css
width: 200px; /* 指定宽度，否则内容可能将容器撑大 */
white-space: nowrap; /* 指定不换行，否则内容可能自行换行容器宽度 */
overflow: hidden; /* 保证溢出内容被隐藏 */
text-overflow: ellipsis; /* 将多余内容转为 … */
```

<p style="width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">这是一个例子，一段超过容器长度的文字尾部是…</p>

这种方案在文本不是重要内容的时候很好用，然而有时候我们需要展现完整的文本内容又受限于有限的空间时就得考虑别的方案，让文字自动轮播是一种方式，这里要展示的是另一种。

---

简单来说就是将文本位置和鼠标位置联动，当鼠标位置靠前时显示文本前面的部分，而鼠标位置靠后时显示文本后面的部分。下面的 demo 用 codepen 创建，如果没显示出来可以直接访问[这里](http://codepen.io/anson0370/details/znLEg)。

<p data-height="268" data-theme-id="0" data-slug-hash="znLEg" data-user="anson0370" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/anson0370/pen/znLEg'>znLEg</a> by anson0370 (<a href='http://codepen.io/anson0370'>@anson0370</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="http://codepen.io/assets/embed/ei.js"></script>

顺便一说，codepen 的 slogan 很有道理：

> Demo or it didn't happen.
