import "./style.css";
import animation from "./animation";
// 容器元素
const eleContainer: HTMLElement | null = document.getElementById("container");
// 标题元素（同时作为方法关键字）
const eleTitles = (eleContainer as HTMLElement).getElementsByTagName("h4");
// 循环标题
for (let indexTitle = 0; indexTitle < eleTitles.length; indexTitle += 1) {
  (function (index) {
    // 标题元素
    const eleTitle = eleTitles[index];
    // 标题对应的动画关键字
    const animationType = eleTitle.innerHTML;
    // 找到球元素
    var eleBall = (eleTitle.parentNode as ParentNode).querySelectorAll("i")[0];

    // 是否正在运动
    let isMoving = false;

    // 点击球触发运动
    if (eleBall) {
      eleBall.onclick = function () {
        if (isMoving == true) {
          return;
        }
        animation(
          0,
          700 - 42,
          (value: string | number): void => {
            eleBall.style.transform = "translateX(" + value + "px)";
          },
          animationType,
          600
        );
      };
    }
  })(indexTitle);
}
