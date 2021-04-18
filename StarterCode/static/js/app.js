console.log("app.js loaded");

// Set up stub functions for each chart

function DrawBarGraph() {
    console.log("Draw barchart")
};

function DrawBubbleChart() {
    console.log("Draw bubble chart")
};

function ShowMetaData() {
    console.log("Show metadata")
};




// Set up default display
function defaultDisplay() {
    console.log("defaultDisplay")
    
    // Populate dropdown with options
    var selector = d3.select("#selDataset");

    // Read in the data
    d3.json("samples.json").then(function(data) {
        console.log(data);

        var sampleNames = data.names;

        console.log(sampleNames)

        sampleNames.forEach(name => {
            selector.append("option")
                .text(name)
                .property("value", name)
        });

        // Set up default sample name
        var defaultID = sampleNames[0];
        console.log(defaultID)
    });

    // Set up default bargraph
    DrawBarGraph();

    // Set up default bubblechart
    DrawBubbleChart();

    // Set up default metadata
    ShowMetaData();

};

defaultDisplay();

