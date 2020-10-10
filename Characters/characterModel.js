const db = require('../database/dbconfig')

module.exports = {
    findCharactersByCampaign,
    findByCharacterId,
    createCharacter,
    updateCharacter,
    destroyCharacter,
}

// CHARACTER SUB-ROUTING HELPERS

function findCharactersByCampaign(campId) {
    return db('characters')
        .where({ campaign_id: campId })
}

function findByCharacterId(charactersId) {
    return db('characters')
        .where({ id: charactersId })
        .first()
}

function createCharacter(id, newCharacters) {
    return db('characters')
        .insert(newCharacters)
        .where({ campaign_id: id })
}

function updateCharacter(charactersId, changes) {
    return db('characters')
        .where({ id: charactersId })
        .update(changes)
}

function destroyCharacter(charactersId) {
    return db('characters')
        .where({ id: charactersId })
        .del()
}