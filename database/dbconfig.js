require("dotenv").config()

const knex = require("knex")

const knexfile = require("../knexfile.js")

// const environment = process.env.NODE_ENV || "development"

const environment = "testing"

module.exports = knex(knexfile[environment])
