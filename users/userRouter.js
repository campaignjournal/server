const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Users = require("./UserModel")
const userValidator = require("../middleware/userValidator")
const envSecret = require("../config/secrets")

const makeJWT = (user) => {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    
    const secret = envSecret

    const options = {
        expiresIn: "8h",
      }
    
      return jwt.sign(payload, secret, options)
}

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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

    if (legitUser) {
        Users.create(newUser)
            .then(thenRes => {
                res.status(201).json({
                    data: newUser
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
    const newUser = req.body
    const legitUser = userValidator(newUser)

    if (legitUser) {
        Users.create(newUser)
            .then(thenRes => {
                res.status(201).json({
                    data: newUser
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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