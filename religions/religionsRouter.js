const router = require("express").Router()

const Religions = require("./religionsModel")
const reliValidator = require("../middleware/reliValidator")

router.get("/:id/worlds/:worldid/religions", (req, res) => {
    const worldId = req.params.worldid

    Religions.findReligionsByWorld(worldId)
        .then((religions) => {
            if (religions) {
                res.status(200).json({
                    data: religions
                })
            } else {
                res.status(404).json({
                    errorMessage: "No religions have been created, yet!"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

router.get("/:id/worlds/:worldid/religions/:relid", (req, res) => {
    const relId = req.params.relid

    Religions.findByReligion(relId)
        .then((religion) => {
            if (religion) {
                res.status(200).json({ data: religion })
            } else {
                res.status(404).json({
                    errorMessage: "Record does not exist"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

router.post("/:id/worlds/:worldid/religions", (req, res) => {
    const worldId = req.params.worldid
    const newReligion = req.body
    const legitRel = reliValidator(newReligion)

    if (legitRel) {
        Religions.createReligion(worldId, newReligion)
            .then((religions) => {
                res.status(201).json({
                    data: newReligion
                })
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Religions require the following attributes: world_id, doctrines, description, gods, and name."
        })
    }

})

router.put("/:id/worlds/:worldid/religions/:relid", (req, res) => {
    const relId = req.params.relid
    const changes = req.body
    const legitRel = reliValidator(changes)

    if (legitRel) {
        Religions.updateReligion(relId, changes)
            .then((religions) => {
                res.status(200).json({
                    data: changes
                })
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Religions require the following attributes: world_id, doctrines, description, gods, and name."
        })
    }
})

router.delete("/:id/worlds/:worldid/religions/:relid", (req, res) => {
    const relId = req.params.relid

    Religions.destroyReligion(relId)
        .then((religion) => {
            if (religion) {
                res.status(200).json({ message: "Successfully deleted" })
            } else {
                res.status(404).json({
                    errorMessage: "Record does not exist"
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