const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');


const app = express();
// Load View Engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',function(req,res) {
  res.render('dashboard')
});

var eventasistAPI    = require('./routes/eventasistAPI');
var gettickets       = require('./routes/gettickets');
var reset       = require('./routes/reset');
app.use('/eventasistapi/ProcessScanner', eventasistAPI);
app.use('/eventasistapi/GetTickets', gettickets);
app.use('/eventasistapi/reset', reset);

var generateTicket    = require('./routes/generateTicket');
app.use('/generateTicket', generateTicket);
//Start server
var server = app.listen(3000,function () {
  console.log('Server started on port 3000...');
})
