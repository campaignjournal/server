require("dotenv").config()

const knex = require("knex")

const knexfile = require("../knexfile.js")

const environment = "production"

// const environment = "testing"

module.exports = knex(knexfile[environment])
