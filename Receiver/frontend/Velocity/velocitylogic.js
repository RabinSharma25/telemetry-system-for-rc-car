let velocity =0;
let vel =0;

let noOfRotations =0;
const wheelRadius = 0.035 // m // 3.5 cm
const circumOfWheel = 0.219905; // 2*pi*r // 2*3.1415*0.035 = 0.219905 m



const socket = new WebSocket("ws://localhost:3000");
socket.addEventListener("message", (event) => {
  dataArray = event.data.split(',');
  console.log(dataArray);
  noOfRotations = parseFloat(dataArray[8]);
  velocity = circumOfWheel* noOfRotations/2 // m/s //// we are diving by 2 as the number of rotations are calculated every 2 sec.
  console.log("Velocity = ",velocity);
  vel=3.6*velocity; //km/hr conversion

  // Update the chart's series data with the new speed value
  const chart = Highcharts.charts[0];
  if (chart && chart.series && chart.series[0]) {
    const point = chart.series[0].points[0];
    if (point) {
      point.update(vel);
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
      max: 25,
      tickPixelInterval: 72,
      tickPosition: 'inside',
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
          distance: 5,
          style: {
              fontSize: '14px'
          }
      },
      lineWidth: 0,
      plotBands: [{
          from: 0,
          to: 5,
          color: '#55BF3B', // green
          thickness: 20
      }, {
          from: 5,
          to: 10,
          color: '#DDDF0D', // yellow
          thickness: 20
      }, {
        from: 10,
        to: 15,
        color: '#FFA500', // yellow
        thickness: 20
    },{
        from: 15,
        to: 20,
        color: '#FF8C00', // yellow
        thickness: 20
    },{
          from: 20,
          to: 25,
          color: '#DF5353', // red
          thickness: 20
      }]
  },

  series: [{
      name: 'Speed',
      data: [0],
      tooltip: {
          valueSuffix: 'km/h'
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