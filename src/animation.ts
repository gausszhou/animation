/**
 * @author gausszhou(.top)
 * @author zhangxinxu(.com)
 * @description 让Tween.js缓动算法更容易理解和使用
 * @link 需要先引入Tween.js - npm install @tween/tween.js
 * @link https://github.com/zhangxinxu/Tween/blob/master/tween.js
 * @link https://github.com/zhangxinxu/Tween/blob/master/animation.js
 */

import tween from "./tween.js";

interface RequestAnimationFrame {
  (callback: FrameRequestCallback): number;
}
interface CancelAnimationFrame {
  (handler: number): void;
}

type AnimationFunc = (a: any, b?: any, c?: any, d?: any, e?: any, f?: any, ...items: any[]) => number;

interface AnimationSubject {
  [key: string]: AnimationFunc;
}

/**
 * 对运动方法进行封装
 * @method animation
 * @param {*} from
 * @param {*} to
 * @param {*} duration
 * @param {*} easing
 * @param {*} callback
 * @returns
 */

const animation = function (
  from: number,
  to: number,
  callback: (v: any) => any,
  easing: string,
  duration: string | number
) {
  const isFunction = function (obj: any) {
    return typeof obj == "function";
  };
  const isNumber = function (obj: any) {
    return typeof obj == "number";
  };
  const isString = function (obj: any) {
    return typeof obj == "string";
  };

  // 转换成毫秒
  // 1000 => 1000
  // 1000ms ==> 1000
  // 1s ==> 1000
  var toMillisecond = function (obj: any): number {
    if (isNumber(obj)) {
      return obj;
    } else if (isString(obj)) {
      if (/\d+m?s$/.test(obj)) {
        if (/ms/.test(obj)) {
          return 1 * obj.replace("ms", "");
        }
        return 1000 * obj.replace("s", "");
      } else if (/^\d+$/.test(obj)) {
        return +obj;
      }
    }
    return -1;
  };
  // check from and to
  if (!isNumber(from) || !isNumber(to)) {
    if (window.console) {
      console.error("from和to两个参数必须且为数值");
    }
    return 0;
  }

  // duration, easing, callback 均为可选参数，而且顺序可以任意

  const options = {
    duration: 300,
    easing: "Linear",
    callback: function (a: any, b?: any) {
      return a + b;
    },
  };

  const setOptions = function (obj: any) {
    if (isFunction(obj)) {
      options.callback = obj;
    } else if (toMillisecond(obj) != -1) {
      options.duration = toMillisecond(obj);
    } else if (isString(obj)) {
      options.easing = obj;
    }
  };
  setOptions(duration);
  setOptions(easing);
  setOptions(callback);

  // requestAnimationFrame polyfill
  let requestAnimationFrame: RequestAnimationFrame = window.requestAnimationFrame;
  if (!window.requestAnimationFrame) {
    requestAnimationFrame = function (fn) {
      return setTimeout(fn, 17);
    };
  }

  let cancelAnimationFrame: CancelAnimationFrame = window.cancelAnimationFrame;
  if (!window.cancelAnimationFrame) {
    cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }

  // 确保首字母大写
  options.easing = options.easing.slice(0, 1).toUpperCase() + options.easing.slice(1);
  const arrKeyTween = options.easing.split(".");

  // kebab case to lower camel case
  const toLowerCamelCase = (str: string) => {
    const reg = /-(\w)/g;
    // @ts-ignore
    return str.replace(reg, function ($: string, $1: string):string {
      return $1.toUpperCase();
    });
  };

  // 当前动画算法
  let fnGetValue: AnimationFunc = ()=>{ return 0};
  if (arrKeyTween.length == 1) {
    fnGetValue = tween[arrKeyTween[0]] as unknown as any;
  } else if (arrKeyTween.length == 2) {
    const obj = arrKeyTween[0];
    const key = toLowerCamelCase(arrKeyTween[1]);
    fnGetValue = tween[obj] && ((tween[obj] as AnimationSubject)[key] as AnimationFunc);
  }

  if (isFunction(fnGetValue) == false) {
    console.error('没有找到名为"' + options.easing + '"的动画算法');
    return;
  }
  // 算法需要的几个变量
  let start = 0;
  // during 根据设置的总时间计算
  const during = Math.ceil(options.duration / 17);
  // 动画请求帧
  let req: any = null;
  // 运动
  const step = function () {
    // 当前的运动位置
    const value = fnGetValue(start, from, to - from, during);

    // 时间递增
    start++;
    // 如果还没有运动到位，继续
    if (start <= during) {
      options.callback(value);
      req = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(req)
      // 动画结束，这里可以插入回调...
      options.callback(to, true);
    }
  };
  // 开始执行动画
  step();

  return function () {
    return req;
  };
};

export default animation;
