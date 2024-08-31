

const {Server} = require("socket.io")
const {createServer} = require("node:http")
const express = require("express")
const app = express()
const {join} = require("node:path")

//Realies on a http server with node

//create server
//pass the server to socket.io to use
const httpServerObj = createServer()
const io = new Server(httpServerObj, {
    cors: {
        //Origin we provide the url we want our server to be running on 
        origin: "http://localhost:5173"
    }
})

let playerScores = []

io.on("connection", (socket) => {
    socket.on("scores", (scores) => {
        playerScores.push({...scores, id: socket.id})

        socket.emit("playerScores", playerScores)

        console.log(playerScores)
    })


    // setInterval((socket) => {
    //     socket.emit("playerScores", playerScores)
    // }, 3000)
})


httpServerObj.listen(3000, () => {
    console.log("Server is running")
})
