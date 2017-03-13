
---
### 0x01 排序


#### 冒泡排序

冒泡排序的基本思想是每次比较两个相邻的数，如果他们的顺序错误就将他们交换过来。

如果有 n 个数进行排序，只需将 n-1 个数归位，就是说只需进行 n-1
 趟排序。而"每一趟"排序都需要从第 1 位开始进行相邻两个数的比较，将比校大的一个数放在后面，比较完毕以后向后移一位继续比较下面两个相邻数的大小，重复此步骤，直到最后一位尚未归位的数。
  
  下面是 JavaScript 冒泡排序的代码实现:
  
  ``` 
  function bubbleSort(arr) {
  		let tempArr = arr.concat();
  		let len = tempArr.length;
  		for (let i = 0; i < len - 1; i++) {
  			for (let j = 0; j < len - i; j++) {
  			// 算法核心在于双重循环
  				if (tempArr[j] > tempArr[j + 1]) {
  					let temp = tempArr[j]
  					tempArr[j] = tempArr[j + 1]
  					tempArr[j + 1] = temp
  				}
  			}
  		}
  
  		return tempArr;
  	}
  ```

冒泡排序的核心部分在于其双重嵌套循环。其时间复杂度是 O(N2)。


#### 快速排序
快速排序是基于"二分"的思想，其相比于冒泡排序比较快，是因为快速排序每次交换是跳跃式的。

实现原理是:每次排序的时候设置一个 **基准点**,
将小于基准点的数全部放到基准点的左边，将大于基准点的数全部放到基准点的右边。当左边与右边相遇的时候将基准点归位。

``` 
function quickSort(arr) {
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
```

快速排序的最差时间复杂度和冒泡排序是一样的都是 O(N2)，它的平均时间复杂度是 O(NlogN)。

---
### 0x03 数据结构

#### 栈

栈是一种后进先出的数据结构。只能在一端进行插入和删除操作。在 JavaScript 
中，我们并不需要使用 C 语言中的 `struct` 去构造自定义的数据结构。 使用 
JavaScript 中的 `Array.prototype.shift()` 和 
`Array.prototype.unshift()` 就可以轻松的实现对 **栈** 的模拟。

下面是栈这种数据结构的简单应用，判断回文字符串：

```  
function isHuiWen (str){
	
		let len = str.length

		let mid = Math.floor(len / 2) -1;
		// mid 如果一个字符串是回文的话，那么它一定是中间对称的，我们需要求其 "中点"
		let stack = []
		// stack 代表一个栈数组
		// 初始化 栈

		for( i = 0; i <= mid; i ++){
			// 将 mid 之前的字符全部推入栈中
			stack.unshift(str[i]);
		}

		let next = 0;
		// 代表开始匹配的下标
		
		
		if (len % 2 == 0){
			// 如果字符串的长度是偶数，那么开始匹配的下标等于 mid + 1
			next = mid +1;
		} else {
			next = mid +2;
		}
		
		for(next; next < len -1;next++){
			// 开始匹配，如果 stack 的长度为 0，则代表一一匹配了
			if ( stack.shift() == str[next]){
				break;
			}			
		}

		if (stack.length == 0){
			console.log("yes")
		} else {
			console.log("no")
		}
	}

	isHuiWen('abcdcba')
```

---
### 0x02 搜索算法

#### DFS(Depth First Search) 深度优先搜索

深度优先搜索的关键在于解决 "当下该如何做(dfs函数解决当下该如何做的问题)"。至于 "下一步该如何做"则与 "当下该如何做" 是一样的。

下面的代码是解决深度优先搜索的基本模型:

```  
function dfs (step) {
    // 判断边界
    if (/*条件*/) {
        return;
    }
    for(let i=1;i<=n;i++){
     // 尝试每一种可能
     dfs(step + 1)
     // 继续下一步
    }
    
    return;
    // 返回
}
```

#### 深度优先实现全排列

123 的全排列有 6 种:[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]。

当然套用数学公式这很好计算，但是如果我们想使用全排列来实现对1~n，的全排列呢?

换个说法，假如我们有编号1,2,3的 3 张卡牌和编号1,2,3的 3 个盒子。现在需要将这 3 张牌分别放到 3 个盒子里面，每个盒子有且只能放一张卡牌。那么一共有多少种不同的方法?

我们定义 `box []` 数组表示盒子,定义 `card[]` 数组表示那在手里的卡牌。


下面是深度优先实现这个游戏(全排列)的完整代码:

``` 
function fullPermutation (n){
	let boxs = []
	// 定义盒子
	let cards = []
	// 定义拿在手里的卡牌
	

	for (let i = 1; i <= n; i ++){
		// 初始化盒子和卡牌
		// 0 表示盒子可用或者卡牌可用
		boxs[i] = 0;
		cards[i] =0;
	}

	let start = 1;
	// 从第一个盒子开始放卡牌
	(function dfs (step){
		// step 表示站在第几个盒子
		if ( step == n+1){
			// 边界条件
			// step == n + 1 表示所有盒子都被放过了
			console.log(boxs)
			// 输出一种排列 
			return;
			// 返回之前的一步，(最近一次调用 dfs 函数的地方)
		}

		// 此时站第 step 个盒子面前，应该放那张牌呢?
		// 按照1,2,3,...n 的顺序一一尝试
		for (let i=1;i <=n; i ++){
			if ( cards[i] == 0){
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

	return;
	
}
```

---
### 0x0 最短路径

#### Floyd-Warshall 算法


#### Dijkstra 算法


---
### 0x0 树