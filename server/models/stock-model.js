const mongoose = require("mongoose")
const stockSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    itemName: {
        type: String,
        require: true
    },
    itemCategory: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    quantityIn: {
        type: String,
        require: true
    }
});
const Stock = new mongoose.model("Stock", stockSchema);

module.exports = Stock;