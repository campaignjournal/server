exports.seed = function (knex) {
    return knex("characters").insert([
      {
          campaign_id: 1,
          name:"Edawal",
          level: 1,
          class: "Monk",
          ancestry: "Elf",
          description:"A fearsome monk",
      },
      {
        campaign_id: 1,
        name:"Nem",
        level: 5,
        class: "Witch",
        ancestry: "Changeling",
        description:"A powerful witch",
      },
    ])
  }