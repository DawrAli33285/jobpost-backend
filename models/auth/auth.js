const mongoose=require('mongoose')

const authSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})



const authmodel=mongoose.model('auth',authSchema)

module.exports=authmodel