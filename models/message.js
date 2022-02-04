const mongoose=require('mongoose')
const msgSchema=new mongoose.Schema({
    roomname:{
        type:String,
        required:true
    },
    msgs:{
        type:Array,
        default:[]
    }
})

module.exports=mongoose.model("Msg",msgSchema)
