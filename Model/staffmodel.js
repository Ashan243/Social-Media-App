const joi = require("joi")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const staffSchema = mongoose.Schema({

    email:{
        type: String,
        minLength: 8,
        maxLength: 29,
        required: true,
        unique: true,
    },

    password:{
        type: String,
        minLength: 8,
        maxLength: 29,
        required: true
    },

    username:{
        type: String,
        minLength: 8,
        maxLength: 20,
        required: true
    }
})


staffSchema.methods.createToken = function(){
const accessToken = jwt.sign({_id: this._id}, "privatekey")
return accessToken}


const staffModel = mongoose.model("project_staff", staffSchema)



const staffValidation = (staff) =>{
    const schema = joi.object({

        email: joi.string().min(8).max(29).required(),
        password: joi.string().min(8).max(29).required(),
        username: joi.string().min(8).max(20).required()
        
    })

    return schema.validate()
}


exports.staffValidation = staffValidation
exports.staffModel = staffModel