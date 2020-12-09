const express = require("express")
const router = express.Router()

module.exports = (db) => {
  const categoryController = require("../controllers/category")(db)

  router.get("/search", async (req, res) => {
    try{
      const response = await categoryController.search(req.query.search)
      
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
