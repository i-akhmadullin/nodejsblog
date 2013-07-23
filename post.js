var db = require('./models');

var posts = [
  { title: 'Foo', body: 'some foo bar' },
  { title: 'Foo bar', body: 'more foo bar' },
  { title: 'Foo bar baz', body: 'more foo bar baz' }
];

//new
exports.create = function(req, res){
  res.render('post_new', { title: 'Create new Post' });
};
exports.createPost = function(req, res){
  db.Post
    .create({ title: req.param('title') , content: req.param('content') })
    .success(function(post, created){
      console.log(post.values);
      console.log(created);
      res.redirect('/');
    }).fail(function(){
      console.log('Failed to create Post');
      res.redirect('/');
    });
};

exports.list = function(req, res){
  db.Post.findAll()
    .success(function(post, created){
      console.log(post.values);
      console.log(created);
      res.render('index', { title: 'Posts', posts: post });
    }).fail(function(){
      console.log('Failed to list Posts');
      res.render('index', { title: 'Posts', posts: posts });
    });
};

exports.view = function(req, res){
  db.Post.find(req.post.id)
    .success(function(post, created){
      console.log(post.values);
      console.log(created);
      res.render('posts/view', { title: 'Viewing user ' + req.post.title, content: req.post.content });
    }).fail(function(){
      console.log('Failed to list Posts');
      res.render('posts', { title: 'Posts', posts: posts });
    });
};