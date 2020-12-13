const express = require("express")
const router = express.Router()
const passport = require("passport")
const upload = require("../common/multer")

// const user = require('../models/user')

function isSuper(req, res, next) {
  if (req.user.roles && req.user.roles.superUser) {
    next();
  } else {
    res.status(403).json({
      success: true,
      error: "Permission Denied!"
    });
  }
}

function isRecruiter(req, res, next) {
  if (req.user.roles && (req.user.roles.superUser|| req.user.roles.recruiter)) {
    console.log("is Recruiter")
    next();
  } else {
    res.status(403).json({
      success: true,
      error: "Permission Denied!"
    });
  }
}



module.exports = (db) => {
  const middleware = require("../middleware")(db)
  const adminController = require("../controllers/admin")(db)
  const jobController = require("../controllers/job")(db)

  router.post("/addUser", adminController.addUser)
  router.post('/login', adminController.login)

  router.post('/addSkills', middleware.isLoggedIn, isSuper, async function(req, res){
    try{
      let response = await adminController.addSkills(req.body)
      res.json(response)
    } catch(err) {
      res.status(500).json({
        success: false,
        message: "Error Occured!",
        error: err
      })
    }
  })
  router.post('/addCategories', middleware.isLoggedIn, isSuper, async function(req, res){
    try{
      let response = await adminController.addCategories(req.body)
      res.json(response)
    } catch(err) {
      res.status(500).json({
        success: false,
        message: "Error Occured!",
        error: err
      })
    }
  })
  
  router.get('/jobs/all', jobController.getAllJobs)
  router.get('/jobs/:id', jobController.getJob)
  router.post('/jobs/add', middleware.isLoggedIn, isRecruiter, upload.single('image'), adminController.addJob)
  router.post('/jobs/update/:id', middleware.isLoggedIn, isRecruiter, upload.single('image'),adminController.updateJob)
  router.post('/jobs/delete/:id', middleware.isLoggedIn, isRecruiter, upload.single('image'),adminController.deleteJob)
  


  return router;
}
