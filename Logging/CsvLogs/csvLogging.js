import { error } from 'console'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


const getFileName = (type) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const file = path.join(__dirname, type, new Date().toDateString() + ".csv")
    return file
}


const addQuerySuc = (query) => {
    const content = `${new Date().toLocaleString()},  ${query}, SUCCESS \r\n`
    fs.appendFile(getFileName("Queries"), content,
        (error) => {
            if (error) {
                console.log(error)
                console.warn("Log File Not Updated");
            }
        }
    )
}

const addQueryFai = (query, err) => {
    const content = `${new Date().toLocaleString()},  ${query}, FAILURE, ${err}   \r\n`
    fs.appendFile(getFileName("Queries"), content,
        (error) => {
            if (error) {
                console.log(error)
                console.warn("Log File Not Updated");
            }
        }
    )
}

const addErrorLogs = (type, message) => {
    const content = `${new Date().toLocaleString()},  ${type}, ${message} \r\n`
    fs.appendFile(getFileName("Error and Exceptions"), content,
        (error) => {
            if (error) {
                console.log(error)
                console.error("Error File Not Updated");
            }
        }
    )
}

export { addQuerySuc, addQueryFai, addErrorLogs }


