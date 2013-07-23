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

exports.create = function(req, res){
  Post.create({ title: 'Dummy Post Title' , content: 'Dummy Post Content' }).success(function(post, created) {
    console.log(post.values);
    console.log(created);
    res.render('index', { title: 'Posts', posts: post });
  }).failure(function() {
    console.log('Failed to create Post');
    res.render('index', { title: 'Posts', posts: posts });
  });
};

exports.list = function(req, res){
  Post.findAll().success(function(post, created) {
    console.log(post.values);
    console.log(created);
    res.render('index', { title: 'Posts', posts: post });
  }).failure(function() {
    console.log('Failed to create or get Post');
    res.render('index', { title: 'Posts', posts: posts });
  });
};