require("dotenv").config()

const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const server = express()

//routers

const usersRouter = require("../users/userRouter")
const campaignsRouter = require("../campaigns/campaignRouter")
const countryRouter = require("../countries/countryRouter")
const worldRouter = require("../Worlds/worldRouter")
const characterRouter = require("../characters/characterRouter")
const religionsRouter = require("../religions/religionsRouter")
const historyRouter = require("../history/historyRouter")

//middleware
const restricted = require("../middleware/restricted")

server.use(helmet())
server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.send({
        message: "up, check it out"
    })
})

server.use("/api/users", usersRouter)

// campaign routers 
server.use("/api/campaigns", restricted, campaignsRouter)
server.use("/api/campaigns", restricted, countryRouter)
server.use("/api/campaigns", restricted, worldRouter)
server.use("/api/campaigns", restricted, characterRouter)

// worlds sub-routers
server.use("/api/campaigns", restricted, religionsRouter)
server.use("/api/campaigns", restricted, historyRouter)

module.exports = server