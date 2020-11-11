const router = require("express").Router()

const History = require("./historyModel")

router.get("/:id/worlds/:worldid/history", (req, res) => {
    const worldId = req.params.worldid

    History.findEventsByWorld(worldId)
        .then((history) => {
            res.status(200).json({ data: history })
        })
        .catch((err) => res.send(err))
})

router.get("/:id/worlds/:worldid/history/:eventid", (req, res) => {
    const eventId = req.params.eventid

    History.findByEvent(eventId)
        .then((history) => {
            res.status(200).json({ data: history })
        })
        .catch((err) => res.send(err))
})

router.post("/:id/worlds/:worldid/history", (req, res) => {
    const worldId = req.params.worldid
    const newEvent = req.body

    History.createEvent(worldId, newEvent)
        .then((history) => {
            res.status(201).json({ data: history })
        })
        .catch((err) => res.send(err))
})

router.put("/:id/worlds/:worldid/history/:eventid", (req, res) => {
    const eventId = req.params.eventid
    const changes = req.body

    History.updateEvent(eventId, changes)
        .then((history) => {
            res.status(200).json({ data: history })
        })
        .catch((err) => res.send(err))
})

router.delete("/:id/worlds/:worldid/history/:eventid", (req, res) => {
    const eventId = req.params.eventid

    History.destroyEvent(eventId)
        .then(() => {
            res.status(200).json({ message: "Successfully deleted" })
        })
        .catch((err) => res.send(err))
})

module.exports = router