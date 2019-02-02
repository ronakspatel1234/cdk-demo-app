/**
 * This gulp command should be invoked as follows:
 * gulp copy --package package_name
 * gulp copy --package toaster
 */
var gulp = require('gulp');
var sass = require('gulp-sass');

/**
 * Copy --package package_name from packages/package_name to packages/package_name/dist
 */
gulp.task('copy-scss', () => {
  return gulp
    .src('packages/' + process.argv[4] + '/src/**.scss')
    .pipe(gulp.dest('packages/' + process.argv[4] + '/dist'));
});

/**
 * Create a sequential task that will run 'copy-scss' task and then run 'transpile-scss-to-css' task
 */
gulp.task('copy', gulp.series('copy-scss'));
