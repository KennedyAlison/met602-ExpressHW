const net = require('net');

const colors = require('colors');

const cities = require('./zipCodeModule_v2');

const server = net.createServer((socket) => {

	console.log("Client connection...".red);

	socket.on('end', () => {
		console.log("Client disconnected...".red);
	});

	// HW Code - Write the following code to process data from client
	
	socket.on('data', (data) => {

		let input = data.toString();
		console.log(colors.blue('...Received %s'), input);

		// Split the data inputs input by the client 
		var data_inputs = input.split(',');

		// Use first data input to determine the function call and second data input as the variables
		if(data_inputs[0] == "lookupByZipCode"){
			result = cities.lookupByZipCode(data_inputs[1]);
		}else if(data_inputs[0] == "lookupByCityState"){
			result = cities.lookupByCityState(data_inputs[1],data_inputs[2]);
		} else if(data_inputs[0] == "getPopulationByState"){
			result = cities.getPopulationByState(data_inputs[1]);
		}else{
			result = "Invalid request"
		}
		
		// Write the result back to the client 

		// Check if result is undefined before stringifying
		if(result != undefined){
			socket.write(JSON.stringify(result));
		}else{
			socket.write("undefined");
		}
		
		
	});

});

// listen for client connections
server.listen(3000, () => {
	console.log("Listening for connections on port 3000");
});
