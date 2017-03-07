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
})();