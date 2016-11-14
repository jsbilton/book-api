const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
const db = new PouchDB('http://localhost:5984/book-api')
const helper = require('./helpme-functions.js')

// object keys that we will export; list of methods that are exposed; way through modules to have consistency
var dal = {
  getDBInfo: getDBInfo,
  createView: createView,
  createBook: createBook,
  getBookById: getBookById,
  listBooks: listBooks
}

function getDBInfo() {
  return console.log('getDBInfo:', db)
}

function createView(designDoc, cb) {
  db.put(designDoc, helper.cbDB(cb))
}

///////////////////////////////////////////////////////
//////////////////  Add Book         /////////////////
//////////////////////////////////////////////////////

function createBook(data, cb) {
  // required input data fields
  const reqFields = [
    'name',
    'author',
    'description',
    'in-stock',
    'retail-cost',
    'date-available'
  ]
  // fields generated by db
  const genFields = [
    '_id',
    '_rev'
  ]
  var inputErr = helper.checkAll(data, reqFields, genFields)
  // check array
  if (inputErr.length)
    return cb(new Error('ADD BOOK ERROR:\n' + inputErr.join('\n')))
// defaults values assigned
    data.type = 'book'
    data._id = data.type + '_' + data.author + data.name
    data.active = true

    db.put(data, helper.cbDB(cb))
}

///////////////////////////////////////////////////////
//////////////////  Get Book         /////////////////
//////////////////////////////////////////////////////

function getBookById(bookId, cb) {
  // check if _id is string
  if (!bookId || !bookId.length || typeof bookId !== 'string') {
    return cb(new Error('GET BOOK ERROR:\nbookId NOT STRING'))
  }
  db.get(bookId, helper.cbDB(cb))
}

///////////////////////////////////////////////////////
//////////////////     List Books        //////////////
//////////////////////////////////////////////////////

function listBooks(sortBy, startKey, limit, cb) {
  if (typeof sortBy == 'undefined' || sortBy === null)   {
    return cb(new Error('Missing startkey parameters:\nProvide startkey'))
  }
  if (typeof limit == 'undefined' || limit === 0) {
    return cb(new Error('Missing limit parameters:\nProvide limit'))
  }
  limit = startKey !== '' ? ++limit : limit

  db.query(sortBy, {
    startKey: startKey,
    limit: limit,
    include_docs: true
  }, function (err, res) {
    if (err)
    return cb(err)
    return cb(null, res.rows.map(function(data) {
      data.doc.sortToken = data.key
      return data.doc
    }))
  })
}

// module.exports = dal
