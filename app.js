// import node modules
const express = require("express")
const app = express()

const path = require('path')
const cors = require('cors')
const http = require("http")
const { Server } = require("socket.io")

// import files
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')

// middleware
app.use(logger)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// serve static files
// app.use('/', express.static(path.join(__dirname, '/public')))

// socket.io connection
let server = http.createServer(app)
let io = new Server(server, {
    cors: {
      origin: "http://localhost:4000",
      methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)
    socket.on("typing", (name) => {
      socket.broadcast.emit("typing", name)
    })

})

// routes
app.use('/', require('./routes/root'))
app.use('/emit', require('./routes/emit')(io))

// use error handler middleware for exporting error logs
app.use(errorHandler)

// server.listen by port number
const PORT = 4000
server.listen(PORT, () => {
    console.log(`Project is running on server port number: ${PORT}`)
})

module.exports = app