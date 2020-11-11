const router = require("express").Router()

const Worlds = require('./worldModel')

// WORLD SUB-ROUTING

router.get("/:id/worlds", (req, res) => {
    const id = req.params.id

   Worlds.findWorldsByCampaign(id)
        .then((worlds) => {
            res.status(200).json({ data: worlds })
        })
        .catch((err) => res.send(err))
})

router.get("/:id/worlds/:worldid", (req, res) => {
    const id = req.params.id
    const worldId = req.params.worldid

   Worlds.findByWorld(worldId)
        .then((world) => {
            res.status(200).json({ data: world })
        })
        .catch((err) => res.send(err))
})

router.post("/:id/worlds/", (req, res) => {
    const id = req.params.id
    const newWorld = req.body

   Worlds.createWorld(id, newWorld)
        .then(world => {
            res.status(201).json({ data: world })
        })
        .catch(err => res.send(err))
})

router.put("/:id/worlds/:worldid", (req, res) => {
    const id = req.params.id
    const worldId = req.params.worldid
    const reshapedWorld = req.body

   Worlds.updateWorld(worldId, reshapedWorld)
        .then(world => {
            res.status(200).json({ data: world })
        })
        .catch(err => res.send(err))
})

router.delete("/:id/worlds/:worldid", (req, res) => {
    const id = req.params.id
    const worldId = req.params.worldid

   Worlds.destroyWorld(worldId)
        .then((world) => {
            res.status(200).json({ message: "Successfully deleted." })
        })
        .catch((err) => res.send(err))
})

module.exports = router