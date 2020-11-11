const router = require("express").Router()

const Countries = require("./countryModel")
const countryValidator = require("../middleware/countryValidator")

// COUNTRY SUB-ROUTING

router.get("/:id/countries", (req, res) => {
    const id = req.params.id

    Countries.findCountriesByCampaign(id)
        .then((countries) => {
            if (countries) {
                res.status(200).json({
                    data: countries
                })
            } else {
                res.status(404).json({
                    message: "No countries have been created, yet!"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

router.get("/:id/countries/:countryid", (req, res) => {
    const countryId = req.params.countryid

    Countries.findByCountryId(countryId)
        .then((country) => {
            if (country) {
                res.status(200).json({
                    data: country
                })
            } else {
                res.status(404).json({
                    errorMessage: "Record does not exist"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Internal server error."
            })
        })
})

router.post("/:id/countries/", (req, res) => {
    const id = req.params.id
    const newCountry = req.body
    const legitCountry = countryValidator(newCountry)

    if (legitCountry) {
        Countries.createCountry(id, newCountry)
            .then(character => {
                res.status(201).json({
                    data: newCountry
                })
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Internal server error."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Countries require the following attributes: campaign_id, ruler, founded, description, and name."
        })
    }
})

router.put("/:id/countries/:countryid", (req, res) => {
    const countryId = req.params.countryid
    const changes = req.body
    const legitCountry = countryValidator(changes)

    if (legitCountry) {
        Countries.updateCountry(countryId, changes)
            .then(country => {
                if (country) {
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
            errorMessage: "Countries require the following attributes: campaign_id, ruler, founded, description, and name."
        })
    }
})

router.delete("/:id/countries/:countryid", (req, res) => {
    const countryId = req.params.countryid

    Countries.destroyCountry(countryId)
        .then((country) => {
            if (country) {
                res.status(200).json({
                    message: "Successfully deleted."
                })
            } else {
                res.status(404).json({
                    errorMessage: "Record does not exist"
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