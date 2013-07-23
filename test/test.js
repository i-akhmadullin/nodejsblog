/* global casper */

var errors = [];
casper.on('page.error', function(msg, trace) {
  this.echo('Error:    ' + msg, 'ERROR');
  this.echo('file:     ' + trace[0].file, 'WARNING');
  this.echo('line:     ' + trace[0].line, 'WARNING');
  this.echo('function: ' + trace[0]['function'], 'WARNING');
  errors.push(msg);
});

casper.test.begin('Index page is working', 3, function suite(test) {
    casper.start('http://localhost:3000/', function() {
        test.assertTitle('Posts - Blog', 'blog index page title is the one expected');
        test.assertExists('.main-content', 'main content block is found');
        test.assertExists('#post_new', 'New post link is found on mainpage');
    });
    casper.run(function() {
        test.done();
    });
});
casper.test.begin('Posts page is working', 2, function suite(test) {
    casper.start('http://localhost:3000/posts', function() {
        test.assertTitle('Posts - Blog', 'Posts page title is the one expected');
        test.assertExists('.main-content', 'main content block is found');
    });
    casper.run(function() {
        test.done();
    });
});
casper.test.begin('Create post page is working and can create new post', 2, function suite(test) {
    casper.start('http://localhost:3000/post/new', function() {
        test.assertTitle('Create new Post - Blog', 'Create post page title is the one expected');
        test.assertExists('.main-content', 'main content block is found');
    });
    casper.then(function() {
        this.fill('form[method="post"]', {
            title:   'casperjs-test',
            content: 'casperjs-content'
        }, true);
    });
    casper.then(function() {
        test.assertTitle('Posts - Blog', 'after creating new post redirected to index page');
        test.assertUrlMatch(/localhost:3000/, 'search term has been submitted');
    });
    casper.run(function() {
        test.done();
    });
});

casper.run(function() {
  if (errors.length > 0) {
    this.echo(errors.length + ' Javascript errors found', 'WARNING');
  } else {
    this.echo(errors.length + ' Javascript errors found', 'INFO');
  }
  casper.exit();
});