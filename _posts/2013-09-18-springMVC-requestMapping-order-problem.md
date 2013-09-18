---
layout: post
title: SpringMVC 又一坑
data: 2013-09-18 15:26:00
---

工作中遇到的，有类似下面两个 `RequestMapping` 的配置

```java
@RequestMapping("/api/path/{var1}/{var2}/{var3}/{var4}")

@RequestMapping("/**")
```

不要在意第一个 api 的奇葩设计，这不是重点。下面那个 `RequestMapping` 原意是用来作为 fallback 处理所有匹配不到 mapping 的情况。然而真实情况和直觉不符，实际上在请求 `/api/path/w/h/a/t` 的时候 Spring 匹配到的是 `/**`。

问题其实很明显，Spring 认为 `/**` 才是最优匹配。可是两个星号这么低调奢华有内涵的通配符优先级怎么会这么高呢？我是不知道 Spring 文档有没有提到这一点，直接 DEBUG 一发翻代码比较快。

在 3.2.4 的 Spring 中，关键代码在 `org.springframework.util.AntPathMatcher.AntPatternComparator` 里。

```java
  // line 424 - line 435
  int wildCardCount1 = getWildCardCount(pattern1);
  int wildCardCount2 = getWildCardCount(pattern2);

  int bracketCount1 = StringUtils.countOccurrencesOf(pattern1, "{");
  int bracketCount2 = StringUtils.countOccurrencesOf(pattern2, "{");

  int totalCount1 = wildCardCount1 + bracketCount1;
  int totalCount2 = wildCardCount2 + bracketCount2;

  if (totalCount1 != totalCount2) {
      return totalCount1 - totalCount2;
  }
```

Spring 找了一下两个 pattern 的 wildCard(*) 数量和 bracket({) 数量作为通配符数目，并且认为通配符少的那个优先级更高。在我们的例子中，第一个 pattern 有 4 个括号，而第二个 pattern 只有 2 个星号，第二个胜出了。

实际上这个逻辑本来没有错，因为同样能匹配到，通配符少的匹配的肯定更准确。只是 `**` 这样的全路径匹配也遵循这个规则似乎有点有违直觉。

---

原因找到了，解决的办法也很简单：

第一种方法：修改第一个 pattern ，将 PathVariable 改为 RequestParam（治标不治本但是 API 就应该这样才对嘛！）

第二种方法：把第二个用来 fallback 的 handler 单独拿出来写一个 controller 并去掉 pattern 。然后把这个新的 controller 配置为 `defaultHandler` 。

```xml
<beans:bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping">
    <beans:property name="defaultHandler" ref="fallbackController"/>
</beans:bean>
```
