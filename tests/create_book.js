const createBook = require('./noSql-dal.js').createBook


var testNewBook =   {
      "name": "JavaScript for Junkies Part II",
      "description": "Loving native ES2107",
      "in_stock": true,
      "retail_cost": 69.99,
      "date_available": "2016-11-13"
  }

createBook(testNewBook, function (err, res) {
  if (err)
   return console.log(err.message)
  console.log(JSON.stringify(res, null, 4))
})
