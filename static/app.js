console.log("app.js loaded");

// Set up stub functions for each chart
// Structure below drawn from Dom's example during office hours after class April 17
function DrawBarGraph(name) {
    console.log("Draw bargraph for " + name);
    console.log(`Draw bargraph for ${name}`);
    d3.json("static/samples.json").then(data => {
        // console.log(data);

        // Get access to data for the name given
        var samples = data.samples;
        // console.log(samples);

        var sampleDataRaw = samples.filter(samples => samples.id == name);
        var sampleData = sampleDataRaw[0];
        // console.log(sampleData);

        // Get otu_ids and labels (for hover text), and sample_values to plot
        var otu_ids = sampleData.otu_ids;
        var otu_labels = sampleData.otu_labels;
        var sample_values = sampleData.sample_values;
        // console.log(sample_values);

        // Set yticks to top ten bacteria
        yticks = otu_ids.slice(0, 10).map(otu_id => 'OTU ' + otu_id).reverse();

        // Declare the top ten bacteria data for the bar chart
        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        };

        // Convert barData to array
        var barArray = [barData];

        // Establish layout
        var barlayout = {
            title: "Top Ten Belly Button Bacteria Cultures Found",
        };

        // Call plot
        Plotly.newPlot("bar", barArray, barlayout);

    });
};

function DrawBubbleChart(name) {
    console.log("Draw bubble chart for " + name);
    d3.json("static/samples.json").then(data => {
        // console.log(data);

        // Get access to data for the name given
        var samples = data.samples;
        // console.log(samples);

        var sampleDataRaw = samples.filter(samples => samples.id == name);
        var sampleData = sampleDataRaw[0];
        // console.log(sampleData);

        // Get otu_ids and labels (for hover text), and sample_values to plot
        var otu_ids = sampleData.otu_ids;
        var otu_labels = sampleData.otu_labels;
        var sample_values = sampleData.sample_values;
        // console.log(sample_values);

        // Declare the top ten bacteria data for the bar chart
        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };

        // Convert barData to array
        var bubbleArray = [bubbleData];

        // Establish layout
        var bubblelayout = {
            showlegend: false,
            width: 1000,
        };

        // Call plot
        Plotly.newPlot("bubble", bubbleArray, bubblelayout);

    });

};


function ShowMetaData(name) {
    console.log("Show metadata for " + name)

    d3.json("static/samples.json").then(data => {
        console.log(data);

        // data.forEach(function(bellyButtonSample) {
        //     console.log(bellyButtonSample);
        // });

        // Get access to data for the name given
        var metadata = data.metadata;
        // console.log(metadata);

        var metadataRaw = metadata.filter(metadata => metadata.id = name);
        // console.log(metadataRaw);
         
        var workingMetadata = metadataRaw[0];
        console.log(workingMetadata);

        d3.select("#sample-metadata").text("This is a test");

        var datapanel = d3.select("#sample-metadata");
        datapanel.html("");
        Object.entries(workingMetadata).forEach(([key, value]) => {
            datapanel.append("p").text(key + ": " + value);
            // datapanel.append("p").text(key + ": " value);
        });


    });

};

function optionChanged(newName) {
    console.log('User selected ' + newName);

    DrawBarGraph(newName);
    DrawBubbleChart(newName);
    ShowMetaData(newName);

};


// Set up default display
// Initial structure derived from office hours demo with Dom on April 17
function defaultDisplay() {
    console.log("defaultDisplay")
    
    // Populate dropdown with options
    var selector = d3.select("#selDataset");

    // Read in the data
    d3.json("static/samples.json").then(data => {
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

