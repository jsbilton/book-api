const express = require('express')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 8080
const app = express()
const dal = require('./noSql-dal.js')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// console.log("functioning dal", dal)

app.use(bodyParser.json())

///////////////////////////////////////////////////////
//////////////////   Home          ///////////////////
//////////////////////////////////////////////////////

app.get('/', function (req, res) {
  res.send('My Book API App')
})

///////////////////////////////////////////////////////
//////////////////   Error Handler    /////////////////
//////////////////////////////////////////////////////

function BuildResponseError(err) {

    const statuscheck = isNaN(err.message.substring(0, 3)) === true
        ? "400"
        : err.message.substring(0, 3)
    const status = err.status
        ? Number(err.status)
        : Number(statuscheck)
    const message = err.status
        ? err.message
        : err.message.substring(3)
    const reason = message
    const error = status === 400
        ? "Bad Request"
        : err.name
    const name = error

    var errormsg = {}
      errormsg.error = error
      errormsg.reason = reason
      errormsg.name = name
      errormsg.status = status
      errormsg.message = message

    console.log("BuildResponseError-->", errormsg)
    return errormsg
}

///////////////////////////////////////////////////////
//////////////////   Add Book: POST ///////////////////
//////////////////////////////////////////////////////

app.post('/books', function (req, res, next) {
    console.log("#1 req.body: ", req.body)

    dal.createBook(req.body, function (err, createdBook) {
      if (err) {
        var responseError = BuildResponseError(err)
        return next(new HTTPError(responseError.status, responseError.message, responseError))
      }
      if (createdBook) {
        console.log("POST" + req.path, createdBook)
        res.append("Content-type", "application/json")
        res.status(201).send(createdBook)
      }
    })
})

///////////////////////////////////////////////////////
//////////////////   Retrieve Book: GET  //////////////
//////////////////////////////////////////////////////

app.get('books/:id', function (req, res, next) {
  console.log("#2 req.body: ", req.body)

    const bookId = req.params.id

    dal.getBook(bookId, function (err, data) {
      if (err) {
        var responseError = BuildResponseError(err)
        return next(new HTTPError(responseError.status, responseError.message, responseError))
      }
      if (data) {
        console.log("GET" + req.path, data)
        res.append("Content-type", "application/json")
        res.status(200).send(data)
      }

    })
})

///////////////////////////////////////////////////////
//////////////////   List of Books: GET ///////////////
//////////////////////////////////////////////////////

app.get('/books', function (req, res, next) {
  // console.log("#3 req.body")

    dal.listBooks(req.body, function (err, data) {


      if (err) {
        var responseError = BuildResponseError(err)
        return next(new HTTPError(responseError.status, responseError.message, responseError))
      }
      if (data) {
        console.log("GET" + req.path, "query:", req.query, data)
        res.append("Content-type", "application/json")
        res.status(200).send(JSON.stringify(data, null, 4))
      }
  })
})

///////////////////////////////////////////////////////
//////////////////   Update Book: UPDATE  ////////////
//////////////////////////////////////////////////////

app.put('/books/:id', function (req, res, next) {
  console.log("#4 req.body: ", req.body)

    dal.updateBook(req.body, function (err, data) {
        if (err) {
          var responseError = BuildResponseError(err);
          return next(new HTTPError(responseError.status, responseError.message, responseError))
        }
        if (data) {
          console.log("PUT" + req.path, data)
          res.append("Content-type", "application/json")
          res.status(200).send(data)
        }

    })
})

///////////////////////////////////////////////////////
//////////////////   Delete Book: DELETE   ////////////
//////////////////////////////////////////////////////

app.delete('/books/:id', function(req, res, next) {
  console.log("#5 req.body: ", req.body)

    const bookId = req.params.id
    dal.getBook(bookId, function cb(err, data) {

        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError))
        }
        if (data) {
            dal.deleteBook(data, function cb(deletedErr, deletedBook) {
                if (deletedErr) {
                    var responseError = BuildResponseError(deletedBook)
                    return next(new HTTPError(responseError.status, responseError.message, responseError))
                }
                if (deletedBook) {
                    console.log("DELETE" + req.path, deletedBook)
                    res.append("Content-type", "application/json")
                    res.status(204).send(deletedBook)
                }
            })
        }
    })
})



///////////////////////////////////////////////////////
//////////////////   Middleware  /////////////////////
//////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
    console.log(req.method, '', req.path, ' err:', err)
    res.status(err.status || 500).send(err)
})


///////////////////////////////////////////////////////
//////////////////   Port  ///////////////////////////
//////////////////////////////////////////////////////

app.listen(port, function() {
  console.log('Listening on port: ', port)
})
