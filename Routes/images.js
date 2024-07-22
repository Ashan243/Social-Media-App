const {upload} = require("../utils/storage")

app.post("/api/uploadimages", upload.array("images", 3), (req, res) => {
    if(!req.body.file) return res.status(400).send("Files Not Found")
    res.status(200).json({

        message: "Image Successfully Upload",
        timestamp: Date.now()
    })
})
