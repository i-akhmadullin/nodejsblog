var express = require('express'),
    stylus  = require('stylus'),
    nib     = require('nib'),
    app     = express(),
    port    = process.env.PORT || 3000,
    post    = require('./post'),
    // site    = require('./site'),
    db      = require('./models');

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}
app.use(express.static(__dirname + '/public'));


app.get('/', post.list);
// Posts
app.all('/posts', post.list);
// app.all('/post/:id/:op?', post.load);
// app.get('/post/:id',      post.view);
// app.get('/post/:id/view', post.view);
// app.get('/post/:id/edit', post.edit);
// app.put('/post/:id/edit', post.update);
app.get('/post/create',   post.create);
app.post('/post/create',   post.createPost);


db.sequelize.sync().complete(function(err) {
    if (err) {
        throw err;
    } else {
        app.listen(port, function() {
            console.log('Listening on ' + port);
        });
    }
});
