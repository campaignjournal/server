const db = require('../database/dbconfig')

module.exports = {
    findCountriesByCampaign,
    findByCountryId,
    createCountry,
    updateCountry,
    destroyCountry
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
