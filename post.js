var db = require('./models');

var posts = [
  { title: 'Foo', body: 'some foo bar' },
  { title: 'Foo bar', body: 'more foo bar' },
  { title: 'Foo bar baz', body: 'more foo bar baz' }
];

var Post = db.sequelize.define('Post', {
    title: db.Sequelize.STRING,
    content: db.Sequelize.TEXT
});

//new
exports.create = function(req, res){
  res.render('post_new', { title: 'Create new Post' });
};

exports.createPost = function(req, res){
  Post.create({ title: req.param('title') , content: req.param('req.content') }).success(function(post, created) {
    console.log(post.values);
    console.log(created);
    res.redirect('/');
  }).fail(function() {
    console.log('Failed to create Post');
    res.redirect('/');
  });
};

exports.list = function(req, res){
  Post.findAll().success(function(post, created) {
    console.log(post.values);
    console.log(created);
    res.render('index', { title: 'Posts', posts: post });
  }).fail(function() {
    console.log('Failed to list Posts');
    res.render('index', { title: 'Posts', posts: posts });
  });
};