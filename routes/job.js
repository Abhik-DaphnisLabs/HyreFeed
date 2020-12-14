const express = require("express")
const router = express.Router()
const upload = require("../common/multer")

module.exports = (db) => {
  const Job = db.job
  const middleware = require("../middleware")(db)
  const jobController = require("../controllers/job")(db)

  router.get('/all', middleware.isLoggedIn, jobController.getAllJobs)
  router.get('/:id/video', middleware.isLoggedIn, jobController.getVideo)
  router.get('/:id', middleware.isLoggedIn, jobController.getJob)
  router.post('/:id/apply', middleware.isLoggedIn, upload.any(),jobController.setApplication)

  

  return router;
}
