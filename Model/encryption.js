



function encodeBase64(encodingData){
    
    return Buffer.from(encodingData).toString("hex")
}

let code = encodeBase64("Ashan") 

function decodeBase64(encodedData){
    return Buffer.from(encodedData, "hex").toString("ascii")
}


console.log(code)

let decoded = decodeBase64(code)
console.log(decoded)