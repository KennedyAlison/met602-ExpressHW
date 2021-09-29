const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', 
	handlebars({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Use the zipCode module
const cities = require('./zipCodeModule_v2');

// GET request to the homepage
app.get('/',  (req, res) => {
	res.render('homeView');
});

app.get('/zip', (req, res) => {
	if(req.query.id){
		const bodyData = cities.lookupByZipCode(req.query.id);
		res.render('lookupByZipView', {zip_data: bodyData});
	}else{
		res.render('lookupByZipForm');
	}
});

app.post('/zip', (req, res) => {
	const bodyData = cities.lookupByZipCode(req.body.id);
	res.render('lookupByZipView', {zip_data: bodyData});
});

// Implement the JSON, XML, & HTML formats

app.get('/zip/:id', (req, res) => {

	res.format({
		'application/json': () => {
			const bodyData = cities.lookupByZipCode(req.params.id);
			res.send(bodyData);
		},

		'application/xml': () => {
			const bodyData = cities.lookupByZipCode(req.params.id);
			let zipXml = 
				`<?xml version="1.0"?>\n<zipCode id="${bodyData._id}">\n` +
					`	<city> ${bodyData.city}</city>\n` + 
					`	<state> ${bodyData.state}</state>\n` +
					`	<pop> ${bodyData.pop}</pop>\n` +
					`</zipCode>`;
			res.type('application/xml');
			res.send(zipXml);
		},

		'text/html': () => {
			const bodyData = cities.lookupByZipCode(req.params.id);
			res.render('lookupByZipView', {zip_data: bodyData});
		},

		'default': () => {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	});
});


app.get('/city', (req, res) => {
	if(req.query.city && req.query.state){
		const bodyData = cities.lookupByCityState(req.query.city, req.query.state);
		res.render('lookupByCityStateView', {city_data: bodyData});
	}else{
		res.render('lookupByCityStateForm');
	}
});

app.post('/city', (req, res) => {
	const bodyData = cities.lookupByCityState(req.body.city, req.body.state);
	res.render('lookupByCityStateView', {city_data: bodyData});
});

// Implement the JSON, XML, & HTML formats

app.get('/city/:city/state/:state', (req, res) => {
	res.format({
		'application/json': () => {
			const bodyData = cities.lookupByCityState(req.params.city, req.params.state);
			res.send(bodyData);
		},

		'application/xml': () => {
			const bodyData = cities.lookupByCityState(req.params.city, req.params.state);
			let cityXml = 
				`<?xml version="1.0"?>\n<city-state city="${bodyData.city} state="${bodyData.state}">\n` +
				cities.lookupByCityState(req.params.city, req.params.state).data.map((c) => {
					return `	<entry zip="${c.zip}" pop="${c.pop}" />`
				}).join('\n') + '\n</city-state>\n';
			res.type('application/xml');
			res.send(cityXml);
		},

		'text/html': () => {
			const bodyData = cities.lookupByCityState(req.params.city, req.params.state);
			res.render('lookupByCityStateView', {city_data: bodyData});
		},

		'default': () => {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	});

});



app.get('/pop', (req, res) => {
	if(req.query.state){
		const bodyData = cities.getPopulationByState(req.query.state);
		res.render('populationView', {pop_data: bodyData});
	}else{
		res.render('populationForm');
	}
});

// Implement the JSON, XML, & HTML formats

app.get('/pop/:state', (req, res) => {
	res.format({
		'application/json': () => {
			const bodyData = cities.getPopulationByState(req.params.state);
			res.send(bodyData);
		},

		'application/xml': () => {
			const bodyData = cities.getPopulationByState(req.params.state);
			let popXml = 
				`<?xml version="1.0"?>\n<state-pop state="${bodyData.state}">\n` +
					`	<pop> ${bodyData.pop}</pop>\n` +
					`</state-pop>`;
			res.type('application/xml');
			res.send(popXml);
		},

		'text/html': () => {
			const bodyData = cities.getPopulationByState(req.params.state);
			res.render('populationView', {pop_data: bodyData});
		},

		'default': () => {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	});

});


app.use((req, res) => {
	res.status(404);
	res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});




