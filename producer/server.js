const express = require('express')
const routes = require('./routes')
const cors = require('cors');
const port = process.env.PORT || 3000 // set the port to the environment variable -> if process.env.PORT = undefined use 3000

const app = express()
app.use(cors())
app.use(routes)

app.listen(port, () => {
    console.log("Server is running on Port " + port)
})