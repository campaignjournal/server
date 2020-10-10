const db = require('../database/dbconfig')

module.exports = {
    findReligionsByWorld,
    // findByReligion,
    // updateReligion,
    // createReligion,
    // destroyReligion,

}

// WORLD SUB-ROUTING HELPERS

function findReligionsByWorld(worldId) {
    return db('religions')
        .where({ world_id: worldId })
}

function findByWorld(worldId) {
    return db('world')
        .where({ id: worldId })
        .first()
}

function createWorld(id, newWorld) {
    return db('world')
        .insert(newWorld)
        .where({ campaign_id: id })
}

function updateWorld(worldId, changes) {
    return db('world')
        .where({ id: worldId })
        .update(changes)
}

function destroyWorld(worldId) {
    return db('world')
        .where({ id: worldId })
        .del()
}
