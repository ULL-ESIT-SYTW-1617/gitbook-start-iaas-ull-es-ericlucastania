var gulp = require("gulp");  
var shell = require('gulp-shell');
    
gulp.task('deploy-iaas',function(){
  var iaas = require ("gitbook-start-plugin-iaas-ull-es-ericlucastania");
  iaas.deploy();
});