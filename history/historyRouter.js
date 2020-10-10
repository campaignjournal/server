const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const History = require("./historyModel")

module.exports = router