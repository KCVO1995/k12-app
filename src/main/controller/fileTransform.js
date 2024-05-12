import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'
import fs from 'fs'
import path from 'path'

let outputFile = null

const columns = [
  {
    title: 'Order No.',
    key: 'orderId'
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

export const handleTransformFile = (event, filePath) => {
  console.log(filePath, 'filePath')
  const csvData = readCsvFile(filePath)

  let prevData = ''
  const resultData = csvData.map((data) => {
    if (!data.orderId && prevData) {
      data.orderId = prevData.orderId
    }
    prevData = data
    return {
      orderId: data.orderId
    }
  })

  const rows = toCsvArray(resultData, columns)

  outputFile = stringify(rows)
  return 'ok'
}

export const saveResultFile = (filePath) => {
  if (!outputFile) return
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
