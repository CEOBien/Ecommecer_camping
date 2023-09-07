// import fs from("fs").promises
const fs = require("fs")
const path = require("path")
const { format } = require("date-fns")

const fileName = path.join(__dirname, "../logs", "errors.log")

let logEvents = async (msg) => {
  const dateTime = `${format(new Date(), "dd-MM-yyyy\tHH:mm:ss")}`
  const contentLog = `${dateTime} --- ${msg}\n`
  try {
    // fs.appendFile(fileName, contentLog)
    // fs.appendFile(fileName, contentLog)
  } catch (error) {
    console.error(error)
  }
}
module.exports = logEvents
