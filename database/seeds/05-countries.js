exports.seed = function (knex) {
    return knex("countries").insert([
      {
          campaign_id: 1,
          name:"Montazi",
          ruler: "Emperor Ulgalash",
          description: "Empire of beast people and philosophers",
          founded: "Ancient times",
      },
      {
        campaign_id: 1,
        name:"Nefay",
        ruler: "Parliament of Earls",
        description: "Land of the wild elves",
        founded: "Ancient times",
      },
    ])
  }