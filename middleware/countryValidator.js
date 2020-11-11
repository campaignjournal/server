const countryValidator = (country) => {
    return country.campaign_id && country.ruler && country.founded && country.description && country.name ? true : false
}

module.exports = countryValidator