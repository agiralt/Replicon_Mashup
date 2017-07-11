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
            "qHyperCubeDef": {  
                "qDimensions": [{  
                    "qDef": {  
                        "qFieldDefs": ["Month"],
                        "qSortCriterias": [{
                            "qSortByAscii": 1
                        }] 
                    }  
                 }],  
                "qMeasures": [{  
                    "qDef": {  
                        "qDef": "Sum({$<_R6 = {1}, _BillHours = {1}>} [Cost/day])",  
                        "qLabel": "Cost last 6 months"   
                     }  
                 }],  
                "qInitialDataFetch": [{  
                    "qWidth": 2,
                    "qHeight": 12  
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
            "qHyperCubeDef": {  
                "qDimensions": [{  
                    "qDef": {  
                        "qFieldDefs": ["Month"],
                        "qSortCriterias": [{
                            "qSortByAscii": 1
                        }] 
                    }  
                 }],  
                "qMeasures": [{  
                    "qDef": {  
                        "qDef": "Sum({$<_R6 = {1}, _BillHours = {1}>} [Charge/day])",  
                        "qLabel": "Revenue last 6 months"   
                     }  
                 }],  
                "qInitialDataFetch": [{  
                    "qWidth": 2  ,
                    "qHeight": 12                
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
            "qHyperCubeDef": {  
                "qDimensions": [{  
                    "qDef": {  
                        "qFieldDefs": ["Month"],
                        "qSortCriterias": [{
                            "qSortByAscii": 1
                        }]
                    }  
                 }],  
                "qMeasures": [{  
                    "qDef": {  
                        "qDef": "Sum({$<_R6 = {1}, _BillHours = {1}>} [Charge/day] - [Cost/day])",  
                        "qLabel": "Profit last 6 months"   
                     }  
                 }],  
                "qInitialDataFetch": [{  
                    "qWidth": 2,
                    "qHeight": 12 
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

    // Margin bar chart
    app.visualization.create(
        'barchart',[],
        {
            "qHyperCubeDef": {
                //new
                "qStateName": "$",
                //
                "qDimensions": [{ 
                    //new
                    "qLibraryId": "",
                    "qNullSuppression": false,
                    "qIncludeElemValue": false,
                    //
                    "qDef": { 
                        //new
                        "qGrouping": "N",
                        // 
                        "qFieldDefs": ["Consultant"],
                        "qSortCriterias": [{
                            "qSortByState": 0,
                            "qSortByFrequency": 0,
                            "qSortByNumeric": 1,
                            "qSortByAscii": 0,
                            "qSortByLoadOrder": 0,
                            "qSortByExpression": 0,
                            "qExpression": {
                                "qv": ""
                            }
                        }]
                    }
                }],  
                "qMeasures": [{  
                    "qDef": {
                        //new
                        "qGrouping": "N",
                        //  
                        "qDef": "Sum({$<_R6 = {1}, _BillHours = {1}>} [Charge/day] - [Cost/day]) / Sum({$<_R6 = {1}, _BillHours = {1}>} [Charge/day])",  
                        "qLabel": "Margin last 6 months",
                        "qNumFormat" : {
                            "qType" : "I",
                            "qnDec" : 0,
                            "qUseThou" : 0,
                            "qFmt" : "#,##0%",
                            "qDec" : ".",
                            "qThou": ","
					    },
                    },
                    //new
                     "qLibraryId": "",
                     //
                    "qSortBy": {
                        "qSortByState": 0,
                        "qSortByFrequency": 0,
                        "qSortByNumeric": 1,
                        "qSortByAscii": 0,
                        "qSortByLoadOrder": 0,
                        "qSortByExpression": 0,
                        "qExpression": {
                            "qv": ""
                        }
                    },
                }],
                "qInterColumnSortOrder": [1,0],  
                "qInitialDataFetch": [{
                    "qTop": 0,
                    "qLeft": 0,  
                    "qHeight": 12,   
                    "qWidth": 2  
                }]
            },
            "orientation": "horizontal",
            "dataPoint": {
                "showLabels": true
            },
            "color": {
                "auto": false,
                 "paletteColor": {
                    "index": 5
                }
            },
            "measureAxis": {
                "show": "labels"
            },

            "title": "Margin by Consultant"
        }
    ).then(function(vis){
        vis.show("MarginBarChart");
    });

    // Margin Distribution chart
    /*app.visualization.create(
        'distributionplot',
        ["Consultant","Project","=Sum({$<_R6 = {1}, _BillHours = {1}>} [Charge/day] - [Cost/day]) / Sum({$<_R6 = {1}, _BillHours = {1}>} [Charge/day])"],
        {
            "title": "Margin by Project and Consultant"
        }
    ).then(function(vis){
        vis.show("MarginDistChart");
    });*/

    // Load Distribution chart
    app.getObject("MarginDistChart","xffeC");


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
        vis.show("KPI1",{noSelections: false});
    });

    // Load Current Selections object
    app.getObject("currSelections","CurrentSelections");

});
