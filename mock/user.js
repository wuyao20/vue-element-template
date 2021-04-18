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
    url: '/integrated/login',
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
    url: '/integrated/user/queryUser',
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
  }
]
