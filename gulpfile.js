const gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	clean = require('gulp-clean'),
	cleanCSS = require('gulp-clean-css'),
	imageMin = require('gulp-imagemin'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imgRetina = require('gulp-img-retina'),
	cssRetina = require('gulp-css-retina');

const paths = {
	js: ['js/*', 'js/*/*'],
	css: ['css/**/*.scss'],
	img: ['img/*', 'img/*/*'],
	html: ['index.html']
}

const retinaOpts = {
    1: '',
		2: '@2x',
		3: '@3x'
};

gulp.task('css', function() {
  return gulp.src('css/styles.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({debug: true}))
		.pipe(cssRetina(retinaOpts))
    .pipe(gulp.dest('docs'))
		.pipe(connect.reload());
});

gulp.task('js', function () {
	return gulp.src(paths.js)
	.pipe(concat('bundle.js'))
	.pipe(uglify({mangle:true}))
	.pipe(gulp.dest('docs'))
	.pipe(connect.reload());
});

gulp.task('clean', function() {
 	return gulp.src('docs')
 	.pipe(clean());
});

gulp.task('watch', function() {
  	gulp.watch(paths.js, ['js']);
  	gulp.watch(paths.css, ['css']);
  	gulp.watch(paths.html, ['html']);
  	gulp.watch(paths.img, ['images']);
});

gulp.task('html', function(){
	gulp.src('index.html')
		.pipe(imgRetina(retinaOpts))
		.pipe(gulp.dest('docs'))
    .pipe(connect.reload());
});

gulp.task('images', function(){
	gulp.src(paths.img)
	.pipe(imageMin([
      imageMin.gifsicle({interlaced: true}),
      imageMin.jpegtran({progressive: true}),
      imageMin.optipng({optimizationLevel: 5}),
      imageMin.svgo({plugins: [{removeViewBox: true}]})
    ]))
		.pipe(gulp.dest('docs/img'))
		.pipe(connect.reload());
});

gulp.task('serve', function(){
	connect.server({
		root:'docs',
		port:'3030',
		livereload:true,
		fallback:'docs/index.html'
	})
});

gulp.task('start', ['serve','watch', 'html', 'css', 'js', 'images']);
