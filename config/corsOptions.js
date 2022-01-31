require('dotenv').config()
const { SERVER_URL } = process.env

const whitelist = [
    'http://localhost:4000'
] // adding your desired website to the whitelist for 'cors'

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions