const data = require('./zips.json');

module.exports.lookupByZipCode =  (zip) => {
	// console.log(`\nLookup by zip code (${zip})`);
    /* Use Array find method to find the zip code in the data */ 
    var by_zip = data.find(value => {
        return (value._id == zip);
    });
    return by_zip;
};

module.exports.lookupByCityState = (city, state) => {
    // console.log(`\nLookup by city (${city}, ${state})`);
    /* Filter data by city and state then map the value to return zip codes and populations */ 
    var city_data = data.filter(value => value.city == city && value.state == state)
                        .map(value => {return {zip: value._id, pop: value.pop} })

    var by_city = {
        city: city,
        state: state,
        data: city_data
    };

    return by_city;
};

module.exports.getPopulationByState = (state) => {
	// console.log(`\nGet Population by State (${state})`);
    /* Use reduce function to sum the total population */
    var state_pop = data.reduce((sum, value) => {
        /* Only add the population for given state */ 
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
};

