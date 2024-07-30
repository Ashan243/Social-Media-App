
// require("./Startup/database")()


// const express = require("express")
// const app = express()
// require("./Startup/route")(app)

// app.use()




const port = process.env.PORT || 4001
const mainServer = app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = mainServer