const
	path   = require('path' ),
	gulp   = require('gulp' ),
	concat = require('gulp-concat' ),
	minify = require('gulp-minify' ),
	react  = require('gulp-react' ),
	less   = require('gulp-less')

function makePath(scriptsSrc) {
	return filepath => {
		return path.join(scriptsSrc, filepath)
	}
}


function concatArrays(...arrays) {
	if(arrays.length == 1) {
		return arrays[0]
	}

	return arrays[0].concat(
		concatArrays.apply(null, arrays.slice(1)))
}


gulp.task('scripts', () => {
	const scriptsDst = 'public/static/scripts'

	return gulp.src(concatArrays(
		[
			'react/react.js',
			'react/react-dom.js'
		].map(makePath('bower_components/')),
		[
			'global_scripts/**/*.js'
		].map(makePath('resources/')))
	)
		.pipe(concat('app.js'))
		.pipe(minify())
		.pipe(gulp.dest(scriptsDst))
})



gulp.task('react_scripts', () => {
	const scriptsDst = 'public/static/react_scripts'

	return gulp.src([
		'index.jsx'
	].map(makePath('resources/react_scripts/')))
		.pipe(react())
		.pipe(gulp.dest(scriptsDst))
})


gulp.task('bootstrap', () => {
	const cssDst = 'public/static/css'

	return gulp.src('resources/less/bootstrap.less')
		.pipe(less())
		.pipe(gulp.dest(cssDst))
})

gulp.task('default', ['scripts', 'react_scripts', 'bootstrap'])

