// Function to build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the metadata field
    let metadata = data.metadata.filter(obj => obj.id == sample)[0];
    console.log(metadata); // Debugging: Log the metadata to ensure it's correct

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    // Clear any existing metadata
    metadataPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// Function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the samples field
    let sampleData = data.samples.filter(obj => obj.id == sample)[0];

    // Get the top 10 sample_values, otu_ids, and otu_labels
    let sampleValues = sampleData.sample_values.slice(0, 10).reverse();
    let otuIDs = sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    let otuLabels = sampleData.otu_labels.slice(0, 10).reverse();

    // Create the trace for the bar chart
    let barTrace = {
      x: sampleValues,
      y: otuIDs,
      text: otuLabels,
      type: "bar",
      orientation: "h",
    };

    // Create the layout for the bar chart
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 },
    };

    // Render the bar chart using Plotly
    Plotly.newPlot("bar", [barTrace], barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the names field
    let sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    sampleNames.forEach((sample) => {
      dropdown.append("option").text(sample).property("value", sample);
    });

    // Get the first sample from the list
    let firstSample = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
