document.addEventListener("DOMContentLoaded", function () {
    const totalIncomeData = [
        {
            name: "Total Income",
            data: [
                120000, 310000, 120500, 105000, 200000, 340000, 300000, 200000, 140500,
                231500, 280000, 430000,
            ],
        },
    ];

    const installmentalRentData = [
        {
            name: "Installmental Rent",
            data: [
                110500, 200000, 180000, 195000, 220000, 250000, 400000, 450000, 620000,
                435000, 550000, 570000,
            ],
        },
    ];

    const annualRentData = [
        {
            name: "Annual Rent",
            data: [240000, 283000, 120500, 105000, 200000],
        },
    ];

    let activeControl = "TI";

    function chartDataChangeHandler(change) {
        activeControl = change;
        document.querySelectorAll(".control").forEach((el) => {
            el.classList.remove("controlActive");
        });
        document.getElementById(change).classList.add("controlActive");
        updateTotal();
        updateChart();
    }

    function updateTotal() {
        let total = 0;
        let data;
        if (activeControl === "TI") data = totalIncomeData[0].data;
        else if (activeControl === "IR") data = installmentalRentData[0].data;
        else if (activeControl === "AR") data = annualRentData[0].data;
        total = data.reduce((acc, cur) => acc + cur, 0);
        const totalIncomeElement = document.getElementById("totalIncome");
        const installmentalRentElement = document.getElementById("installmentalRent");
        const annualRentElement = document.getElementById("annualRent");
        if (totalIncomeElement && installmentalRentElement && annualRentElement) {
            totalIncomeElement.innerText = total.toLocaleString();
            if (activeControl === "TI") {
                installmentalRentElement.innerText = installmentalRentData[0].data.reduce((acc, cur) => acc + cur, 0).toLocaleString();
                annualRentElement.innerText = annualRentData[0].data.reduce((acc, cur) => acc + cur, 0).toLocaleString();
            } else if (activeControl === "IR") {
                installmentalRentElement.innerText = total.toLocaleString();
                annualRentElement.innerText = annualRentData[0].data.reduce((acc, cur) => acc + cur, 0).toLocaleString();
            } else if (activeControl === "AR") {
                installmentalRentElement.innerText = installmentalRentData[0].data.reduce((acc, cur) => acc + cur, 0).toLocaleString();
                annualRentElement.innerText = total.toLocaleString();
            }
        }
    }
    

    // Define the chart container templat 

    // Initialize the total and chart
    updateTotal()

});


var options = {
    series: [{
        name: "Total Income",
        data: [
            120000, 310000, 120500, 105000, 200000, 340000, 300000, 200000, 140500,
            231500, 280000, 430000,
        ]
    },
    {
        name: "Installmental Rent",
        data: [
            110500, 200000, 180000, 195000, 220000, 250000, 400000, 450000, 620000,
            435000, 550000, 570000,
        ]
    },
    {
        name: "Annual Rent",
        data: [240000, 283000, 120500, 105000, 200000]
    }
  ],
    chart: {
    height: 300,
    type: 'line',
    zoom: {
      enabled: false
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: [2, 4, 3],
    curve: 'straight',
    dashArray: [0, 8, 5]
  },
  title: {
    text: 'Rent Statistics',
    align: 'left'
  },
  legend: {
    tooltipHoverFormatter: function(val, opts) {
      return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
    }
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6
    }
  },
  xaxis: {
    categories: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022',
        '2023', '2024'
    ],
},
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val + " (mins)"
          }
        }
      },
      {
        title: {
          formatter: function (val) {
            return val + " per session"
          }
        }
      },
      {
        title: {
          formatter: function (val) {
            return val;
          }
        }
      }
    ]
  },
  grid: {
    borderColor: '#f1f1f1',
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();


