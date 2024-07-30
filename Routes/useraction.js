// github url - https://github.com/Ashan243/Social-Media-App.git



const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
const express = require("express")
const multer = require("multer")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const joi = require("joi")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const app = express()
const router = express.Router()
const {userModel, validation} = require("../Model/usermodel")
const userAuth = require("../Middleware/usermiddleware")
const {randomNumber} = require("../utils/randomnumbergen")
const { staffModel, staffValidation } = require("../Model/staffmodel")
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb://localhost:27017")
.then(console.log("Connection Active"))
.catch(err => console.log(err))



//1. Global Verification Object that stores the 6 digit code
//2. Function that can generate a 6 digit code
//3. Generate a 6 digit code and add to the global object
//4. Nodemailer to send email to the user with the 6 digit code
//5. Verify the 6 digit-code is correct for further actions


app.get("/homepage", async(req, res) => {

    res.send("Welcome To The Homepage")

})



app.put("/update/:username", async(req, res) =>{

    
    
    const {error} = validation(req.body)
    if (error) return res.status(400).send("Invalid Data")


    const changeUsername = await userModel.findOneAndUpdate({username: req.params.current}, {username: req.params.updated})
    if (!changeUsername) return res.status(400).send("Error Unpdating username")
 
        res.status(200).send("Username Successfully Updated")
        //password is rasengan///
})


app.delete("/deletebyuser", async(req, res) =>{

    const {error} = staffValidation(req.body)
    if (error) return res.status(400).send("Invalid Data")

    
    const deleteUser = await findOneAndDelete({username: req.body.username})
    if (!deleteUser) return res.status(400).json({

        message: "Failed To Delete Username",
        timestamp: Date.now()
    })

    res.status(200).json({

        message: "User Successfully Deleted",
        status: 200
    })

    

})

// //Patching
// app.patch()

// //PUT
// //PATCH
// const user = {
//     name: "Ashan",
//     id: 152,
//     location: "London"
// }





const port = process.env.PORT || 4002
app.listen(port, () => console.log(`You are connected to Port ${port}`))