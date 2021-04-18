console.log("app.js loaded");


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
    });
};

defaultDisplay();

