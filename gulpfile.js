var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  gulpMocha = require('gulp-mocha'),
  env = require('gulp-env'),
  supertest = require('supertest');

var nodemonConf =
{
  script: 'app.js',
  ext: 'js',
  env:{
    PORT:3005
  },
  ignore: ['./node_modules/**']
};
gulp.task('default', function() {
  nodemon(nodemonConf)
  .on('restart', function() {
    console.log('Files have changed, restarted');
  });
});

gulp.task('dev', function() {
  env({vars:{ENV:'dev'}});
  nodemon(nodemonConf)
  .on('restart', function() {
    console.log('Files have changed, restarted');
  });
});

gulp.task('test', function(){
  env({vars:{ENV:'test'}});
  gulp.src('./tests/*.js', {read: false}).pipe(gulpMocha({reporter: 'nyan'}));
});

gulp.task('awesometest', function(){
  env({vars:{ENV:'test'}});
  gulp.src('./tests/*.js', {read: false}).pipe(gulpMocha({reporter: 'mochawesome'}));
});
