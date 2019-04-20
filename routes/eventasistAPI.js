var express          = require('express');
var router           = express.Router();
var async            = require('async');
var datetime         = require('node-datetime');

var dt = datetime.create();
var formated_time = dt.format('m/d/Y H:M:S');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//API URL = http://localhost:3000/eventasistapi/ProcessScanner?ticket_pin=EKT3QA
router.post('/', function(req, res) {
  let ticket_pin = req.query.ticket_pin.toUpperCase();
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("BOTICSCANNERDB");

    async.parallel([
      function(callback) {

        dbo.collection("TicketPin").find({'ticket_pin': ticket_pin,'verified':'verified'}).toArray(function(err, result) {
          if (err) throw err;

          if (result.length > 0) {
            return callback(null, "Ticket already scanned");
          }else {
            return callback(null, "ready");
          }
          // db.close();
        });

      }
      ],function (error, callbackResults) {
        if (error) {
          throw error;
        }
        if (callbackResults == "Ticket already scanned") {
          res.send({status:"Ticket already scanned"});
          res.destroy();
        }else if (callbackResults == "ready") {
          // start
          dbo.collection("TicketPin").find({'ticket_pin': ticket_pin,'verified':''}).toArray(function(err, result) {
            if (err) throw err;
            if (result.length == 0) {

              res.send({status:"Ticket Pin Invalid"});
              res.destroy();
            }else if (result.length == 1) {
              dbo.collection("TicketPin").update({'ticket_pin': ticket_pin},{$set: {'verified' : 'verified','timestamp' : formated_time}},function (err, result) {
                if (err) throw err;

                res.send({status:"Ticket Validated Successfully!"});
                res.destroy();
              })
            }

            db.close();
          });
          // end
        }
      })


  });

})
module.exports = router;
