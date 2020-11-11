const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Users = require("./UserModel")

// middleware 
const userValidator = require("../middleware/userValidator")
const restricted = require("../middleware/restricted")
const envSecret = require("../config/secrets")

const makeJWT = (user) => {
    const payload = {
        subject: user.id,
        username: user.username,
    }

    const secret = envSecret.jwtSecret

    const options = {
        expiresIn: "8h",
    }

    return jwt.sign(payload, secret, options)
}

router.get("/", restricted, (req, res) => {
    Users.find()
        .then((users) => {
            if (users) {
                res.status(200).json({
                    data: users
                })
            } else {
                res.status(404).json({
                    message: "No users have joined, yet!"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

router.get("/:id", restricted, (req, res) => {
    const id = req.params.id
    Users.findById(id)
        .then((user) => {
            if (user) {
                res.status(200).json({
                    data: user
                })
            } else {
                res.status(404).json({
                    message: "Record does not exist."
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

router.post("/register", (req, res) => {
    const newUser = req.body
    const legitUser = userValidator(newUser)

    const rounds = process.env.HASH_RDS || 6
    const hash = bcryptjs.hashSync(newUser.password, Number(rounds))

    newUser.password = hash

    if (legitUser) {
        Users.create(newUser)
            .then(user => {
                const token = makeJWT(user)
                res.status(201).json({
                    data: user, token
                })
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Users have the following required attributes: username, password, and email. Username and password MUST be unique."
        })
    }
})

router.post("/login", (req, res) => {
    const { username, password } = req.body

    if (username && password) {
        Users.findByUsername(username)
            .then((user) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeJWT(user)
                    res.status(200).json({
                        user, token
                    })
                } else {
                    res.status(401).json({
                        message: "Invalid credentials", 
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Internal server error.", password
                })
            })
    } else {
        res.status(400).json({
            message: "please provide username and the password",
        })
    }
})

router.put("/:id", restricted, (req, res) => {
    const editedUser = req.body
    const id = req.params.id
    const legitUser = userValidator(editedUser)

    if (legitUser) {
        Users.update(id, editedUser)
            .then(thenRes => {
                if (thenRes) {
                    res.status(200).json(editedUser)
                } else {
                    res.status(404).json({
                        errorMessage: "Record does not exist."
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Users have the following required attributes: username, password, and email. Username and password MUST be unique."
        })
    }
})

router.delete("/:id", restricted, (req, res) => {
    const id = req.params.id

    Users.remove(id)
        .then(thenRes => {
            if (thenRes) {
                res.status(200).json({
                    message: "User successfully deleted."
                })
            } else {
                res.status(404).json({
                    errorMessage: "Record does not exist."
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

module.exports = router