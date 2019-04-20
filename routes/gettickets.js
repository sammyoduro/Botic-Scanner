var express          = require('express');
var router           = express.Router();
var async            = require('async');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/', function(req, res) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("botics-escanner");

    dbo.collection("TicketPin").find({'verified':'verified'},{ sort :{ timestamp : -1}}).toArray(function(err, result) {
      if (err) throw err;
      res.send({data:result});

      db.close();
    });




  });

})
module.exports = router;
