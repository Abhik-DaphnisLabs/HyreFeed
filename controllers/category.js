const Op = require("sequelize").Op

module.exports = (db) => {
  const category = db.category

  let categoryController = {}

  categoryController.search = async function (query) {
    try{
      let categories = await category.findAll({
        where: {
          name: 
          {
            [Op.like] : query+"%",
          }
        }
      });
      return {
        success: true,
        categories: categories
      }
    } catch(err) {
      return {
        success: false,
        message: "Error Occured!",
        error: err
      }
    }
  }

  

  

  
  return categoryController;
}
