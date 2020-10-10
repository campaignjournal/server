const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Countries = require('./countryModel')


// COUNTRY SUB-ROUTING

router.get("/:id/countries", (req, res) => {
    const id = req.params.id

    Countries.findCountriesByCampaign(id)
        .then((countries) => {
            res.status(200).json({ data: countries })
        })
        .catch((err) => res.send(err))
})

router.get("/:id/countries/:countryid", (req, res) => {
    const id = req.params.id
    const countryId = req.params.countryid

    Countries.findByCountryId(countryId)
        .then((country) => {
            res.status(200).json({ data: country })
        })
        .catch((err) => res.send(err))
})

router.post("/:id/countries/", (req, res) => {
    const id = req.params.id
    const newCountry = req.body

    Countries.createCountry(id, newCountry)
        .then(character => {
            res.status(201).json({ data: country })
        })
        .catch(err => res.send(err))
})

router.put("/:id/countries/:countryid", (req, res) => {
    const id = req.params.id
    const countryId = req.params.countryid
    const reshapedCountry = req.body

    Countries.updateCountry(countryId, reshapedCountry)
        .then(country => {
            res.status(200).json({ data: country })
        })
        .catch(err => res.send(err))
})

router.delete("/:id/countries/:countryid", (req, res) => {
    const id = req.params.id
    const countryId = req.params.countryid

    Countries.destroyCountry(countryId)
        .then((country) => {
            res.status(200).json({ message: "Successfully deleted." })
        })
        .catch((err) => res.send(err))
})

module.exports = router