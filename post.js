var db = require('./models');

var posts = [
  { title: 'Foo', body: 'some foo bar' },
  { title: 'Foo bar', body: 'more foo bar' },
  { title: 'Foo bar baz', body: 'more foo bar baz' }
];

//new
exports.create = function(req, res){
  res.render('posts/new', { title: 'Create new Post' });
};
exports.createPost = function(req, res){
  db.Post
    .create({ title: req.param('title') , content: req.param('content') })
    .success(function(post){
      console.log(post.values);
      res.redirect('/');
    }).fail(function(){
      console.log('Failed to create Post');
      res.redirect('/');
    });
};

exports.list = function(req, res){
  db.Post.findAll()
    .success(function(post, created){
      console.log('/list post.values ', post.values);
      res.render('index', { title: 'Posts', posts: post });
    }).fail(function(){
      console.log('Failed to list Posts');
      res.render('index', { title: 'Posts', posts: posts });
    });
};

exports.view = function(req, res){
  db.Post.find(req.params.id)
    .success(function(post, created){
      console.log('/view post.values ', post.values);
      // console.log('', created);
      res.render('posts/view', { title: 'Post view', post: post });
    }).fail(function(){
      console.log('Failed to list Posts');
      res.render('posts', { title: 'Posts', posts: posts });
    });
};