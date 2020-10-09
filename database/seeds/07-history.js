exports.seed = function (knex) {
    return knex("history").insert([
      {
          world_id: 1,
          name:"Fall of Sabune",
          description: "Free Sabune got wrecked by some beast people",
          date: "150 years ago",
      },
    ])
  }