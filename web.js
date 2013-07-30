var express = require('express'),
    stylus  = require('stylus'),
    nib     = require('nib'),
    app     = express(),
    port    = process.env.PORT || 3000,
    post    = require('./post'),
    db      = require('./models');

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}
app.use(app.router);


app.use(function(req, res, next){
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});
app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render('500', { error: err });
});


app.get('/', post.list);
// Posts
app.all('/posts', post.list);
app.get('/post/new',         post.new);
app.post('/post/new',        post.newPost);
app.get('/post/:id',         post.view);
app.get('/post/:id/view',    post.view);
app.post('/post/:id/delete', post.delete);
// app.get('/post/:id/edit', post.edit);
// app.put('/post/:id/edit', post.update);

app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});
app.get('/403', function(req, res, next){
  // trigger a 403 error
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});
app.get('/500', function(req, res, next){
  // trigger a generic (500) error
  next(new Error('Server error!'));
});


db.sequelize.sync().complete(function(err) {
    if (err) {
        throw err;
    } else {
        app.listen(port, function() {
            console.log('Listening on ' + port);
        });
    }
});