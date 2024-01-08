let iTargetSpeed = 0;

const socket = new WebSocket("ws://localhost:3000");
socket.addEventListener("message", (event) => {
  dataArray = event.data.split(',');
  console.log(dataArray);
  iTargetSpeed = parseFloat(dataArray[8]);

  // Update the chart's series data with the new speed value
  const chart = Highcharts.charts[0];
  if (chart && chart.series && chart.series[0]) {
    const point = chart.series[0].points[0];
    if (point) {
      point.update(iTargetSpeed);
    }
  }
});

Highcharts.chart('container', {

  chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '80%'
  },

  title: {
      text: 'Speedometer'
  },

  pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ['50%', '75%'],
      size: '110%'
  },

  // the value axis
  yAxis: {
      min: 0,
      max: 100,
      tickPixelInterval: 72,
      tickPosition: 'inside',
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
          distance: 10,
          style: {
              fontSize: '14px'
          }
      },
      lineWidth: 0,
      plotBands: [{
          from: 0,
          to: 40,
          color: '#55BF3B', // green
          thickness: 20
      }, {
          from: 40,
          to: 70,
          color: '#DDDF0D', // yellow
          thickness: 20
      }, {
          from: 60,
          to: 100,
          color: '#DF5353', // red
          thickness: 20
      }]
  },

  series: [{
      name: 'Speed',
      data: [90],
      tooltip: {
          valueSuffix: ' km/h'
      },
      dataLabels: {
          format: '{y} km/h',
          borderWidth: 0,
          color: (
              Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color
          ) || '#333333',
          style: {
              fontSize: '16px'
          }
      },
      dial: {
          radius: '80%',
          backgroundColor: 'gray',
          baseWidth: 12,
          baseLength: '0%',
          rearLength: '0%'
      },
      pivot: {
          backgroundColor: 'gray',
          radius: 6
      }

  }]

});
// document.getElementById('fullscreen').addEventListener('click', function () {
//     chart.fullscreen.open();
// });
