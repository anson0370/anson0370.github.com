---
layout: post
title: "An Alfred workflow for number system convert"
data: 2013-08-19 14:03:00
---

这是一个用于数制转换的 Alfred workflow，适用于 [Alfred v2](http://www.alfredapp.com/) 。如果你经常要打开计算器换算一下数制，这东西也许会适合你。

用于二、八、十以及十六进制之间的转换。

输入 `nc number` 来使用，例如 `nc 100` ， `nc 0xfe`

- 二进制数使用 `0b` 作为前缀
- 八进制使用 `0` 作为前缀
- 十六进制使用 `0x` 作为前缀

好吧，其实 `nc` 后面的内容就是个 ruby 表达式！所以你写 `nc (0b110 + 0x0f) * 2` 也是可以的……

非常简单，代码我都不好意思贴了，但是为了看起来长一点，还是贴一下好了……

{% highlight ruby %}
originNumber = {query}

converted = {:bin => originNumber.to_s(2), :dec => originNumber.to_s(10), :oct => originNumber.to_s(8), :hex => originNumber.to_s(16)}.map do |k, v|
  """
    <item uid=\"#{k}\" arg=\"#{v}\">
      <title>#{k}: #{v}</title>
      <subtitle>select to copy to clipboard</subtitle>
      <icon type=\"fileicon\">/Applications/Calculator.app</icon>
    </item>
  """
end

result =
"""
<?xml version=\"1.0\"?>
<items>
  #{converted.join}
</items>
"""

puts result
{% endhighlight %}

一看就懂啊！ [Github 点我](https://github.com/anson0370/alfred-numbersystem-convertor)
