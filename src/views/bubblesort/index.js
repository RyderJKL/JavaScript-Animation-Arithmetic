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
    console.log(myCanvas);
    console.log('start bubble sort')
  }
}
