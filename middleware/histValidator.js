const histValidator = history => {
    return history.world_id && history.date && history.description && history.name ? true : false
}

module.exports = histValidator