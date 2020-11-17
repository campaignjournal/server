exports.seed = function (knex) {
    return knex("campaigns").insert([
      {
          user_id: 1,
          name:"Journey through Madderay",
          description:"Follow Edawal as he punches every single monster!"
      },
    ])
  }