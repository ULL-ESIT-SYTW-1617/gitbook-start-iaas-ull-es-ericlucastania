var gulp = require("gulp");  
    
gulp.task('deploy-iaas',function(){
  var iaas = require ("gitbook-start-plugin-iaas-ull-es-ericlucastania");
  iaas.deploy();
});