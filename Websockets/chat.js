

const express = require("express")
const cors = require("cors")
const http = require("http")
const {Server} = require("socket.io")
const { Socket } = require("dgram")

const app = express()
const server = http.createServer(app)

app.use(cors())
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['POST', 'GET']
    }
})
//POST = Sending a message in a chat
//GET - Receiving a message a chat


//1. Setup our connection to a socket using io

//2. Within the io we need to setup our event listeners
//a. disconnect
//b. when a message is sent 


//3. Add a server listener with the correct port



io.on("connection", (socket) => {

    socket.on("disconnect", () => console.log("User has disconnected", socket.id))

    socket.on("message", (message) => {
        console.log("Messsage Has Been Received")
        io.emit("message", message)
    } )

})

server.listen(3000, () => {
    console.log("Server is running on port 3000....")
})