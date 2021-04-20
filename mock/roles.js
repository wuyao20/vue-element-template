module.exports = [
  {
    url: '/roles/addRole',
    type: 'post',
    response: config => {
      return {
        'msg': '角色已经存在',
        'success': false,
        'obj': {
          'records': [
            {
              'roleId': 2,
              'roleUuid': 'adebe9a080b811eb995dfcb3bc93041c',
              'roleName': 'demoData',
              'createTime': '2021-03-09',
              'updateTime': '2021-03-09'
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
    url: '/roles/delRole',
    type: 'get',
    response: config => {
      return {
        'msg': '要删除的角色不存在',
        'success': false,
        'obj': {
          'records': [
            {
              'roleId': 2,
              'roleUuid': 'adebe9a080b811eb995dfcb3bc93041c',
              'roleName': 'demoData',
              'createTime': '2021-03-09',
              'updateTime': '2021-03-09'
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
    url: '/roles/queryRoleByUuid',
    type: 'get',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': {
          'roleId': 2,
          'roleUuid': 'adebe9a080b811eb995dfcb3bc93041c',
          'roleName': 'demoData',
          'roleContent': 'demoData',
          'createTime': '2021-03-09',
          'updateTime': '2021-03-09'
        }
      }
    }
  },
  {
    url: '/roles/updateRole',
    type: 'post',
    response: config => {
      return {
        'msg': '目标数据不存在',
        'success': false,
        'obj': {
          'records': [
            {
              'roleId': 2,
              'roleUuid': 'adebe9a080b811eb995dfcb3bc93041c',
              'roleName': 'demoData',
              'createTime': '2021-03-09',
              'updateTime': '2021-03-09'
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
    url: '/roles/queryAllRole',
    type: 'get',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': {
          'records': [
            {
              'roleId': 2,
              'roleUuid': 'adebe9a080b811eb995dfcb3bc93041c',
              'roleName': 'demoData',
              'roleContent': 'demoData',
              'createTime': '2021-03-09',
              'updateTime': '2021-03-09'
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
