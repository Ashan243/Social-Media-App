
const localStorage = require("local-storage")
const constants = require("../config/constants")
module.exports = function(){

    localStorage.get(constants.default.jwt_header)

}