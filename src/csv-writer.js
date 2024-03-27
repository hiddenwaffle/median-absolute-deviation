import streamSaver from 'streamsaver'

let fileStream = null
let writer = null
const encoder = new TextEncoder()

function write(str, comma=true) {
  writer.write(encoder.encode(str))
  if (comma) {
    writer.write(encoder.encode(","))
  }
}

function newline() {
  writer.write(encoder.encode("\n"))
}

export function openCSV() {
  closeCSV()
  fileStream = streamSaver.createWriteStream('data.csv')
  writer = fileStream.getWriter()
}

export function writeArrayToCSV(name, arr) {
  write(name)
  for (let i = 0; i < arr.length - 1; i++) {
    write(arr[i])
  }
  write(arr[arr.length-1], false)
  newline()
}

export function writeStatsToCSV(stats) {
}

export function writeBlankLineToCSV() {
  newline()
}

export function closeCSV() {
  if (writer) {
    writer.close()
  }
  fileStream = null
  writer = null
}
