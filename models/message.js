const mongoose=require('mongoose')
const msgSchema=new mongoose.Schema({
    msg:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Msg",msgSchema)