const dotenv = require("dotenv")

module.exports = function(){
    if(!process.env.PRIVATE_KEY){
        //End process or throw New Error
        // console.error("No PrivateKey Detected")
        // process.exit(1)
        
        throw new Error("FATAL ERROR: Could not detect private")
    }
}