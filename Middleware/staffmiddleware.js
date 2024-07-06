const jwt = require("jsonwebtoken")
const config = require("config")


module.exports = function staffToken(req, res, next){

    const staffToken = req.header("x-auth-staffToken")
    if (!staffToken) return res.status(403).send("Access Denied")

    
    try {

        const token = jwt.verify(staffToken, config.get("privatekey"))
        req.body = token
        next()
    } catch (err) {
        
        res.status(400).send("Invalid Token")
        console.log(err)
    }
}