//引入gulp
var gulp = require("gulp");

//引入rename插件
var rename = require("gulp-rename");

//引入uglify插件
var uglify = require("gulp-uglify");

//引入压缩css插件
var css = require("gulp-clean-css");

//引入less插件
var less = require("gulp-less");

//引入linereload插件
var linereload = require("gulp-livereload");

//引入压缩图片插件
var minImg = require("gulp-imagemin");

//任务1、编译less
gulp.task("less",function(){
    gulp.src("less/*.less")
    .pipe(less())
    .pipe(gulp.dest("./css"));
})
//任务2、 压缩css文件
gulp.task("css",["less"],function(){
    setTimeout(function(){
        gulp.src("css/*.css")
        .pipe(css())
        .pipe(rename({
            suffix:".min"
        }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(linereload())
    },500)
})
//任务3、压缩自己的js文件
gulp.task("js",function(){
    gulp.src("scripts/*.js")
    .pipe(uglify())
    .pipe(rename({
        suffix:".min"
    }))
    .pipe(gulp.dest("./dist/js"))
    .pipe(linereload())
})

//任务4、压缩图片
gulp.task("img",function(){
    gulp.src("./images/*.jpg")
    .pipe(minImg())
    .pipe(gulp.dest("./dist/images"))
    .pipe(linereload())
})

//任务5、页面结构变化任务
/* gulp.task("index",function(){
    gulp.src("./*.html")
    .pipe(gulp.dest("./"))
    .pipe(linereload())
}) */

//任务6、观察者任务
gulp.task("watch",function(){
    //1.监听less编译任务
    linereload.listen();
    gulp.watch("less/*.less",["css"]);
    //2.监听js压缩任务
    linereload.listen();
    gulp.watch("scripts/*.js",["js"]);
    //3.监听图片压缩任务
    linereload.listen();
    gulp.watch("images/*.jpg",["img"]);
    //4.监听页面变化任务
   /*  linereload.listen();
    gulp.watch("./*.html",["index"]); */

})