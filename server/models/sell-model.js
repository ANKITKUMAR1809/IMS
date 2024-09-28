const mongoose = require("mongoose")
const sellSchema = mongoose.Schema({
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
    },
    date:{
        type:String,
        require:true
    }
});
const Sell = new mongoose.model("Sell", sellSchema);

module.exports = Sell;