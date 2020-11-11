const reliValidator = (religion) => {
    return religion.world_id && religion.name && religion.description && religion.doctrines && religion.gods ? true : false
}

module.exports = reliValidator