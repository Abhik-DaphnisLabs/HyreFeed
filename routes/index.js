const express = require("express")
const router = express.Router()
const passport = require("passport")
// const user = require('../models/user')





module.exports = (db) => {
  const user = db.user
  const middleware = require("../middleware")(db)

  // router.get("/", (req, res) => {
  //   const userDetails = {
  //     ...req.user.dataValues
  //   }
  //   delete userDetails.roles
  //   delete userDetails.hash
  //   delete userDetails.salt
  //   console.log(userDetails)
  //   res.json(userDetails)
  // })

  router.post("/register", function(req, res){
    // console.log(req.body)
    const newUser = {
      email: req.body.email,
      // profileImageURL: 'https://via.placeholder.com/300x300',
      roles: {}
    }
    user.register(newUser, req.body.password, function(err, user){
        if(err){
          // console.log(JSON.stringify(err.parent))
          console.error("Error Occured", typeof(err), err)
            return res.json({
              success: false,
              err: err.parent? err: err.toString()
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
/*
  router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/",
    failureRedirect: "/"
  }), function(req, res){
    console.log(req.user)
    console.log(res)
  })
*/
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
        delete copy.roles
        delete copy.hash
        delete copy.salt
        return res.json(copy);
      });
    })(req, res, next);
  });
  

  return router;
}
