const jobModel=require('../../models/job/jobModel')


module.exports.getJobs=async(req,res)=>{
    try{
let jobs=await jobModel.find({})
return res.status(200).json({
    jobs
})
    }catch(e){
        console.log(e.message)
        return res.status(400).json({
            error:"Server error please try again"
        })
    }
}


module.exports.getSingleJob=async(req,res)=>{
    let {id}=req.params;
    try{
        let job=await jobModel.findOne({_id:id})
        return res.status(200).json({
            job
        })
            }catch(e){
                console.log(e.message)
                return res.status(400).json({
                    error:"Server error please try again"
                })
            }
}


module.exports.createJob=async(req,res)=>{
  let {jobTitle,companyName,jobLocation,address,city,salary,state, zipCode,workSetting,notificationsTo, employmentType, industry, benefits, travelRequirements,description}=req.body;
console.log(jobTitle)
    try{
await jobModel.create({
    jobTitle,
    companyName,
    jobLocation,
    address,
    city,
    state,
    zipCode,
    salary,
    workSetting,
    notificationsTo,
    employmentType,
    industry,
    benefits,
    description,
    travelRequirements

})
        
return res.status(200).json({
    message:"Job posted successfully"
})
    }catch(e){
        console.log(e.message)
        return res.status(400).json({
            error:"Server error please try again"
        })
    }
}