const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
const db = new PouchDB('http://localhost:5984/book-api')
const helper = require('./helpme-functions.js')

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
  db.put(designDoc, helper.cbDAL(cb))
}

///////////////////////////////////////////////////////
//////////////////  Add Book         /////////////////
//////////////////////////////////////////////////////

function createBook(data, cb) {
  // required input data fields
  const reqFields = [
    'name',
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
    return cb(new Error('ADD BOOK ERROR'))
    data.type = 'book'
    data._id = data.type

    db.put(data, helper.cbDB(cb))

}

///////////////////////////////////////////////////////
//////////////////  Get Book         /////////////////
//////////////////////////////////////////////////////

function getBookById(id, cb) {
  // check if _id is string
  if (!id || !id.length || typeof id !== 'string') {
    return cb(new Error('GET BOOK ERROR:\n_id NOT STRING'))
  }
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
    return cb(null, res.rows.map(function (data) {
      data.doc.sortToken = data.key
      return data.doc
    }))
  })
}

module.exports = dal
