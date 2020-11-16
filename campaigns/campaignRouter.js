const router = require("express").Router()

const Campaigns = require('./campaignsModel')
const campValidator = require('../middleware/campValidator')

//CAMPAIGN GENERAL ROUTING

router.get("/", (req, res) => {

    Campaigns.findCampaigns()
        .then((campaigns) => {
            if (campaigns) {
                res.status(200).json({
                    campaigns
                })
            } else {
                res.status(404).json({
                    message: "No campaigns created, yet!"
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

    Campaigns.findById(id)
        .then((campaigns) => {
            if (campaigns) {
                res.status(200).json({
                    campaigns
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

router.get("/user-campaigns/:userid", (req, res) => {
    const id = req.params.userid

    Campaigns.findByUserId(id)
        .then((campaigns) => {
            if (campaigns.length !== 0) {
                res.status(200).json({
                    campaigns
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

router.post("/", (req, res) => {
    const newCampaign = req.body
    const legitCamp = campValidator(newCampaign)

    if (legitCamp) {
        Campaigns.create(newCampaign)
            .then(campaign => {
                res.status(201).json(newCampaign)
            })
            .catch(err => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Campaigns require the following attributes: user_id, name, and description.",
        })
    }
})

router.put("/:id", (req, res) => {
    const editedCampaign = req.body
    const id = req.params.id
    const legitCamp = campValidator(editedCampaign)

    if (legitCamp) {
        Campaigns.update(id, editedCampaign)
            .then(campaign => {
                if (campaign) {
                    res.status(200).json(editedCampaign)
                } else {
                    res.status(404).json({
                        errorMessage: "Record does not exist."
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Campaigns require the following attributes: user_id, name, and description.",
        })
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id

    Campaigns.remove(id)
        .then(campaigns => {
            if (campaigns) {
                res.status(200).json({
                    message: "Successfully deleted."
                })
            } else {
                res.status(404).json({
                    errorMessage: "Record does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

module.exports = router