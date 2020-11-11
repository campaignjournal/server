const db = require('../database/dbconfig')

module.exports = {
    findEventsByWorld,
    findByEvent,
    updateEvent,
    createEvent,
    destroyEvent,
}

// WORLD SUB-ROUTING HELPERS

function findEventsByWorld(worldId) {
    return db('history')
        .where({ world_id: worldId })
}

function findByEvent(eventId) {
    return db('history')
        .where({ id: eventId })
        .first()
}

function createEvent(worldId, newEvent) {
    return db('history')
        .insert(newEvent)
        .where({ world_id: worldId })
}

function updateEvent(worldId, changes) {
    return db('history')
        .where({ id: worldId })
        .update(changes)
}

function destroyEvent(eventId) {
    return db('history')
        .where({ id: eventId })
        .del()
}
