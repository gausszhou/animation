# Animation

Make tween easier to use

## Live Demo

Preview Address: [Transport](https://gausszhou.github.io/animation/)

## Usage

```bash
npm i @gausszhou/animation
```

```ts
import animation from "@gausszhou/animation";

const eleBall = document.querySelectorAll("i")[0]
eleBall.onclick = function () {
  if (isMoving == true) {
    return;
  }
  animation(
    0,
    800 - 42,
    (value: string | number): void => {
      eleBall.style.transform = "translateX(" + value + "px)";
    },
    animationType,
    600
  );
};
```

## Code Reference

```
https://github.com/zhangxinxu/Tween
```
