console.log("app.js loaded");

// Set up stub functions for each chart

function DrawBarGraph(name) {
    console.log("Draw bargraph for " + name);
    // data = [{
    //     x: name.
    // }]
};

function DrawBubbleChart(name) {
    console.log("Draw bubble chart for " + name)
};

function ShowMetaData(name) {
    console.log("Show metadata for " + name)
};

function optionChanged(newName) {
    console.log('User selected ' + newName);

    DrawBarGraph(newName);
    DrawBubbleChart(newName);
    ShowMetaData(newName);

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

        // Set up default bargraph
        DrawBarGraph(defaultID);

        // Set up default bubblechart
        DrawBubbleChart(defaultID);

        // Set up default metadata
        ShowMetaData(defaultID);
        });

};

defaultDisplay();

