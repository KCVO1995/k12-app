import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'
import fs from 'fs'

let outputRow = null

const columns = [
  {
    title: 'Order No.',
    key: 'orderId'
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
  {
    title: 'Student ID',
    key: 'studentId'
  },
  {
    title: 'Chinese Name',
    key: 'chineseName'
  },
  {
    title: 'First Name',
    key: 'firstName'
  },
  {
    title: 'Family Name',
    key: 'familyName'
  },
  {
    title: 'Grade',
    key: 'grade'
  },
  {
    title: 'Class',
    key: 'schoolClass'
  },
  {
    title: 'Product',
    key: 'productName'
  },
  {
    title: 'Shirt Name',
    key: 'shirtName'
  },
  {
    title: 'Number',
    key: 'number'
  },
  // TODO: 商品属性
  {
    title: 'QTY',
    key: 'qty'
  },
  {
    title: 'Price',
    key: 'price'
  },
  {
    title: '收货人',
    key: 'receiver'
  },
  {
    title: '联系手机',
    key: 'contact'
  },
  {
    title: '收货区域',
    key: 'receiveArea'
  },
  {
    title: '收货地址',
    key: 'receiveAddress'
  },
  {
    title: '买家留言',
    key: 'remark'
  },
  {
    title: 'Data',
    key: 'customData'
  }
]

const resolveHeader = (header) => {
  header[0] = 'orderId'
  return header
  // return header.map((item) => {
  //   if (item === '订单号') return 'orderId'
  //   return item
  // })
}

const readCsvFile = (filePath) => {
  const fs = require('fs')
  const csvString = fs.readFileSync(filePath, 'utf8', 'r+')
  const csvData = parse(csvString, {
    columns: resolveHeader
  })
  return csvData
}

const generateResultData = (csvData) => {
  let prevData = null

  const resultData = csvData.map((data) => {
    if (!data.orderId && prevData) {
      data.orderId = prevData.orderId
      data['创建时间'] = prevData['创建时间']
      data['收货人'] = prevData['收货人']
      data['联系手机'] = prevData['联系手机']
      data['收货区域'] = prevData['收货区域']
      data['收货地址'] = prevData['收货地址']
      data['买家留言'] = prevData['买家留言']
      data['附加信息'] = prevData['附加信息']
    }
    const childInfo = getChildInfoByCustomData(data['附加信息'])
    const productCustomInfo = getProductCustomInfoByCustomData(
      data['附加信息'],
      data['商品名'],
      data['规格']
    )
    prevData = data
    const result = {
      orderId: data.orderId,
      createTime: data['创建时间'],
      ...childInfo,
      productName: data['商品名'],
      ...productCustomInfo,
      qty: data['数量'],
      price: data['单价'],
      receiver: data['收货人'],
      contact: data['联系手机'],
      receiveArea: data['收货区域'],
      receiveAddress: data['收货地址'],
      remark: data['买家留言'],
      customData: data['附加信息']
    }
    return result
  })
  console.log(resultData, 'resultData')
  return resultData
}

export const handleTransformFile = (event, filePath) => {
  console.log(filePath, 'filePath')
  const csvData = readCsvFile(filePath)
  const resultData = generateResultData(csvData)
  outputRow = toCsvArray(resultData, columns)
  console.log(outputRow, 'outputRow')

  return 'ok'
}

export const saveResultFile = (filePath) => {
  if (!outputRow) return
  const outputFile = stringify(outputRow)
  fs.writeFileSync(filePath + '.csv', outputFile)
}

const toCsvArray = (records, columns) => {
  const header = columns.map((item) => item.title)
  const rows = records.map((item) => {
    const row = []
    columns.forEach(({ key }) => {
      row.push(item[key])
    })
    return row
  })
  rows.unshift(header)
  return rows
}

const getChildInfoByCustomData = (customData) => {
  // chineseName> name>Tong Tong familyName>Yip gender>Girl school>aisg-ersha grade>2 class>2C studentId>233771 id>Tong Tong selected>true
  const studentId = customData.match(/studentId>(.*) id>/)?.[1] || ''
  const chineseName = customData.match(/chineseName>(.*) name>/)?.[1] || ''
  const firstName = customData.match(/name>(.*) familyName>/)?.[1] || ''
  const familyName = customData.match(/familyName>(.*) gender>/)?.[1] || ''
  const grade = customData.match(/grade>(.*) class>/)?.[1] || ''
  const schoolClass = customData.match(/class>(.*) studentId>/)?.[1] || ''
  return { studentId, chineseName, firstName, familyName, grade, schoolClass }
}

const getProductCustomInfoByCustomData = (customData, currentProductName) => {
  // data-1: 商品名:BIGZ Football Uniform | 商品规格:SIZE 尺码:L/180 | 商品数量:1 | shirtname: Chloe Hong | ; 孩子信息: {chineseName> name>Chloe familyName>Hong gender>Girl school>v000045 grade>10 class>NA studentId>15555 id>Chloe selected>true}
  // data-1: 商品名:AISG Alumni Letterman Jacket | 商品规格:SIZE:JXLGraduation:List year in number field | 商品数量:1 | number: 1 | shirtname: 1 | ; data-2: 商品名:Multi-sports Uniform 多用途球服 | 商品规格:SIZE 尺码:JL | 商品数量:1 | shirtname: 333 | ; 孩子信息: {chineseName>lll name>Ryan familyName>Lee gender>女 school>boston grade>K class>1 studentId>1 id>Ryanlll selected>true}
  let shirtName = ''
  let number = ''
  customData.split(';').forEach((item) => {
    const itemProductName = item.match(/商品名:(.*?) \|/)?.[1]
    // 一个家长同时在同一订单内购买了两个不同品牌的同名商品的情况下，可能匹配错误
    if (!itemProductName) return

    if (itemProductName.trim() === currentProductName.trim()) {
      shirtName = customData.match(/shirtname: (.*?) \|/)?.[1] || ''
      number = customData.match(/number: (.*?) \|/)?.[1] || ''
    }
  })

  return {
    shirtName,
    number
  }
}
