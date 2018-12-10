import router from '../../router'
import template from './index.html'
import './style.css'
import Sortable from 'sortablejs'

export default class {
  mount(container) {
    const self = this
    document.title = 'foo'
    container.innerHTML = template

    function catIn(target, parent) {
      const path = []
      let parentNode = target
      while (parentNode && parentNode !== document.body) {
        path.push(parentNode)
        parentNode = parentNode.parentNode
      }
      return path.indexOf(parent) !== -1
    }

    function debounce(func, wait, immediate) {
      let timeout, args, context, timestamp, result

      const later = function () {
        const last = +new Date() - timestamp

        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last)
        } else {
          timeout = null
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
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
          result = func.apply(context, args)
          context = args = null
        }

        return result
      }
    }

    const testDataList = [
      { id: 'debug1',  value: '[12.09 周日] 莲花山滑雪｜赠送390元雪票-全新雪具-免费教学-京郊最近大型滑雪场' },
      { id: 'debug2',  value: '[12.08 周六] 尤克里里×非洲鼓×桌游体验' },
      { id: 'debug3',  value: '（余位不多）[12.08/12.09 周末]北宋温泉｜穿越北宋朝泡温泉 梦回杨柳青赏年画 休闲一日' },
      { id: 'debug4',  value: '[12.29晚-01.01 元旦]走进北国冰雪童话世界 | 雪乡' },
      { id: 'debug5',  value: '[12.30早-12.31 元旦] CS+打树花--刺激和休闲的绝佳配合' },
      { id: 'debug6',  value: '[12.08/12.09 周末]特惠赠门票｜人间仙境白石山一日游' },
      { id: 'debug7',  value: '[12.08 周六]碧霞山｜重返侏罗纪-探索神奇丹霞地貌' },
      { id: 'debug8',  value: '[12.09 周日] 莲花山滑雪｜赠送390元雪票-全新雪具-免费教学-京郊最近大型滑雪场' },
      { id: 'debug9',  value: '[12.08 周六] 渔阳滑雪，你一定不能错过！' },
      { id: 'debug10',  value: '[12.08 周六]天漠｜大漠苍凉龙门飞甲-柳沟豆腐宴永宁古城一日休闲' },
      { id: 'debug11',  value: '（疯抢中）[12.15/12.16 周末]北京雪乡｜第二届玉渡山雪世界 特价128全含' },
      { id: 'debug12',  value: '周日 温莎KTV（花园桥店）唱歌＋狼人杀' }
    ]

    const listProps = { id: 'id', value: 'value' }

    const $searchInput = $('#search-input')
    const $searchListPanel = $('.activity-search-wrap .search-list_result-panel')
    const $searchListContainer = $('.activity-search-wrap .search-list')
    const $selectedListPanel = $('.activity-search-wrap .selected-list .selected-list_panel')
    const $ListPanelItem = $('.selected-list_panel')

    let selectedItems = [] // 已经选择的活动

    const searchListbuttonEvents = {
      'add': handleSearchListAddbuttonClick,
      'delete': handleSearchListDeleteButtonClick
    }

    const selectedListButtonEvents = {
      'delete': handleSelectedListDeleteButtonClick
    }

    $searchListPanel.on('click', handleSearchListButtonClick)
    $selectedListPanel.on('click', handleSelectedListButtonClick)

    const el = document.getElementById('selected-list_panel');
    const sortable = new Sortable(el, {
      onEnd: handleSelectedListOnEnd
    })

    $('body').on('click', function (e) {
      if (!catIn(e.target, $searchListContainer[0])) {
        $searchListPanel.hide()
      }
    })

    function handleSelectedListOnEnd (evt) {
      const oldIndex = evt.oldIndex
      const newIndex = evt.newIndex
      const targetRow = selectedItems.splice(oldIndex, 1)[0]
      selectedItems.splice(newIndex, 0, targetRow)
    }

    function handleSearchListAddbuttonClick(targetListItem) {
      const id = targetListItem.dataset['id']
      const origintItem = testDataList.find(function (item) {
        return item[listProps.id] === id
      })

      selectedItems.unshift(origintItem)
      removeClickListItem(targetListItem)
      renderSearchListSelectedItems(selectedItems)
      renderSelectedItemsToSelectdList(selectedItems)
    }

    function handleSearchListDeleteButtonClick(targetListItem) {
      const id = targetListItem.dataset['id']
      selectedItems = selectedItems.filter(function (item) {
        return item[listProps.id] !== id
      })

      removeClickListItem(targetListItem)
      renderSelectedItemsToSelectdList(selectedItems)
    }

    function handleSelectedListDeleteButtonClick (targetListItem) {
      const id = targetListItem.dataset['id']
      selectedItems = selectedItems.filter(function (item) {
        return item[listProps.id] !== id
      })
      removeClickListItem(targetListItem)
    }

    function removeClickListItem(targetListItem) {
      const listItemContainer = targetListItem.parentNode
      let deleteTimer = setTimeout(() => {
        listItemContainer.removeChild(targetListItem)
        clearTimeout(deleteTimer)
        deleteTimer = null
      }, 0)
    }

    function handleSelectedListButtonClick (e) {
      let buttonType = ''

      const clickTargetEle = e.target
      const clickTargetEleClassList = clickTargetEle.classList

      const isButton = clickTargetEleClassList.contains('button')
      if (!isButton) return

      const targetListItem = clickTargetEle.parentNode

      clickTargetEleClassList.contains('delete-button') &&
      (buttonType = 'delete')

      selectedListButtonEvents[buttonType](targetListItem)
    }

    function handleSearchListButtonClick(e) {
      let buttonType = ''

      const clickTargetEle = e.target
      const clickTargetEleClassList = clickTargetEle.classList

      const isButton = clickTargetEleClassList.contains('button')
      if (!isButton) return

      const targetListItem = clickTargetEle.parentNode

      clickTargetEleClassList.contains('add-button') &&
      (buttonType = 'add')

      clickTargetEleClassList.contains('delete-button') &&
      (buttonType = 'delete')

      searchListbuttonEvents[buttonType](targetListItem)
    }

    let searchItemWithInputValue = function () {
      const val = $searchInput.val().trim()

      let selectedItemsFromQueryItems = []
      let notSelectedItemsFromQueryItems = []

      const queryItems = querySearch(testDataList, val, listProps.value)
      queryItems.forEach(function (item) {
        const isSelectedItem = selectedItems.find(function (selectedItem) {
          return isValueEqualStr(selectedItem[listProps.value], item[listProps.value])
        })

        isSelectedItem &&
        (selectedItemsFromQueryItems.push(item)) ||
        (notSelectedItemsFromQueryItems.push(item))
      })

      $searchListPanel.css('display', 'block')

      renderSearchListNotSelectedItems(notSelectedItemsFromQueryItems)
      renderSearchListSelectedItems(selectedItemsFromQueryItems)
    }

    searchItemWithInputValue = debounce(searchItemWithInputValue, 300)

    $searchInput.focus(searchItemWithInputValue)
    $searchInput.keyup(searchItemWithInputValue)

    function renderSelectedItemsToSelectdList(_selectedItems) {
      $selectedListPanel.children().remove()
      _selectedItems.forEach(function (item) {
        const listItem = '<li class="list_panel_item selected-list_panel_item"' +
        'data-id=' + item[listProps.id] + '>' +
        '<span class="list_panel_item_name">' +
        item[listProps.value] +
        '</span>' +
        '<i class="button delete-button icon delete-icon">x</i>' +
        '</li>'
        $selectedListPanel.append(listItem)
      })
    }

    function renderSearchListSelectedItems(items) {
      if (!Array.isArray(items) || !items.length) {
        $searchListPanel.children('.selected').remove()
        return
      }

      $searchListPanel.children('.selected').remove()

      items.forEach(function (item) {
        const listPanelItemEle = '<li class="list_panel_item selected"' +
        'data-id=' + item[listProps.id] + ' ' +
        '>' +
        '<span class="list_panel_item_name">' +
          item[listProps.value] + '</span>' +
        '<span class="button delete-button">已添加 可移除</span></li>'
        $searchListPanel.append(listPanelItemEle)
      })
    }

    function renderSearchListNotSelectedItems(items) {
      if (!Array.isArray(items) || !items.length) {
        $searchListPanel.children('.not-selected').remove()
        return
      }

      $searchListPanel.children('.not-selected').remove()

      items.forEach(function (item) {
        const listPanelItemEle = '<li class="list_panel_item not-selected"' +
        'data-id=' + item[listProps.id] + ' ' +
        '>' +
        '<span class="list_panel_item_name ">' +
          item[listProps.value] + '</span> <span class="button add-button">添加</span></li>'
        $searchListPanel.append(listPanelItemEle)
      })
    }

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
