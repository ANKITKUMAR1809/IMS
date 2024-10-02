const Stock = require("../models/stock-model.js")

const add = async (req, res) => {
    try {
        console.log(req.body)
        const { userId, itemName, itemCategory, quantity, quantityIn } = req.body;

        const itemExist = await Stock.findOne({ $and: [{ itemName }, { userId }] })
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

const update = async (req, res) => {

    try {
        const { stockId, itemName, itemCategory, quantity, quantityIn } = req.body;

        const updateResult = await Stock.updateOne({ _id: stockId },
            {
                $set: {
                    itemName: itemName,
                    itemCategory: itemCategory,
                    quantity: quantity,
                    quantityIn: quantityIn,
                }
            });
        if (updateResult) {
            res.status(200).json({
                msg: "Update Successfull"
            })
        }

        else {
            res.status(401).json({
                msg: "Can't update, Try again"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: `Server Error in updateResult ${error}`
        })
    }
}

const deleteStock =async (req, res) => {
    try {
        const{userId}= req.body;
        const result = await Stock.findByIdAndDelete(userId);
        if(result){
            res.status(200).json({
                msg:"Item Deleted"
            })
        }
        else{
            res.status(401).json({
                msg:"Item not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg:`Error in Delete Stock: ${error}`
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
module.exports = { add, display, update, deleteStock }