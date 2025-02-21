const mongoose = require("mongoose")
require("dotenv").config()

const dbConnection = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI)
    }catch (error) {
        console.error(error);
        throw new Error("Error al Conectar la DB")
    }
};

module.exports = { dbConnection };