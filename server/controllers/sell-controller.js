const Stock = require("../models/stock-model.js")
const Sell = require("../models/sell-model.js")
const add = async (req, res) => {
    try {
        console.log(req.body)
        const { userId, itemName, itemCategory, quantity, quantityIn, date } = req.body;
        const stockUpdate = await Stock.findOne({ $and: [{ userId }, { itemName }, { itemCategory }] })
        console.log(stockUpdate.quantity)
        const finalQuantity = stockUpdate.quantity - quantity;
        if (stockUpdate) {
            await Stock.updateOne({ $and: [{ userId }, { itemName }, { itemCategory }] }, { quantity: finalQuantity })

            const sellCreated = await Sell.create(
                {
                    userId, itemName, itemCategory, quantity, quantityIn, date
                });
            console.log(sellCreated)
            if (sellCreated) {

                res.status(201).json(
                    {
                        msg: "Sell Succesfully",
                        result: sellCreated
                    }
                )
        }

        }
        else {
            res.status(401).json({
                msg: "----------- wrong-----------"
            })
        }

    } catch (error) {
        console.log(error)
    }
}
// login function
const display = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await Sell.find({ userId })
        if (!user) {
            return res.status(401).json({
                msg: "No sells found."
            })
        }
        else {
            return res.status(200).json({
                record: user
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }
}

module.exports = { add, display }