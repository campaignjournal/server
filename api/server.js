require("dotenv").config()

const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const server = express()
const usersRouter = require('../users/userRouter')
const campaignsRouter = require('../campaigns/campaignRouter')
const countryRouter = require('../countries/countryRouter')
const worldRouter = require('../worlds/worldRouter')
const characterRouter = require('../characters/characterRouter')

server.use(helmet())
server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.send({message: "up, check it out"})
})

server.use("/api/users", usersRouter)
server.use("/api/campaigns", campaignsRouter)
server.use("/api/campaigns/", countryRouter)
server.use("/api/campaigns/", worldRouter)
server.use("/api/campaigns/", characterRouter)

module.exports = server