const config = {
  category: [
    { category_id: 1, category_name: '普通区', price: 400,  row_name: '桌', col_name: '号' },
    { category_id: 2, category_name: 'VIP区', price: 800, row_name: '桌', col_name: '号' },
    { category_id: 3, category_name: 'SVIP区', price: 1600,  row_name: '桌', col_name: '列' },
  ]
}

const testData = [{
    category_id: 1,
    row_list: [{
      row_id: 1,
      col_list: [{
          col_id: 1,
          status: 'select'
        },
        {
          col_id: 2,
          status: 'sold'
        },
        {
          col_id: 3,
          status: 'special'
        }
      ]
    }]
  },
  {
    category_id: 2,
    row_list: [{
      row_id: 1,
      col_list: [{
          col_id: 1,
          status: 'select'
        },
        {
          col_id: 2,
          status: 'sold'
        },
        {
          col_id: 3,
          status: 'special'
        }
      ]
    }]
  },
  {
    category_id: 3,
    row_list: [{
      row_id: 1,
      col_list: [{
          col_id: 1,
          status: 'select'
        },
        {
          col_id: 2,
          status: 'sold'
        },
        {
          col_id: 3,
          status: 'special'
        }
      ]
    }]
  }
]


export default {
  testData
}
