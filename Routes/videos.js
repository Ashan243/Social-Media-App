const error = require("../utils/error.json")
const {upload} = require("../utils/storage")
const express = require("express")
const app = express()



app.post("/videos", upload.array("video", 5), async(req, res) =>{

        if(!req.body.file) return res.status(400).json({

            message: error.Error1,
            timestamp: Date.now()
        })


        
        res.status(200).send("Videos sent succssfully")

    })

