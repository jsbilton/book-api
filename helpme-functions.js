const HTTPError = require('node-http-error')


///////////////////////////////////////////////////////
//////////////////  Check Req Input Info  /////////////
//////////////////////////////////////////////////////

function checkReq(data, reqFields) {
  var inputErr = []
  //iterate thru input fields
  reqFields.forEach(function (reqFields) {
    if (reqFields.hasOwnProperty(reqFields) !== true) {
      inputErr.push('Missing required properties' + reqFields)
    }
  })
  return inputErr
}

///////////////////////////////////////////////////////
//////////////////  Check Generated Info  /////////////
//////////////////////////////////////////////////////

function checkGen(data, genFields) {
  var inputErr = []
  reqFields.forEach(function (reqFields) {
    if (genFields.hasOwnProperty(reqFields) !== true) {
      inputErr.push('Errors detected with' + genFields)
    }
  })
  return inputErr
}

///////////////////////////////////////////////////////
//////////////   Cross-Check all fields/Combine ///////
//////////////////////////////////////////////////////

function checkAll(data, checkGen, checkR) {
  var reqErr = reqFields(data, reqFields)
  var genErr = genFields(data, genFields)
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
  return function (err, res) {
    if (err) {
      return next (new HTTPError(400, err.message, {
        method: req.method,
        path: req.path,
        query: req.query
      }))
    }
    console.log('Method: ', req.method, '\nPath: ', req.path, '\nQuery: ', req.query, '\nRes: ', JSON.stringify(res, null, 4))
    res.send(res)
  }
}

module.exports = {
  cbDAL: cbDAL,
  cbDB: cbDB
}
