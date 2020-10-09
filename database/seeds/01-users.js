exports.seed = function (knex) {
    return knex("users").insert([
      {
        username: "mars_admin",
        password: "password",
        email: "mars@mars.com",
      },
    ])
  }