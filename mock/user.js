const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // demo login
  {
    url: '/login',
    type: 'post',
    response: config => {
      return {
        'msg': '登录成功',
        'success': true,
        'obj': {
          'userId': 3,
          'userUuid': '1be368247fa911eb8777fcb3bc93041c',
          'userLoginName': 'demoData',
          'userLoginPassword': 'demoData',
          'userName': 'demoData',
          'userPhone': 'demoData',
          'userArea': 'demoData',
          'userGrid': 'demoData',
          'userJobNumber': 'demoData',
          'userDepartmentUuid': 'demoData',
          'userSign': true,
          'userJurisdictionUuid': '26ddd7d59d8f11ebafaefcb3bc93041c',
          'userRoleUuid': 'demoData',
          'createTime': '2021-03-08',
          'updateTime': '2021-04-15'
        }
      }
    }
  },

  // demo user info
  {
    url: '/user/queryUser',
    type: 'get',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': {
          'userId': 3,
          'userUuid': '1be368247fa911eb8777fcb3bc93041c',
          'userLoginName': 'demoData',
          'userLoginPassword': 'demoData',
          'userName': 'demoData',
          'userPhone': 'demoData',
          'userArea': 'demoData',
          'userGrid': 'demoData',
          'userJobNumber': 'demoData',
          'userDepartmentUuid': 'demoData',
          'userSign': true,
          'userRoleUuid': 'demoData',
          'createTime': '2021-03-08',
          'updateTime': '2021-03-08'
        }
      }
    }
  },
  {
    url: '/jurisdiction/getAllList',
    type: 'get',
    response: config => {
      return [
        {
          'jurisdictionId': 1,
          'jurisdictionUuid': '8656dd9c9d8e11ebafaefcb3bc93041c',
          'jurisdictionName': 'personal',
          'jurisdictionExplain': '个人级'
        },
        {
          'jurisdictionId': 2,
          'jurisdictionUuid': 'a7b195939d8e11ebafaefcb3bc93041c',
          'jurisdictionName': 'grid',
          'jurisdictionExplain': '网格级'
        },
        {
          'jurisdictionId': 3,
          'jurisdictionUuid': 'ebefd57a9d8e11ebafaefcb3bc93041c',
          'jurisdictionName': 'line',
          'jurisdictionExplain': '条线级'
        },
        {
          'jurisdictionId': 4,
          'jurisdictionUuid': '195ba0879d8f11ebafaefcb3bc93041c',
          'jurisdictionName': 'leader',
          'jurisdictionExplain': '领导级'
        },
        {
          'jurisdictionId': 5,
          'jurisdictionUuid': '26ddd7d59d8f11ebafaefcb3bc93041c',
          'jurisdictionName': 'admin',
          'jurisdictionExplain': '管理级'
        }
      ]
    }
  },
  {
    url: '/jurisdiction/getOne',
    type: 'get',
    response: config => {
      return {
        'jurisdictionId': 2,
        'jurisdictionUuid': 'a7b195939d8e11ebafaefcb3bc93041c',
        'jurisdictionName': 'grid',
        'jurisdictionExplain': '网格级'
      }
    }
  },
  // demo user operation
  {
    url: '/user/addUser',
    type: 'post',
    response: config => {
      return {
        'success': true,
        'numCount': 1
      }
    }
  },
  {
    url: '/user/delUser',
    type: 'get',
    response: config => {
      return {
        'msg': '用户不存在',
        'success': false,
        'obj': {
          'records': [
            {
              'userId': 3,
              'userUuid': '1be368247fa911eb8777fcb3bc93041c',
              'userLoginName': 'demoData',
              'userLoginPassword': 'demoData',
              'userName': 'demoData',
              'userPhone': 'demoData',
              'userArea': 'demoData',
              'userGrid': 'demoData',
              'userJobNumber': 'demoData',
              'userDepartmentUuid': 'demoData',
              'userSign': true,
              'userRoleUuid': 'demoData',
              'createTime': '2021-03-08',
              'updateTime': '2021-03-08'
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
    url: '/user/updateUser',
    type: 'post',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': {
          'records': [
            {
              'userId': 3,
              'userUuid': '1be368247fa911eb8777fcb3bc93041c',
              'userLoginName': 'demoData',
              'userLoginPassword': 'demoData',
              'userName': 'demoData',
              'userPhone': 'demoData',
              'userArea': 'demoData',
              'userGrid': 'demoData',
              'userJobNumber': 'demoData',
              'userDepartmentUuid': 'demoData',
              'userSign': true,
              'userRoleUuid': 'demoData',
              'createTime': '2021-03-08',
              'departmentName': null,
              'roleName': null
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
    url: '/user/selectAllUser',
    type: 'get',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': {
          'records': [
            {
              'userId': 3,
              'userUuid': '1be368247fa911eb8777fcb3bc93041c',
              'userLoginName': 'demoData',
              'userLoginPassword': 'demoData',
              'userName': 'demoData',
              'userPhone': 'demoData',
              'userArea': 'demoData',
              'userGrid': 'demoData',
              'userJobNumber': 'demoData',
              'userDepartmentUuid': 'demoData',
              'jurisdictionUuid': '8656dd9c9d8e11ebafaefcb3bc93041c',
              'userSign': true,
              'userRoleUuid': 'demoData',
              'createTime': '2021-03-08',
              'departmentName': null, // 对应的部门名称
              'roleName': null // 角色名称
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
    url: '/user/getAllAuthority',
    type: 'get',
    response: config => {
      return {
        'msg': '成功',
        'success': true,
        'obj': {
          'roleId': 2,
          'roleUuid': 'adebe9a080b811eb995dfcb3bc93041c',
          'roleName': '管理员',
          'roleContent': 'admin|用户增加|用户删除|用户更新|单用户查询|用户列表|角色增加|角色删除|角色更新|单角色查询|角色列表|部门增加|部门删除|部门更新|单部门查询|部门列表|任务增加|任务删除|任务更新|单权限查询|权限列表|订单整体情况|整体质态情况',
          'createTime': '2021-03-09',
          'updateTime': '2021-04-19'
        }
      }
    }
  }
]
