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

    // Open app here
    var app = qlik.openApp("Replicon Dashboard.qvf",config);
    console.log(app);

    // Load Distribution chart
    app.getObject("DistChart","xffeC");

    // create new visualisation
    app.visualization.create(
        'kpi',
        // Able to modify the label/title
        //[{"qDef" : { "qDef" : "=Sum([Total Hrs])", "qLabel" : "Total Hours" }},],
        ["=Sum([Total Hrs])"],
        {
            "showTitles" : false,
            "title" : "Total Hours",
            "showMeasureTitle" : true,
            "measureTitles" : "Hola",
            "textAlign" : "left"
        }
    ).then(function(vis){
        vis.show("KPI1");
    });

    // Load Current Selections object
    app.getObject("currSelections","CurrentSelections");

});
