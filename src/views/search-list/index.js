import router from '../../router'
import template from './index.html'
import './style.css'
// import './jquery.ba-throttle-debounce.min.js'

export default class {
  constructor () {
    this.resultList = []
  }

  debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp

      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }

    return function (...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  }

  mount(container) {
    const self = this
    document.title = 'foo'
    container.innerHTML = template

    // $.ajax({
    //   url: 'https://www.github.com/search?q=onejustone&type=Users',
    //   crossDomain: true,
    //   xhrFields: {
    //     withCredentials: true
    //   },
    //   type: 'GET',
    //   success: function (data) {
    //     console.log(data)
    //   }
    // })

    const listProps = { id: 'id', value: 'value' }

    const testDataList = [
      { id: 'debug1', value: '[12.09 周日] 莲花山滑雪｜赠送390元雪票-全新雪具-免费教学-京郊最近大型滑雪场' },
      { id: 'debug2', value: '[12.08 周六] 尤克里里×非洲鼓×桌游体验' },
      { id: 'debug3', value: '（余位不多）[12.08/12.09 周末]北宋温泉｜穿越北宋朝泡温泉 梦回杨柳青赏年画 休闲一日' },
      { id: 'debug4', value: '[12.29晚-01.01 元旦]走进北国冰雪童话世界 | 雪乡' },
      { id: 'debug5', value: '[12.30早-12.31 元旦] CS+打树花--刺激和休闲的绝佳配合' },
      { id: 'debug6', value: '[12.08/12.09 周末]特惠赠门票｜人间仙境白石山一日游' },
      { id: 'debug7', value: '[12.08 周六]碧霞山｜重返侏罗纪-探索神奇丹霞地貌' },
      { id: 'debug8', value: '[12.09 周日] 莲花山滑雪｜赠送390元雪票-全新雪具-免费教学-京郊最近大型滑雪场' },
      { id: 'debug9', value: '[12.08 周六] 渔阳滑雪，你一定不能错过！' },
      { id: 'debug10', value: '[12.08 周六]天漠｜大漠苍凉龙门飞甲-柳沟豆腐宴永宁古城一日休闲' },
      { id: 'debug11', value: '（疯抢中）[12.15/12.16 周末]北京雪乡｜第二届玉渡山雪世界 特价128全含' },
      { id: 'debug12', value: '周日 温莎KTV（花园桥店）唱歌＋狼人杀' },
    ]

    const $searchInput = $('#search-input')
    const $searchListPanel = $('.activity-search-wrap .search-list_result-panel')

    const $selectedListBox = $('.activity-search-wrap .selected-list')
    const $selectedListPanel = $('.activity-search-wrap .selected-list_panel')

    const selectedItems = [] // 已经选择的活动
    const notSelectedItems = []

    $searchInput.blur(function () {
      const value = $searchInput.val().trim()
      !value && $searchListPanel.hide()
    })

    const searchItemWithInputValue = this.debounce(function () {
      const val = $searchInput.val().trim()
      if (!val) return

      let selectedItemsFromQueryItems = []
      let notSelectedItemsFromQueryItems = []

      const queryItems = querySearch(testDataList, val, listProps.value)

      queryItems.forEach(function (item) {
        const isSelectedItem = selectedItems.find(function (selectedItem) {
          return isValueEqualStr(selectedItem[listProps.value], item[listProps.value])
        })

        isSelectedItem &&
        selectedItemsFromQueryItems.push(item) ||
        notSelectedItemsFromQueryItems.push(item)
      })

      $searchListPanel.css('display', 'block')
      // selectedItemsFromQueryItems
      // render
    }, 300)

    $searchInput.keyup(searchItemWithInputValue)

    function isValueEqualStr(source, target) {
      return source.toLowerCase().indexOf(target.toLowerCase()) !== -1
    }

    function querySearch(arr, _value) {
      const createfilter = function (value) {
        return function (listItem) {
          return isValueEqualStr(listItem[listProps.value], value)
        }
      }

      return arr.filter(createfilter(_value))
    }
  }
}
