const mongoose=require('mongoose')

const jobSchema=mongoose.Schema({
    jobTitle:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    jobLocation:[
    {
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipCode:{
        type:String,
        required:true
    }
    }
    ],
 workSetting:{
    type:String,
    required:true
 },
 notificationsTo:{
    type:String,
    required:true
 },
 employmentType:{
    type:String,
    required:true
 },
 industry:[
    {
        type:String,
        required:true
    }
 ],
 benefits:[
    {
        type:String,
        required:true
    }
 ],
 travelRequirements:{
    type:String,
   
 },
 description:{
    type:String,
    required:true
 },
 benefits:[{
    type:String,
    required:true
 }],
 salary:{
    type:String,
    required:true
 }

})


const job=mongoose.model('job',jobSchema)

module.exports=job