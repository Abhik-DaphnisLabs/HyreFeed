const express = require("express")
const router = express.Router()
const passport = require("passport")
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



module.exports = (db) => {
  const user = db.user
  const middleware = require("../middleware")(db)
  const adminController = require("../controllers/admin")(db)

  router.post("/register", middleware.isLoggedIn, function(req, res){
    // console.log(req.body)
    const newUser = {
      email: req.body.email,
      // profileImageURL: 'https://via.placeholder.com/300x300',
      roles: {
        superUser: req.body.isSuperUser=='true',
        screener: req.body.isScreener == 'true',
        videoEditor: req.body.isVideoEditor == 'true',
        videoPresenter: req.body.isVideoPresenter == 'true',
        recruiter: req.body.isRecruiter == 'true'
      }
    }
  
    user.register(newUser, req.body.password, function(err, user){
        if(err){
          // console.log(JSON.stringify(err.parent))
          console.error("Error Occured", typeof(err), err)
            return res.json({
              success: false,
              message: err.parent? err: err.toString()
            })
        }
        console.log("Past error detection!")
        passport.authenticate("local")(req, res, function(){
            console.log("New user Added!")
            console.log(user)
            res.json({
              success: true,
              message: "Registration Successful",
              user_id: user.dataValues.id
            })
        })
    })
    
  })

  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
         return res.json(err) 
      }
      if (!user) {
         return res.status(401).json({
           message: "Login Failed!"
         }); 
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
  });
  
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
  

  return router;
}
