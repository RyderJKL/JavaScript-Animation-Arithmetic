export default {
config: {
    category: [
      {
        category_id: 1,
        category_name: '沉香桌',
        price: 50000,
        table_unit_name: '桌',
        seat_unit_name: '号',
        row_table_count: 1, // 每行有几桌
        remain_count: 40, // 当前剩余多个位置
      },
      {
        category_id: 2,
        category_name: '檀香桌',
        price: 12000,
        table_unit_name: '桌',
        seat_unit_name: '位',
        row_table_count: 2, // 每行有几桌
        remain_count: 50 // 当前剩余多个位置
      },
      {
        category_id: 3,
        category_name: '松香桌',
        price: 6800,
        table_unit_name: '桌',
        seat_unit_name: '位',
        row_table_count: 2, // 每行有几桌
        remain_count: 100 // 当前剩余多个位置
      },
      {
        category_id: 4,
        category_name: '墨石桌',
        price: 2000,
        table_unit_name: '桌',
        seat_unit_name: '位',
        row_table_count: 2, // 每行有几桌
        remain_count: 200 // 当前剩余多个位置
      }
    ]
  },
  data_list: [{
      table_id: 1,
      category_id: 1,
      name: '',
      seat_list: [{
          seat_number: 1,
          seat_id: '1-1-1',
          status: 'select'
        },
        {
          seat_number: 2,
          seat_id: '1-1-2',
          status: 'sold'
        },
        {
          seat_number: 3,
          seat_id: '1-1-3',
          status: 'special'
        },
        {
          seat_number: 4,
          seat_id: '1-1-4',
          status: 'special'
        },
        {
          seat_number: 5,
          seat_id: '1-1-5',
          status: 'special'
        },
        {
          seat_number: 6,
          seat_id: '1-1-6',
          status: 'special'
        },
        {
          seat_number: 7,
          seat_id: '1-1-7',
          status: 'special'
        },
        {
          seat_number: 8,
          seat_id: '1-1-8',
          status: 'special'
        },
        {
          seat_number: 9,
          seat_id: '1-1-9',
          status: 'special'
        },
        {
          seat_number: 10,
          seat_id: '1-1-10',
          status: 'special'
        },
        {
          seat_number: 11,
          seat_id: '1-1-11',
          status: 'special'
        },
        {
          seat_number: 12,
          seat_id: '1-1-12',
          status: 'special'
        },
        {
          seat_number: 13,
          seat_id: '1-1-12',
          status: 'special'
        },{
          seat_number: 14,
          seat_id: '1-1-12',
          status: 'special'
        },{
          seat_number: 15,
          seat_id: '1-1-12',
          status: 'special'
        },{
          seat_number: 16,
          seat_id: '1-1-12',
          status: 'special'
        },{
          seat_number: 17,
          seat_id: '1-1-12',
          status: 'special'
        },{
          seat_number: 18,
          seat_id: '1-1-12',
          status: 'special'
        },{
          seat_number: 19,
          seat_id: '1-1-12',
          status: 'special'
        },{
          seat_number: 20,
          seat_id: '1-1-12',
          status: 'special'
        },{
          seat_number: 12,
          seat_id: '1-1-12',
          status: 'special'
        },
        {
          seat_number: 21,
          seat_id: '1-1-12',
          status: 'special'
        },
        {
          seat_number: 22,
          seat_id: '1-1-12',
          status: 'special'
        }
      ]
    },
    {
      table_id: 2,
      category_id: 1,
      name: '',
      seat_list: [{
          seat_number: 1,
          seat_id: '1-2-1',
          status: 'select'
        },
        {
          seat_number: 2,
          seat_id: '1-2-2',
          status: 'sold'
        },
        {
          seat_number: 3,
          seat_id: '1-2-3',
          status: 'special'
        },
      ]
    },
    {
      table_id: 3,
      category_id: 1,
      name: '',
      seat_list: [{
          seat_number: 1,
          seat_id: '1-3-1',
          status: 'select'
        },
        {
          seat_number: 2,
          seat_id: '1-3-2',
          status: 'sold'
        },
        {
          seat_number: 4,
          seat_id: '1-4-4',
          status: 'special'
        },
      ]
    },
    {
      table_id: 4,
      category_id: 2,
      name: '',
      seat_list: [{
          seat_number: 1,
          seat_id: '1-4-1',
          status: 'select'
        },
        {
          seat_number: 2,
          seat_id: '1-4-2',
          status: 'sold'
        },
        {
          seat_number: 4,
          seat_id: '1-4-3',
          status: 'special'
        },
      ]
    },
    {
      table_id: 5,
      category_id: 3,
      name: '',
      seat_list: [{
          seat_number: 1,
          seat_id: '1-5-1',
          status: 'select'
        },
        {
          seat_number: 2,
          seat_id: '1-5-2',
          status: 'sold'
        },
        {
          seat_number: 4,
          seat_id: '1-5-3',
          status: 'special'
        },
      ]
    },
    {
      table_id: 6,
      category_id: 4,
      name: '',
      seat_list: [{
          seat_number: 1,
          seat_id: '1-6-1',
          status: 'select'
        },
        {
          seat_number: 2,
          seat_id: '1-6-2',
          status: 'sold'
        },
        {
          seat_number: 4,
          seat_id: '1-6-3',
          status: 'special'
        },
      ]
    }
  ]
};
