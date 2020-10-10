const db = require('../database/dbconfig')

module.exports = {
    findCampaigns,
    findById,
    create,
    remove,
    update,
    findWorldsByCampaign,
    findByWorld,
    updateWorld,
    createWorld,
    destroyWorld,
    findCharactersByCampaign,
    findByCharacterId,
    createCharacter,
    updateCharacter,
    destroyCharacter,
    findCountriesByCampaign,
    findByCountryId,
    createCountry,
    updateCountry,
    destroyCountry
}

// CAMPAIGN GENERAL ROUTING HELPERS

function findCampaigns() {
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

// COUNTRY SUB-ROUTING HELPERS

function findCountriesByCampaign(campId) {
    return db('countries')
        .where({ campaign_id: campId })
}

function findByCountryId(countryId) {
    return db('countries')
        .where({ id: countryId })
        .first()
}

function createCountry(id, newCountry) {
    return db('countries')
        .insert(newCountry)
        .where({ campaign_id: id })
}

function updateCountry(countryId, changes) {
    return db('countries')
        .where({ id: countryId })
        .update(changes)
}

function destroyCountry(countryId) {
    return db('countries')
        .where({ id: countryId })
        .del()
}