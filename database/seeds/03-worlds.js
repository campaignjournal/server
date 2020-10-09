exports.seed = function (knex) {
    return knex("world").insert([
      {
          campaign_id: 1,
          name:"Madderay",
          description:"Oceanic world full of monsters and storms. Just an unpleasant place in general tbh."
      },
    ])
  }