const db = require('../database/dbconfig')

module.exports = {
    find,
    findById,
    create,
    remove,
    update,
    findByCampaign,
    findByWorld,
    updateWorld,
    createWorld,
}

// CAMPAIGN GENERAL ROUTING HELPERS

function find() {
    return db("campaigns")
}

function findById(id) {
    return db("campaigns")
        .where({ id })
        .first()
}

function create(campaign) {
    return db('campaigns')
        .insert(campaign)
}

function remove(id) {
    return db('campaigns')
        .where('id', id)
        .del()
}

function update(id, changes) {
    return db('campaign')
        .where('id', id)
        .update(changes)
}

// WORLD SUB-ROUTING HELPERS

function findByCampaign(campId) {
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
        .where({ campaign_id: id})
}

function updateWorld(worldId, changes) {
    return db('world')
        .where({ id: worldId })
        .update(changes)
}