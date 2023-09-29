const mongoose = require('mongoose');
const Db_liveurl = 'mongodb+srv://rkloveak0118:Rahul123@cluster0.rpbyj0t.mongodb.net/grievanceportal?retryWrites=true&w=majority'
const local_url = 'mongodb://127.0.0.1:27017/grievanceportal'
const connectdb = () => {
   return mongoose.connect(Db_liveurl)
      .then(() => {
         console.log('connection succesfully')
      }).catch((error) => {
         console.log(error)
      })
}

module.exports = connectdb