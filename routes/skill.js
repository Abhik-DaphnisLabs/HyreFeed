const express = require("express")
const router = express.Router()

module.exports = (db) => {
  const skillController = require("../controllers/skill")(db)

  router.get("/search", async (req, res) => {
    try{
      const response = await skillController.search(req.query.search, req.search.category)
      
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
