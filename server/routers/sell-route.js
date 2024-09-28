const express = require("express")
const sellRoute = express.Router()
const sellController = require("../controllers/sell-controller.js")

sellRoute.route("/add-sell").post(sellController.add)
sellRoute.route("/display-sell").post(sellController.display)
module.exports = sellRoute;