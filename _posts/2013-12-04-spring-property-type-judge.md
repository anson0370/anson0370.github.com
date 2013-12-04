---
layout: post
title:  "Spring Property 注入时类型的判断问题"
date:   2013-12-04 17:20:00
---

Spring 的坑还真是蛮多的，一般来说看 Spring 代码的惟一原因就是被坑了。

下述问题发现版本是 3.2.5-RELEASE 。

```xml
<bean id="bean">
  <property name="prop" value="3000"/>
</bean>
```

一般来说我们可以这么为一个 bean 注入 property 。在这个案例中，这个奇葩 bean 里有个奇葩 property 。属性本身类型是 `long` 但是 setter 中的参数类型是 `int` 。然后就一直 `IllegalArgumentException` 了。

虽然罪魁祸首是这个奇葩 bean ，不过还是各种翻了一下 Spring 的代码。对于 `3000` 这样的字面量， Spring 会先去找 bean 中对应的字段的类型，如果找不到则会找 getter 的返回值类型，没有 getter 方法才找 setter 方法的参数类型。

```java
// from class org.springframework.beans.GenericTypeAwarePropertyDescriptor
public synchronized Class<?> getPropertyType() {
  if (this.propertyType == null) {
    if (this.readMethod != null) {
      this.propertyType = GenericTypeResolver.resolveReturnType(this.readMethod, this.beanClass);
    }
    else {
      MethodParameter writeMethodParam = getWriteMethodParameter();
      if (writeMethodParam != null) {
        this.propertyType = writeMethodParam.getParameterType();
      }
      else {
        this.propertyType = super.getPropertyType();
      }
    }
  }
  return this.propertyType;
}
```

这个地方就挺奇葩的，我是要 set ，为什么优先找的 type 是 getter 方法的呢？

不过 Spring 允许用下面的方式指定 property 的类型：

```xml
<bean id="bean">
  <property name="prop">
    <value type="java.lang.Integer">3000</value>
  </property>
</bean>
```

但是杯具的是，这玩意儿的优先级比上面那个判断过程低，就算你设置了 `Integer` ， Spring 仍然会倔强的把你这个 3000 转成一个 `Long` 。

一圈绕下来，没辙了，那个 bean 也是来自于一个外部的 jar 。好吧比起改 Spring 的代码，还是改这玩意儿的吧……
