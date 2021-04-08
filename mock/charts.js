/* eslint-disable */
const conversion = {
  "msg": "查询成功",
  "success": true,
  "obj": [
    {
      "area": "邳州",
      "ordersCount": "9175",
      "activation": "3917",
      "fiftyMore": "3614",
      "hundredMore": "746",
      "conversionRate": "39.39%"
    },
    {
      "area": "鼓楼",
      "ordersCount": "3830",
      "activation": "1943",
      "fiftyMore": "1795",
      "hundredMore": "531",
      "conversionRate": "46.87%"
    },
    {
      "area": "沛县",
      "ordersCount": "6723",
      "activation": "2929",
      "fiftyMore": "2587",
      "hundredMore": "623",
      "conversionRate": "38.48%"
    },
    {
      "area": "睢宁",
      "ordersCount": "7445",
      "activation": "3221",
      "fiftyMore": "3027",
      "hundredMore": "745",
      "conversionRate": "40.66%"
    },
    {
      "area": "贾汪",
      "ordersCount": "3560",
      "activation": "1599",
      "fiftyMore": "1459",
      "hundredMore": "305",
      "conversionRate": "40.98%"
    },
    {
      "area": "铜山",
      "ordersCount": "7560",
      "activation": "3176",
      "fiftyMore": "2976",
      "hundredMore": "719",
      "conversionRate": "39.37%"
    },
    {
      "area": "泉山",
      "ordersCount": "3562",
      "activation": "1895",
      "fiftyMore": "1826",
      "hundredMore": "430",
      "conversionRate": "51.26%"
    },
    {
      "area": "丰县",
      "ordersCount": "5981",
      "activation": "3176",
      "fiftyMore": "2935",
      "hundredMore": "1008",
      "conversionRate": "49.07%"
    },
    {
      "area": "云龙",
      "ordersCount": "2863",
      "activation": "1571",
      "fiftyMore": "1458",
      "hundredMore": "412",
      "conversionRate": "50.93%"
    },
    {
      "area": "新沂",
      "ordersCount": "6587",
      "activation": "3046",
      "fiftyMore": "2746",
      "hundredMore": "568",
      "conversionRate": "41.69%"
    }
  ]
}

/* eslint-enable */
module.exports = [
  {
    url: '/vue-admin-template/OnlineRetailers/reportOrderWhole',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: conversion
      }
    }
  }
]
