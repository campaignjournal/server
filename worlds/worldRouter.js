const router = require("express").Router()

const Worlds = require("./worldModel")
const worldValidator = require("../middleware/worldValidator")
// WORLD SUB-ROUTING

router.get("/:id/worlds", (req, res) => {
    const id = req.params.id

    Worlds.findWorldsByCampaign(id)
        .then((worlds) => {
            if (worlds) {
                res.status(200).json({
                    data: worlds
                })
            } else {
                res.status(404).json({
                    message: "No worlds have been created, yet!"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

router.get("/:id/worlds/:worldid", (req, res) => {
    const worldId = req.params.worldid

    Worlds.findByWorld(worldId)
        .then((world) => {
            if (world) {
                res.status(200).json({
                    data: world
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

router.post("/:id/worlds/", (req, res) => {
    const id = req.params.id
    const newWorld = req.body
    const legitWorld = worldValidator(newWorld)

    if (legitWorld) {
        Worlds.createWorld(id, newWorld)
            .then(world => {
                res.status(201).json({ data: world })
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Worlds must have a campaign_id, description, and name."
        })
    }
})

router.put("/:id/worlds/:worldid", (req, res) => {
    const worldId = req.params.worldid
    const changes = req.body
    const legitWorld = worldValidator(changes)

    if (legitWorld) {
        Worlds.updateWorld(worldId, changes)
            .then(world => {
                if (world) {
                    res.status(200).json({
                        data: world
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
    } else {
        res.status(400).json({
            errorMessage: "Worlds must have a campaign_id, description, and name."
        })
    }
})

router.delete("/:id/worlds/:worldid", (req, res) => {
    const worldId = req.params.worldid

    Worlds.destroyWorld(worldId)
        .then((world) => {
            if (world) {
                res.status(200).json({
                    message: "Successfully deleted."
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

module.exports = router
