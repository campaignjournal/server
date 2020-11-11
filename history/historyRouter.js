const router = require("express").Router()

const History = require("./historyModel")
const histValidator = require("../middleware/histValidator")

router.get("/:id/worlds/:worldid/history", (req, res) => {
    const worldId = req.params.worldid

    History.findEventsByWorld(worldId)
        .then((history) => {
            if (history) {
                res.status(200).json({
                    data: history
                })
            } else {
                res.status(404).json({
                    errorMessage: "No historical events have been created, yet!"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

router.get("/:id/worlds/:worldid/history/:eventid", (req, res) => {
    const eventId = req.params.eventid

    History.findByEvent(eventId)
        .then((history) => {
            if (history) {
                res.status(200).json({
                    data: history
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

router.post("/:id/worlds/:worldid/history", (req, res) => {
    const worldId = req.params.worldid
    const newEvent = req.body
    const legitEvent = histValidator(newEvent)

    if (legitEvent) {
        History.createEvent(worldId, newEvent)
            .then((history) => {
                res.status(201).json({
                    data: history
                })
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Historical events require the following attributes: world_id, date, descriptions, and name."
        })
    }
})

router.put("/:id/worlds/:worldid/history/:eventid", (req, res) => {
    const eventId = req.params.eventid
    const changes = req.body
    const legitEvent = histValidator(changes)

    if (legitEvent) {
        History.updateEvent(eventId, changes)
            .then((history) => {
                res.status(200).json({
                    data: history
                })
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Historical events require the following attributes: world_id, date, descriptions, and name."
        })
    }
})

router.delete("/:id/worlds/:worldid/history/:eventid", (req, res) => {
    const eventId = req.params.eventid

    History.destroyEvent(eventId)
        .then((history) => {
            if (history) {
                res.status(200).json({
                    message: "Successfully deleted"
                })
            } else {
                res.status(404).json({
                    errorMessage: "Record does not exist."
                })
            }
        })
        .catch((err) => {
            res.status(500).json({ errorMessage: "Internal server error." })
        })
})

module.exports = router