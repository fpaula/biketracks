// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('zKicXuuke0ftcLo4');

var isProduction = (process.env.NODE_ENV === 'production');
var port = (isProduction ? 80 : 8000);
// var http = require('http');

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(req, res){
  res.render('home', {
    title: "WalBril",
    header: "Test page"
  });
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
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
