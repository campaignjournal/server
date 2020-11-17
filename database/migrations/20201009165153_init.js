exports.up = function (knex) {
    return knex.schema
        .createTable("users", (tbl) => {
            tbl.increments()
            tbl.string("username", 128).notNullable().unique().index()
            tbl.string("password", 256).notNullable()
            tbl.string("email", 256).notNullable().unique()
        })
        .createTable("campaigns", (tbl) => {
            tbl.increments()
            tbl.integer("user_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            tbl.string("name", 256)
                .notNullable()
                .unique()
                .index()

            tbl.string("description", 256)
        })
        .createTable("countries", (tbl) => {
            tbl.increments()
            tbl.integer("campaign_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("campaigns")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            tbl.string("ruler", 256).notNullable()
            tbl.string("name", 256).notNullable()
            tbl.string("founded", 256).notNullable()
            tbl.string("description", 256).notNullable()

        })
        
        .createTable("characters", (tbl) => {
            tbl.increments()
            tbl.integer("campaign_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("campaign")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            tbl.string("ancestry", 256).notNullable()
            tbl.string("name", 256).notNullable()

            tbl.integer("level")
                .unsigned()
                .notNullable()

            tbl.string("class", 256).notNullable()
            tbl.string("description", 256).notNullable()

        })
        .createTable("world", (tbl) => {
            tbl.increments()
            tbl.integer("campaign_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("campaign")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            tbl.string("name", 256).notNullable().unique().index()
            tbl.string("description", 256)
        })

        .createTable("religions", (tbl) => {
            tbl.increments()
            tbl.integer("world_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("world")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            tbl.string("name", 256).notNullable()
            tbl.string("gods", 256).notNullable()
            tbl.string("doctrines", 256).notNullable()
            tbl.string("description", 256).notNullable()
        })

        .createTable("history", (tbl) => {
            tbl.increments()
            tbl.integer("world_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("world")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");


            tbl.string("name", 256)
            tbl.string("date", 256).notNullable()
            tbl.string("description", 256).notNullable()
        })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("history")
        .dropTableIfExists("religions")
        .dropTableIfExists("world")
        .dropTableIfExists("characters")
        .dropTableIfExists("countries")
        .dropTableIfExists("campaigns")
        .dropTableIfExists("users")
};
