const { format } = require('date-fns')
const { v4: uuid } = require('uuid') // use v4 as uuid, so we don't have to use uuid.v4(), random unique id

const fs = require('fs') // file system
const fsPromise = require('fs').promises // file system with async
const path = require('path')

const logEvents = async (message, logName) => {
    const dateTime = '' + format(new Date(), 'yyy/MM/dd\tHH:mm:ss') // getting a date and time formatted
    const logItem = '' + dateTime + '\t' + uuid() + '\t' + message + '\n'
    console.log(logItem)
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
        }
        // testing
        await fsPromise.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch (err) {
        console.error(err)
    }
}

const logger = (req, res, next) => {

    if (req.path != '/socket.io/') {
        logEvents(''+req.method+'\t'+req.headers.origin+'\t'+req.url, 'reqLog.txt') // req.headers.origin => where the request is coming from
    }
    
    console.log(''+req.method+req.path)
    next()
}

module.exports = { logger, logEvents }