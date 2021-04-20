module.exports = [
  {
    url: '/department/addDepartment',
    type: 'post',
    response: config => {
      return {
        'msg': '部门已经存在',
        'success': false,
        'obj': {
          'records': [
            {
              'departmentId': 2,
              'departmentUuid': 'f834b9c47f1911ebb54ffcb3bc93041c',
              'departmentName': '市场部',
              'createTime': '2021-03-07',
              'updateTime': '2021-03-07'
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
    url: '/department/delDepartment',
    type: 'get',
    response: config => {
      return {
        'msg': '要删除的部门不存在',
        'success': false,
        'obj': {
          'records': [
            {
              'departmentId': 2,
              'departmentUuid': 'f834b9c47f1911ebb54ffcb3bc93041c',
              'departmentName': '市场部',
              'createTime': '2021-03-07',
              'updateTime': '2021-03-07'
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
    url: '/department/queryDepartmentByUuid',
    type: 'get',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': {
          'departmentId': 2,
          'departmentUuid': 'f834b9c47f1911ebb54ffcb3bc93041c',
          'departmentName': '市场部',
          'createTime': '2021-03-07',
          'updateTime': '2021-03-07'
        }
      }
    }
  },
  {
    url: '/department/updateDepartment',
    type: 'post',
    response: config => {
      return {
        'msg': '目标数据不存在',
        'success': false,
        'obj': {
          'records': [
            {
              'departmentId': 2,
              'departmentUuid': 'f834b9c47f1911ebb54ffcb3bc93041c',
              'departmentName': '市场部',
              'createTime': '2021-03-07',
              'updateTime': '2021-03-07'
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
    url: '/department/queryAllDepartment',
    type: 'get',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': {
          'records': [
            {
              'departmentId': 2,
              'departmentUuid': 'f834b9c47f1911ebb54ffcb3bc93041c',
              'departmentName': '市场部',
              'createTime': '2021-03-07',
              'updateTime': '2021-03-07'
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
  }
]
