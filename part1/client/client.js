const net = require('net');
const colors = require('colors');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readMessage = (client) => {
	rl.question("Enter Command: ",  (line) => {
			client.write(line);
			if (line == "bye")
				client.end();
			else {
				setTimeout(() => {
					readMessage(client);
				}, 2000);
			};
	});
};

const client = net.connect({port:3000},
	() => {
		console.log("Connected to server");
		readMessage(client);
	});

client.on('end', () => {
	console.log("Client disconnected...");
	return;
});


// HW Code - Write code below for 'data' event listener
client.on('data', data => {
	console.log("...Received\n", data.toString());
});




















	