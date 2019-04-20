var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  event_name :{type:String,required:true},
  ticket_pin :{type:String,required:true},
  messages   :{type:String,required:true},
  verified   :{type:Boolean,default:false},
  timestamp  :{type:String},
});

module.exports = mongoose.model('TicketPin',schema);
