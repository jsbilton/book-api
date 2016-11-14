const PouchDB = require('pouchdb-http')
const dal = require('./noSql-dal.js')
const db = new PouchDB('http://localhost:5984/book-api')

var ddoc = [{
  _id: '_design/books',
  views: {
    "books": {
      map: function(doc) {
        if (doc.type === 'book') {
          emit(doc._id)
        }
      }.toString()
    }
  }
}]

var books = [
    {
        "name": "Eloquent JavaScript",
        "author": "Marijn Haverbeke",
        "description": "A modern view to learning native JavaScript",
        "in_stock": true,
        "retail_cost": 39.99,
        "date_available": "2013-02-13"
    }, {
        "name": "JavaScript: The Good Parts",
        "author": "Douglas Crockford",
        "description": "The good stuff about JavaScript",
        "in_stock": true,
        "retail_cost": 49.99,
        "date_available": "2010-04-45"
    }, {
        "name": "You Don't Know JS: Up & Going",
        "author": "Kyle Simpson",
        "description": "Getting up and going with native JavaScript",
        "in_stock": true,
        "retail_cost": 32.99,
        "date_available": "2013-10-03"
    }, {
        "name": "You Don't Know JS: Async and Performance",
        "author": "Kyle Simpson",
        "description": "Async and Performance in native JavaScript",
        "in_stock": true,
        "retail_cost": 39.99,
        "date_available": "2013-04-25"
    }, {
        "name": "You Don't Know JS: Scope & Closures",
        "author": "Kyle Simpson",
        "description": "Scope & Closures in native JavaScript",
        "in_stock": true,
        "retail_cost": 39.99,
        "date_available": "2013-06-13"
    }, {
        "name": "You Don't Know JS: this and Object Prototypes",
        "author": "Kyle Simpson",
        "description": "this and Object Prototypes in native JavaScript",
        "in_stock": true,
        "retail_cost": 33.99,
        "date_available": "2013=06-27"
    }, {
        "name": "You Don't Know JS: Types and Grammar",
        "author": "Kyle Simpson",
        "description": "Types and Grammar in native JavaScript",
        "in_stock": true,
        "retail_cost": 35.99,
        "date_available": "2013-08-22"
    }, {
        "name": "You Don't Know JS: ES6 & Beyond",
        "author": "Kyle Simpson",
        "description": "Understanding ES6 & Beyond in native JavaScript",
        "in_stock": true,
        "retail_cost": 37.99,
        "date_available": "2013-11-12"
    }, {
        "name": "Functional Programming",
        "author": "Michael Fogus",
        "description": "A modern view to learning native JavaScript",
        "in_stock": true,
        "retail_cost": 45.97,
        "date_available": "2012-12-01"
    }, {
        "name": "Practical Node.js: Building Real-World Scalable Web Apps",
        "author": "Azat Mardan",
        "description": "A modern view to learning native JavaScript",
        "in_stock": true,
        "retail_cost": 42.00,
        "date_available": "2013-05-18"
    }

]

function cb(msgHeader) {
  return function (err, res) {
    if (err) return console.log('Error:\n', err.message)
    return console.log(msgHeader, JSON.stringify(res, null, 4))
  }
}

books.forEach(function(book) {
  dal.createBook(book, cb('Book Created'))
})


db.bulkDocs(ddoc, function(err, data) {
    if (err)
        return console.log('ERROR CREATING DESIGN DOC FOR BOOK:\n', err.message)
    if (data) {
        console.log('DESIGN DOC CREATED FOR BOOK', data)
    }
})


module.exports = books
