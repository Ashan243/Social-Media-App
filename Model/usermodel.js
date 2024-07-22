const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const joi = require("joi")



const userSchema = mongoose.Schema({

    email:{
        type: String,
         minLength: 8,
        maxLength: 29,
        required: true,
        unique: true
    },


    password:{
        type: String,
        minLength: 8,
        maxLength: 255,
        required: true
    },

    username:{

        type: String,
        minLength: 8,
        maxLength: 29,
        unique: true
    },

})


userSchema.methods.createToken = function(){
    const accessToken = jwt.sign({_id: this.id}, "privatekey")
    return accessToken
}


const userModel = mongoose.model("project_users", userSchema)





exports.userModel = userModel
