console.log("app.js loaded");

// Read in the data
d3.json("samples.json").then((data) => {
    console.log(data);
});