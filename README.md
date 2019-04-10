# saber-canvas

[![npm](https://img.shields.io/npm/v/saber-canvas.svg)](https://www.npmjs.com/package/saber-canvas)

> use canvas easily!

```bash
npm install saber-canvas
```

# API

## Rect

所有类型的基类

构造函数：

```ts
new Rect(w, h?)
```

属性：

1. type 类型标识[`请不要变更此属性`]
2. x
3. y
4. width
5. height
6. getPosition 获取坐标
7. setPosition 设置坐标

```ts
setPosition(2) // (x, y) -> (2, 2)

setPosition(2, 3) // (x, y) -> (2, 3)
```

9. getContentSize 获取大小
10. setSize 设置大小

```ts
setSize(100) // (width, height) -> (100, 100)

setSize(100, 200) // (width, height) -> (100, 200)
```

## Node

节点类型

- 继承自[Rect](https://github.com/Saber2pr/saber-canvas#Rect)

构造函数：

```ts
new Node(w, h?)
```

扩充：

1. color 颜色属性
2. setColor 设置颜色

```ts
setColor('red')
```

## Label

文字节点

- 继承自[Node](https://github.com/Saber2pr/saber-canvas#Node)

构造函数：

```ts
new Label(text, fontSize?)
```

扩充：

1. fontSize 字体大小
2. fontStyle 字体样式
3. text 文本内容
4. setFontSize 设置字体大小
5. setFontStyle 设置字体样式
6. setText 设置文本内容

## Sprite

图像节点

- 继承自[Rect](https://github.com/Saber2pr/saber-canvas#Rect)

构造函数：

```ts
new Sprite(srcUrl)
```

扩充：

1. img 图像 dom 节点
2. setSrc 设置 src 路径

# Examples

```ts
new Canvas('hello', 640, 480)
  .draw(new Node(640, 480))
  .draw(new Label('hello world!').setPosition(300, 20))
  .draw(new Node(100, 200).setColor('blue').setPosition(200, 200))
```

![loadingImage...](https://github.com/Saber2pr/MyWeb/raw/master/resource/canvas.png)
