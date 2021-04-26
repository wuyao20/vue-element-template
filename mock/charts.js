module.exports = [
  {
    url: '/OnlineRetailers/reportOrderWhole',
    type: 'post',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': [
          {
            'area': '邳州',
            'ordersCount': '9175',
            'activation': '3917',
            'fiftyMore': '3614',
            'hundredMore': '746',
            'conversionRate': '39.39%'
          },
          {
            'area': '鼓楼',
            'ordersCount': '3830',
            'activation': '1943',
            'fiftyMore': '1795',
            'hundredMore': '531',
            'conversionRate': '46.87%'
          },
          {
            'area': '沛县',
            'ordersCount': '6723',
            'activation': '2929',
            'fiftyMore': '2587',
            'hundredMore': '623',
            'conversionRate': '38.48%'
          },
          {
            'area': '睢宁',
            'ordersCount': '7445',
            'activation': '3221',
            'fiftyMore': '3027',
            'hundredMore': '745',
            'conversionRate': '40.66%'
          },
          {
            'area': '贾汪',
            'ordersCount': '3560',
            'activation': '1599',
            'fiftyMore': '1459',
            'hundredMore': '305',
            'conversionRate': '40.98%'
          },
          {
            'area': '铜山',
            'ordersCount': '7560',
            'activation': '3176',
            'fiftyMore': '2976',
            'hundredMore': '719',
            'conversionRate': '39.37%'
          },
          {
            'area': '泉山',
            'ordersCount': '3562',
            'activation': '1895',
            'fiftyMore': '1826',
            'hundredMore': '430',
            'conversionRate': '51.26%'
          },
          {
            'area': '丰县',
            'ordersCount': '5981',
            'activation': '3176',
            'fiftyMore': '2935',
            'hundredMore': '1008',
            'conversionRate': '49.07%'
          },
          {
            'area': '云龙',
            'ordersCount': '2863',
            'activation': '1571',
            'fiftyMore': '1458',
            'hundredMore': '412',
            'conversionRate': '50.93%'
          },
          {
            'area': '新沂',
            'ordersCount': '6587',
            'activation': '3046',
            'fiftyMore': '2746',
            'hundredMore': '568',
            'conversionRate': '41.69%'
          }
        ]
      }
    }
  },
  {
    url: '/import/whole/development',
    type: 'get',
    response: config => {
      return {
        'msg': '成功',
        'success': true,
        'obj': [
          {
            'area': '睢宁', // 区县
            'whole': '2404', // 整体发展量
            'wholeNoActive': '235', // 非活
            // 需要计算非活率列,小数点后两位，标注前三后三 计算格式：wholeNoActive/whole
            'wholeNoNet': '1944', // 整体异网
            // 需要计算异网率列
            'wholeFuse': '460', // 融合
            // 需要计算融合率列

            'sociologyWhole': '770', // 社渠整体
            'sociologyWholeNoActive': '19', // 社渠非活
            'sociologyWholeNoNet': '663', // 社渠异网
            'sociologyWholeFuse': '225', // 社渠融合

            'selfWhole': '354', // 自营整体
            'selfWholeNoActive': '4', // 自营非活
            'selfWholeNoNet': '259', // 自营异网
            'selfWholeFuse': '148', // 自营融合

            'onlineWhole': '1280', // 电商整体
            'onlineWholeNoActive': '212', // 电商非活
            'onlineWholeNoNet': '1022', // 电商异网
            'onlineWholeFuse': '87' // 电商融合
          },
          {
            'area': '云龙',
            'whole': '1869',
            'wholeNoNet': '1477',
            'selfWhole': '182',
            'wholeNoActive': '101',
            'wholeFuse': '356',
            'onlineWhole': '865',
            'selfWholeFuse': '106',
            'onlineWholeNoActive': '80',
            'onlineWholeNoNet': '620',
            'sociologyWhole': '822',
            'sociologyWholeNoActive': '12',
            'selfWholeNoNet': '137',
            'sociologyWholeNoNet': '720',
            'selfWholeNoActive': '9',
            'onlineWholeFuse': '16',
            'sociologyWholeFuse': '234'
          },
          {
            'area': '鼓九',
            'whole': '2739',
            'wholeNoNet': '2316',
            'selfWhole': '164',
            'wholeNoActive': '198',
            'wholeFuse': '587',
            'onlineWhole': '1136',
            'selfWholeFuse': '82',
            'onlineWholeNoActive': '130',
            'onlineWholeNoNet': '897',
            'sociologyWhole': '1439',
            'sociologyWholeNoActive': '62',
            'selfWholeNoNet': '125',
            'sociologyWholeNoNet': '1294',
            'selfWholeNoActive': '6',
            'onlineWholeFuse': '40',
            'sociologyWholeFuse': '465'
          },
          {
            'area': '泉山',
            'whole': '2449',
            'wholeNoNet': '1791',
            'selfWhole': '416',
            'wholeNoActive': '222',
            'wholeFuse': '504',
            'onlineWhole': '1606',
            'selfWholeFuse': '219',
            'onlineWholeNoActive': '177',
            'onlineWholeNoNet': '1082',
            'sociologyWhole': '427',
            'sociologyWholeNoActive': '26',
            'selfWholeNoNet': '332',
            'sociologyWholeNoNet': '377',
            'selfWholeNoActive': '19',
            'onlineWholeFuse': '155',
            'sociologyWholeFuse': '130'
          },
          {
            'area': '丰县',
            'whole': '2578',
            'wholeNoNet': '2166',
            'selfWhole': '181',
            'wholeNoActive': '209',
            'wholeFuse': '729',
            'onlineWhole': '1101',
            'selfWholeFuse': '113',
            'onlineWholeNoActive': '157',
            'onlineWholeNoNet': '828',
            'sociologyWhole': '1296',
            'sociologyWholeNoActive': '52',
            'selfWholeNoNet': '146',
            'sociologyWholeNoNet': '1192',
            'selfWholeNoActive': '0',
            'onlineWholeFuse': '7',
            'sociologyWholeFuse': '609'
          },
          {
            'area': '开新',
            'whole': '1365',
            'wholeNoNet': '1088',
            'selfWhole': '10',
            'wholeNoActive': '105',
            'wholeFuse': '213',
            'onlineWhole': '941',
            'selfWholeFuse': '6',
            'onlineWholeNoActive': '95',
            'onlineWholeNoNet': '707',
            'sociologyWhole': '414',
            'sociologyWholeNoActive': '10',
            'selfWholeNoNet': '5',
            'sociologyWholeNoNet': '376',
            'selfWholeNoActive': '0',
            'onlineWholeFuse': '87',
            'sociologyWholeFuse': '120'
          },
          {
            'area': '铜山',
            'whole': '2478',
            'wholeNoNet': '1993',
            'selfWhole': '99',
            'wholeNoActive': '234',
            'wholeFuse': '321',
            'onlineWhole': '1474',
            'selfWholeFuse': '61',
            'onlineWholeNoActive': '199',
            'onlineWholeNoNet': '1169',
            'sociologyWhole': '905',
            'sociologyWholeNoActive': '32',
            'selfWholeNoNet': '84',
            'sociologyWholeNoNet': '740',
            'selfWholeNoActive': '3',
            'onlineWholeFuse': '14',
            'sociologyWholeFuse': '246'
          },
          {
            'area': '邳州',
            'whole': '3629',
            'wholeNoNet': '2988',
            'selfWhole': '28',
            'wholeNoActive': '255',
            'wholeFuse': '674',
            'onlineWhole': '1817',
            'selfWholeFuse': '10',
            'onlineWholeNoActive': '175',
            'onlineWholeNoNet': '1429',
            'sociologyWhole': '1784',
            'sociologyWholeNoActive': '80',
            'selfWholeNoNet': '22',
            'sociologyWholeNoNet': '1537',
            'selfWholeNoActive': '0',
            'onlineWholeFuse': '22',
            'sociologyWholeFuse': '642'
          },
          {
            'area': '新沂',
            'whole': '2404',
            'wholeNoNet': '1919',
            'selfWhole': '94',
            'wholeNoActive': '245',
            'wholeFuse': '560',
            'onlineWhole': '1147',
            'selfWholeFuse': '34',
            'onlineWholeNoActive': '187',
            'onlineWholeNoNet': '862',
            'sociologyWhole': '1163',
            'sociologyWholeNoActive': '53',
            'selfWholeNoNet': '66',
            'sociologyWholeNoNet': '991',
            'selfWholeNoActive': '5',
            'onlineWholeFuse': '18',
            'sociologyWholeFuse': '508'
          },
          {
            'area': '贾汪',
            'whole': '1416',
            'wholeNoNet': '1123',
            'selfWhole': '79',
            'wholeNoActive': '189',
            'wholeFuse': '264',
            'onlineWhole': '832',
            'selfWholeFuse': '21',
            'onlineWholeNoActive': '169',
            'onlineWholeNoNet': '641',
            'sociologyWhole': '505',
            'sociologyWholeNoActive': '16',
            'selfWholeNoNet': '65',
            'sociologyWholeNoNet': '417',
            'selfWholeNoActive': '4',
            'onlineWholeFuse': '19',
            'sociologyWholeFuse': '224'
          },
          {
            'area': '沛县',
            'whole': '2119',
            'wholeNoNet': '1713',
            'selfWhole': '50',
            'wholeNoActive': '196',
            'wholeFuse': '98',
            'onlineWhole': '1409',
            'selfWholeFuse': '8',
            'onlineWholeNoActive': '166',
            'onlineWholeNoNet': '1121',
            'sociologyWhole': '660',
            'sociologyWholeNoActive': '25',
            'selfWholeNoNet': '38',
            'sociologyWholeNoNet': '554',
            'selfWholeNoActive': '5',
            'onlineWholeFuse': '18',
            'sociologyWholeFuse': '72'
          },
          {
            'area': '合计',
            'whole': '25450',
            'wholeNoNet': '20518',
            'selfWhole': '1657',
            'wholeNoActive': '2189',
            'wholeFuse': '4766',
            'onlineWhole': '13608',
            'selfWholeFuse': '808',
            'onlineWholeNoActive': '1747',
            'onlineWholeNoNet': '10378',
            'sociologyWhole': '10185',
            'sociologyWholeNoActive': '387',
            'selfWholeNoNet': '1279',
            'sociologyWholeNoNet': '8861',
            'selfWholeNoActive': '55',
            'onlineWholeFuse': '483',
            'sociologyWholeFuse': '3475'
          }
        ]
      }
    }
  },

  // self data
  {
    url: '/selfSupport/middle/queryVague',
    type: 'get',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': [
          {
            'id': 92,
            'middleUuid': '3ab213d6a34611eba7dafcb3bc93041c',
            'middleChannelName': '徐州市泉山区淮海西路150号淮西华盛营业厅',
            'middleChannelId': '34b083s',
            'middleHomeStore': '徐州市泉山区淮海西路150号淮西营业厅',
            'middleHomeId': '34a0207',
            'middleArea': '淮西片区',
            'middleShopownerName': '井璟',
            'middleGrid': '泉山公众综合网格'
          },
          {
            'id': 93,
            'middleUuid': '3ab21431a34611eba7dafcb3bc93041c',
            'middleChannelName': '徐州市泉山区淮海西路150号淮西营业厅',
            'middleChannelId': '34a0207',
            'middleHomeStore': '徐州市泉山区淮海西路150号淮西营业厅',
            'middleHomeId': '34a0207',
            'middleArea': '淮西片区',
            'middleShopownerName': '井璟',
            'middleGrid': '泉山公众综合网格'
          },
          {
            'id': 94,
            'middleUuid': '3ab21494a34611eba7dafcb3bc93041c',
            'middleChannelName': '徐州市泉山区淮海西路150号淮西营业厅行销点',
            'middleChannelId': '34b3pbt',
            'middleHomeStore': '徐州市泉山区淮海西路150号淮西营业厅',
            'middleHomeId': '34a0207',
            'middleArea': '淮西片区',
            'middleShopownerName': '井璟',
            'middleGrid': '泉山公众综合网格'
          }
        ]
      }
    }
  },
  {
    url: '/selfSupport/middle/change',
    type: 'post',
    response: config => {
      return {
        'msg': '修改失败',
        'success': false
      }
    }
  },
  {
    url: '/selfSupport/middle/del',
    type: 'get',
    response: config => {
      return {
        'msg': '删除成功',
        'success': false
      }
    }
  },
  {
    url: '/selfSupport/middle/add',
    type: 'post',
    response: config => {
      return {
        'msg': '添加成功',
        'success': true
      }
    }
  },
  {
    url: '/selfSupport/middle/queryAll',
    type: 'get',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': {
          'records': [
            {
              'id': 1,
              'middleUuid': '3ab0a4d2a34611eba7dafcb3bc93041c',
              'middleChannelName': '新沂新华路营业厅销售助手映射点',
              'middleChannelId': '34b3kt8',
              'middleHomeStore': '徐州市新沂新华路营业厅',
              'middleHomeId': '34a0344',
              'middleArea': '新沂片区',
              'middleShopownerName': '徐苗',
              'middleGrid': '新沂公众综合网格'
            },
            {
              'id': 2,
              'middleUuid': '3ab11233a34611eba7dafcb3bc93041c',
              'middleChannelName': '新沂钟吾路营业厅销售助手映射点',
              'middleChannelId': '34b3ktd',
              'middleHomeStore': '徐州市新沂钟吾路营业厅',
              'middleHomeId': '34a0353',
              'middleArea': '新沂片区',
              'middleShopownerName': '徐苗',
              'middleGrid': '新沂公众综合网格'
            },
            {
              'id': 3,
              'middleUuid': '3ab113eaa34611eba7dafcb3bc93041c',
              'middleChannelName': '徐州泉山南区奎园沃盟厅',
              'middleChannelId': '34b2xgx',
              'middleHomeStore': '徐州市云龙区和平路营业厅',
              'middleHomeId': '34a0425',
              'middleArea': '云龙片区',
              'middleShopownerName': '薄莉苹',
              'middleGrid': '云龙公众综合网格'
            }
          ],
          'total': 268,
          'size': 50,
          'current': 1,
          'orders': [],
          'optimizeCountSql': true,
          'hitCount': false,
          'countId': null,
          'maxLimit': null,
          'searchCount': true,
          'pages': 6
        }
      }
    }
  },
  {
    url: '/selfSupport/taskIndex/query',
    type: 'get',
    response: config => {
      return {
        'msg': '成功',
        'success': true,
        'obj': [
          {
            'taskId': 15,
            'taskUuid': '861d16ffa40711eba7dafcb3bc93041c',
            'taskIndexName': '新增指标',
            'taskRelevantOffice': '徐州市泉山区淮海西路150号淮西营业厅',
            'taskIndexNum': 559,
            'taskAddDate': '20210423'
          },
          {
            'taskId': 18,
            'taskUuid': '86204f89a40711eba7dafcb3bc93041c',
            'taskIndexName': '新增指标',
            'taskRelevantOffice': '徐州市乐享通讯淮海东路自营厅',
            'taskIndexNum': 283,
            'taskAddDate': '20210423'
          }
        ]
      }
    }
  },
  {
    url: '/selfSupport/taskIndex/queryAll',
    type: 'get',
    response: config => {
      return {
        'msg': '没有权限',
        'success': false,
        'obj': {
          'records': [
            {
              'taskId': 1,
              'taskUuid': '860f2c0ea40711eba7dafcb3bc93041c',
              'taskIndexName': '新增指标',
              'taskRelevantOffice': '徐州市云龙区东苑营业厅',
              'taskIndexNum': 152,
              'taskAddDate': '20210423'
            },
            {
              'taskId': 2,
              'taskUuid': '8610402ba40711eba7dafcb3bc93041c',
              'taskIndexName': '新增指标',
              'taskRelevantOffice': '徐州市云龙区和平路营业厅',
              'taskIndexNum': 231,
              'taskAddDate': '20210423'
            },
            {
              'taskId': 3,
              'taskUuid': '86110afaa40711eba7dafcb3bc93041c',
              'taskIndexName': '新增指标',
              'taskRelevantOffice': '徐州市云龙区贵邦俊园营业厅',
              'taskIndexNum': 21,
              'taskAddDate': '20210423'
            },
            {
              'taskId': 4,
              'taskUuid': '861214eba40711eba7dafcb3bc93041c',
              'taskIndexName': '新增指标',
              'taskRelevantOffice': '徐州市云龙区保利鑫城营业厅',
              'taskIndexNum': 24,
              'taskAddDate': '20210423'
            }
          ],
          'total': 345,
          'size': 50,
          'current': 1,
          'orders': [],
          'optimizeCountSql': true,
          'hitCount': false,
          'countId': null,
          'maxLimit': null,
          'searchCount': true,
          'pages': 7
        }
      }
    }
  },
  {
    url: '/selfSupport/taskIndex/add',
    type: 'post',
    response: config => {
      return {
        'msg': '添加成功',
        'success': true
      }
    }
  },
  {
    url: '/selfSupport/taskIndex/del',
    type: 'post',
    response: config => {
      return {
        'msg': '参数错误',
        'success': false
      }
    }
  },
  {
    url: '/selfSupport/taskIndex/update',
    type: 'post',
    response: config => {
      return {
        'msg': '没有权限',
        'success': false
      }
    }
  }
]
