var gulp = require('gulp')
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var nodemonConf =
{
  script: 'app.js',
  ext: 'js',
  env:{
    PORT:3005,
    MONGO_DB: 'mongodb://localhost/docdb'
  },
  ignore: ['./node_modules/**']
};
gulp.task('default', function() {
  nodemon(nodemonConf)
  .on('restart', function() {
    console.log('Files have changed, restarted, environments set. PORT: '+nodemonConf.env.PORT+' \n MONGO_DB: ' +nodemonConf.env.MONGO_DB);
  });
});

gulp.task('test', function(){
  gulp.src('./tests/*.js', {read: false}).pipe(gulpMocha({reporter: 'nyan'}));
});

gulp.task('awesometest', function(){
  gulp.src('./tests/*.js', {read: false}).pipe(gulpMocha({reporter: 'mochawesome'}));
});
