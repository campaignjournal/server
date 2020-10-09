const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Users = require('./UserModel')

router.get("/", (req, res) => {
    Users.find()
        .then((users) => {
            res.status(200).json({ data: users })
        })
        .catch((err) => res.send(err))
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Users.findById(id)
        .then((users) => {
            res.status(200).json({ data: users })
        })
        .catch((err) => res.send(err))
})

router.post("/", (req, res) => {
    const newUser = req.body
    
    Users.create(newUser)
        .then(thenRes => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(400).json({ errorMessage: "Incorrectly shaped data." })
        })

})

router.put("/:id", (req, res) => {
    const editedUser = req.body
    const id = req.params.id

    Users.update(id, editedUser)
            .then(thenRes => {
                if (thenRes) {
                    res.status(204).json(editedUser)
                } else {
                    res.status(404).json({ errorMessage: "Record does not exist." })
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "Internal server error." })
            })

})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Users.remove(id)
        .then(thenRes => {
            if (thenRes) {
                res.status(200).json(thenRes)
            } else {
                res.status(404).json({ errorMessage: "Record does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Internal server error." })
        })
})

module.exports = router