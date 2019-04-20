var express          = require('express');
var router           = express.Router();
var async            = require('async');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.post('/', function(req, res) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("botics-escanner");
if (req.body.resetTicket == 'reset') {
  dbo.collection("TicketPin").updateMany({},{$set: {'verified' : '','timestamp' : ''}},function (err, result) {
    if (err) throw err;

    // res.send({status:"Ticket Validated Successfully!"});
    res.redirect('/')
    res.destroy();
    db.close();
  })
}

  });

})
module.exports = router;
