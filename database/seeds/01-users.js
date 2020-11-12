const bcryptjs = require("bcryptjs")

const rounds = process.env.HASH_RDS || 6

const password = "password"
const hash = bcryptjs.hashSync(password, Number(rounds))

exports.seed = function (knex) {
    return knex("users").insert([
      {
        username: "mars_admin",
        password: hash,
        email: "mars@mars.com",
      },
    ])
  }