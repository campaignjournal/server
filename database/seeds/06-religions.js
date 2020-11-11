exports.seed = function (knex) {
    return knex("religions").insert([
      {
          world_id: 1,
          name:"Harvestism",
          gods: "A metric ton, I honestly can't list them all",
          description: "Some kind of druidism",
          doctrines: "Worship nature, be a cool dude, fight werewolves",
      },
    ])
  }