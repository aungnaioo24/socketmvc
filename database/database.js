// import modules
require('dotenv').config()
const { Sequelize } = require('sequelize')

// Config database in .env file
const { DB_NAME, DB_HOST, DB_DIALECT, DB_USERNAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT
})

module.exports = sequelize