const mongoose = require ('mongoose')
const ComplaintSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    ctype:{
        type:String,
        require:true,

    },
    semester:{
        type:String,
        require:true,

    },
    subject:{
        type:String,
        require:true,

    },
    cdetail:{
        type:String,
        require:true,

    },
    status:{
        type:String,
        default:'pending'
    },
    user_id:{
        type:String,
        require:true,
    },
    image:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        },
    },
    
})
const ComplaintModel=mongoose.model('complaint',ComplaintSchema)
module.exports=ComplaintModel