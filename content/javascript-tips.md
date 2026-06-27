---
title: 10 个你可能不知道的 JavaScript 技巧
date: 2026-06-18
category: tech
tags: [JavaScript, 技巧, 前端]
---

# 10 个你可能不知道的 JavaScript 技巧

写了这么多年 JavaScript，有些技巧是踩了坑才学到的。今天分享 10 个实用的小技巧。

## 1. 用 `structuredClone` 深拷贝

```javascript
// 再也不需要 JSON.parse(JSON.stringify(obj)) 了
const original = { nested: { value: 42 } };
const clone = structuredClone(original);
```

## 2. 用 `??` 替代 `||`

```javascript
const value = 0 || 'default';    // 'default' ← 0 是 falsy!
const value = 0 ?? 'default';    // 0 ← 只检查 null/undefined
```

## 3. 数组去重的最简写法

```javascript
const unique = [...new Set([1, 2, 2, 3, 3, 3])];
// [1, 2, 3]
```

## 4. 可选链操作符

```javascript
const city = user?.address?.city ?? '未知';
// 不再需要 user && user.address && user.address.city
```

## 5. 用 `at()` 取数组最后一个元素

```javascript
const arr = [1, 2, 3, 4, 5];
const last = arr.at(-1);        // 5
const secondLast = arr.at(-2);  // 4
```

## 6. `Object.groupBy` 分组

```javascript
const articles = [
  { title: 'A', category: 'tech' },
  { title: 'B', category: 'life' },
  { title: 'C', category: 'tech' },
];

const grouped = Object.groupBy(articles, a => a.category);
// { tech: [...], life: [...] }
```

## 7. Promise 并发控制

```javascript
// 同时请求，但限制并发数
const results = await Promise.allSettled(
  urls.map(url => fetch(url))
);
```

## 8. 用 `Intl` 做日期格式化

```javascript
const date = new Date('2026-06-18');
const formatted = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}).format(date);
// "2026年6月18日星期四"
```

## 9. 标签模板字面量

```javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    `${result}${str}<strong>${values[i] || ''}</strong>`, '');
}

const msg = highlight`Hello ${name}, you have ${count} messages`;
```

## 10. `using` 关键字自动清理资源

```javascript
{
  using file = openFile('data.txt');
  // file 在作用域结束时自动关闭
}
```

---

这些技巧有的是新语法，有的是鲜为人知的内置 API。收藏起来，说不定哪天就用上了。
