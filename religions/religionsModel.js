const db = require('../database/dbconfig')

module.exports = {
    findReligionsByWorld,
    findByReligion,
    updateReligion,
    createReligion,
    destroyReligion,

}

// WORLD SUB-ROUTING HELPERS

function findReligionsByWorld(worldId) {
    return db('religions')
        .where({ world_id: worldId })
}

function findByReligion(relId) {
    return db('religions')
        .where({ id: relId })
        .first()
}

function createReligion(worldId, newReligion) {
    return db('religions')
        .insert(newReligion)
        .where({ world_id: worldId })
}

function updateReligion(worldId, changes) {
    return db('religions')
        .where({ id: worldId })
        .update(changes)
}

function destroyReligion(relId) {
    return db('Religions')
        .where({ id: relId })
        .del()
}
