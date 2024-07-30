const mongoose = require("mongoose")
const config = require("config")
const constants = require("../config/constants.js")
const dbDebug = require("debug")("app: database")



module.exports = function(){
    const isProduction = process.env.ENVIRONMENT === "development" ? false : true
    mongoose.connect(isProduction ? constants.MONGOOSE_URL_PROD : constants.MONGOOSE_URL_DEV, {useUnifiedTopology: true})
    .then(() => dbDebug("Connect to MongoDB via Mongoose ORM"))
    .catch( () => dbDebug("Error connecting to Mongoose"))
}