const router = require("express").Router()

const Characters = require("./characterModel")
const charValidator = require("../middleware/charValidator")

// CHARACTER SUB-ROUTING

router.get("/:id/characters", (req, res) => {
    const id = req.params.id

    Characters.findCharactersByCampaign(id)
        .then((characters) => {
            if (characters) {
                res.status(200).json({
                    data: characters
                })
            } else {
                res.status(404).json({
                    message: "No characters created, yet!"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

router.get("/:id/characters/:characterid", (req, res) => {
    const characterId = req.params.characterid

    Characters.findByCharacterId(characterId)
        .then((character) => {
            if (character) {
                res.status(200).json({
                    data: character
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

router.post("/:id/characters", (req, res) => {
    const id = req.params.id
    const newCharacter = req.body
    const legitChar = charValidator(newCharacter)

    if (legitChar) {
        Characters.createCharacter(id, newCharacter)
            .then(character => {
                res.status(201).json({
                    data: newCharacter
                })
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            message: "Characters require the following attributes: campaign_id, level, class, ancestry, description, and name.",
        })
    }
})

router.put("/:id/characters/:characterid", (req, res) => {
    const characterId = req.params.characterid
    const changes = req.body
    const legitChar = charValidator(changes)

    if (legitChar) {
        Characters.updateCharacter(characterId, changes)
            .then(character => {
                if (character) {
                    res.status(200).json({
                        data: changes
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
            message: "Characters require the following attributes: campaign_id, level, class, ancestry, description, and name.",
        })
    }
})

router.delete("/:id/characters/:characterid", (req, res) => {
    const characterId = req.params.characterid

    Characters.destroyCharacter(characterId)
        .then((character) => {
            if (character) {
                res.status(200).json({
                    message: "Successfully deleted."
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

module.exports = router