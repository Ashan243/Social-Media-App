
const localStorage = require("local-storage")
const constants = require("../config/constants")
module.exports = function(){

    let header = localStorage.get(constants.JWT_HEADER)
    if(header){
        console.log("Access Grandted")
    }

}