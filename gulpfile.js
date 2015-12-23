//    ______   __    __  __        _______
//   /      \ /  |  /  |/  |      /       \
//  /$$$$$$  |$$ |  $$ |$$ |      $$$$$$$  |
//  $$ | _$$/ $$ |  $$ |$$ |      $$ |__$$ |
//  $$ |/    |$$ |  $$ |$$ |      $$    $$/
//  $$ |$$$$ |$$ |  $$ |$$ |      $$$$$$$/
//  $$ \__$$ |$$ \__$$ |$$ |_____ $$ |
//  $$    $$/ $$    $$/ $$       |$$ |
//   $$$$$$/   $$$$$$/  $$$$$$$$/ $$/
//

// Gulp and some tools
var gulp = require("gulp-help")(require("gulp"));
var gutil = require("gulp-util");
var notifier = require('terminal-notifier');
var chalk = require("chalk");
var browserSync = require('browser-sync').create();
var gulpSequence = require('gulp-sequence');

// Sass
var sass = require("gulp-sass");
var sassGlob = require('gulp-sass-glob');
var jsonImporter = require('node-sass-json-importer');
var prefix = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var scsslint = require('gulp-scss-lint');
var sassdoc = require("sassdoc");

// Css
var minifyCss = require('gulp-minify-css');

// Load configuration file
var config = require("./config.json");

// Error Callback
var errorCallBack = function (error, metadata) {
  if (error) {
    // throw error;
    console.log(error);
  }

  console.log(metadata, 'Metadata produced during the build process');
};

// -----------------------------------------------------------------------------
// FAVICONS -- https://github.com/haydenbleasel/favicons
// -----------------------------------------------------------------------------

gulp.task("favicons", "Generates cross-device favicons from assets/img/logo/favicon.png", function() {
  return favicons(config.favicons, errorCallBack);
});

// -----------------------------------------------------------------------------
// SASS -- https://www.npmjs.com/package/gulp-sass
// SASS GLOBBING -- https://www.npmjs.com/package/gulp-sass-glob
// -----------------------------------------------------------------------------

gulp.task("sass", "Compiles your SCSS files to CSS", function () {
  return gulp.src(config.path.scss + "/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: [
        require("node-bourbon").includePaths,
        require("node-neat").includePaths[1],
        require("node-normalize-scss").includePaths,
        config.path.bower + config.path.fontAwesome
      ],
      importer: jsonImporter,
      outputStyle: config.sass.style
    }))
    .on("error", function (err) {
      gutil.log(gutil.colors.black.bgRed(" SASS ERROR", gutil.colors.red.bgBlack(" " + (err.message.split("  ")[2]))));
      gutil.log(gutil.colors.black.bgRed(" FILE:", gutil.colors.red.bgBlack(" " + (err.message.split("\n")[0]))));
      gutil.log(gutil.colors.black.bgRed(" LINE:", gutil.colors.red.bgBlack(" " + err.line)));
      gutil.log(gutil.colors.black.bgRed(" COLUMN:", gutil.colors.red.bgBlack(" " + err.column)));
      gutil.log(gutil.colors.black.bgRed(" ERROR:", gutil.colors.red.bgBlack(" " + err.formatted.split("\n")[0])));
      notifier(err.message.split("\n")[0], { title: "LINE " + err.line });
      return this.emit("end");
    })
    .pipe(prefix(config.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.path.css))
    .pipe(browserSync.stream());
});

// -----------------------------------------------------------------------------
// CSS MINIFY -- https://www.npmjs.com/package/gulp-minify-css
// -----------------------------------------------------------------------------

gulp.task("css-minify", function() {
  gulp.src(config.path.css + "/*.css")
    .pipe(minifyCss({
      keepSpecialComments : false,
      advanced: false
    }))
    .pipe(gulp.dest(config.path.css));
});

// -----------------------------------------------------------------------------
// SCSS LINT -- https://www.npmjs.com/package/gulp-scss-lint
// -----------------------------------------------------------------------------

gulp.task("scss-lint", "Scans your SCSS files for errors", function() {
  gulp.src(config.path.scss + "/**/*.scss")
    .pipe(scsslint());
});

// -----------------------------------------------------------------------------
// BROWSERSYNC -- http://www.browsersync.io/docs/gulp/
// -----------------------------------------------------------------------------

gulp.task("browser-sync", "Set up a server with BrowserSync and test across devices", function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

// -----------------------------------------------------------------------------
// WATCH
// -----------------------------------------------------------------------------

gulp.task("watch", "Watches your SASS files", function() {
  gulp.watch(config.path.scss + "/**/*.scss", ["sass"]);
});

// -----------------------------------------------------------------------------
// SASSDOC
// -----------------------------------------------------------------------------

gulp.task("sassdoc", "Create the Scss documentation for your project", function() {
  return gulp.src("assets/scss/utils/**/*.scss")
    .pipe(sassdoc({
      dest: "sassdoc"
    }));
});

// -----------------------------------------------------------------------------
// DEFAULT TASK
// -----------------------------------------------------------------------------

gulp.task("default", gulpSequence(
    "help",
    "sass",
   // "css-minify",
    "scss-lint",
    "watch",
    "browser-sync"
  )
);
