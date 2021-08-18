/**
 *  API definitions
 */

var pg = require('pg').Client;
var config = ../config/env.json

// DB Connection
var connectionString = "postgres://" + config.db_user + ":" + config.db_passwd + "@" + config.db_host + ":" + config.db_port + "/" + config.db_name;
var pgClient = new pg(connectionString);


exports.getRoutes = function(req, res) {
  
	      console.log('Getting Routes');
              var pgClient = new pg(connectionString);
              pgClient.on('drain', pgClient.end.bind(pgClient)); //disconnect client when all queries are finished
              console.log('drain done');
              pgClient.connect();
              console.log('connect done');
	      
	      var queryText = "select a.* from tb_Routes a";
	      
	      var query = pgClient.query(queryText, 
	      								function(err, result){		
												if(err) {
												//handle error
												console.log(err);
												}
												else {

												console.log('Resultado: '+ JSON.stringify(result.rows[0]));
												res.send(result);
												}
									      }
									 );
}

exports.getUsers = function(req, res) {
  
	      console.log('Getting User');
              var pgClient = new pg(connectionString);
              pgClient.on('drain', pgClient.end.bind(pgClient)); //disconnect client when all queries are finished
              console.log('drain done');
              pgClient.connect();
              console.log('connect done');
	      
	      var queryText = "select a.* from tb_appusers a";
	      
	      var query = pgClient.query(queryText, 
	      								function(err, result){		
												if(err) {
												//handle error
												console.log(err);
												}
												else {

												console.log('Resultado: '+ JSON.stringify(result));
												res.send(result);
												}
									      }
									 );
}

exports.getVehicles = function(req, res) {
  
	      console.log('Getting Vehicles');
          var pgClient = new pg(connectionString);
          pgClient.on('drain', pgClient.end.bind(pgClient)); //disconnect client when all queries are finished
          console.log('drain done');
          pgClient.connect();
          console.log('connect done');
	      
	      var queryText = "select a.* from tb_vehicles a";
	      
	      var query = pgClient.query(queryText, 
	      								function(err, result){		
												if(err) {
												//handle error
												console.log(err);
												}
												else {

												console.log('Resultado: '+ JSON.stringify(result));
												res.send(result);
												}
									      }
									 );
}

exports.postAppUsers = function(req, res) {

	var status = '{"error":"false"}';
	var pgClient = new pg(connectionString);

	console.log('Saving New User data:');
	console.log(req.body.dataUser);
	//var data = JSON.stringify(req.body.dataTracks, null, 4);
	var data = req.body.dataUser;
	console.log(data);

	// for (var i = 0, len = data.length; i < len; i++) {
	//     var track = data[i];
	//     console.log('track ' + i + ' es: ' + JSON.stringify(track));
	//     console.log('track id ' + i + ' es: ' + track.trackid);
	//     //console.log('track sessionid ' + i + ' es: ' + JSON.stringify(track.sessionId));
	//     console.log('track sessionid ' + i + ' es: ' + track.sessionId);
	//     console.log('track type ' + i + ' es: ' + track.type);
	//     console.log('track trackData ' + i + ' es: ' + track.trackdata);
	//     console.log('track created_at ' + i + ' es: ' + track.created_at);
	//     // if (user.username === username) {
	//     //   return fn(null, user);
	//     // }
 //  	}


	pgClient.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}

		var queryText = "INSERT INTO tb_appusers (appusername,enabled, created_at) values ('" 
						+ data +  "', 'true',now())"
						;		
		console.log(queryText);

		pgClient.query(queryText, 
			function(err, result) {
			    if(err) {
			      return console.error('error running query', err);
			    }
			    console.log(result.rows[0]);
			    //respuesta 
			    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
			    pgClient.end();
			    status = '{"error":"true"}';
			}
		);
		
		//pgClient.end();
	});
	

	res.send(status);
	//res.send(req);
}

exports.postVehicle = function(req, res) {

	var status = '{"error":"false"}';
	//var pgClient = new pg(connectionString);

	console.log('saving New Vehicle data:');
	console.log(req.body.dataVehicle);
	//var data = JSON.stringify(req.body.dataTracks, null, 4);
	var data = req.body.dataVehicle;
	console.log(data);

	// for (var i = 0, len = data.length; i < len; i++) {
	//     var track = data[i];
	//     console.log('track ' + i + ' es: ' + JSON.stringify(track));
	//     console.log('track id ' + i + ' es: ' + track.trackid);
	//     //console.log('track sessionid ' + i + ' es: ' + JSON.stringify(track.sessionId));
	//     console.log('track sessionid ' + i + ' es: ' + track.sessionId);
	//     console.log('track type ' + i + ' es: ' + track.type);
	//     console.log('track trackData ' + i + ' es: ' + track.trackdata);
	//     console.log('track created_at ' + i + ' es: ' + track.created_at);
	//     // if (user.username === username) {
	//     //   return fn(null, user);
	//     // }
 //  	}


	pgClient.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}

		var queryText = "INSERT INTO tb_vehicles (vehicleidenti,enabled, created_at) values ('" 
						+ data +  "', 'true',now())"
						;		
		console.log(queryText);

		pgClient.query(queryText, 
			function(err, result) {
			    if(err) {
			      return console.error('error running query', err);
			    }
			    console.log(result.rows[0]);
			    //respuesta 
			    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
			    pgClient.end();
			    status = '{"error":"true"}';
			}
		);
		
		//pgClient.end();
	});
	

	res.send(status);
	//res.send(req);
}
exports.postTracks = function(req, res) {
	console.log('saving track data');
	var sessionIdSaved = '';

	var client = new pg(connectionString);
	client.on('drain', client.end.bind(client)); //disconnect client when all queries are finished
	var queryText = "select insertTracks('"+ req.body.dataTracks.toString('utf8') +"');";
	console.log(queryText);
	client.connect();

	var query = client.query(queryText, function(err, result) {
		if(err) {
                //handle error
                console.log(err);
		}
		else {
			console.log('Resultado: ' + JSON.stringify(result.rows[0], null, 4));
			console.log('Resultado utf8: ' + result.rows[0].toString('utf8'));
			res.send(result.rows[0]);
		};
	});
}

exports.postTracks2 = function(req, res) {

	var pgClient = new pg(connectionString);

	console.log('saving track data');
	//console.log(req.body.dataTracks);
	//var data = JSON.stringify(req.body.dataTracks, null, 4);
	var data = JSON.parse(req.body.dataTracks);
	//console.log(data.length);
	console.log('track is  :' + JSON.stringify(data));
	// for (var i = 0, len = data.length; i < len; i++) {
	//     var track = data[i];
	//     console.log('track ' + i + ' es: ' + JSON.stringify(track));
	//     console.log('track id ' + i + ' es: ' + track.trackid);
	//     //console.log('track sessionid ' + i + ' es: ' + JSON.stringify(track.sessionId));
	//     console.log('track sessionid ' + i + ' es: ' + track.sessionId);
	//     console.log('track type ' + i + ' es: ' + track.type);
	//     console.log('track trackData ' + i + ' es: ' + track.trackdata);
	//     console.log('track created_at ' + i + ' es: ' + track.created_at);
	//     // if (user.username === username) {
	//     //   return fn(null, user);
	//     // }
 //  	}

 	var sessionIdSaved =  '';
 	var sessionIdSavedString = '';


	pgClient.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}

		for (var i = 0, len = data.length; i < len; i++) {
			var track = data[i];
			//console.log('track ' + i + ' es: ' + JSON.stringify(track));

			var queryText = "INSERT INTO tb_Tracks (trackId, sessionId, trackType, trackdata, created_at) values (" 
							+ track.trackid + ","
							+ track.sessionId + ","
							+ track.type + ",'"
							+ JSON.stringify(track.trackdata) + "','"
							+ track.created_at + "') RETURNING trackId "
							;		

			sessionIdSavedString = pgClient.query(queryText, 
				function(err, result) {
				    if(err) {
				      return console.error('error running query', err);
				    }
				    //console.log('result 1: '+ result.rows[0]);
				    //respuesta 
				    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
				   //pgClient.end();

				   console.log(track.trackid);
				   //sessionIdSavedString = '{sessionid: ' + track.trackid + '}';
				   //sessionIdSaved.push(result.rows[0]);
				   //console.log('sessionIdSaved : ' + sessionIdSaved);
				   //console.log('result: ' + JSON.stringify(result[0]));
				   //console.log(JSON.stringify(JSON.parse(result.rows)));
				   //return result.rows[0];
				   return track.trackid;
				}
			);
			console.log('sessionIdSavedString : ' + JSON.stringify(sessionIdSavedString));
			if (i < data.length ) {
				sessionIdSaved = sessionIdSaved + sessionIdSavedString + ',';

			} else {
				sessionIdSaved = sessionIdSaved + sessionIdSavedString ;
			};
			
		}
		//pgClient;
		sessionIdSaved = '[' + sessionIdSaved + ']' ;

		console.log('sessionIdSaved SEND:');
		console.log(JSON.stringify(sessionIdSaved));
		res.send(JSON.stringify(sessionIdSaved));
	});
	

	//res.send('respuesta');
	//console.log('sessionIdSaved :' + JSON.stringify(sessionIdSaved))
	//res.send(JSON.stringify(sessionIdSaved));
	//res.send(req);
}

exports.postSessions = function(req, res) {

	var pgClient = new pg(connectionString);

	console.log('saving postSessions data');
	console.log(req.body.dataSessions.toString('utf8'));
	//var data = JSON.stringify(req.body.dataTracks, null, 4);
	var data = JSON.parse(req.body.dataSessions.toString('utf8'));
	console.log(data.length);

	pgClient.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}

		for (var i = 0, len = data.length; i < len; i++) {
			var session = data[i];
			console.log('postSessions ' + i + ' es: ' + JSON.stringify(session));

			//track 0 es: {"trackid":"00000000000000020140406190857566","sessionId":"00000000000000020140406190745636","type":"1",
			//				"trackdata":{"longitude":"-122.084095","latitude":"37.422005","altitude":"0.0","speed":"0.0"},"created_at":"2014-04-06 23:08:57"}
			
			// trackId  integer PRIMARY KEY DEFAULT nextval('sq_tracks'),
			// 	sessionId integer references tb_Sessions(sessionId),
			// 	trackType integer references tb_Tracktype (typeid),
			// 	trackData json not null,
			// 	created_at timestamp); sessionId, status, IMEI, userId, vehicleId, routeId, routeNavigation, created_at


			var queryText = "INSERT INTO tb_Sessions (sessionId, sessionStatus, imei, userid, vehicleid, routeid, created_at) values ('" 
							+ session.sessionId + "',"
							+ session.status + ",'"
							+ session.IMEI + "',"
							+ session.userId + ","
							+ session.vehicleId + ","
							+ session.routeId + ",'"
							//+ JSON.stringify(session.route_navigation) + "','"
							+ session.created_at + "')"
							;		

			pgClient.query(queryText, 
				function(err, result) {
				    if(err) {
				      return console.error('error running query', err);
				    }
				    console.log(result.rows[0]);
				    //respuesta 
				    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
				    pgClient.end();
				}
			);
		}
		//pgClient.end();
	});
	

	res.send('respuesta');
	//res.send(req);
}

