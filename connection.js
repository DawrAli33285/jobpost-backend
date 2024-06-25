const mongoose=require('mongoose')

let connection=mongoose.connect('mongodb://127.0.0.1/newjob')

module.exports=connection;