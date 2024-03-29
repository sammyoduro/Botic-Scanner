var express          = require('express');
var router           = express.Router();
const mongoose       = require('mongoose');
// var GenTicket        = require('../models/ticket_generator');
var excel            = require('excel4node');
const randomstring   = require('randomstring');

var workbook = new excel.Workbook();
// Add Worksheets to the workbook
var worksheet = workbook.addWorksheet('130,000');
// Create a reusable style
var style = workbook.createStyle({
  font: {size: 16,},
  numberFormat: '$#,##0.00; ($#,##0.00); -'
});

worksheet.cell(1,2).string("event_name").style(style);
worksheet.cell(1,3).string("ticket_pin").style(style);
worksheet.cell(1,4).string("Filter_Pin").style(style);
worksheet.cell(1,5).string("messages").style(style);
worksheet.cell(1,6).string("verified").style(style);
worksheet.cell(1,7).string("timestamp").style(style);



mongoose.connect('mongodb://localhost:27017/BOTICSCANNERDB', { useNewUrlParser: true });
var db = mongoose.connection;
db.once('open',function () {
  console.log('Database online');
})
db.on('error',function (err) {
  console.log(err);
})

router.get('/', function(req, res) {

var col = db.collection('TicketPin');
var batch = col.initializeOrderedBulkOp();
let getGenPins = [];
var records = {};

for (var i = 2; i <=130001; i++) {

var GenNumber = randomstring.generate(6).toUpperCase();
record = {
  'event_name':"MTN connect",
  'ticket_pin':GenNumber,
  'messages':"MTN MUSIC FESTIVAL \n E Ticket number: BTC "+GenNumber+" BTC \n Expires on: 2019-05-08 23:59 \n Venue: AICC \n VIP25821494 \n Validate your ticket at the entrance \n Powered By Botics Technologies",
  'verified':'',
  'timestamp':''
};

worksheet.cell(i,1).number(i);
worksheet.cell(i,2).string("MTN connect");
worksheet.cell(i,3).string("BTC "+GenNumber+" BTC");
worksheet.cell(i,4).string(GenNumber);
worksheet.cell(i,5).string("MTN MUSIC FESTIVAL \n E Ticket number: BTC "+GenNumber+" BTC \n Expires on: 2019-05-08 23:59 \n Venue: AICC \n VIP25821494 \n Validate your ticket at the entrance \n Powered By Botics Technologies");

batch.insert(record);
}

// Execute the operations
batch.execute(function(err, result) {
  console.dir(err);
  console.dir(result);
  workbook.write('boticsScanner.csv');
  db.close();
});

})


module.exports = router;
