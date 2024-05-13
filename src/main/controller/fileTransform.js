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
      data['附加信息'] = prevData['附加信息']
    }
    const childInfo = getChildInfoByCustomData(data['附加信息'])
    prevData = data
    const result = {
      orderId: data.orderId,
      createTime: data['创建时间'],
      ...childInfo
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
