const express = require('express')
// console.log(express)
const app = express()
const port = 3000
const web = require('./routes/web')
const connectdb=require('./db/connectdb')
const { connection } = require('mongoose')

// cookies
const cookieparser = require('cookie-parser')
app.use(cookieparser())

//for msg show
let session = require('express-session')
let flash = require('connect-flash');
const fileUpload = require("express-fileupload");
// for file upload
app.use(fileUpload({useTempFiles: true}));

// for msg show use
app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave: false,
  saveUninitialized: false,

}));

app.use(flash());


// view engine ejs
app.set('view engine','ejs');

//connect db
connectdb()

//data get 
app.use(express.urlencoded({extended:true}))

// for image and css
app.use(express.static('public'))

// router load
app.use('/',web);


// server create
app.listen(port, () => {
    console.log(`server is running localhost:  ${port}`)
  })