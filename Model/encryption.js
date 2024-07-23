



function encodeBase64(encodingData){
    
    return Buffer.from(encodingData).toString("hex")
}

let code = encodeBase64("Ashan") 

function decodeBase64(encodedData){
    return Buffer.from(encodedData, "hex").toString("ascii")
}

//QUMwN2MzNGY3OTdhYzM2M2JhMTM0MWQ0OTMwOTlmNTUyOQ==
//AC07c34f797ac363ba1341d493099f5529
console.log(code)

let decoded = decodeBase64(code)
console.log(decoded)