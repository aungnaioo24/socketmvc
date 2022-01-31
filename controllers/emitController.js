// import app form app.js
const app = require('../app')


const emitChats = async(req, res, io) => {
    
    let data = req.body.data
    io.sockets.emit("chat", data)
    
    return res.end()
}

module.exports = { emitChats }