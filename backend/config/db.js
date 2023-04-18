const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {})
    console.log("Connected to mongodb");
}


module.exports = {
    connectDB
}