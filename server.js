var express = require('express'),
	Paperpress = require('paperpress').Paperpress,
	logger = require('morgan');

var server = express();

server.use(logger(':status :req[x-real-ip] :method :response-time ms :url'));
server.use(express.static(__dirname + '/public'));

var blog = new Paperpress({
	directory : 'static',
	themePath : 'static/layouts',
	basePath  : '/blog',
	articlesPerPage : 20,
	pagesPath : ''
});

blog.attach(server);

// server.get('/', function (req, res) {
// 	res.sendfile('./views/home.html');
// });

server.get('/feed', function (req, res) {
	res.redirect('/rss');
});

var webhook = require('./webhook');

server.get('/webhook',webhook(blog));
server.post('/webhook',webhook(blog));

server.listen(4500);
console.log('Server running at http://localhost:4500', new Date() );