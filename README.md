# Animation

```bash
npm i @gausszhou/animation
```

## Usage

```ts
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

## 学习资料

https://www.zhangxinxu.com/wordpress/2016/12/how-use-tween-js-animation-easing/

https://www.zhangxinxu.com/study/201612/how-to-use-tween-js.html