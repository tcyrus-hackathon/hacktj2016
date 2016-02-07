const login = require("facebook-chat-api");
const hangoutsBot = require("hangouts-bot");
const config = require("./config");

var HangoutID;

// Create simple echo bot 
login(config.messenger, (err, api) => {
    if (err) return console.error(err);

    const hangBot = new hangoutsBot(config.hangouts.email, config.hangouts.password);

	hangBot.on('online', () => {
		console.log('online');
	});
 
	hangBot.on('message', (from, message) => {
		if (message == "I AM ROOT") HangoutID = from;
		else {
			message = message.split(': ');
			var id = message[0];
			message = message.slice(1).join(': ');
			//id = 100001947199415;
			api.sendMessage({body: message}, id);
		}
	});

    api.listen((err, message) => {
    	hangBot.sendMessage(HangoutID, `${message.senderID}: ${message.body}`);
    });
});