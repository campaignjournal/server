const charValidator = (char) => {
    return char.campaign_id && char.name && char.level && char.class && char.ancestry && char.description ? true : false
}

module.exports = charValidator