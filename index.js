const express=require('express')
const app=express();
const connection=require('./connection')
const authroutes=require('./routes/employers/auth/auth')
const jobroutes=require('./routes/job/job')
const cors=require('cors')
require('dotenv').config();

connection

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
  });
  
app.use(express.json({
    verify: (req, res, buffer) => req['rawBody'] = buffer, 
  }));
  
app.use(express.urlencoded({
    extended: true
    }));

app.use(cors())
app.use(authroutes)
app.use(jobroutes)




app.listen(5000,()=>{
    console.log("Working")
})
