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
  },
  {
    url: '/user/getNoRoleUsers',
    type: 'get',
    response: config => {
      return {
        'msg': '查询成功',
        'success': true,
        'obj': [
          {
            'userId': 5,
            'userUuid': '1cb377fca81211ebadabfcb3bc93041c',
            'userLoginName': '15651351627',
            'userLoginPassword': 'Huaplus123#',
            'userName': '魏迪',
            'userPhone': '15651351627',
            'userArea': '邳州',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C19',
            'userDepartmentUuid': '360323d9a24011eb8c78fcb3bc93041c',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 6,
            'userUuid': '1cb51e02a81211ebadabfcb3bc93041c',
            'userLoginName': '15651351331',
            'userLoginPassword': 'Huaplus123#',
            'userName': '程芳',
            'userPhone': '15651351331',
            'userArea': '沛县',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0400D18',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 7,
            'userUuid': '1cb630c6a81211ebadabfcb3bc93041c',
            'userLoginName': '15651353883',
            'userLoginPassword': 'Huaplus123#',
            'userName': '高米',
            'userPhone': '15651353883',
            'userArea': '睢宁',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0700D15',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 8,
            'userUuid': '1cb7de3ca81211ebadabfcb3bc93041c',
            'userLoginName': '15651350502',
            'userLoginPassword': 'Huaplus123#',
            'userName': '高婷',
            'userPhone': '15651350502',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0000U98',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 9,
            'userUuid': '1cb91411a81211ebadabfcb3bc93041c',
            'userLoginName': '15651351095',
            'userLoginPassword': 'Huaplus123#',
            'userName': '李苹',
            'userPhone': '15651351095',
            'userArea': '铜山',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C37',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 10,
            'userUuid': '1cba3025a81211ebadabfcb3bc93041c',
            'userLoginName': '15651351206',
            'userLoginPassword': 'Huaplus123#',
            'userName': '李新',
            'userPhone': '15651351206',
            'userArea': '丰县',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0800D11',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 11,
            'userUuid': '1cbb275aa81211ebadabfcb3bc93041c',
            'userLoginName': '15651353576',
            'userLoginPassword': 'Huaplus123#',
            'userName': '李雪',
            'userPhone': '15651353576',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C11',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 12,
            'userUuid': '1cbc1633a81211ebadabfcb3bc93041c',
            'userLoginName': '15651350371',
            'userLoginPassword': 'Huaplus123#',
            'userName': '陈杨',
            'userPhone': '15651350371',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C52',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 13,
            'userUuid': '1cbcf846a81211ebadabfcb3bc93041c',
            'userLoginName': '15651353091',
            'userLoginPassword': 'Huaplus123#',
            'userName': '王培斯',
            'userPhone': '15651353091',
            'userArea': '贾汪',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0200D10',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 14,
            'userUuid': '1cbe02b0a81211ebadabfcb3bc93041c',
            'userLoginName': '15651350387',
            'userLoginPassword': 'Huaplus123#',
            'userName': '王肖',
            'userPhone': '15651350387',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0000C95',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 15,
            'userUuid': '1cbf1b70a81211ebadabfcb3bc93041c',
            'userLoginName': '15651351755',
            'userLoginPassword': 'Huaplus123#',
            'userName': '李培培',
            'userPhone': '15651351755',
            'userArea': '新沂',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0600D21',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 16,
            'userUuid': '1cc02d9aa81211ebadabfcb3bc93041c',
            'userLoginName': '15651350368',
            'userLoginPassword': 'Huaplus123#',
            'userName': '周丽萍',
            'userPhone': '15651350368',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0000C69',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 17,
            'userUuid': '1cc0fb81a81211ebadabfcb3bc93041c',
            'userLoginName': '15651350869',
            'userLoginPassword': 'Huaplus123#',
            'userName': '张娅',
            'userPhone': '15651350869',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C01',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 18,
            'userUuid': '1cc1ba75a81211ebadabfcb3bc93041c',
            'userLoginName': '15651350923',
            'userLoginPassword': 'Huaplus123#',
            'userName': '张聪',
            'userPhone': '15651350923',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C03',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 19,
            'userUuid': '1cc28a6aa81211ebadabfcb3bc93041c',
            'userLoginName': '15651350369',
            'userLoginPassword': 'Huaplus123#',
            'userName': '高园园',
            'userPhone': '15651350369',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C17',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 20,
            'userUuid': '1cc39db1a81211ebadabfcb3bc93041c',
            'userLoginName': '15651353519',
            'userLoginPassword': 'Huaplus123#',
            'userName': '周璇',
            'userPhone': '15651353519',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800C405',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 21,
            'userUuid': '1cc49a74a81211ebadabfcb3bc93041c',
            'userLoginName': '15651355186',
            'userLoginPassword': 'Huaplus123#',
            'userName': '刘双双',
            'userPhone': '15651355186',
            'userArea': '新沂',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J588',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 22,
            'userUuid': '1cc58f25a81211ebadabfcb3bc93041c',
            'userLoginName': '15651353206',
            'userLoginPassword': 'Huaplus123#',
            'userName': '刘楚楚',
            'userPhone': '15651353206',
            'userArea': '沛县',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J590',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 23,
            'userUuid': '1cc66451a81211ebadabfcb3bc93041c',
            'userLoginName': '15651351086',
            'userLoginPassword': 'Huaplus123#',
            'userName': '韩玲',
            'userPhone': '15651351086',
            'userArea': '铜山',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J591',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 24,
            'userUuid': '1cc74488a81211ebadabfcb3bc93041c',
            'userLoginName': '15651352557',
            'userLoginPassword': 'Huaplus123#',
            'userName': '王与',
            'userPhone': '15651352557',
            'userArea': '睢宁',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J589',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 25,
            'userUuid': '1cc837c2a81211ebadabfcb3bc93041c',
            'userLoginName': '15651351965',
            'userLoginPassword': 'Huaplus123#',
            'userName': '庄莉',
            'userPhone': '15651351965',
            'userArea': '邳州',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J592',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 26,
            'userUuid': '1cc91cf4a81211ebadabfcb3bc93041c',
            'userLoginName': '15651351171',
            'userLoginPassword': 'Huaplus123#',
            'userName': '葛翠翠',
            'userPhone': '15651351171',
            'userArea': '丰县',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J816',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 27,
            'userUuid': '1cc9f5d3a81211ebadabfcb3bc93041c',
            'userLoginName': '15651351703',
            'userLoginPassword': 'Huaplus123#',
            'userName': '焦飘飘',
            'userPhone': '15651351703',
            'userArea': '贾汪',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J817',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 28,
            'userUuid': '1ccae176a81211ebadabfcb3bc93041c',
            'userLoginName': '15651350980',
            'userLoginPassword': 'Huaplus123#',
            'userName': '鲁晓英',
            'userPhone': '15651350980',
            'userArea': '丰县',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800K098',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 29,
            'userUuid': '1ccbbc2aa81211ebadabfcb3bc93041c',
            'userLoginName': '15651353706',
            'userLoginPassword': 'Huaplus123#',
            'userName': '张纲',
            'userPhone': '15651353706',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J593',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 30,
            'userUuid': '1cccca2fa81211ebadabfcb3bc93041c',
            'userLoginName': '15651350870',
            'userLoginPassword': 'Huaplus123#',
            'userName': '任珺',
            'userPhone': '15651350870',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0000S94',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 31,
            'userUuid': '1ccdb07ca81211ebadabfcb3bc93041c',
            'userLoginName': '15651350156',
            'userLoginPassword': 'Huaplus123#',
            'userName': '武慧娟',
            'userPhone': '15651350156',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H00KF063',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 32,
            'userUuid': '36214116a81711ebadabfcb3bc93041c',
            'userLoginName': '15651351627',
            'userLoginPassword': 'Huaplus123#',
            'userName': '魏迪',
            'userPhone': '15651351627',
            'userArea': '邳州',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C19',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 33,
            'userUuid': '3622f75ea81711ebadabfcb3bc93041c',
            'userLoginName': '15651351331',
            'userLoginPassword': 'Huaplus123#',
            'userName': '程芳',
            'userPhone': '15651351331',
            'userArea': '沛县',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0400D18',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 34,
            'userUuid': '3623f245a81711ebadabfcb3bc93041c',
            'userLoginName': '15651353883',
            'userLoginPassword': 'Huaplus123#',
            'userName': '高米',
            'userPhone': '15651353883',
            'userArea': '睢宁',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0700D15',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 35,
            'userUuid': '3624f70da81711ebadabfcb3bc93041c',
            'userLoginName': '15651350502',
            'userLoginPassword': 'Huaplus123#',
            'userName': '高婷',
            'userPhone': '15651350502',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0000U98',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 36,
            'userUuid': '3625f1bca81711ebadabfcb3bc93041c',
            'userLoginName': '15651351095',
            'userLoginPassword': 'Huaplus123#',
            'userName': '李苹',
            'userPhone': '15651351095',
            'userArea': '铜山',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C37',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 37,
            'userUuid': '3626eb11a81711ebadabfcb3bc93041c',
            'userLoginName': '15651351206',
            'userLoginPassword': 'Huaplus123#',
            'userName': '李新',
            'userPhone': '15651351206',
            'userArea': '丰县',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0800D11',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 38,
            'userUuid': '3627f3cea81711ebadabfcb3bc93041c',
            'userLoginName': '15651353576',
            'userLoginPassword': 'Huaplus123#',
            'userName': '李雪',
            'userPhone': '15651353576',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C11',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 39,
            'userUuid': '36293283a81711ebadabfcb3bc93041c',
            'userLoginName': '15651350371',
            'userLoginPassword': 'Huaplus123#',
            'userName': '陈杨',
            'userPhone': '15651350371',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C52',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 40,
            'userUuid': '362a199aa81711ebadabfcb3bc93041c',
            'userLoginName': '15651353091',
            'userLoginPassword': 'Huaplus123#',
            'userName': '王培斯',
            'userPhone': '15651353091',
            'userArea': '贾汪',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0200D10',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 41,
            'userUuid': '362b0c5da81711ebadabfcb3bc93041c',
            'userLoginName': '15651350387',
            'userLoginPassword': 'Huaplus123#',
            'userName': '王肖',
            'userPhone': '15651350387',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0000C95',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 42,
            'userUuid': '362c4c2ca81711ebadabfcb3bc93041c',
            'userLoginName': '15651351755',
            'userLoginPassword': 'Huaplus123#',
            'userName': '李培培',
            'userPhone': '15651351755',
            'userArea': '新沂',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0600D21',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 43,
            'userUuid': '362d3217a81711ebadabfcb3bc93041c',
            'userLoginName': '15651350368',
            'userLoginPassword': 'Huaplus123#',
            'userName': '周丽萍',
            'userPhone': '15651350368',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0000C69',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 44,
            'userUuid': '362e152fa81711ebadabfcb3bc93041c',
            'userLoginName': '15651350869',
            'userLoginPassword': 'Huaplus123#',
            'userName': '张娅',
            'userPhone': '15651350869',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C01',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 45,
            'userUuid': '362f14bba81711ebadabfcb3bc93041c',
            'userLoginName': '15651350923',
            'userLoginPassword': 'Huaplus123#',
            'userName': '张聪',
            'userPhone': '15651350923',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C03',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 46,
            'userUuid': '36306401a81711ebadabfcb3bc93041c',
            'userLoginName': '15651350369',
            'userLoginPassword': 'Huaplus123#',
            'userName': '高园园',
            'userPhone': '15651350369',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0001C17',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 47,
            'userUuid': '36319248a81711ebadabfcb3bc93041c',
            'userLoginName': '15651353519',
            'userLoginPassword': 'Huaplus123#',
            'userName': '周璇',
            'userPhone': '15651353519',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800C405',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 48,
            'userUuid': '36329242a81711ebadabfcb3bc93041c',
            'userLoginName': '15651355186',
            'userLoginPassword': 'Huaplus123#',
            'userName': '刘双双',
            'userPhone': '15651355186',
            'userArea': '新沂',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J588',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 49,
            'userUuid': '3633810aa81711ebadabfcb3bc93041c',
            'userLoginName': '15651353206',
            'userLoginPassword': 'Huaplus123#',
            'userName': '刘楚楚',
            'userPhone': '15651353206',
            'userArea': '沛县',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J590',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 50,
            'userUuid': '36345c55a81711ebadabfcb3bc93041c',
            'userLoginName': '15651351086',
            'userLoginPassword': 'Huaplus123#',
            'userName': '韩玲',
            'userPhone': '15651351086',
            'userArea': '铜山',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J591',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 51,
            'userUuid': '363569baa81711ebadabfcb3bc93041c',
            'userLoginName': '15651352557',
            'userLoginPassword': 'Huaplus123#',
            'userName': '王与',
            'userPhone': '15651352557',
            'userArea': '睢宁',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J589',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 52,
            'userUuid': '363657d5a81711ebadabfcb3bc93041c',
            'userLoginName': '15651351965',
            'userLoginPassword': 'Huaplus123#',
            'userName': '庄莉',
            'userPhone': '15651351965',
            'userArea': '邳州',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J592',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 53,
            'userUuid': '363751a9a81711ebadabfcb3bc93041c',
            'userLoginName': '15651351171',
            'userLoginPassword': 'Huaplus123#',
            'userName': '葛翠翠',
            'userPhone': '15651351171',
            'userArea': '丰县',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J816',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 54,
            'userUuid': '3638355ca81711ebadabfcb3bc93041c',
            'userLoginName': '15651351703',
            'userLoginPassword': 'Huaplus123#',
            'userName': '焦飘飘',
            'userPhone': '15651351703',
            'userArea': '贾汪',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J817',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 55,
            'userUuid': '363916b9a81711ebadabfcb3bc93041c',
            'userLoginName': '15651350980',
            'userLoginPassword': 'Huaplus123#',
            'userName': '鲁晓英',
            'userPhone': '15651350980',
            'userArea': '丰县',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800K098',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 56,
            'userUuid': '363a22c6a81711ebadabfcb3bc93041c',
            'userLoginName': '15651353706',
            'userLoginPassword': 'Huaplus123#',
            'userName': '张纲',
            'userPhone': '15651353706',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H800J593',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 57,
            'userUuid': '363b1300a81711ebadabfcb3bc93041c',
            'userLoginName': '15651350870',
            'userLoginPassword': 'Huaplus123#',
            'userName': '任珺',
            'userPhone': '15651350870',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H0000S94',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          },
          {
            'userId': 58,
            'userUuid': '363c2c74a81711ebadabfcb3bc93041c',
            'userLoginName': '15651350156',
            'userLoginPassword': 'Huaplus123#',
            'userName': '武慧娟',
            'userPhone': '15651350156',
            'userArea': '市区',
            'userGrid': '徐州高价值维系团队',
            'userJobNumber': 'H00KF063',
            'userDepartmentUuid': 'ee46065ca24a11eb87bffa163e545672',
            'userAscriptionUuid': null,
            'userSign': false,
            'userJurisdictionUuid': null,
            'userRoleUuid': null,
            'createTime': null,
            'updateTime': null
          }
        ]
      }
    }
  },
  {
    url: '/user/bindRoleBat',
    type: 'post',
    response: config => {
      return {
        'msg': '成功',
        'success': true
      }
    }
  }
]
