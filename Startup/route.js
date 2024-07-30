const express = require("express")
const bodyparser = require("body-parser")
const {BASE_USER, BASE_STAFF} = require("../config/endpoints")
const auth = require("../Routes/auth")
const images = require("../Routes/images")
const userAction = require("../Routes/useraction")
const cors = require("cors")
const urlencoded = require("body-parser/lib/types/urlencoded")
const app = express()
// require("../")

module.exports = function(app){

    app.use(cors())
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(BASE_USER, (auth, images, userAction))
}