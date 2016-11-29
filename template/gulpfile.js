

gulp.task('deploy-iaas',['build'],function(){
  var iaas = require ("gitbook-start-plugin-iaas-ull-es-ericlucastania");
  iaas.deploy();
});//finish deploy-iaas