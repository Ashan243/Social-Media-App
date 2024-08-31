const {upload} = require("../utils/storage")
const app = express()
const express = require("express")

app.post("/uploadimages", upload.array("images", 3), (req, res) => {
    if(!req.body.file) return res.status(400).send("Files Not Found")
    res.status(200).json({

        message: "Image Successfully Upload",
        timestamp: Date.now()
    })
})


app.post("/uploadimage", upload.single("image") , async(req,res) =>{

    if(!req.body.file) return res.status(400).send("File Not Found")
        
    res.status(200).json({

        message: "Image Uploaded successfully",
        timestamp: Date.now()
    })

})



