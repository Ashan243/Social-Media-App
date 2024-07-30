
const joi = require("joi")
const mongoose = require("mongoose")
const validation = require("../utils/validation")
const {userModel} = require("../Model/usermodel")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const {randomNumber} = require("../utils/randomnumbergen")
// const client = require('twilio')(process.env.TWILLO_ACCOUNT_SID, process.env.TWILLO_AUTH_TOKEN)
const accountSid = 'AC07c34f797ac363ba1341d493099f5529';
const authToken = 'c1ba6bdcd5e9c47241242ea9454ca2b1';
const client = require('twilio')(accountSid, authToken);
const express = require("express")
const debug = require("debug")("app:apiDebug")
const constants = require("../config/constants.js")
require("../Startup/database.js")

const app = express()
let userCode = ""


mongoose.connect("mongodb://localhost:27017")
.then(console.log("Connection Active"))
.catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.post("/signup", async(req, res) =>{


    const {error} = validation(req.body)
    if (error) return res.status(400).send("Invalid Data")

    let userDetails = await userModel.findOne({email: req.body.email})
    if(userDetails) return res.status(400).send("Email Already Exists")

    userDetails = new userModel({

        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    })



    const salt = await bcrypt.genSalt(10)
    userDetails.password = await bcrypt.hash(userDetails.password, salt)

    await userDetails.save()
    const token = userDetails.createToken()
    res.header(constants.JWT_HEADER, token).status(200).json({
        message: "Token Recieved"
    })

})



app.post("/login", async(req, res) =>{

    const {error} = validation(req.body)
    if (error) return res.status(400).send("Invalid Data")

    const user = await userModel.findOne({email: req.body.email})
    if (!user) return res.status(400).send("Invalid Email Or Password")

    const password = await bcrypt.compare(req.body.password, user.password)
    if(!password) return res.status(400).send("Invalid Email Or Password")


    return res.status(200).send("Details Accepted")
})





app.post("/sendCode", async(req, res) =>{

    const {error} = validation(req.body)
    if (error) return res.status(400).send("Invalid Data")

    userCode = String(randomNumber()) //Add the 6 digit code to the value the global variable
    const sendToEmail = nodemailer.createTransport({
        service: "ethereal",
        auth:{
            email: process.env.EMAIL,
            pass: process.env.PASSWORD            
        }
    })
    
    const mailOptions = {

        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Hello and Welcome",
        text: `A code has just been sent from nodemailer: ${userCode}`
    }


    sendToEmail.sendMail(mailOptions, (err, info) =>{

        if(err){
                return res.status(500).send(`Error Sending: ${err}`)
        }

        else{
            return res.status(200).send("Code Sent Successfully" + info)
        }
        
    }) 

        
})

app.post("/verifyCode", async(req, res) => {

    userCode = randomNumber()
    //1. Verify whether the users 6 digitcode is the same as one we just sent
    if(req.body.code === userCode){
        
        const _token = await jwt.sign(userCode, process.env.PRIVATE_KEY)

        res.status(200).json({
        message: "Code Verification Successful",
        token: _token
    })
}
})


app.post("/sendsmscode", async(req, res) =>{
    client.verify.v2.services("VAe5d5e3b679aed18f53ce1985a8bead6f")
    .verifications
    .create({to: '+447500990864', channel: 'sms'})
    .then(verification => console.log(verification.sid));

})


const port = process.env.PORT || 4001
const mainServer = app.listen(port, () => console.log(`Listening on port ${port}`))