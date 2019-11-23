"use strict";

let gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    cp = require("child-process");

gulp.task("sass", function() {
  return gulp.src( '_scss/**/*.scss' )
       .pipe( sass().on('error', sass.LogError) )
       .pipe( autoprefixer() )
       .pipe( gulp.dest( './docs/css/' ) )
       .pipe( browserSync.stream({ match: '**/*.css'}) )
    ;  
});    


//Jekyll
gulp.task("jekyll", function() {
    return cp.spwan("bundle", ["exec", "jekyll", "build"], {stdio: "inherit", shell: true});
});

gulp.task("watch", function() {

	browserSync.init({
		server: {
			baseDir: "./docs/"
		}
	});

	gulp.watch( '_scss/**/*.scss', gulp.series('sass') );

	gulp.watch (
        [
        	"./*.html",
        	"./*.yml",
        	"./_includes/*.html",
        	"./_layouts/*.html",
        	"./_post/**/*.*"
        ]
	).on('change', gulp.series('jekyll', 'sass') );

	gulp.watch( 'docs/**/*.html' ).on( 'change', browserSync.reload );
	gulp.watch( 'docs/**/*.js' ).on( 'change', browserSync.reload );
});

gulp.task("deploy", gulp.series('jekyll', 'sass'));

gulp.task("default", gulp.series('jekyll', 'sass', 'watch'));













