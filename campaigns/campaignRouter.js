const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

// WORLD SUB-ROUTING

router.get("/:id/worlds", (req, res) => {
    const id = req.params.id

    Campaigns.findWorldsByCampaign(id)
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
            res.status(201).json({ data: world })
        })
        .catch(err => res.send(err))
})

router.put("/:id/worlds/:worldid", (req, res) => {
    const id = req.params.id
    const worldId = req.params.worldid
    const reshapedWorld = req.body

    Campaigns.updateWorld(worldId, reshapedWorld)
        .then(world => {
            res.status(200).json({ data: world })
        })
        .catch(err => res.send(err))
})

router.delete("/:id/worlds/:worldid", (req, res) => {
    const id = req.params.id
    const worldId = req.params.worldid

    Campaigns.destroyWorld(worldId)
        .then((world) => {
            res.status(200).json({ message: "Successfully deleted." })
        })
        .catch((err) => res.send(err))
})

// CHARACTER SUB-ROUTING

router.get("/:id/characters", (req, res) => {
    const id = req.params.id

    Campaigns.findCharactersByCampaign(id)
        .then((characters) => {
            res.status(200).json({ data: characters })
        })
        .catch((err) => res.send(err))
})

router.get("/:id/characters/:characterid", (req, res) => {
    const id = req.params.id
    const characterId = req.params.characterid

    Campaigns.findByCharacterId(characterId)
        .then((character) => {
            res.status(200).json({ data: character })
        })
        .catch((err) => res.send(err))
})

router.post("/:id/characters/", (req, res) => {
    const id = req.params.id
    const newCharacter = req.body

    Campaigns.createCharacter(id, newCharacter)
        .then(character => {
            res.status(201).json({ data: character })
        })
        .catch(err => res.send(err))
})

router.put("/:id/characters/:characterid", (req, res) => {
    const id = req.params.id
    const characterId = req.params.characterid
    const reshapedCharacter = req.body

    Campaigns.updateCharacter(characterId, reshapedCharacter)
        .then(character => {
            res.status(200).json({ data: character })
        })
        .catch(err => res.send(err))
})

router.delete("/:id/characters/:characterid", (req, res) => {
    const id = req.params.id
    const characterId = req.params.characterid

    Campaigns.destroyCharacter(characterId)
        .then((character) => {
            res.status(200).json({ message: "Successfully deleted." })
        })
        .catch((err) => res.send(err))
})

// COUNTRY SUB-ROUTING

router.get("/:id/countries", (req, res) => {
    const id = req.params.id

    Campaigns.findCountriesByCampaign(id)
        .then((countries) => {
            res.status(200).json({ data: countries })
        })
        .catch((err) => res.send(err))
})

router.get("/:id/countries/:countryid", (req, res) => {
    const id = req.params.id
    const countryId = req.params.countryid

    Campaigns.findByCountryId(countryId)
        .then((country) => {
            res.status(200).json({ data: country })
        })
        .catch((err) => res.send(err))
})

router.post("/:id/countries/", (req, res) => {
    const id = req.params.id
    const newCountry = req.body

    Campaigns.createCountry(id, newCountry)
        .then(character => {
            res.status(201).json({ data: country })
        })
        .catch(err => res.send(err))
})

router.put("/:id/countries/:countryid", (req, res) => {
    const id = req.params.id
    const countryId = req.params.countryid
    const reshapedCountry = req.body

    Campaigns.updateCountry(countryId, reshapedCountry)
        .then(country => {
            res.status(200).json({ data: country })
        })
        .catch(err => res.send(err))
})

router.delete("/:id/countries/:countryid", (req, res) => {
    const id = req.params.id
    const countryId = req.params.countryid

    Campaigns.destroyCountry(countryId)
        .then((country) => {
            res.status(200).json({ message: "Successfully deleted." })
        })
        .catch((err) => res.send(err))
})

module.exports = router