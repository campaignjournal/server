const router = require("express").Router()

const Characters = require('./characterModel')

// CHARACTER SUB-ROUTING

router.get("/:id/characters", (req, res) => {
    const id = req.params.id

    Characters.findCharactersByCampaign(id)
        .then((characters) => {
            res.status(200).json({ data: characters })
        })
        .catch((err) => res.send(err))
})

router.get("/:id/characters/:characterid", (req, res) => {
    const id = req.params.id
    const characterId = req.params.characterid

    Characters.findByCharacterId(characterId)
        .then((character) => {
            res.status(200).json({ data: character })
        })
        .catch((err) => res.send(err))
})

router.post("/id:/characters", (req, res) => {
    const id = req.params.id
    const newCharacter = req.body

    Characters.createCharacter(id, newCharacter)
        .then(character => {
            res.status(201).json({ data: character })
        })
        .catch(err => res.send(err))
})

router.put("/:id/characters/:characterid", (req, res) => {
    const id = req.params.id
    const characterId = req.params.characterid
    const reshapedCharacter = req.body

    Characters.updateCharacter(characterId, reshapedCharacter)
        .then(character => {
            res.status(200).json({ data: character })
        })
        .catch(err => res.send(err))
})

router.delete("/:id/characters/:characterid", (req, res) => {
    const id = req.params.id
    const characterId = req.params.characterid

    Characters.destroyCharacter(characterId)
        .then((character) => {
            res.status(200).json({ message: "Successfully deleted." })
        })
        .catch((err) => res.send(err))
})

module.exports = router