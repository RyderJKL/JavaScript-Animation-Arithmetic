import router from '../../router'
import template from './index.html'
import './style.css'

export default class {
  mount(container) {
    document.title = 'bublesort'
    container.innerHTML = template

    container.querySelector('.home__goto-home').addEventListener('click', () => {
      // 调用 router.go 方法加载 /foo 页面
      router.go({ path: '/' })
    })

    this.start(container)
  }

  start (container) {
    const myCanvas = container.querySelector('#myCanvas')
    const context = myCanvas.getContext && myCanvas.getContext('2d')

    if (!context) {
      console.wran('当前浏览器不支持 Canvas!')
    }

    const heightRatio = 0.6
    const widthRatio = 0.5

    const maxHeightOrWidth = Math.max(700, Math.floor(Math.min(window.innerHeight, window.innerWidth)));

    myCanvas.height = maxHeightOrWidth * heightRatio;
    myCanvas.width = maxHeightOrWidth * widthRatio;

    const barsArray = []

    const barSettings = {
      width: 25,
      heightMultiplier: 20,
      margin: 7
    }

    const colorsArray = ["yellow", "black", "red", "green", "blue", "orange", "purple", "lightgreen", "pink"]

    let xBuffer = barSettings.margin * 2

    for (let i=1; i <= 10; i ++) {
      barsArray.push({
        value: i,
        width: barSettings.width,
        height: barSettings.heightMultiplier * i,
        x: xBuffer,
        y: myCanvas.height - barSettings.heightMultiplier * i - 10,
        color: colorsArray[i % colorsArray.length]
      })

      xBuffer += barSettings.width + barSettings.margin
    }

    drawBars()

    function drawBars() {
      context.fillStyle='lightBlue';
      context.fillRect(0, 0, myCanvas.width, myCanvas.height);

      barsArray.forEach((bar, index, array) => {
        context.beginPath()

        context.fillStyle = bar.color
        context.rect(bar.x, bar.y, bar.width, bar.height)
        context.fill()

        context.font = "20px Times New Roman";
        context.fillStyle = 'black'
        context.fillText(bar.value, bar.x + barSettings.width / 4, bar.y - barSettings.margin);
        context.closePath()
      })
    }

    bublesort(barsArray)

    function bublesort(barsArray) {
      const len = barsArray.length

      for (let i = 0; i < len; i ++) {
        for (let j = 0; j < len - i - 1; j++) {
          if (barsArray[j].value > barsArray[j + 1].value) {
            const tmp = barsArray[j]
            barsArray[j] =  barsArray[j + 1]
            barsArray[j + 1] = tmp
          }
        }
      }
    }
  }

  shuffle (array) {

  }
}
