var posts = [
  { title: 'Foo', body: 'some foo bar' },
  { title: 'Foo bar', body: 'more foo bar' },
  { title: 'Foo bar baz', body: 'more foo bar baz' }
];
exports.list = function(req, res){
  res.render('index', { title: 'Posts', posts: posts });
};

// exports.create = function(req, res){
//   var params = {
//     title:   'Post title',
//     content: 'Post content'
//   };
//   var post = Post.create(params);
//   res.render('post', { title : post } );
//   // res.render('posts', { title: 'Posts', posts: posts });
// };