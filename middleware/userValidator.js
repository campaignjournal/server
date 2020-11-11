const { use } = require("../worlds/worldRouter")

const userValidator = (user) => {
    return user.username && user.password && user.email ? true : false
}

module.exports = userValidator