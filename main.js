// Function to fetch CSV data
async function fetchCSVData(url) {
    const response = await fetch(url);
    const text = await response.text();
    const rows = text.split('\n').slice(1); // Skip the header row
    const data = rows.map(row => {
        const columns = row.split(',');
        return {
            label: columns[0].trim(), // Assuming the year is in the first column
            boys: parseFloat(columns[1]),
            girls: parseFloat(columns[2]),
            total: parseFloat(columns[3]),
            year: parseInt(columns[4])
        };
    });
    return data;
}

// URL to your CSV file
const csvURL = 'marge_18_to_22.csv';

// Fetch CSV data and create the initial chart
fetchCSVData(csvURL).then(data => {
    const years = [...new Set(data.map(item => item.year))];

    // Function to update chart based on selected year
    function updateChartByYear(selectedYear) {
        const selectedData = data.filter(item => item.year === selectedYear);
        const labels = selectedData.map(item => item.label);
        const boysData = selectedData.map(item => item.boys);
        const girlsData = selectedData.map(item => item.girls);

        if (myChart) {
            myChart.destroy(); // Destroy the previous chart if it exists
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Boys ${selectedYear}`,
                        data: boysData,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: `Girls ${selectedYear}`,
                        data: girlsData,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    let myChart; // Variable to hold the chart instance

    // Update chart based on button clicks
    document.getElementById('year2020Button').addEventListener('click', () => {
        updateChartByYear(2020);
    });

    document.getElementById('year2019Button').addEventListener('click', () => {
        updateChartByYear(2019);
    });

    document.getElementById('year2021Button').addEventListener('click', () => {
        updateChartByYear(2021);
    });

    document.getElementById('year2018Button').addEventListener('click', () => {
        updateChartByYear(2018);
    });

    // Initialize chart with default year
    updateChartByYear(years[0]);
});


// ==============================================================================
// sheet2
// ==============================================================================

async function fetchCSVData(url) {
    const response = await fetch(url);
    const text = await response.text();
    const rows = text.split('\n').slice(1); // Skip the header row
    const data = rows.map(row => {
        const columns = row.split(',');
        return {
            year: parseInt(columns[4]),
            boys: parseFloat(columns[1]),
            girls: parseFloat(columns[2]),
            total: parseInt(columns[3]),
        };
    });
    return data;
}

// URL to your CSV file
const csv = 'marge_18_to_22.csv';

// Fetch CSV data and create the chart
fetchCSVData(csv).then(data => {
    const years = [...new Set(data.map(item => item.year))];
    const boysData = years.map(year => data.filter(item => item.year === year).reduce((sum, item) => sum + item.boys, 0));
    const girlsData = years.map(year => data.filter(item => item.year === year).reduce((sum, item) => sum + item.girls, 0));
    const totalData = years.map(years => data.filter(item => item.year === years).reduce((sum, item) => sum + item.total, 0));
    const ctx = document.getElementById('sheet2').getContext('2d');
    const sheet2 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Boys',
                data: boysData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Girls',
                data: girlsData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }, {
                label: 'total',
                data: totalData,
                backgroundColor: 'rgba(6, 56, 2, 0.6)',
                borderColor: 'rgba(6, 56, 2, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});


//   ================================================================
//   sheet3
//   ================================================================

// Function to fetch CSV data
async function fetchCSVData(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

// URL to your CSV file
const csvdatafile = '10_12.csv';

// Fetch CSV data and create the chart
fetchCSVData(csvdatafile).then(csvData => {
    const parsedData = parseCSVData(csvData);

    const yearsToDisplay = [2018, 2019, 2020, 2021];

    const ctx = document.getElementById('sheet3').getContext('2d');

    const datasets = yearsToDisplay.map(year => {
        const yearData = parsedData.filter(item => item.year === year);
        return {
            label: year.toString(),
            data: yearData.map(item => [item.boys, item.girls, item.total]),
            backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`,
            borderWidth: 1,
            categoryPercentage: 1,  // Bars will touch each other closely
            barPercentage: 0.2,     // Adjust this value to control bar width
        };
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: parsedData.filter((item, index, self) => self.findIndex(i => i.label === item.label) === index).map(item => item.label), // Unique labels
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false  // Start the y-axis from zero
                },
                x: {
                    stacked: false
                }
            }
        }
    });
});

// Function to parse the CSV data
function parseCSVData(data) {
    const rows = data.trim().split('\n').slice(1); // Skip the header row
    return rows.map(row => {
        const columns = row.split(',');
        return {
            label: columns[0].trim(),
            boys: parseFloat(columns[1]),
            girls: parseFloat(columns[2]),
            total: parseFloat(columns[3]),
            year: parseInt(columns[4])
        };
    });
}

//   ================================================================
//   sheet4
//   ================================================================
async function fetchCSVData(url) {
    const response = await fetch(url);
    const text = await response.text();
    const rows = text.split('\n').slice(1); // Skip the header row
    const data = rows.map(row => {
        const columns = row.split(',');
        return {
            label: columns[0].trim(), // Assuming the year is in the first column
            boys: parseFloat(columns[1]),
            girls: parseFloat(columns[2]),
            total: parseFloat(columns[3]),
            year: parseInt(columns[4])
        };
    });
    return data;
}

// URL to your CSV file
const csvfile = '10_12.csv';

// Fetch CSV data and create the initial chart
fetchCSVData(csvfile).then(data => {
    const years = [...new Set(data.map(item => item.year))];

    // Function to update chart based on selected year
    function updateChartByYear(selectedYear) {
        const selectedData = data.filter(item => item.year === selectedYear);
        const labels = selectedData.map(item => item.label);
        const boysData = selectedData.map(item => item.boys);
        const girlsData = selectedData.map(item => item.girls);

        if (sheet4) {
            sheet4.destroy(); // Destroy the previous chart if it exists
        }

        const ctx = document.getElementById('sheet4').getContext('2d');
        sheet4 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Boys ${selectedYear}`,
                        data: boysData,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: `Girls ${selectedYear}`,
                        data: girlsData,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    let sheet4; // Variable to hold the chart instance

    // Update chart based on button clicks
    document.getElementById('year2020').addEventListener('click', () => {
        updateChartByYear(2020);
    });

    document.getElementById('year2019').addEventListener('click', () => {
        updateChartByYear(2019);
    });

    document.getElementById('year2021').addEventListener('click', () => {
        updateChartByYear(2021);
    });

    document.getElementById('year2018').addEventListener('click', () => {
        updateChartByYear(2018);
    });

    // Initialize chart with default year
    updateChartByYear(years[0]);
});

