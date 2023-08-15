// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

let dataArray;
var socketIO = io();
let long;
let lati;
let delay = 10;
let lastUpdate = new Date();

lastUpdate.setSeconds(lastUpdate.getSeconds() - (delay + 1));
socketIO.on("message", async (mess) => {
	dataArray = mess.split(',');
	let diff = (Math.floor((new Date().getTime()) - (lastUpdate.getTime()))) / 1000;

	if (diff > delay) {
		long = parseFloat(dataArray[3]);
		lati = parseFloat(dataArray[4]);
		console.log(long, lati);
		lastUpdate = new Date();


		mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoMjAyMyIsImEiOiJjbGwzeG9vcjUwMHplM21tZWwxcGowcjBiIn0.19apdWmAwoXWbrkf3NBKsA';

		const map = new mapboxgl.Map({
			container: 'map', // container ID
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'mapbox://styles/mapbox/streets-v12', // style URL
			center: [long, lati], // starting position [lng, lat]
			zoom: 9 // starting zoom
		});
		const geojson = {
			type: 'FeatureCollection',
			features: [{
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [long, lati]
				},
				properties: {
					title: 'Mapbox',
					description: 'Sikkim'
				}
			}

			]
		};

		for (const feature of geojson.features) {
			const el = document.createElement('div');
			el.className = 'marker';
			new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
		}
	}
});






