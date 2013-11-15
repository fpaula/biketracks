// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('zKicXuuke0ftcLo4');

var port = process.env.PORT || 8000;
// var http = require('http');

var express = require('express');
var app = express();
app.use(express.bodyParser());
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


// MONGO //
// var mongo = require('mongodb');

// var DBServer = mongo.Server,
//   Db = mongo.Db,
//   BSON = mongo.BSONPure;

// var db_server = new DBServer('localhost', 27017, {auto_reconnect: true});
// db = new Db('walbril', db_server);

// db.open(function(err, db) {
//   if(!err) {
//     db.collection('tracks', {strict:true}, function(err, collection) {
//       if (err) {
//         console.log("The 'tracks' collection doesn't exist.");
//       }
//     });
//   }
// });

addTrack = function(req, res) {
  var track = req.body;
  io.sockets.emit('news', track);
  // We don't have mongodb yet
  // db.collection('tracks', function(err, collection) {
  //   collection.insert(track, {safe:true}, function(err, result) {
  //     if (err) {
  //       res.send({'error':'An error has occurred'});
  //     } else {
  //       res.send(result[0]);
  //     }
  //   });
  // });
}

app.use(express.static(__dirname + '/public'));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(req, res){
  res.render('Home', {
    title: "Home",
    header: "Test page"
  });
});

app.get('/track', function(req, res){
  res.render('track', {
    title: 'Tracking',
    header: 'Track page',
    session_id: Math.floor((1 + Math.random()) * 0x10000)
  });
});

app.post('/create', function(req, res){
  addTrack(req, res);
  res.render('home', {
    title: "WalBril",
    header: "Test page"
  });
});

if (!module.parent) {
  server.listen(port);
  console.log('Express app started on port ' + port);
}

// http.createServer(function (req, res) {
//   // http://blog.nodeknockout.com/post/35364532732/protip-add-the-vote-ko-badge-to-your-app
//   var voteko = '<iframe src="http://nodeknockout.com/iframe/walbril" frameborder=0 scrolling=no allowtransparency=true width=115 height=25></iframe>';

//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('<html><body>' + voteko + '</body></html>\n');
// }).listen(port, function(err) {
//   if (err) { console.error(err); process.exit(-1); }

//   // if run as root, downgrade to the owner of this file
//   if (process.getuid() === 0) {
//     require('fs').stat(__filename, function(err, stats) {
//       if (err) { return console.error(err); }
//       process.setuid(stats.uid);
//     });
//   }

//   console.log('Server running at http://0.0.0.0:' + port + '/');
// });
