const jwt = require("jsonwebtoken")
const envSecret = require("../config/secrets")

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    const secret = envSecret.jwtSecret

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ unauthorized: "Token is not valid." })
            } else {
                req.jwt = decodedToken
            }
            next()
        })
    } else {
        res.status(401).json({ error: "You must be logged in to perform this action." })
    }
}