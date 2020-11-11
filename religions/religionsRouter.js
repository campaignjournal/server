const router = require("express").Router()

const Religions = require("./religionsModel")

router.get("/:id/worlds/:worldid/religions", (req, res) => {
    const worldId = req.params.worldid

    Religions.findReligionsByWorld(worldId)
        .then((religions) => {
            res.status(200).json({ data: religions })
        })
        .catch((err) => res.send(err))
})

router.get("/:id/worlds/:worldid/religions/:relid", (req, res) => {
    const relId = req.params.relid

    Religions.findByReligion(relId)
        .then((religions) => {
            res.status(200).json({ data: religions })
        })
        .catch((err) => res.send(err))
})

router.post("/:id/worlds/:worldid/religions", (req, res) => {
    const worldId = req.params.worldid
    const newReligion = req.body

    Religions.createReligion(worldId, newReligion)
        .then((religions) => {
            res.status(201).json({ data: religions })
        })
        .catch((err) => res.send(err))
})

router.put("/:id/worlds/:worldid/religions/:relid", (req, res) => {
    const relId = req.params.relid
    const changes = req.body

    Religions.updateReligion(relId, changes)
        .then((religions) => {
            res.status(200).json({ data: religions })
        })
        .catch((err) => res.send(err))
})

router.delete("/:id/worlds/:worldid/religions/:relid", (req, res) => {
    const relId = req.params.relid

    Religions.destroyReligion(relId)
    .then(() => {
        res.status(200).json({ message: "Successfully deleted"})
    })
    .catch((err) => res.send(err))
})

module.exports = router