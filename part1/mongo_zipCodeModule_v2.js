const MongoClient = require('mongodb').MongoClient;
const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let client = null;

const getConnection = async () => {
	if (client == null)
		client = await MongoClient.connect(dbUrl,  { useNewUrlParser: true ,  useUnifiedTopology: true });
	return client;
}

module.exports.lookupByZipCode =  async (zip) => {
		
	let client = await getConnection();
	let collection = client.db(credentials.database).collection('zipcodes');
	
	let result = await collection.find({'_id': zip}).toArray();
	
	if (result.length > 0)
		return result[0];
	else
		return undefined;
};

module.exports.lookupByCityState = async (city, state) => {

	// Ensure text formatting matches data storage format
	if(city && state){
		city = city.toUpperCase();
		state = state.toUpperCase();
	}

	let client = await getConnection();
	let collection = client.db(credentials.database).collection('zipcodes');

	// Get the data corresponding to city and state 
	let result = await collection.find({'city': city, 'state': state}).toArray();

	// If a result is found, return corresponding data
	if(result.length > 0){

		// Filter data by city and state then map the value to return zip codes and populations 
		city_data = result.filter(value => value.city == city && value.state == state)
                        .map(value => {return {zip: value._id, pop: value.pop} })

		var by_city = {
			city: city,
			state: state,
			data: city_data
		};

		return by_city;

	}else{
		return undefined
	}

};

module.exports.getPopulationByState = 
	async (state) => {
	
		// Ensure text formatting matches data storage format
		if(state){
			state = state.toUpperCase();
		}

		let client = await getConnection();
		let collection = client.db(credentials.database).collection('zipcodes');

		// Get the data corresponding to the state entered
		let result = await collection.find({'state': state}).toArray();

		// If a result is found, return corresponding data
		if(result.length > 0){

			// Use reduce function to sum the total population
			var state_pop = result.reduce((sum, value) => {
				// Only add the population for given state 
				if(value.state === state){
					return (sum + value.pop);
				}
				return sum;
			}, 0);
		
			var by_state = {
				state: state,
				pop: state_pop
			};
			return by_state;
		}else{
			return undefined
		}
		
	};

