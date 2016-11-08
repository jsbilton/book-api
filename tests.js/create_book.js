const createBook = require('../dal.js').createBook


var testNewBook =   {
      "name": "JavaScript for Junkies",
      "description": "Loving native JavaScript",
      "in_stock": true,
      "retail_cost": 69.99,
      "date_available": 2016
  }

createBook(testNewBook, function (err, res) {
  if (err) {
   return console.log(err.message)
  }
  console.log(JSON.stringify(res, null, 4))
})
