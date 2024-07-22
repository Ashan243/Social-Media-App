const multer = require("multer")



const diskStorage = multer.diskStorage({

    destination: function(req, file, cb){
        if(file.mimetype.startsWith("image/")){
            cb(null, "images/userimages")
        }

        else if(file.mimetype.startsWith("video/")){
            cb(null, "videos/uservideo")
        }
        else {
            cb(new Error("Mime type not supported"))
        }},
        filename: function(req, file, cb){
            cb(null, file.filename)
        }

        //Unit Test
        //describe("Testing to send unallowed data", {
        // expect("")}
    })

export const upload = multer({
    storage: diskStorage,

})
