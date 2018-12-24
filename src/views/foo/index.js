import router from '../../router'

import template from './index.html'
import './style.css'

export default class {
  mount(container) {
    // console.log(container);
    console.log(document.querySelector('.content'))
    const content = container.querySelector('.content')
    console.log(container.querySelector('.foo__gobar'));
    document.title = 'foo'
    container.innerHTML = template
    container.querySelector('.foo__gobar').addEventListener('click', () => {
      // 调用 router.go 方法加载 /bar 页面
      router.go('/bar')
    })
  }
}
