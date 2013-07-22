var model = require('model');

var Post = function () {

  this.defineProperties({
    title:  { type: 'string' },
    content: { type: 'string' }
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
};

// Can also define them on the prototype
Post.prototype.create = function() {
};

Post = model.register('Post', Post);