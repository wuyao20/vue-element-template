module.exports = [
  {
    url: '/relay/quartz/relayAdd',
    type: 'post',
    response: config => {
      return {
        'msg': '添加成功',
        'success': true
      }
    }
  },
  {
    url: '/relay/quartz/relayDel',
    type: 'get',
    response: config => {
      return {
        'msg': '删除成功',
        'success': true
      }
    }
  },
  {
    url: '/relay/quartz/relayChange',
    type: 'post',
    response: config => {
      return {
        'msg': '成功',
        'success': true
      }
    }
  },
  {
    url: '/relay/quartz/relaySelectAll',
    type: 'get',
    response: config => {
      return {
        'msg': [
          {
            'quartzId': 8,
            'quartzUuid': '5468495c8d1d11eb810bfcb3bc93041c',
            'quartzType': 'demoData',
            'quartzName': 'demoData',
            'quartzSummary': 'demoData',
            'quartzGroup': 'demoData',
            'quartzParam': '/test/yw.zip||yw.zip',
            'quartzTime': '0/1 * * * * ? *',
            'quartzStatus': 4,
            'quartzExecuteTime': null,
            'createTime': null,
            'updateTime': null,
            'isExecute': false
          }
        ],
        'success': true
      }
    }
  },
  {
    url: '/relay/quartz/relayChangeState',
    type: 'post',
    response: config => {
      return {
        'msg': '1', // 状态：，有四种任务状态 1.启动，2挂起、3恢复、4停止
        'success': true
      }
    }
  },
  {
    url: '/files/queryAllFile',
    type: 'get',
    response: config => {
      return {
        'msg': '成功',
        'success': true,
        'obj': {
          'records': [
            {
              'fileId': 1,
              'fileUuid': '56e66d83910f11eb9e43fcb3bc93041c',
              'fileName': 'log4j443dde8bfb7c49389738b412c9a1d604.properties',
              'fileExtension': '.properties',
              'fileMaxSize': 1009,
              'fileSavePath': 'E:\\test\\excel\\log4j443dde8bfb7c49389738b412c9a1d604.properties',
              'fileImportWhether': false,
              'fileModularName': 'modularName',
              'createTime': null,
              'updateTime': null
            }
          ],
          'total': 1,
          'size': 50,
          'current': 1,
          'orders': [],
          'optimizeCountSql': true,
          'hitCount': false,
          'countId': null,
          'maxLimit': null,
          'searchCount': true,
          'pages': 1
        }
      }
    }
  },
  {
    url: '/files/import/manual',
    type: 'get',
    response: config => {
      return {}
    }
  },
  {
    url: '/files/operation/delFile',
    type: 'get',
    response: config => {
      return {}
    }
  }
]
