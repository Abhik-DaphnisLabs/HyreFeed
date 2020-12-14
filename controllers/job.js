
module.exports = (db) => {
  const User = db.user,
        UserFilter = db.userFilter,
        Skill = db.skill,
        Category = db.category,
        Job = db.job,
        JobVideo = db.jobVideo,
        AppliedJob = db.appliedJob

  let jobController = {}

  jobController.getAllJobs = async function(req, res, next){
    try {
      let filter = {}
      if(req.query.category){
        filter.category = req.query.category
      }
      if(req.query.city){
        filter.city = req.query.city
      }
      if(req.query.type){
        filter.type = req.query.type
      }
      if(req.query.skill){
        filter.skill = req.query.skill
      }
      if(req.query.tool){
        filter.tool = req.query.tool
      }
      if(filter != {}){
        await User.update({
          lastFiltered: filter
        }, {
          where: {
            id: req.user.dataValues.id
          }
        })
        await UserFilter.create({
          ...filter,
          user_id: req.user.dataValues.id
        })
      }
      let jobs = await Job.findAll({
        where: filter
      })
      res.json({
        success: true,
        jobs: jobs
      })
    } catch (error) {
      res.json({
        success: false,
        error: error
      })
    }
  }
  jobController.getJob = async function(req, res, next){
    try {
      let job = await Job.findByPk(req.params.id)
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

  jobController.getVideo = async function(req, res, next){
    try {
      let jobVideo = await JobVideo.findByPk(req.query.videoID)
      res.json({
        success: true,
        jobVideo: jobVideo
      })
    } catch (error) {
      res.json({
        success: false,
        error: error
      })
    }
  }

  jobController.setApplication = async function(req, res, next){
    try{
      let answers = []
      req.body.answers.forEach(answer => {
        let newAnswer = {
          question: answer.question,
          questionType: answer.questionType
        }
        if(answer.questionType == '3'){              //Audio File
          let file = req.files.find(file => {
            return file.fieldname == answer.id
          })
          newAnswer.answer = file.filename
        } else {
          newAnswer.answer = answer.answer
        }
        answers.push(newAnswer)
      })

      let newApplication = {
        user_id : req.user.dataValues.id,
        job_id : req.params.id,
        answers: answers
      }

      let appliedJob = AppliedJob.create(newApplication)

      await User.increment('applicationCount', {
        where: {
          id: req.user.dataValues.id
        }
      })

      await Job.increment('numberOfApplicants', {
        where: {
          id: req.params.id
        }
      })

      res.json({
        success: true,
        appliedJob: appliedJob
      })

    } catch (error) {
      // console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }



  
  return jobController;
}
