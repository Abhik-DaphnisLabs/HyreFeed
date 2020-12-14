const express = require("express")
const router = express.Router()
const upload = require("../common/multer")

module.exports = (db) => {
  const user = db.user
  const middleware = require("../middleware")(db)
  const userController = require("../controllers/user")(db)

  router.get("/update", middleware.isLoggedIn, async (req, res) => {
    try{
      const userData = await userController.getDetails(req.user.id)
      if(!userData)
        throw new Error("Invalid Primary Key!")
      res.json({
        success: true,
        user: userData
      })
    } catch(err) {
      res.status(500).json({
        success: false,
        message: "Error Occured!",
        error: err
      })
    }
  })

  router.post("/update", middleware.isLoggedIn, upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
    
    try{
      let response = await userController.insertDetails(req.user.id, req.body, req.files)
      res.json(response)
    } catch(err) {
      res.status(500).json({
        success: false,
        message: "Error Occured!",
        error: err
      })
    }
    
  })

  router.get("/bookmarks/add", middleware.isLoggedIn, userController.addBookmark)
  router.get("/bookmarks", middleware.isLoggedIn, userController.getBookmarks)
  router.get("/bookmarks/delete", middleware.isLoggedIn, userController.deleteBookmark)

  router.get("/application/all", middleware.isLoggedIn, userController.getAppliedList)


  return router;
}
