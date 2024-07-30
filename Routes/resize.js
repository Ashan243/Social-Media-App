
const sharp = require("sharp")
const fs = require("fs")
const path = require("path")


const imageUploadFolder = "uploads/media"

module.exports = function(req, res, next){

    const imagesArray = []

    //Received one images and resize it to two
    const allImagePromises = req.file.map(
        //This is for a normal image
        async (imgFile) => { 
        await sharp(imgFile.path)
        .resize(1200)

        .jpeg({quality: 50})
        .toFile(path.resolve(imageUploadFolder, imgFile.filename + "_full.jpg" ))

        await sharp(imgFile.path)
        .resize(150)
        .jpeg({quality: 35})
        .toFile(imageUploadFolder, imgFile.filename + "_thumb.jpg")
        
        fs.unlink(imgFile.path)
        imagesArray.push(imgFile.filename)
       
    })

    Promise.all(...allImagePromises)

    req.file = imagesArray

    next()




}

