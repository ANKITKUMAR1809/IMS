const Stock = require("../models/stock-model.js")

const add = async (req, res) => {
    try {
        console.log(req.body)
        const { userId, itemName, itemCategory, quantity, quantityIn } = req.body;

        const itemExist = await Stock.findOne({ $and: [{ itemName }, {userId}] })
        if (itemExist) {
            return res.status(401).json({ msg: "Item already Exist, Edit quantity in update" })
        }
        else {
            const itemCreated = await Stock.create(
                {
                    userId, itemName, itemCategory, quantity, quantityIn
                });
            res.status(201).json(
                {
                    msg: "Item Added Successfully",
                    result: itemCreated
                }
            )
        }
    } catch (error) {
        console.log(error)
    }
}
// login function
const display = async (req, res) => {
    try {
        const { userId } = req.body;
        const item = await Stock.find({ userId })
        if (!item) {
            return res.status(401).json({
                msg: "No items in Stock found."
            })
        }
        else {
            return res.status(200).json({
                items: item
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }
}

// const user = async (req, res) => {
//     try {
//         const userData = req.user;
//         console.log(userData);
//         return res.status(200).json({ userData });
//     } catch (error) {
//         console.log("error from the user route", error);
//     }
// }
module.exports = { add, display }