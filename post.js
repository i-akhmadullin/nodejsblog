var db = require('./models');

//new
exports.new = function(req, res){
  res.render('posts/new', { title: 'Create new Post' });
};
exports.newPost = function(req, res){
  // var postID;

  db.Post
    .create({ title: req.param('title') , content: req.param('content') })
    .success(function(post){
      // postID = post.id;
      console.log('post.values ', post.values);
      console.log('post.id ',     post.id);
      
    }).fail(function(){
      console.log('Failed to create Post');
      res.redirect('/');
    });

    setTimeout(function(){
      res.redirect('/');
      // res.render('post/' + postID);
    });
};
exports.list = function(req, res){
  db.Post.findAll()
    .success(function(post){
      console.log('/list post ', post);
      res.render('index', { title: 'Posts', posts: post });
    }).fail(function(){
      console.log('Failed to list Posts');
      res.redirect('/');
    });
};
exports.view = function(req, res){
  db.Post.find(req.params.id)
    .success(function(post){
      console.log('/view post ', post);
      res.render('posts/view', { title: 'Post view', post: post });
    }).fail(function(){
      console.log('Failed to view post');
      res.redirect('/');
    });
};
exports.delete = function(req, res){
  db.Post.find(req.params.id)
    .success(function(post){
      console.log('deleting post with id %s', post.id);
      post.destroy().success(function(){
        console.log('post deleted', post);
        res.redirect('/');
      }).fail(function(){
        // error case can't delete post
        res.redirect('/');
      });
    }).fail(function(){
      console.log('Failed to get post for deletion');
      res.redirect('/');
    });
};