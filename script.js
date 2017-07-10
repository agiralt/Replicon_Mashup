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

    // Create top three line charts
    // Cost
    app.visualization.create(
        'linechart',[],
        {
            qHyperCubeDef: {  
                qDimensions: [{  
                    qDef: {  
                        qFieldDefs: ["Month"],
                        qSortCriterias: [{
                            qSortByAscii: 1
                        }] 
                    }  
                 }],  
                qMeasures: [{  
                    qDef: {  
                        qDef: "Sum({$<_R6 = {1}, _BillHours = {1}>} [Cost/day])",  
                        qLabel: "Cost last 6 months"   
                     }  
                 }],  
                qInitialDataFetch: [{  
                    qHeight: 12,   
                    qWidth: 2  
                }]
            },
            "dataPoint": {
                "show": true,
                "showLabels": false
            },
            /*"gridLine": {
                "auto": true
                "spacing": 2
            },*/
            "color": {
                "auto": false,
                // singlecolor doesn't work !
                //"singleColor": 6,
                "paletteColor": {
                    "index": 10
                }
            },
            "dimensionAxis": {
                "show": "none"
            },
            "measureAxis": {
                "show": "labels"
            },
            "title": "Cost over time"
        }
    ).then(function(vis){
        vis.show("LineTop1");    
    });

    // Revenue
    app.visualization.create(
        'linechart',
        [],
        {
            qHyperCubeDef: {  
                qDimensions: [{  
                    qDef: {  
                        qFieldDefs: ["Month"],
                        qSortCriterias: [{
                            qSortByAscii: 1
                        }] 
                    }  
                 }],  
                qMeasures: [{  
                    qDef: {  
                        qDef: "Sum({$<_R6 = {1}, _BillHours = {1}>} [Charge/day])",  
                        qLabel: "Revenue last 6 months"   
                     }  
                 }],  
                qInitialDataFetch: [{  
                    qHeight: 12,   
                    qWidth: 2  
                }]
            },
            "dataPoint": {
                "show": true,
                "showLabels": false
            },
            /*"gridLine": {
                "auto": false,
                "spacing": 2
            },*/
            "color": {
                "auto": false,
                // singlecolor doesn't work !
                //"singleColor": 6,
                "paletteColor": {
                    "index": 6
                }
            },
            "dimensionAxis": {
                "show": "none"
            },
            "measureAxis": {
                "show": "labels"
            },
            "title": "Revenue over time"
        }
    ).then(function(vis){
        vis.show("LineTop2");    
    });

    // Profit
    app.visualization.create(
        'linechart',
        [],
        {
            qHyperCubeDef: {  
                qDimensions: [{  
                    qDef: {  
                        qFieldDefs: ["Month"],
                        qSortCriterias: [{
                            qSortByAscii: 1
                        }] 
                    }  
                 }],  
                qMeasures: [{  
                    qDef: {  
                        qDef: "Sum({$<_R6 = {1}, _BillHours = {1}>} [Charge/day] - [Cost/day])",  
                        qLabel: "Profit last 6 months"   
                     }  
                 }],  
                qInitialDataFetch: [{  
                    qHeight: 12,   
                    qWidth: 2  
                }]
            },

            "dataPoint": {
                "show": true,
                "showLabels": false
            },
            /*"gridLine": {
                "auto": false,
                "spacing": 2
            },*/
            "color": {
                "auto": false,
                // singlecolor doesn't work !
                //"singleColor": 6,
                "paletteColor": {
                    "index": 2
                }
            },
            "dimensionAxis": {
                "show": "none"
            },
            "measureAxis": {
                "show": "labels"
            },
            "title": "Profit over time"
        }
    ).then(function(vis){
        vis.show("LineTop3");    
    });


    // Load Distribution chart
    app.getObject("DistChart","xffeC");

    // create new visualisation
    app.visualization.create(
        'kpi',
        // Able to modify the label/title
        [{"qDef" : { "qDef" : "=Sum([Total Hrs])", "qLabel" : "Total Hours" }},],
        //["=Sum([Total Hrs])"],
        {
            //"showTitles" : true,
            //"title" : "Total Hours",
            "showMeasureTitle" : true,
            "textAlign" : "left",
            "fontSize" : "S"
        }
    ).then(function(vis){
        vis.show("KPI1");
    });

    // Load Current Selections object
    app.getObject("currSelections","CurrentSelections");

});
