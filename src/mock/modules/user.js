// 获取用户列表
export function list() {
  return {
    // isOpen: false,
    "url": "/sys/user/list",
    "type": "post",
    "data": {
      "msg": "success",
      "code": 0,
      "page": {
        "totalCount": 2,
        "pageSize": 10,
        "totalPage": 1,
        "currPage": 1,
        "list": [{
            "regionCode": "360802",
            "organizationName": "智慧旅游平台",
            "organizationCode": "1",
            "roleCode": "enterprice",
            "name": "吉安旅游惠民卡",
            "roleName": "旅游商户",
            "id": 1502,
            "username": "sh01246",
            "status": "0"
          },
          {
            "regionCode": "360731",
            "organizationName": "于都全域旅游",
            "organizationCode": "360731",
            "roleCode": "enterprice",
            "name": "于都全域旅游",
            "roleName": "旅游商户",
            "id": 1501,
            "username": "sh01245",
            "status": "0"
          },
          {
            "regionCode": "360731",
            "organizationName": "智慧旅游平台",
            "organizationCode": "1",
            "roleCode": "enterprice",
            "name": "于都古雅阁工艺品",
            "roleName": "旅游商户",
            "id": 1500,
            "username": "sh01244",
            "status": "0"
          },
          {
            "regionCode": "3607",
            "organizationName": "智慧旅游平台",
            "organizationCode": "1",
            "roleCode": "qd_seller",
            "name": "智慧旅游",
            "roleName": "年卡渠道商",
            "id": 1499,
            "username": "zhly",
            "status": "0"
          },
          {
            "regionCode": "360731",
            "organizationName": "于都全域旅游",
            "organizationCode": "360731",
            "roleCode": "operater04",
            "name": "于都运营管理",
            "roleName": "县级运营者",
            "id": 1498,
            "username": "ydyyadmin",
            "status": "0"
          },
          {
            "regionCode": "360802",
            "organizationName": "吉安智慧旅游",
            "organizationCode": "3608",
            "roleCode": "enterprice",
            "name": "吉安智慧旅游",
            "roleName": "旅游商户",
            "id": 1497,
            "username": "sh01243",
            "status": "0"
          },
          {
            "regionCode": "360881",
            "organizationName": "智慧旅游平台",
            "organizationCode": "1",
            "roleCode": "enterprice",
            "name": "紫金宾馆",
            "roleName": "旅游商户",
            "id": 1496,
            "username": "sh01242",
            "status": "0"
          },
          {
            "regionCode": "360702",
            "organizationName": "智慧旅游平台",
            "organizationCode": "1",
            "roleCode": "enterprice",
            "name": "赣州礼物",
            "roleName": "旅游商户",
            "id": 1495,
            "username": "sh01241",
            "status": "0"
          },
          {
            "regionCode": "360702",
            "organizationName": "智慧旅游平台",
            "organizationCode": "1",
            "roleCode": "enterprice",
            "name": "青山寨赣州特产专卖店",
            "roleName": "旅游商户",
            "id": 1494,
            "username": "sh01240",
            "status": "0"
          },
          {
            "regionCode": "360702",
            "organizationName": "智慧旅游平台",
            "organizationCode": "1",
            "roleCode": "enterprice",
            "name": "江西齐云山食品有限公司",
            "roleName": "旅游商户",
            "id": 1493,
            "username": "sh01239",
            "status": "0"
          }
        ]
      }
    }
  }
}

// 获取登录用户信息
export function getUserInfo() {
  return {
    // isOpen: false,
    url: '/sys/user/getUserInfo',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'user':{
        'id':1,
        'username':'yinshuai'
      }
    }
  }
}

// 修改密码
export function updatePassword() {
  return {
    // isOpen: false,
    url: '/sys/user/password',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 添加用户
export function add() {
  return {
    // isOpen: false,
    url: '/sys/user/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改用户
export function update() {
  return {
    // isOpen: false,
    url: '/sys/user/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除用户
export function del() {
  return {
    // isOpen: false,
    url: '/sys/user/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
