const passport = require("passport");
const admin = require("../routes/admin");

module.exports = (db) => {
  const User = db.user,
        userFilter = db.userFilter,
        Skill = db.skill,
        Category = db.category,
        Job = db.job,
        JobVideo = db.jobVideo,
        AppliedJob = db.appliedJob

  let adminController = {}

  adminController.addSkills = async function (body) {
    try{
      let skills = body.skills
      for(let i = 0; i < skills.length; i++){
        let newSkill = {
          name: skills[i].name,
          category: skills[i].category
        }
        await Skill.create(newSkill)
      }
      return {
        success: true
      }
    } catch(err) {
      return {
        success: false,
        message: "Error Occured!",
        error: err
      }
    }
  }

  adminController.addCategories = async function (body) {
    try{
      let categories = body.categories
      for(let i = 0; i < categories.length; i++){
        let newCategory = {
          name: categories[i].name
        }
        await Category.create(newCategory)
      }
      return {
        success: true
      }
    } catch(err) {
      return {
        success: false,
        message: "Error Occured!",
        error: err
      }
    }
  }

  adminController.addUser = async function(req, res, next){
    const newUser = {
      contactNumber: req.body.contactNumber,
      // profileImageURL: 'https://via.placeholder.com/300x300',
      roles: {
        superUser: req.body.isSuperUser=='true',
        screener: req.body.isScreener == 'true',
        videoEditor: req.body.isVideoEditor == 'true',
        videoPresenter: req.body.isVideoPresenter == 'true',
        recruiter: req.body.isRecruiter == 'true'
      }
    }
  
    User.register(newUser, req.body.password, function(err, user){
        if(err){
          // console.log(JSON.stringify(err.parent))
          console.error("Error Occured", typeof(err), err)
            return res.json({
              success: false,
              message: err.parent? err: err.toString()
            })
        }
        // console.log("Past error detection!")
        passport.authenticate("local")(req, res, function(){
            // console.log("New user Added!")
            // console.log(user)
            return res.json({
              success: true,
              message: "Registration Successful",
              user_id: user.dataValues.id
            })
        })
    })
  }

  adminController.login = async function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
      if (err) {
         return err
      }
      if (!user) {
         return {
           message: "Login Failed!"
         }; 
      }
      req.logIn(user, function(err) {
        if (err) { 
          return next(err);
        }
        const copy = { ...user.dataValues }
        delete copy.hash
        delete copy.salt
        return res.json(copy);
      });
    })(req, res, next);
  }

  adminController.addJob = async function(req, res, next){
    try {
      // console.log(req.body, req.file)
      let newJob = {
        organization: req.body.organization,
        description: req.body.description,
        title: req.body.title,
        positions: req.body.positions || 0,
        educations: req.body.educations,
        educationCriteria: req.body.educationCriteria,
        experience: req.body.experience,
        experienceCriteria: req.body.experienceCriteria,
        salaryLowerLimit: req.body.salaryLowerLimit || 0,
        salaryUpperLimit: req.body.salaryUpperLimit || 0,
        skills: req.body.skills,
        tools: req.body.tools,
        interviewProcess: req.body.interviewProcess,
        shiftTime: req.body.shiftTime,
        workingDays: req.body.workingDays,
        role: req.body.role,
        payRate: req.body.payRate,
        paymentTerms: req.body.paymentTerms,
        replacementPeriod: req.body.replacementPeriod || 0,
        category: req.body.category,
        industry: req.body.industry,
        image: req.file? req.file.filename: "",//(req.file.image[0]? req.file.image[0].filename : "" ): "",
        type: req.body.type,
        rootVideo: req.body.rootVideo
      }
      console.log(newJob)
      if(req.body.closeDate)
        newJob.closeDate = req.body.closeDate
      if(req.body.location){
        newJob.location = req.body.location
        newJob.city = req.body.location.city
        newJob.state = req.body.location.state
      }
      let job = await Job.create(newJob);
      // console.log(job)
      res.json({
        success: true,
        job: job
      })
    } catch (error) {
      console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }
  adminController.setRootVideo = async function(req, res, next){
    try {
      let job = await Job.update({rootVideo: req.query.rootVideoID}, {
        where: {
          id: req.params.id
        }
      });
      res.json({
        success: true,
        job: job
      })
    } catch (error) {
      res.json({
        success: false,
        error: error
      })
    }
  }
  adminController.updateJob = async function(req, res, next){
    try {
      let modifiedJob = {
        organization: req.body.organization,
        description: req.body.description,
        title: req.body.title,
        positions: req.body.positions,
        educations: req.body.educations,
        educationCriteria: req.body.educationCriteria,
        experience: req.body.experience,
        experienceCriteria: req.body.experienceCriteria,
        salaryLowerLimit: req.body.salaryLowerLimit,
        salaryUpperLimit: req.body.salaryUpperLimit,
        skills: req.body.skills,
        tools: req.body.tools,
        interviewProcess: req.body.interviewProcess,
        shiftTime: req.body.shiftTime,
        workingDays: req.body.workingDays,
        role: req.body.role,
        payRate: req.body.payRate,
        paymentTerms: req.body.paymentTerms,
        replacementPeriod: req.body.replacementPeriod,
        category: req.body.category,
        industry: req.body.industry,
        type: req.body.type,
        rootVideo: req.body.rootVideo,
        status: req.body.status
      }
      if(req.file)// && req.file.image[0])
        modifiedJob.image = req.file.filename;
      if(req.body.closeDate)
        modifiedJob.closeDate = req.body.closeDate
      if(req.body.location){
        modifiedJob.location = req.body.location
        modifiedJob.city = req.body.location.city
        modifiedJob.state = req.body.location.state
      }
      let job = await Job.update(modifiedJob, {
        where: {
          id: req.params.id
        }
      });
      res.json({
        success: true,
        job: job
      })
    } catch (error) {
      res.json({
        success: false,
        error: error
      })
    }
  }
  adminController.deleteJob = async function(req, res, next){
    try {
      let job = await Job.destroy({
        where:{
          id: req.params.id
        }
      })
      res.json({
        success: true,
        job: job
      })
    } catch (error) {
      res.json({
        success: false,
        error: error
      })
    }
  }

  adminController.createVideo = async function(req, res, next){
    try {
      let jobVideo = await JobVideo.create({});
      res.json({
        success: true,
        jobVideo: jobVideo
      })
    } catch (error) {
      console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }
  adminController.setVideo = async function(req, res, next){
    try {
      let video = {
        job_id: req.params.id,
        name: req.body.name,
        questionType: req.body.questionType,
        question: req.body.question,
        mcqOptions: req.body.mcqOptions,
        nextVideo_id: req.body.nextVideo_id
      }
      let jobVideo = await JobVideo.update(video, {
        where: {
          id: req.body.id
        }
      });
      res.json({
        success: true,
        jobVideo: jobVideo
      })
    } catch (error) {
      console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }
  adminController.setVideoFile = async function(req, res, next){
    // console.log(req.file)
    try {
      let jobVideo = await JobVideo.update({
        filename: req.file.filename
      }, {
        where: {
          id: req.body.id
        }
      });
      res.json({
        success: true,
        jobVideo: jobVideo
      })
    } catch (error) {
      console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }
  adminController.setNextVideo = async function(req, res, next){
    try {
      let jobVideo = await JobVideo.update({
        nextVideo_id: req.body.nextVideo_id
      }, {
        where: {
          id: req.body.id
        }
      });
      res.json({
        success: true,
        jobVideo: jobVideo
      })
    } catch (error) {
      console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }
  adminController.getVideos = async function(req, res, next){
    try {
      let jobVideos = await JobVideo.findAll({
        where: {
          job_id: req.params.id
        }
      });
      res.json({
        success: true,
        jobVideos: jobVideos
      })
    } catch (error) {
      console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }

  adminController.applicationList = async function (req, res, next) {
    try {
      let applications = await AppliedJob.findAll({
        where: {
          job_id: req.params.id
        }
      })
      res.json({
        success: true,
        applications: applications
      })
    } catch (error) {
      // console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }
  adminController.updateApplicationStage = async function (req, res, next) {
    try {
      let application = await AppliedJob.update({
        stage: req.body.stage,
        rejected: req.body.rejected
      },{
        where: {
          id: req.params.app_id,
        }
      })

      if(req.body.stage == '3'  && (req.body.rejected=='false'|| req.body.rejected== null)){
        await User.increment('shortListedCount', {
          where: {
            id: req.body.user_id
          }
        })
      }

      res.json({
        success: true,
        application: application
      })
    } catch (error) {
      // console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }
  
  return adminController;
}
