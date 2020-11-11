exports.seed = function (knex) {
    return knex("campaigns").insert([
      {
          user_id: 1,
          name:"Journey through Madderay",
          desc:"Follow Edawal as he punches every single monster!"
      },
    ])
  }