import * as gulp from 'gulp';
import * as changed from 'gulp-changed';
import * as project from '../aurelia.json';
import * as merge from 'merge-stream';

export default function copyBootStrap() {
  let fonts = gulp.src(project.paths.bootstrapRoot + "/fonts/*").pipe(gulp.dest("fonts"));
  let css = gulp.src(project.paths.bootstrapRoot + "/css/bootstrap.min.css").pipe(gulp.dest("css"));

  return merge(fonts, css);
}

