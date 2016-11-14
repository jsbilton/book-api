// const createView = require('../dal-2.js').createView
//
// var ddoc = [{
//   _id: '_design/books',
//   views: {
//     "books": {
//       map: function(doc) {
//         if (doc.type === 'book') {
//           emit(doc._id)
//         }
//       }.toString()
//     }
//   }
// }]
//
// createView(ddoc, function(err, data) {
//     if (err)
//         return console.log('ERROR CREATING DESIGN DOC FOR BOOK:\n', err.message)
//     if (data) {
//         console.log('DESIGN DOC CREATED FOR BOOK', data)
//     }
// })
//
//
//
// // var books = {
// //     _id: '_design/book',
// //     views: {
// //         'name': {
// //             map: function(doc) {
// //                 if (doc.type === 'book') {
// //                     emit(doc.name + doc._id)
// //                 }
// //             }.toString()
// //         },
// //         'author': {
// //             map: function(doc) {
// //                 if (doc.type === 'book') {
// //                     emit(doc.name + doc._id)
// //                 }
// //             }.toString()
// //         },
// //         'description': {
// //             map: function(doc) {
// //                 if (doc.type === 'book') {
// //                     emit(doc.description, doc._id)
// //                 }
// //             }.toString()
// //         },
// //         'in_stock': {
// //             map: function(doc) {
// //                 if (doc.type === 'book') {
// //                     emit(doc.in_stock, doc._id)
// //                 }
// //             }.toString()
// //         },
// //         'retail_cost': {
// //             map: function(doc) {
// //                 if (doc.type === 'book') {
// //                     emit(doc.retail_cost, doc._id)
// //                 }
// //             }.toString()
// //         },
// //         'date_available': {
// //             map: function(doc) {
// //                 if (doc.type === 'book') {
// //                     emit(doc.date_available, doc._id)
// //                 }
// //             }.toString()
// //         }
// //     }
// // }
