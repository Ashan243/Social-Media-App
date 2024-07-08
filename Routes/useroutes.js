
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const joi = require("joi")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const app = express()
const router = express.Router()
const {userModel, validation} = require("../Model/usermodel")
const userAuth = require("../Middleware/usermiddleware")
const {randomNumber} = require("../utils/helperfuctions")
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

let userCode = ""



app.post("/api/signup", async(req, res) =>{

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
    res.header("x-auth-users", token).status(200).json({
        message: "Token Recieved"
    })

})


app.post("/api/login", async(req, res) =>{

    const {error} = validation(req.body)
    if (error) return res.status(400).send("Invalid Data")

    const user = await userModel.findOne({email: req.body.email})
    if (!user) return res.status(400).send("Invalid Email Or Password")

    const password = await bcrypt.compare(req.body.password, user.password)
    if(!password) return res.status(400).send("Invalid Email Or Password")


    return res.status(200).send("Details Accepted")
})



app.put("/api/update/:username", async(req, res) =>{

    
    
    const {error} = validation(req.body)
    if (error) return res.status(400).send("Invalid Data")


    const changeUsername = await userModel.findOneAndUpdate({username: req.params.current}, {username: req.params.updated})
    if (!changeUsername) return res.status(400).send("Error Unpdating username")
 
        res.status(200).send("Username Successfully Updated")
        //password is rasengan///
})



app.get("/api/checkemail", async(req, res) =>{

    const checkEmail = await userModel.find({email: req.body.email})
    res.send(checkEmail)


})



app.delete("/api/deleteuser", async(req, res) =>{
        
    const deleteUser = await userModel.findOneAndDelete({email: req.body.email})
    if(!deleteUser) return res.status(400).send("Failed To Delete User")
        
    try {
        
         res.status(200).send("Sucessfully Deleted")

    } catch(err) {
            
        res.status(400).send(`Error: ${err}`)

        }

})


app.post("/api/sendCode", async(req, res) =>{

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

app.post("/api/verifyCode", async(req, res) => {

    userCode = Math.floor(100000 + Math.random()*999999)
    //1. Verify whether the users 6 digitcode is the same as one we just sent
    if(req.body.code === userCode){
        
        const _token = await jwt.sign(userCode, process.env.PRIVATE_KEY)

        res.status(200).json({
        message: "Code Verification Successful",
        token: _token
    })
}
})


app.post("/api/sendsms", async(req, res) =>{

    const accountSid = 'AC07c34f797ac363ba1341d493099f5529';
    const authToken = 'c1ba6bdcd5e9c47241242ea9454ca2b1';
    const client = require('twilio')(accountSid, authToken);

    client.verify.v2.services("VA9682d7f2af510b0eece224ae9944cd55")
        .verifications
        .create({to: req.body.phoneNumber , channel: 'sms'})
        .then(verification => console.log(verification.sid));

    

})


app.delete("/api/deleteuser", async(req, res) =>{

    const {error} = staffValidation(req.body)
    if (error) return res.status(400).send("Invalid Data")

    
    const deleteUser = await findOneAndDelete({username: req.body.username})
    if (!deleteUser) return res.status(400).json({

        message: "Failed To Delete Username"
    })

    res.status(200).json({

        message: "User Successfully Deleted",
        status: 200
    })

    

})

const port = process.env.PORT || 4001
app.listen(port, () => console.log(`You are connected to Port ${port}`))