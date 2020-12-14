const express = require("express")
const router = express.Router()
const passport = require("passport")
const https = require("https")
require('dotenv').config()

// const user = require('../models/user')





module.exports = (db) => {
  const User = db.user
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

  async function checkOTP(req, res, next){
    let url = "https://2factor.in/API/V1/"+process.env.OTP_API+"/SMS/VERIFY/"+req.body.sessionID+"/"+req.body.code
    https.get(url, async (response) => {
      response.on('data', (data) => {
        let d = JSON.parse(data)
        // console.log(d)
        if(d.Details == "OTP Matched")
          next()
        else
          res.status(403).json({
            success: false,
            message: "Incorrect OTP!"
        })
      })
    })
    // console.log(response)
    
  }


  router.get("/sendOTP", async function(req, res){
    console.log(process.env.OTP_API)
    let contactNumber = req.query.contactNumber
    let user = await User.findOne({
      where: {
        contactNumber: contactNumber
      }
    })
    let url = "https://2factor.in/API/V1/"+process.env.OTP_API+"/SMS/"+contactNumber+"/AUTOGEN"
    https.get(url, async (response) => {
      response.on('data', (data) => {
        res.json({
          success: true,
          response: JSON.parse(data),
          isNewUser: user==null
        })
      })
      
    })

    
  })


  router.post("/register", checkOTP, function(req, res){
    // console.log(req.body)
    const newUser = {
      contactNumber: req.body.contactNumber,
      // profileImageURL: 'https://via.placeholder.com/300x300',
      roles: {}
    }
    User.register(newUser, req.body.password, function(err, user){
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
            // console.log(user)
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
  router.post('/login', checkOTP, function(req, res, next) {
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
