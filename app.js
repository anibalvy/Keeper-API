
/**
 * Module dependencies.
 */

var express = require('express')
  //, routes = require('./routes')
  //, user = require('./routes/user')
  , bodyParser      = require('body-parser')
  , webservice = require('./routes/services_json.js')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout:true } );
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // original on False
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/', (req, res) => {
    res.send('Web Services for keeperApp, please use API')
});
//app.get('/users', user.list);
app.get('/getroutes', webservice.getRoutes);
app.get('/getusers', webservice.getUsers);
app.get('/getvehicles', webservice.getVehicles);
app.post('/postappusers', webservice.postAppUsers);
app.post('/postvehicle',webservice.postVehicle);
app.post('/posttracks', webservice.postTracks);
app.post('/posttracks2', webservice.postTracks2);
app.post('/postsessions', webservice.postSessions);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
