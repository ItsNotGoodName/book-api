const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
require('dotenv').config()
//https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e#gistcomment-2795936
gulp.task("nodemon", cb => {
  let started = false;

  return nodemon({
    script: "app.js"
  }).on("start", () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});