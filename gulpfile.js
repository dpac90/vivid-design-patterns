const gulp = require('gulp');
const rollUpEach = require('gulp-rollup-each');
const rollUpConfig = require('./rollup.config');

gulp.task('bundle_js', () => {
    return gulp
        .src('src/components/**/*.{js,jsx}')
        .pipe(rollUpEach(rollUpConfig))
        .pipe(gulp.dest('dist/'));
});
