
const {getJobs,getSingleJob,createJob}=require('../../controller/job/job')


const router=require('express').Router();

router.get('/getJobs',getJobs)
router.get('/getSingleJob/:id',getSingleJob)
router.post('/createJob',createJob)

module.exports=router;