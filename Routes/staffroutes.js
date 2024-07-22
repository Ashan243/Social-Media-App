const express = require("express")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const {staffModel,staffValidation} = require("../Model/staffmodel")
const {randomNumber} = require("../utils/randomnumbergen")
const nodemailer = require("nodemailer")
const app = express()
const multer = require("")

app.use(express.json())
app.use(express.urlencoded({extended: true}))


mongoose.connect("mongodb://localhost:27017")
.then(console.log("Connection Active"))
.catch(err => console.log(err))

let userCode = ""


const diskStorage = 


app.post("api/staffsignup", async(req, res) =>{

    const {error} = staffValidation(req.body)
    if (error) return res.status(400).send("Invalid Data")


    let staffDetails = await staffModel.findOne({email: req.body.email})
    if (staffDetails) return res.status(400).send("User Alreay Exists")

    staffDetails = new staffDetails({

        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    })

    
    const salt = bcrypt.genSalt(10)
    staffDetails.password = bcrypt.hash(staffDetails.password, salt)

    await staffDetails.save()
    const token = staffDetails.createToken()
    res.header("x-auth-staff").json({

        message: "Token Recived"
    })

})


app.post("/api/stafflogin", async(req, res) =>{

    const {error} = staffValidation(req.body)
    if (error) return res.status(400).send("Invalid Data")


    const details = await staffModel.find({email: req.body.email})
    if (!details) return res.staus(400).send("Incorrect Email Or Password")

    const password = await bcrypt.compare(req.body.password, details.password)
    if (!password) return res.status(400).send("Invalid Email Or Password")
})



app.post("/api/sendCode", async(req, res) =>{

    const {error} = staffValidation(req.body)
    if (error) return res.status(400).send("Invalid Data")

    
    userCode = String(randomNumber())
    const sendToEmail = nodemailer.createTransport({
        service: "ethereal",
        auth:{
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        }

    })

    const mailOptions = {

        from: process.env.EMAIL,
        to: req.body.email,
        subject: "VERIFICATION CODE",
        text: `This Code Is From Nodemailer: ${userCode}`
    }


    sendToEmail.sendMail(mailOptions, (err, info) =>{

        if(err){
            return res.status(500).send(`Error: ${err} `)
        }

        else{
            return res.send("Code Sent" + info)
        }
    })
})



app.post("/api/verifyCode", async(req, res) =>{

    const {error} = staffValidation(req.boy)
    if (error) return res.status(400).send("Invalid Data")

    userCode = randomNumber()

    if(req.body.code === userCode){

        const _token = jwt.sign(userCode, process.env.PRIVATE_KEY)
    

        res.status(200).json({
        message: "Token Accepted",
        token: _token
    })
}
})



app.post("/api/sendToPhone", (req, res) =>{

    
})


//
app.post(

)


app.put("/api/updatestaff/:password", async(req, res) =>{

    const {error} = staffValidation(req.body)
    if (error) return res.status(400).send("Invalid Data")  


    const updateStaff = await staffModel.findOneAndUpdate({password: req.params.current}, {password: req.params.updated})
    if (!updateStaff) return res.status(200).send("Error Updating")

        res.send("Update Successful")
})



app.delete("/api/deletestaff", async(req, res) =>{

    const {error} = staffValidation(req.body)
    if (error) return res.status(400).send("Invalid Data")
        
        
        
        try {
            
            
            const deletestaff = await staffModel.findOneAndDelete({email: req.body.email})
            if(!deletestaff) return res.status(400).send("Problem Deleting")

                res.status(200).send("Staff Member Deleted")
            
        } catch (err) {
            
            res.status(400).send(`Error: ${err}`)
        }

})


const port = process.env.POST || 4001
app.listen(port, () => console.log(`Conneced To Port ${port}`))