const worldValidator = (world) => {
    return world.campaign_id && world.name && world.description ? true : false
}

module.exports = worldValidator