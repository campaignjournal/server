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

router.get("/:id/worlds/:worldid/religions/:relId", (req, res) => {
    const relId = req.params.relId

    Religions.findByReligion(relId)
    .then((religions) => {
        res.status(200).json({ data: religions})
    })
    .catch((err) => res.send(err))
})

module.exports = router