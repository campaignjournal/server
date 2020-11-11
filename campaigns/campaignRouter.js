const router = require("express").Router()

const Campaigns = require('./campaignsModel')

//CAMPAIGN GENERAL ROUTING

router.get("/", (req, res) => {

    Campaigns.findCampaigns()
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

module.exports = router