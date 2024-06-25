const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const authModel=require('../../models/auth/auth')
const nodemailer=require('nodemailer')
module.exports.register=async(req,res)=>{
    let {email,password}=req.body
    try{
let hashedPassword=await bcrypt.hash(password,10)
await authModel.create({
    email,
    password:hashedPassword
})
return res.status(200).json({
    message:"Success"
})

    }catch(e){
        console.log(e.message)
        return res.status(400).json({
            error:"Server error please try again"
        })
    }
}



module.exports.login=async(req,res)=>{
    let {email,password}=req.body;
   
    try{
let emailMatch=await authModel.findOne({email})
if(!emailMatch){
    return res.status(400).json({
        error:"Invalid email"
    })
}
let passwordMatch=await bcrypt.compare(password,emailMatch.password)
if(!passwordMatch){
    return res.status(400).json({
        error:"Invalid password"
    })
}
let emailMatchdata=emailMatch.toObject()
let token=await jwt.sign(emailMatchdata,process.env.JWT_TOKEN)
emailMatch=emailMatch.toObject();
let data={
    ...emailMatch,
    token
}
return res.status(200).json({
    data
})
    }catch(e){
        console.log(e.message)
        return res.status(400).json({
            error:"Server error please try again"
        })
    }
}


module.exports.sendForgetEmail=async(req,res)=>{
 let {email}=req.body;
 
    try{
let account=await authModel.findOne({email})
if(!account){
    return res.status(400).json({
        error:"Account not found"
    })
}
let accountdata=account?.toObject();

let token=await jwt.sign(accountdata,process.env.JWT_TOKEN)

const emailHtmlContent = `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
  }
  .container {
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  .header {
    color: #333;
    text-align: center;
  }
  .review {
    background-color: #f9f9f9;
    border-left: 4px solid #007BFF;
    margin: 20px 0;
    padding: 20px;
    border-radius: 4px;
  }
  .rating {
    text-align: right;
    font-size: 18px;
    font-weight: bold;
    color: #ff9500;
  }
</style>
</head>
<body>

<div class="container">
  <div class="header">
    <h2>Welcome to Our Platform</h2>
  </div>
  <div class="review">
    <p>Hello,</p>
    <p>Welcome to our platform! We are thrilled to have you on board.</p>
   
  </div>
  <div>
   <p>Please click on the link to Reset password</p>
   <a href="http://localhost:3000/reset-password?token=${token}">http://localhost:3000/reset-password/token=${token}</a>
  </div>
</div>

</body>
</html>
`;
const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth: {
        user:process.env.user_email,
        pass: process.env.pass_email,
      },
})
const mailOptions = {
    from: process.env.user_email,
    to: email, 
    subject: "Account verification",
    html: emailHtmlContent,
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error('Error sending email:', error);
    }
    if(info){
        console.log(info)
        return res.status(200).json({
            message:"Email verification sent successfully"
        })
    }
   
});
    }catch(e){
        console.log(e.message)
        return res.status(400).json({
            error:"Server error please try again"
        })
    }
}


module.exports.resetPassword=async(req,res)=>{
    let {token,password}=req.body;
    try{
        let hashedPassword=await bcrypt.hash(password,10)
let employer=await jwt.verify(token,process.env.JWT_TOKEN)
await authModel.findByIdAndUpdate(employer._id,{$set:{password:hashedPassword}})
return res.status(200).json({
    message:"Successfully reseted"
})
    }catch(e){
        console.log(e.message)
        return res.status(400).json({
            error:"Server error please try again"
        })
    }
}