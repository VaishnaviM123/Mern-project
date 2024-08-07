require('dotenv').config()
//create server using express
const express = require("express")
const expressServer = express()

//cors connect with front-end
const cors = require("cors")
expressServer.use(cors())
require('./Model/db/connection')

//convert json to js
expressServer.use(express.json())

//convert all incoming json data to js
const router = require("./Routes/routes")
expressServer.use(router)

//export uploads folder to client - express.static()
expressServer.use('/uploads',express.static('./uploads'))

//port set- listen
const PORT = 4001 || process.env.PORT
expressServer.listen(PORT,()=>{console.log(`Server stated at ${PORT}`)})