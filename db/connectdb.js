const mongoose = require('mongoose');

const connectdb=()=>{
   return mongoose.connect('mongodb://127.0.0.1:27017/grievanceportal')
   .then(()=>{
    console.log('connection succesfully')
   }).catch((error)=>{
    console.log(error)
   })
}

module.exports=connectdb