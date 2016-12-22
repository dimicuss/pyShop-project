const
	path   = require('path' ),
	gulp   = require('gulp' ),
	concat = require('gulp-concat' ),
	minify = require('gulp-minify' ),
	react  = require('gulp-react' ),
	less   = require('gulp-less' ),
	babel  = require('gulp-babel')

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

function setEnv(env, fn) {
	fn.call(env)
}

gulp.task('scripts', setEnv('.min', function () {
	const scriptsDst = 'public/static/scripts'

	return gulp.src(concatArrays(
		[
			`react/react${this}.js`,
			`react/react-dom${this}.js`,
			`jquery/dist/jquery${this}.js`
		].map(makePath('bower_components/')),
		[
			'global_scripts/**/*.js'
		].map(makePath('resources/')))
	)
		.pipe(babel({
			presets: ['es2015'],
			compact: true
		}))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(scriptsDst))
}))



gulp.task('react_scripts', () => {
	const scriptsDst = 'public/static/react_scripts'

	return gulp.src([
		'*.jsx'
	].map(makePath('resources/react_scripts/')))
		.pipe(react())
		.pipe(babel({
			presets: ['es2015'],
			compact: true
		}))
		.pipe(gulp.dest(scriptsDst))
})


gulp.task('bootstrap', () => {
	const cssDst = 'public/static/css'

	return gulp.src('resources/less/bootstrap.less')
		.pipe(less())
		.pipe(gulp.dest(cssDst))
})

gulp.task('default', ['scripts', 'react_scripts', 'bootstrap'])

