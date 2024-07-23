const config = require("config")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const constants = require("../config/constants")


module.exports = function userAuth(req, res, next){

    const userToken = req.header(constants.default.jwt_header)
    if(!userToken) return res.status(403).send("Access Denied")

    try {

        const token = jwt.verify(userToken, process.env.PRIVATE_KEY)
        req.body = token
        next()
    } 
    catch (err) {
        
        res.status(400).send("Invalid Token")
        console.log(err)
    }

}
