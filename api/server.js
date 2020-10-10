require("dotenv").config()

const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const server = express()
const usersRouter = require('../users/userRouter')

server.use(helmet())
server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.send({message: "up, check it out"})
})

server.use("/api/users", usersRouter)

module.exports = server