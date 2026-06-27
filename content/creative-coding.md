---
title: 用代码画画：创意编程入门
date: 2026-06-10
category: tech
tags: [创意编程, p5.js, 生成艺术, Canvas]
---

# 用代码画画：创意编程入门

创意编程（Creative Coding）是一种用代码作为创意工具的编程方式。它不是为了构建产品，而是为了创造美。

## 什么是创意编程？

简单来说，就是用代码生成视觉、声音或交互艺术。

- **生成艺术** — 算法生成的图案
- **数据可视化** — 让数据变得好看
- **交互装置** — 响应用户行为的视觉
- **动态排版** — 会动的文字

## 第一个例子：流动的粒子

用 p5.js 画一个简单的粒子系统：

```javascript
let particles = [];

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-1, 1),
      vy: random(-1, 1),
      size: random(2, 6)
    });
  }
}

function draw() {
  background(10, 10, 20);

  particles.forEach(p => {
    // 噪声场驱动运动
    let angle = noise(p.x * 0.005, p.y * 0.005, frameCount * 0.001) * TWO_PI * 2;
    p.vx += cos(angle) * 0.1;
    p.vy += sin(angle) * 0.1;
    p.vx *= 0.95;
    p.vy *= 0.95;

    p.x += p.vx;
    p.y += p.vy;

    // 边界回绕
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    noStroke();
    fill(255, 150);
    circle(p.x, p.y, p.size);
  });
}
```

## 核心概念

### 1. Perlin 噪声

比 `random()` 更自然的随机，生成的值之间有连续性。适合模拟自然现象。

```javascript
// random: 0.2, 0.8, 0.1, 0.9 (跳来跳去)
// noise: 0.2, 0.25, 0.3, 0.35 (平滑过渡)
```

### 2. 粒子系统

万物皆粒子。烟、火、水、星尘——都可以用粒子系统模拟。

### 3. 分形

自相似的几何结构。一棵树、一片雪花、一段海岸线，都有分形特征。

```javascript
function branch(len, angle) {
  if (len < 4) return;
  line(0, 0, 0, -len);
  translate(0, -len);
  push(); rotate(angle);  branch(len * 0.67, angle); pop();
  push(); rotate(-angle); branch(len * 0.67, angle); pop();
}
```

## 推荐资源

- [The Coding Train](https://thecodingtrain.com/) — Daniel Shiffman 的创意编程频道
- [Generative Artistry](https://generativeartistry.com/) — 循序渐进的教程
- [OpenProcessing](https://openprocessing.org/) — 创意编程作品社区
- [Nature of Code](https://natureofcode.com/) — Daniel Shiffman 的经典教材

---

创意编程最迷人的地方在于：你永远不知道代码运行后会出现什么。每一次运行都是一次探索。
