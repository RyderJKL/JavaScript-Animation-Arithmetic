import router from '../../router'
import template from './index.html'
import './style.css'

export default class {
  mount(container) {
    document.title = 'bublesort'
    container.innerHTML = template
    this.start()
  }

  start (container) {
    const _hotCitysItems = [
      '乌鲁木齐', '北京', '齐齐哈尔',
      '拉三等奖', '阿萨德', '阿斯兰的范',
      '拉三等奖', '阿萨德', '阿斯兰的范',
      '拉三等奖', '阿萨德', '阿斯兰的范'
    ]

    const hotCitysItems = _hotCitysItems.map(function (item) {
      return { value: item, key: 'city', name: item }
    })

    const _addressItems = [
      {
        "province": "河北",
        "city": [
          "保定市",
          "沧州市"
        ]
      },
      {
        "province": "北京",
        "city": [
          "北京市"
        ]
      },
      {
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },
      {
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      },{
        "province": "北京",
        "city": [
          "北京市"
        ]
      }
    ]

    const basicItemProps = {
      value: 'value',
      key: 'key',
      name: 'name',
      children: 'children'
    }

    const addressItems = _addressItems.map(function (item) {
      const formatItem = {}

      if (item.city && item.city.length > 0) {
        formatItem.children = item.city.map(function (city) {
          return { value: city, key: 'city', name: city }
        })
      }

      formatItem['value'] = item.province
      formatItem['name'] = item.province
      formatItem['key'] = 'province'
      return formatItem
    })

    const timeItms = [
      { value: 'all', key: 'signin_time', name: '全时段', level: 1 },
      { value: 'last_week', key: 'signin_time', name: '近一周', level: 1 },
      { value: 'last_month', key: 'signin_time', name: '近一个月', level: 1 }
    ]

    const statusItems = [
      { value: 'waiting_signup', key: 'status', name: '等待报名', level: 1 },
      { value: 'signup', key: 'status', name: '报名中', level: 1 },
      { value: 'end_signup', key: 'status', name: '报名结束', level: 1 },
      { value: 'signin', key: 'status', name: '活动中', level: 1 },
      { value: 'end_signin', key: 'status', name: '已结束', level: 1 }
    ]

    const formatAddressItems = []

    const queryObj = {
      city: '', // 热门城市
      province: '', // 省份
      status: '', // 活动状态
      signin_time: '', // 时段
    }

    const $addressMenuEle = $('#js-address-menu')
    const $timeMenuEle = $('#js-time-menu')
    const $statusMenuEle = $('#js-status-menu')

    const $jsDialogAddressMenu = $('#js-dialog-address-menu')
    const $jsDialogTimeMenu = $('#js-dialog-time-menu')
    const $jsDialogStatusMenu = $('#js-dialog-status-menu')

    const $menuPanelDialogEle = $('#js-menu-panel-dialog')
    const $addressPanelEle = $('#js-address-panel')
    const $timePanelEle = $('#js-time-panel')
    const $statusPanelEle = $('#js-status-panel')

    const $hotCityBox = $addressPanelEle.find('.hot-city-box')
    let $hotCityItems = ''

    const $menuPanelContainerMask = $('.menu-panel-container-mask')

    $addressMenuEle.on('click', function (e) {
      openSearchMenuPanel('address', true)
    })
    $timeMenuEle.on('click', function (e) {
      openSearchMenuPanel('time', true)
    })
    $statusMenuEle.on('click', function (e) {
      openSearchMenuPanel('status', true)
    })
    $jsDialogAddressMenu.on('click', function (e) {
      openSearchMenuPanel('address')
    })
    $jsDialogTimeMenu.on('click', function (e) {
      openSearchMenuPanel('time')
    })
    $jsDialogStatusMenu.on('click', function (e) {
      openSearchMenuPanel('status')
    })

    $menuPanelContainerMask.on('click', function () {
      $menuPanelDialogEle.hide()
    })

    function handleSearch(queryField) {
      const queryKey = queryField && queryField.key
      const queryName = queryField && queryField.name
      const queryValue = queryField && queryField.value

      if (!queryKey || !queryValue) return

      queryObj[queryKey] = queryValue
      switch (queryKey) {
        case 'city':  // 热门城市
          delete queryObj.province
          $addressMenuEle.text(queryName)
          $jsDialogAddressMenu.text(queryName)
          break;
        case 'province':  // 省份
          delete queryObj.city
          $addressMenuEle.text(queryName)
          $jsDialogAddressMenu.text(queryName)
          break;
        case 'status':  // 活动状态
          $statusMenuEle.text(queryName)
          $jsDialogTimeMenu.text(queryName)
          break;
        case 'signin_time':  // 时段
          $timeMenuEle.text(queryName)
          $jsDialogStatusMenu.text(queryName)
          break;
        default:
          break;
      }

      let queryStr = ''

      for (const key in queryObj) {
        if (queryObj.hasOwnProperty(key)) {
          const value = queryObj[key];
          value && (queryStr += key + '=' + value + '&')
        }
      }

      queryStr = queryStr.replace(/\&$/, '')

      console.log(queryStr);
    }

    function openSearchMenuPanel (menuType, openDialog) {
      openDialog && $menuPanelDialogEle.show()
      let menuTree = ''
      let navContainer = ''

      switch (menuType) {
        case 'address':
          $addressPanelEle.show()
          $timePanelEle.hide()
          $statusPanelEle.hide()
          genarateHotCityItems(hotCitysItems, basicItemProps)
          $hotCityItems = $('.hot-city-box-item')
          menuTree = genarateMenuTree(addressItems, basicItemProps)
          navContainer = $addressPanelEle.find('.nav-container')
          break;
        case 'time':
          $addressPanelEle.hide()
          $timePanelEle.show()
          $statusPanelEle.hide()
          menuTree = genarateMenuTree(timeItms, basicItemProps)
          navContainer = $timePanelEle.find('.nav-container')
          break;
        case 'status':
          $addressPanelEle.hide()
          $timePanelEle.hide()
          $statusPanelEle.show()
          menuTree = genarateMenuTree(statusItems, basicItemProps)
          navContainer = $statusPanelEle.find('.nav-container')
          break;
        default:
          break;
      }

      navContainer.find('ul').remove()
      navContainer.append(menuTree)
      initMenu()
    }

    function genarateHotCityItems(items, itemProps) {
      $hotCityBox.children().remove()

      items.forEach(function (item) {
        const $cityItem = $('<div class="hot-city-box-item"></div>')

        for (const key in itemProps) {
          if (itemProps.hasOwnProperty(key)) {
            const element = item[key];
            $cityItem.attr('data-' + key, element)
            $cityItem.data(key, element)
            $cityItem.text(item[itemProps.name])
          }
        }

        $hotCityBox.append($cityItem)
      })
    }

    function generateMenuItem(item, itemProps, isLeafItem) {
      // const $menuItem = $('<li class="menu-item"><span class="menu-item-name sub-menu-arrow"></li>');
      const $menuItem = $('<li class="menu-item"><span class="menu-item-name"></span></li>');

      $menuItem.find('span').text(item[itemProps.name])
      isLeafItem && $menuItem.addClass('leaf-menu')

      for (const key in itemProps) {
        if (itemProps.hasOwnProperty(key)) {
          const element = itemProps[key];
          $menuItem.data(key, item[element])
          $menuItem.attr("data-" + key, item[element])
        }
      }

      return $menuItem
    }

    function genarateMenuTree(items, itemProps) {
      // itemProps = { value, key, name, children, level }
      const $menuNav = $('<nav class="menu menu-drawer"><ul></ul><nav>')

      items.forEach(function (item) {
        const hasChildren = (item[itemProps.children]) && (item[itemProps.children].length > 0)

        const $menu = generateMenuItem(item, itemProps, !hasChildren)
        const $subMenu = $('<ul class="sub-menu"><ul>')

        $menuNav.children('ul').append($menu)
      })

      return $menuNav
    }

    function catIn (target, parent) {
      const path = []
      let parentNode = target
      while (parentNode && parentNode !== document.body) {
        path.push(parentNode)
        parentNode = parentNode.parentNode
      }
      return path.indexOf(parent) !== -1
    }

    function initMenu () {
      $.fn.reverse = [].reverse;

      $.fn.cousins = function (filter) {
        return $(this).parent().siblings().children(filter);
      };

      $.fn.piblings = function (filter) {
        return $(this).parent().siblings(filter);
      };

      $.fn.niblings = function (filter) {
        return $(this).siblings().children(filter);
      };

      $.fn.update = function () {
        return $(this);
      };

      $.fn.initMenu = function (options) {

        var $this = $(this);

        var settings = $.extend({
          className: 'toggled',
        }, options);

        var className = settings.className;

        var $ul = $this.find('ul'),
          $li = $this.find('li'),
          $a = $this.find('.menu-item-name');

        var $drawers = $a.next($ul),
          $buttons = $drawers.prev($a),
          // $links = $a.not($buttons);
          $leafButtons = $this.find('li.leaf-menu')

        // Toggle menu on-click
        $buttons.on('click', function () {
          var $button = $(this),
            $drawer = $button.next($drawers),
            $piblingDrawers = $button.piblings($drawers);

          // Toggle button and drawer
          $button.toggleClass(className);
          $drawer.toggleClass(className).css('height', '');

          // Reset children
          $drawer.find($buttons).removeClass(className);
          $drawer.find($drawers).removeClass(className).css('height', '');

          // Reset cousins
          $piblingDrawers.find($buttons).removeClass(className);
          $piblingDrawers.find($drawers).removeClass(className).css('height', '');

          // Animate height auto
          $drawers.update().reverse().each(function () {
            var $drawer = $(this);
            if ($drawer.hasClass(className)) {
              var $clone = $drawer.clone().css('display', 'none').appendTo($drawer.parent()),
                height = $clone.css('height', 'auto').height() + 'px';
              $clone.remove();
              $drawer.css('height', '').css('height', height);
            } else {
              $drawer.css('height', '');
            }
          });
        });

        // Close menu
        function closeMenu() {
          $buttons.removeClass(className);
          $drawers.removeClass(className).css('height', '');
        }

        // Close menu after leafButtons is clicked
        $leafButtons.click(function (e) {
          leafClick(e)
        });

        function leafClick(e) {
          e.stopPropagation();
          $menuPanelDialogEle.hide()
          closeMenu();
          const query = $(this).data()
          handleSearch(query)
        }

        $li.on('click', function (e) {
          const query = $(this).data()
          const children = query.children
          if (children && children.length) {
            const $navContainer = $(this).parentsUntil('nav')
            $navContainer.children().remove()
            children.forEach(function (item) {
              const $itemMenu = generateMenuItem(item, basicItemProps, true)
              $itemMenu.on('click', leafClick)
              $navContainer.append($itemMenu)
            })
          } else {
            handleSearch(query)
          }
        })

        $hotCityItems && $hotCityItems.on('click', function (e) {
          const query = $(this).data()
          handleSearch(query)
          $menuPanelDialogEle.hide()
          closeMenu();
        });

        // Close menu when off-click and focus-in
        $(document).on('click focusin', function (event) {
          if (!$(event.target).closest($buttons.parent()).length) {
            closeMenu();
          }
        });
      };

      $('.nav-container').initMenu();
    }
  }
}
