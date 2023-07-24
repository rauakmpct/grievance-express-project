const express = require('express')
// console.log(express)
const app = express()
const port = 3000
const web = require('./routes/web')
const connectdb=require('./db/connectdb')
const { connection } = require('mongoose')


// view engine ejs
app.set('view engine','ejs');

//connect db
connectdb()

// for image and css
app.use(express.static('public'))

// router load
app.use('/',web);

// server create
app.listen(port, () => {
    console.log(`server is running localhost:  ${port}`)
  })