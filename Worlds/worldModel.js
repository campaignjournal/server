const db = require('../database/dbconfig')

module.exports = {
    findWorldsByCampaign,
    findByWorld,
    updateWorld,
    createWorld,
    destroyWorld,

}

// WORLD SUB-ROUTING HELPERS

function findWorldsByCampaign(campId) {
    return db('world')
        .where({ campaign_id: campId })
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
