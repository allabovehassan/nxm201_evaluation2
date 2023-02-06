const express = require("express")

require("dotenv").config()

const goldRouter = express.Router();

const { authenticator } = require("../middleware/authentication")

const {authorise} = require("../middleware/authorise")



goldRouter.get("/goldrate",  (req, res) => {
    res.send(`Gold rates are very high today`)
})


goldRouter.get("/userstats", authorise(["manager"]), (req, res) => {
    res.send(`These are userstats for managers only`)
})



module.exports={goldRouter}