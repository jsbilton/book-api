const dal = require('./dal.js')
var importData = require('./data.js')


function callback(msgHeader) {
  return function (err, res) {
    if (err) return console.log('Error:\n', err.message)
    return console.log(msgHeader, JSON.stringify(res, null, 4))
  }
}

importData.books.forEach(function (book) {
  dal.createBook(book, callback('Book Created'))
})
