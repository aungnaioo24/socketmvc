// import node modules
const express = require('express')
const router = express.Router()

// import files
const emitController = require('../controllers/emitController')

module.exports = (io) => {

    router.post('/', async(req, res) => emitController.emitChats(req, res, io))

    return router
}