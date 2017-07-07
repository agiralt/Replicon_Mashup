var config = {
    host: "localhost",
    prefix: "/",
    port: 4848,
    isSecure: false
};

require.config({
    baseUrl: ( config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port:"") + config.prefix + "resources"
});

require( ["js/qlik"], function ( qlik ) {
    qlik.setOnError(function(error) {
        console.log(error.message);
    });
    console.log(qlik);

    //Open app here
    var app = qlik.openApp("Replicon Dashboard.qvf",config);
    console.log(app);

    app.getObject("DistChart","xffeC");

    // current selections object
    app.getObject("currSelections","CurrentSelections");
});
