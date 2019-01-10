import template from './index.html';
import './style.less';

export default class {
  constructor() {
    this.teamId = 'LXExZjBxdOhV'
    this.categoryList = [];
    this.serverDataList = [];

    this.categoryTableMapList = [];
    this.activeTabIndex = 0;
    this.selectedSeatList = [];

    this.lanunchInit();
  }

  lanunchInit () {
    const self = this;

    $.ajax({
      url: 'https://misc.lingxi360.com/seat/index?team_id=LXExZjBxdOhV',
      data: {},
      dataType: 'json',
      type: 'GET',
      success: function (data) {
        if (data && data.data) {
          const serverData = data.data;
          self.categoryList = serverData.config;
          self.serverDataList = serverData["data_list"];
          self.renderTabLayout();
        }
      }
    });
  }

  renderTabLayout () {
    const $seatAppContainer = $('.seat-app-container');
    const $seatAppHeaderTab = $('.seat-app-header-tab');
    const $seatAppTableListContainer = $('.seat-app-table-list-container');
    const $seatAppFooter = $('.seat-app-footer');

    const $submitConfirmBtn = $('.seat-app-footer .price_confirm_btn');
    const $submitCheckModal = $('.seat-app-container .submit-check-modal');
    const $checkSubmitButton = $('.seat-app-container .check-submit-button');

    const $detailModal = $('.seat-app-container .shopping-car-detail-modal');
    const $detailBtn = $('.seat-app-footer .total_detail_btn');

    const $preivewRotateButton = $('.seat-app-bg-img-preivew .seat-app-bg-img-preivew__rotate-button');
    const $bgPreivewImgModal = $('.seat-app-container .bg-preivew-img-modal');
    const $bgPreivewImgModalClose = $('.seat-app-container .bg-preivew-img-modal .modal-close');

    $preivewRotateButton.on('click', function () {
      $bgPreivewImgModal.show();
    });

    $bgPreivewImgModalClose.on('click', function () {
      $bgPreivewImgModal.hide();
    })

    const self = this;

    this.categoryTableMapList = this.formatTableList(this.categoryList, this.serverDataList);

    if (!this.categoryTableMapList.length) return;

    this.renderSeatAppHeaderTab($seatAppHeaderTab, this.categoryTableMapList, this.activeTabIndex);
    this.renderActiveTabTables($seatAppTableListContainer, this.categoryTableMapList[0]);

    $('.seat-app-header-tab_item').on("click", function () {
      // 处理座位点击事件
      self.activeTabIndex = $(this).data('index');
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      $seatAppTableListContainer.children().remove();
      self.renderActiveTabTables($seatAppTableListContainer, self.categoryTableMapList[self.activeTabIndex]);
    });

    $submitConfirmBtn.on('click', function () {
      if (!self.selectedSeatList.length) return;

      let seatIds = self.selectedSeatList.reduce((accumulator, item) => {
        return accumulator = accumulator.concat(item['seat_id'], ',');
      }, '')

      seatIds = seatIds.replace(/,$/, '')

      const submitServerData = {
        'team_id': self.teamId,
        'seat_ids': seatIds
      }

      // 处理确认选座的事件
       $.ajax({
           url: "https://misc.lingxi360.com/seat/submit",
           data: submitServerData,
           type: "POST",
           dataType: "json",
           success: function (data) {
             console.log(data);
             if (data.status == "success") {
              const redirectUrl = data.message;
              location.assign(redirectUrl)
             } else {
               const hasRepeatSeats = data.message;
               if (Array.isArray(hasRepeatSeats) && hasRepeatSeats.length) {
                  self.renderSubmitRepeatSeats(hasRepeatSeats);
                  $submitCheckModal.toggle();
               } else {
                 console.warn('返回了重复消息，但是确没有重复数据!');
               }
             }
           }
         })
    });

    $checkSubmitButton.on('click', function () {
      $submitCheckModal.hide()
      window.location.reload();
    });

    $detailModal.on('click', function () {
      $detailModal.hide();
    });

    $detailBtn.on('click', function () {
      const $shoppingCarDetailList = $('.shopping-car-detail-modal .shopping-car-detail_list');
      $shoppingCarDetailList.children().remove();

      const selectedCategoryMap = self.selectedSeatList.reduce((accumulator, item) => {
        const targetCategory = self.categoryList.find(category => category['category_id'] === item['category_id']);

        if (!targetCategory) {
          console.warn('在计算详情小计时没有找到对应的 category', 'seat item is:', item);
        } else {
          if (!accumulator[targetCategory['category_id']]) {
            accumulator[targetCategory['category_id']] = {
              name: targetCategory.name,
              price: targetCategory.price,
              count: 0,
              totalPrice: 0
            }
          }

          accumulator[targetCategory['category_id']]['count'] = accumulator[targetCategory['category_id']]['count'] + 1;
          accumulator[targetCategory['category_id']]['totalPrice'] = accumulator[targetCategory['category_id']]['count'] * targetCategory.price;
        }

        return accumulator;
      }, {})

      Object.keys(selectedCategoryMap).forEach(key => {
        const price = self.prettyNumberToMoney({ prefix: '', number: selectedCategoryMap[key].price });
        const totoalPrice = self.prettyNumberToMoney({ prefix: '', number: selectedCategoryMap[key].totalPrice });

        const $shoppingCarListItem = $(`<li class="shopping-car-detail_list_item">
          <span class="table-name">${selectedCategoryMap[key].name}</span>
          <span class="seat-unit-price">
              ¥<span class="seat-unit-price_number">${price}</span>/位
          </span>
          <span class="seat-count">
            x<span class="seat-count_number">${selectedCategoryMap[key].count}</span>
          </span>
          <span class="seat-total-price">¥${totoalPrice}</span>
        </li>`)

        $shoppingCarDetailList.append($shoppingCarListItem);
      })

      $detailModal.toggle();
    })

    const tabHeaderOriginOffsetTop = $seatAppHeaderTab.offset().top;

    function hanleWindowScroll () {
      const windowScrollTop = $(window).scrollTop();

      if (windowScrollTop >= tabHeaderOriginOffsetTop) {
        $seatAppHeaderTab.addClass('fixed-top');
      } else {
        $seatAppHeaderTab.removeClass('fixed-top');
      }
    }

    hanleWindowScroll = self._debounce(hanleWindowScroll, 10);

    $(window).on('scroll', function () {
      hanleWindowScroll()
    })
  }

  handleTableColItemCellClick ($tableColItemCell) {
    const $footerShoppingCarTotalPrice = $('.seat-app-footer .total_price');

    let cellData = $tableColItemCell.data();

    if (cellData.status !== 'select') return;

    cellData = {
      ...cellData,
      status: 'selected'
    }

    $tableColItemCell.toggleClass('table_col_item_cell__current_selected');

    const addOrRemove = (array, element) => {
      const exist = array.find(item => item['seat_id'] === element['seat_id']);

      if (!exist) {
        array.push(element);
      } else {
        array = array.filter(item => item['seat_id'] !== element['seat_id']);
      }

      return array;
    }

    this.selectedSeatList = addOrRemove(this.selectedSeatList, cellData);

    let totalPrice = this.selectedSeatList.reduce((accumulator, seatData) => {
      const targetCategory = this.categoryList.find(category => {
        return seatData['category_id'] === category['category_id'];
      })

      if (!targetCategory) {
        console.warn('没有找到当前座位对应的 category', 'seatData is:', seatData);
      } else {
        accumulator += this.sum(targetCategory['price']);
      }

      return accumulator
    }, 0)

    totalPrice = totalPrice || 0;

    totalPrice = this.prettyNumberToMoney({
      number: totalPrice,
      decimals: 0
    });

    $footerShoppingCarTotalPrice.text(totalPrice)
  }

  renderActiveTabTables($tableListContainer, currentTabData) {
    // 渲染当前活动的 category 下的 tables
    const chunkArr = (arr, chunk) => {
      const result = [];

      for (let index = 0; index < arr.length; index+=chunk) {
        result.push(arr.slice(index, index + chunk));
      }

      return result;
    };

    const tableList = currentTabData['table_list'];

    if (!Array.isArray(tableList) || !tableList.length) {
      console.warn('当前分类下暂无选座数据');
      console.warn(currentTabData);
      $tableListContainer.append('<p class="empty-text">当前分类下暂无选座数据！</p>');
      return [];
    }

    // 根据 row_table_count 切分数据，算出每行有几桌
    const chuckTableList = chunkArr(tableList, currentTabData['row_table_count']);

    chuckTableList.forEach(tableRowData => {
      const $tableRow = $(`<div class="table_row"></div>`);
      const tableColCellCountClass = `table_col_cell_${currentTabData['row_table_count']}`;

      tableRowData.forEach(tableColData => {
        const $tableColItem = this.renderTableColItem(tableColData, tableColCellCountClass);
        const seatListLength = tableColData['seat_list'].length;

        tableColData['seat_list'].forEach((colData, index) => {
          const seatCellData = {
            ...colData,
            ['table_id']: tableColData['table_id'],
            ['category_id']: tableColData['category_id']
          };
          const $colSeatItemCell = this.renderColSeatItem(seatCellData, seatListLength, index);
          $tableColItem.append($colSeatItemCell);
        });

        $tableRow.append($tableColItem);
      });

      $tableListContainer.append($tableRow);
    });
  }

  renderTableColItem(tableColData, tableColCellCountClass) {
    const $tableColItem = $(`<div class="table_col table_col_item ${tableColCellCountClass}">
        <div class="table_col_item_outer-circle"></div>
        <div class="table_col_item_inner-circle_number-circle">
          <div class="table-inner-circle_number-circle_square" data-number=${tableColData['table_id']}></div>
        </div>
      </div>
    `);

    return $tableColItem;
  }

  renderColSeatItem (seatCellData, seatListLength, currentIndex, parentWidth) {
    const self = this;
    const $colSeatItemCell = $(`<div class="table_col_item_cell"></div>`);

    let rotateDeg = currentIndex === 0 ? 0 : 360 / seatListLength * currentIndex;
    rotateDeg += 90;

    const numberToFixed = (number, precision = 0) => Number(Number(number).toFixed(precision));

    // $colSeatItemCell.html(`<span class="seat_number">${seatCellData['seat_number']}</span>`);
    // 直接设置 html 在移动端无法显示内容，设置 data-number，然后 css 通过伪元素 content: attr(data-number) 显示内容
    $colSeatItemCell.attr("data-number", seatCellData['seat_number']);

    Object.keys(seatCellData).forEach(key => $colSeatItemCell.data(key, seatCellData[key]));

    const cellClass = {
      'select': 'table_col_item_cell__select',
      'selected': 'table_col_item_cell__current_selected',
      'sold': 'table_col_item_cell__already_select',
      'special': 'table_col_item_cell__special'
    }

    let classKey = seatCellData['status'];

    const cellSelected = this.selectedSeatList.find(item => item['seat_id'] === seatCellData['seat_id'])

    if (cellSelected) {
      classKey = 'selected'
    }

    $colSeatItemCell.addClass(cellClass[classKey]);

    setTimeout(() => {
      // 使用 setTimeout 获取节点挂载以后的所有信息
      const $offsetParent = $colSeatItemCell.offsetParent();

      const offsetParentOffsetHeight = $offsetParent.height();
      // 父级圆半径
      const parentCircelRadius = numberToFixed(offsetParentOffsetHeight / 2, 0);

      let colSeatItemCellPositionLeft = $colSeatItemCell.position().left;
      let colSeatItemCellPositionTop = $colSeatItemCell.position().top;

      // 知道圆心，半径，角度，求圆上任意一点的坐标位置
      let x1 = colSeatItemCellPositionLeft + parentCircelRadius * Math.cos(rotateDeg * Math.PI / 180);
      let y1 = colSeatItemCellPositionTop + parentCircelRadius * Math.sin(rotateDeg * Math.PI / 180);

      x1 += ($colSeatItemCell.width() / 2);
      y1 += ($colSeatItemCell.height() / 2);

      $colSeatItemCell.css({
        left: numberToFixed(x1, 0),
        top: numberToFixed(y1, 0),
        transform: `translate(-50%, -50%) rotate(${rotateDeg + 90}deg)`
      });

      $colSeatItemCell.on("click", function () {
        self.handleTableColItemCellClick($(this))
      });
    }, 0);

    return $colSeatItemCell;
  }

  formatTableList(categoryList, serverDataList) {
    if (
      !Array.isArray(categoryList) ||
      !Array.isArray(serverDataList)
    ) {
      console.warn('暂无选择数据');
      console.warn('categoryList is:', categoryList, 'serverDataList is:', serverDataList);
      return [];
    }

    serverDataList.map(tableItem => {
      categoryList.forEach(category => {
        if (category['category_id'] === tableItem['category_id']) {
          if (!category.table_list) {
            category.table_list = [];
          }

          category.table_list.push({ ...category, ...tableItem });
        }
      });
    });

    categoryList = categoryList.map(item => {
      return {
        ...item,
        price: this.prettyNumberToMoney({
          prefix: '',
          number: item.price,
          decimals: ''
        })
      };
    });

    return categoryList;
  }

  renderSeatAppHeaderTab(appHeaderTabEle, tabsData, activeIndex = 0) {
    if (!appHeaderTabEle) {
      console.error('appHeaderTabEle 不存在！');
      return;
    }

    if (!Array.isArray(tabsData) || !tabsData.length) {
      console.error('tabsData 不是一个数组');
      return;
    }

    const generateTabItemItems = tabsData.map((tab, index) => {
      const active = (index === activeIndex) ? 'active' : '';

      return `<div class="seat-app-header-tab_item ${active}" data-index=${index}>
          <div class="seat-app-header-tab_item_content">
            <div class="seat-price-box">
              <span class="prefix">¥</span><span class="seat-price">${tab.price}</span>/位
            </div>
            <div class="seat-remaining-box">
              剩<span class="seat-remaining">${tab['remain_count']}</span>个
            </div>
          </div>
        </div>
      `;
    });

    generateTabItemItems.forEach(tab => appHeaderTabEle.append(tab));
  }

  renderSubmitRepeatSeats (RepeatSeats) {
    const $hasAlreadySelectedSeats = $('.submit-check-modal .has-already-selected-seats');
    $hasAlreadySelectedSeats.children().remove();

    RepeatSeats.forEach(item => {
      $hasAlreadySelectedSeats.append(`<span>${item['table_number']}桌${item['seat_number']}号；</span>`)
    })
  }

  flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
  }

  sum() {
    const flatArgumentsArr = this.flattenDeep(Array.from(arguments));
    return flatArgumentsArr.reduce((x, y) => +(+x + +y).toFixed(2));
  }


  isNumber(value) {
    return !Number.isNaN(parseFloat(value));
  };

  formatToNumebr(x) {
    if (!x) return 0;

    if (typeof x === 'number') return x;

    const parts = x.toString().split('.');
    const integer = parts[0].replace(/,/g, '');
    const value = integer.concat('.', parts[1]);
    const number = parseFloat(value);
    return number;
  };

  prettyNumberToMoney({
    prefix = '¥',
    number = 0,
    decimals = 0,
    decimal = '.',
    separator = ',',
    suffix = '',
  } = {}) {
    let num = this.formatToNumebr(number);
    num = num.toFixed(decimals);
    num += '';

    const x = num.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? decimal + x[1] : '';

    const rgx = /(\d+)(\d{3})/;

    if (separator && !this.isNumber(separator)) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + separator + '$2');
      }
    }

    return prefix + x1 + x2 + suffix;
  }

  _debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function () {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp;

      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function (...args) {
      context = this;
      timestamp = +new Date();
      const callNow = immediate && !timeout;
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  }

  mount(container) {
    document.title = 'seat';
    container.innerHTML = template;
  }
}
