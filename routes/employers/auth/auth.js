const router=require('express').Router();
const {register,login,sendForgetEmail,resetPassword}=require('../../../controller/employer/auth')
router.post('/register',register)
router.post('/login',login)
router.post('/sendForgetEmail',sendForgetEmail)
router.post('/resetPassword',resetPassword)
module.exports=router;