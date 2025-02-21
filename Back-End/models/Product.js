const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    titulo: String,
    categoria:  String,
    precio:  Number
}, {Timestamp: true});

const product = mongoose.model("producto", productSchema);

module.exports = product;