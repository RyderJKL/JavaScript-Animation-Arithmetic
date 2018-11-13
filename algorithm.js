/**
 * Created by onejustone on 2017/3/7.
 */


(function () {

  // 冒泡排序
  /**
   *
   * 有 n 个数，只需进行 n-1 趟排序
   * 每趟排序只需进行 n-i 次比较
   *
   **/
  function bubbleSort(arr) {
    // 冒泡排序
    let tempArr = arr.concat();
    let len = tempArr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i; j++) {
        if (tempArr[j] > tempArr[j + 1]) {
          let temp = tempArr[j]
          tempArr[j] = tempArr[j + 1]
          tempArr[j + 1] = temp
        }
      }
    }

    return tempArr;
    // 返回排序后的数组
  }


  // 快速排序
  /**
   * 快速排序的过程就是将基准数进行归位的过程
   * **/
  function quickSort(arr) {
    // 快速排序
    let tempArr = arr.concat()
    let len = tempArr.length
    let left = 0;
    let right = len - 1;


    sort(left, right);

    function sort(left, right) {
      let temp = tempArr[left];
      // temp 存放的就是基准数
      if (left > right) {
        // 排序完成
        return;
      }

      let i = left;
      let j = right;

      while (i != j) {
        while (tempArr[j] >= temp && i < j) {
          // 顺序很重要，要先从右边开始，因为我们假设的基准数是有左边第一位
          j--;
        }

        while (tempArr[i] <= temp && i < j) {
          // 再找左边的
          i++;
        }

        if (i < j) {
          // 交换两个数的位置，即:
          // 右边小于基准数的数和左边大于基准数的数
          let temp2 = tempArr[i];
          tempArr[i] = tempArr[j];
          tempArr[j] = temp2;
        }
      }

      // 将基准数归位
      tempArr[left] = tempArr[i];
      tempArr[i] = temp;

      arguments.callee(left, i - 1);
      // 继续处理左边的
      arguments.callee(i + 1, right)
      // 继续处理右边的
    }

    return tempArr;
    // 返回排序后的数组
  }


  /**
   *
   * 栈: 一种表示先进后出的数据结构。只能在一端进行插入和删除操作
   *
   *
   * **/

  function isHuiWen(str) {
    // 栈的应用，判断回文字符串
    let len = str.length

    let mid = Math.floor(len / 2) - 1;
    // mid 如果一个字符串是回文的话，那么它一定是中间对称的，我们需要求其 "中点"
    let stack = []
    // stack 代表一个栈数组
    // 初始化 栈

    for (i = 0; i <= mid; i++) {
      // 将 mid 之前的字符全部推入栈中
      stack.unshift(str[i]);
    }

    let next = 0;
    // 代表开始匹配的下标


    if (len % 2 == 0) {
      // 如果字符串的长度是偶数，那么开始匹配的下标等于 mid + 1
      next = mid + 1;
    } else {
      next = mid + 2;
    }

    for (next; next < len - 1; next++) {
      // 开始匹配，如果 stack 的长度为 0，则代表一一匹配了
      if (stack.shift() == str[next]) {
        break;
      }
    }

    if (stack.length == 0) {
      console.log("yes")
    } else {
      console.log("no")
    }
  }
})();


/*
 *  深度优先搜索
 *
 *
 * */
function fullPermutation(n) {
  // 深度优先搜索实现全排列
  let boxs = []
  // 定义盒子
  let cards = []
  // 定义拿在手里的卡牌


  for (let i = 1; i <= n; i++) {
    // 初始化盒子和卡牌
    // 0 表示盒子可用或者卡牌可用
    boxs[i] = 0;
    cards[i] = 0;
  }

  let start = 1;
  // 从第一个盒子开始放卡牌
  (function dfs(step) {
    // step 表示站在第几个盒子
    if (step == n + 1) {
      // 边界条件
      // step == n + 1 表示所有盒子都被放过了
      console.log(boxs)
      // 输出一种排列
      return;
      // 返回之前的一步，(最近一次调用 dfs 函数的地方)
    }

    // 此时站第 step 个盒子面前，应该放那张牌呢?
    // 按照1,2,3,...n 的顺序一一尝试
    for (let i = 1; i <= n; i++) {
      if (cards[i] == 0) {
        // 判断卡牌是否还在手里
        // cardsp[i] === 0 表示第 i 号卡牌还在手里
        // 然后开始尝试使用卡牌 i
        boxs[step] = i;
        // 将 i 号卡牌放入到第 step 个盒子中
        cards[i] = 1;
        // 将 cards[i] 设置为 1，表示第 i 号卡牌已经不再手里

        dfs(step + 1);
        // 第 step 盒子已经放好卡牌，开始走到下一个盒子面前
        cards[i] = 0;
        // 将尝试过的卡牌回收(这一步很重要)
      }
    }
  })(start);
}
