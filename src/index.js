import bubbleSort from './bubbleSort'
import './style/main.scss'

function start() {
  // const appEle = document.querySelector('#app')
  // appEle.style.color = 'red'
  const array = [1, 2, 4, 4, 4, 5, 6, 3, 7, 2, 1, 9, 8]
  const uniqueSet = new Set(array)
  const uniqueArray = Array.from(uniqueSet)
  console.log(uniqueArray)
  // const tmp = new Map()
  // const ret = []

  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index]
  //   if (!tmp.get(element)) {
  //     tmp.set(element, 1)
  //     ret.push(element)
  //   }
  // }

  // console.log(ret)
  // const bubbleSortArray = bubbleSort(array)
  // console.log(bubbleSortArray)
}

start()
