const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Campaigns = require('./campaignsModel')

//CAMPAIGN GENERAL ROUTING

router.get("/", (req, res) => {

    Campaigns.find()
        .then((campaigns) => {
            res.status(200).json({ data: campaigns })
        })
        .catch((err) => res.send(err))
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    
    Campaigns.findById(id)
        .then((campaigns) => {
            res.status(200).json({ data: campaigns })
        })
        .catch((err) => res.send(err))
})

router.post("/", (req, res) => {
    const newCampaign = req.body

    Campaigns.create(newCampaign)
        .then(thenRes => {
            res.status(201).json(newCampaign)
        })
        .catch(err => {
            res.status(400).json({ errorMessage: "Incorrectly shaped data." })
        })

})

router.put("/:id", (req, res) => {
    const editedCampaign = req.body
    const id = req.params.id

    Campaigns.update(id, editedCampaign)
        .then(thenRes => {
            if (thenRes) {
                res.status(204).json(editedCampaign)
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

    Campaigns.remove(id)
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

// WORLD SUB-ROUTING

router.get("/:id/worlds", (req, res) => {
    const id = req.params.id

    Campaigns.findByCampaign(id)
        .then((worlds) => {
            res.status(200).json({ data: worlds })
        })
        .catch((err) => res.send(err))
})

router.get("/:id/worlds/:worldid", (req, res) => {
    const id = req.params.id
    const worldId = req.params.worldid

    Campaigns.findByWorld(worldId)
        .then((world) => {
            res.status(200).json({ data: world })
        })
        .catch((err) => res.send(err))
})

router.post("/:id/worlds/", (req, res) => {
    const id = req.params.id
    const newWorld = req.body

    Campaigns.createWorld(id, newWorld)
        .then(world => {
            res.status(201).json({data: world})
        })
        .catch(err => res.send(err))
})

module.exports = router