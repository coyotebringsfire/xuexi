var should=require('should'),
	testrepo="https://github.com/coyotebringsfire/xuexi",
	debug=require('debug')('xuexi:git:test'),
	fs=require('fs-plus'),
	Git=require('../lib/git'),
  rimraf=require('rimraf');

describe("git_clone", function gitCloneSuite() {
	this.timeout(0);
	var debug=require('debug')('xuexi:git:gitCloneSuite:test');

	beforeEach(function beforeEachTest(done) {
		var debug=require('debug')('xuexi:git:gitCloneSuite:after:test');
		debug("removing /tmp/xuexi");
		rimraf("/tmp/xuexi", function() {
			done();
		});
	});

	after(function afterAllTests(done) {
		var debug=require('debug')('xuexi:git:gitCloneSuite:after:test');
		debug("removing /tmp/xuexi");
		rimraf("/tmp/xuexi", function() {
			done();
		});
	});

	it("should use default options if none are given", function doIt(done) {
		var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:test');
		var git=new Git(testrepo, "xuexi");
		git.clone()
			.then(function onResolve() {
				var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:onResolve:test');
				debug("done");
				done();
			}, function onReject(err) {
				var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:onResolve:test');
				should.fail("promise rejected");
			});
	});
	it("should override default options with given options", function doIt(done) {
		var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:test');
		var git=new Git(testrepo, "xuexi");
		rimraf("/var/tmp/xuexi", function() {
			git.clone({ targetDirectory:"/var/tmp" })
				.then(function onResolve() {
					var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:onResolve:test');
					git.gitDir.should.match(/^\/var\/tmp\//);
					debug("removing /var/tmp/xuexi");
					rimraf("/var/tmp/xuexi", function() {
						done();
					});
				}, function onReject(err) {
					var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:onResolve:test');
					should.fail("promise rejected");
				});
		});
	});
	it("should resolve the returned promise if no error happens", function doIt(done) {
		var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:test');
		var git=new Git(testrepo, "xuexi");
		git.clone()
			.then(function onResolve() {
				var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:onResolve:test');
				git.gitDir.should.match(/^\/tmp\//);
				git.getCommits.should.be.type("function");
				git.deleteRepo.should.be.type("function");
				done();
			}, function onReject(err) {
				var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:onResolve:test');
				should.fail("promise rejected");
			});
	});
	it("should insert a gitDir property on the calling object", function doIt(done) {
		var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:test');
		var git=new Git(testrepo, "xuexi");
		git.clone()
			.then(function onResolve() {
				var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:onResolve:test');
				debug("gitDir %j", git.gitDir);
				git.gitDir.should.match(/\/tmp\/xuexi/);
				done();
			}, function onReject(err) {
				var debug=require('debug')('xuexi:git:gitCloneSuite:doIt:onResolve:test');
				should.fail("promise rejected");
			});
	});
});