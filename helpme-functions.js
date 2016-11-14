const HTTPError = require('node-http-error')

///////////////////////////////////////////////////////
//////////////////  Check Req Input Info  /////////////
//////////////////////////////////////////////////////

function checkReq(data, reqFields) {
  var inputErr = []
  //iterate thru input fields
  reqFields.forEach(function (reqField) {
    if (data.hasOwnProperty(reqField) !== true) {
      inputErr.push('Missing required properties ' + reqField + ' in the data!')
    }
  })
  return inputErr
}

///////////////////////////////////////////////////////
//////////////////  Check Generated Info  /////////////
//////////////////////////////////////////////////////

function checkGen(data, genFields) {
  var inputErr = []
  genFields.forEach(function (genField) {
    if (data.hasOwnProperty(genField) === true) {
      inputErr.push('Errors detected with' + genField + ' in the data!')
    }
  })
  return inputErr
}

///////////////////////////////////////////////////////
//////////////   Cross-Check all fields/Combine ///////
//////////////////////////////////////////////////////

function checkAll(data, reqFields, genFields) {
  var reqErr = checkReq(data, reqFields)
  var genErr = checkGen(data, genFields)
  return reqErr.concat(genErr)
}

///////////////////////////////////////////////////////
//////////////////  CB ERR DB  //////////////////////
//////////////////////////////////////////////////////

function cbDB(cb) {
  return function (err, res) {
      if (err)
      return cb(err)
      return cb(null, res)
  }
}

///////////////////////////////////////////////////////
//////////////////  CB ERR DAL  //////////////////////
//////////////////////////////////////////////////////

function cbDAL(req, res, next) {
  return function (err, response) {
    if (err) {
      return next(new HTTPError(400, err.message, {
        method: req.method,
        path: req.path,
        query: req.query
      }))
    }
    console.log(
      'Method: ',
      req.method, '\nPath: ',
      req.path, '\nQuery: ',
      req.query, '\nRes: ', JSON.stringify(res, null, 4))
    res.send(response)
  }
}


module.exports = {
  cbDAL: cbDAL,
  cbDB: cbDB,
  checkAll: checkAll
}
