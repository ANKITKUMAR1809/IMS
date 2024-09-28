const express = require("express")
const stockRoute = express.Router()
const stockController = require("../controllers/stock-controller.js")

stockRoute.route("/add-stock").post(stockController.add)

// router.route("/update-stock").post(stockController.update)

stockRoute.route("/display-stock").post(stockController.display)

module.exports = stockRoute;