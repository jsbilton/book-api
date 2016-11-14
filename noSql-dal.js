const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
const db = new PouchDB('http://localhost:5984/book-api')

var dal = {
  createView: createView,
  createBook: createBook,
  getBook: getBook,
  listBooks: listBooks,
  updateBook: updateBook,
  deleteBook: deleteBook
}

function createView(ddoc, cb) {
  if (typeof ddoc == 'undefined' || ddoc === null) {
    return cb(new Error('400MISSING DESIGN DOCUMENT'))
  } else {

    db.put(ddoc, function (err, res) {
      if (err) return cb(err)
      if (res) return cb(null, res)
    })
  }
}

///////////////////////////////////////////////////////
//////////////////  GET Book         /////////////////
//////////////////////////////////////////////////////

function getBook(bookId, cb) {
  if (typeof bookId == 'undefined' || bookId === null) {
    return cb(new Error('400MISSING ID PARAMETER'))
  } else {

    db.get(bookId, function (err, res) {
      if (err) return cb(err)
      if (data) return cb(null, res)
    })
  }
}

///////////////////////////////////////////////////////
//////////////////   Add a Book       /////////////////
//////////////////////////////////////////////////////

function createBook(data, cb) {
  if (typeof data == 'undefined' || data === null) {
    return cb (new Error('400MISSING:\nDATA required to create book'))
  } else if (data.hasOwnProperty('_id') === true) {
      return cb (new Error('400UNNECESSARY:\nID forbidden field'))
  } else if (data.hasOwnProperty('_rev') === true) {
      return cb (new Error('400UNNECESSARY:\nREV forbidden field'))
  } else if (data.hasOwnProperty('name') !== true) {
      return cb (new Error('400MISSING:\nNAME required to create book'))
  } else if (data.hasOwnProperty('author') !== true) {
      return cb (new Error('400MISSING:\nAUTHOR required to create book'))
  } else if (data.hasOwnProperty('date_available')!== true) {
      return cb(new Error('400MISSING:\nDATE AVAILABLE required to create book' ))
  } else {
    // assigning defaults
    data.type = 'book'
    data._id = 'book_' + data.author + data.name
    data.active = true

    db.put(data, function (err, res) {
      if (err) return cb(err)
      if(data) return cb(null, res)
    })
  }

}
///////////////////////////////////////////////////////
//////////////////     List Books        //////////////
//////////////////////////////////////////////////////

function listBooks(sortBy, startKey, limit, cb) {
  if (typeof sortBy == 'undefined' || sortBy === null)   {
    return cb(new Error('Missing startKey parameters:\nProvide startKey'))
  }
  if (startKey !== '') {
    limit = limit + 1
  }
  // if (typeof limit == 'undefined' || limit === 0) {
  //   return cb(new Error('Missing limit parameters:\nProvide limit'))
  // }
  // if the starKey isnt a string then incrememt limit
  // limit = startKey !== '' ? ++limit : limit

  console.log('sortBy', sortBy)
  console.log('startKey', startKey)
  console.log('limit', limit)

  db.query(sortBy, {
        startKey: startKey,
        limit: limit,
        include_docs: true
    }, function(err, res) {
        if (err) return cb(err)
        if (startKey !== '') {
          res.rows.shift()
        }
        cb(null, res.rows)
    })
}


///////////////////////////////////////////////////////
//////////////////     Update Book       //////////////
//////////////////////////////////////////////////////

function updateBook(data, cb) {
  // call to couch retrive doc with provided ID
  if (typeof data == 'undefined' || data === null) {
    return cb(new Error('400MISSING:\nDATA for update'))
  } else if (data.hasOwnProperty('_id') !== true) {
      return cb(new Error('400MISSING:\nID property from data'))
  } else if (data.hasOwnProperty('_rev') !== true) {
      return cb(new Error('400MISSING:\nREV property from data'))
  } else {

    db.put(data, function (err, res) {
      if (err) return cb(err)
      if (res) return cb(null, res)
    })
  }
}

///////////////////////////////////////////////////////
//////////////////     Delete Book       //////////////
//////////////////////////////////////////////////////

function deleteBook(data, cb) {
  if (typeof data == 'undefined' || data === null) {
    return cb(new Error('400MISSING:\nDATA for book delete'))
  } else if (data.hasOwnProperty('_id') !== true) {
      return cb(new Error('400MISSING:\nID property from data'))
  } else if (data.hasOwnProperty('_rev') !== true) {
      return cb(new Error('400MISSING:\nREV property from data'))
  } else {

    db.remove(data, function (err, res) {
      if (err) return cb(err)
      if(res) return cb(null, res)
    })
  }
}

module.exports = dal
