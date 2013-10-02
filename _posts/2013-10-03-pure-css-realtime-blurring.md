---
layout: post
title:  "Pure CSS realtime blurring"
date:   2013-10-03 00:37:00
---

使用纯 CSS 做到实时的部分毛玻璃遮罩（其实就是个高斯模糊）效果，在看 demo 之前，请使用最新版的 chrome 并到 `chrome//flags` 中搜索 `#enable-experimental-webkit-features` 打开并重启。

demo ：

<p data-height="450" data-theme-id="0" data-slug-hash="jLyqt" data-user="anson0370" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/anson0370/pen/jLyqt'>jLyqt</a> by anson0370 (<a href='http://codepen.io/anson0370'>@anson0370</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="http://codepen.io/assets/embed/ei.js"></script>

各位感兴趣的话，代码可以直接去 codepen 看到，关键点就是 CSS Regions 。这个特性个人理解就是可以把一个元素中的内容在多个元素中排版显示，在 demo 中用这个特性把内容分成需要模糊和不需要模糊的两部分（ `flow-into` and `flow-from` ）。
