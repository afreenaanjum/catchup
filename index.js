const express = require('express')
const mongoose = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3005

app.use(cors())
app.use(express.json())
app.use('/catchup', router)
// URL-localhost:3005/test/post-image-15659800099687 looks for if it starts with test then it will go and check in .?public/upload folder if and such image present
// app.use('/test', express.static(path.join(__dirname, './public/uploads')))
app.use('/public/uploads', express.static(path.join(__dirname, './public/uploads')))


app.listen(port, () => {
    console.log('listening to port', port)
})