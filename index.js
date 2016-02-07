const login = require("facebook-chat-api");
const hangoutsBot = require("hangouts-bot");
const config = require("./config");

var HangoutID;
var verify = Math.random().toString(36).slice(-5);

// Create simple echo bot 
login(config.messenger, (err, api) => {
    if (err) return console.error(err);

    const hangBot = new hangoutsBot(config.hangouts.email, config.hangouts.password);

	hangBot.on('online', () => {
		console.log(`Verify Token is ${verify}`)
	});
 
	hangBot.on('message', (from, message) => {
		if (message.startsWith('/verify')) {
			if (verify && (verify == message.replace('/verify ', ''))) {
				HangoutID = from;
				hangBot.sendMessage(from, 'User Verified');
				verify = false;
			} else {
				hangBot.sendMessage(from, 'Verification Failed');
			}
		} else if (HangoutID == from) {
			if (message.startsWith('/send')) {
				message = message.replace('/send ', '')
				message = message.split(' ')
				var id = message[0];
				message = message.slice(1).join(' ');
				api.sendMessage({body: message}, id);
			} else if (message.startsWith('/list')) {
				api.getFriendsList((err, data) => {
					if (err) return console.error(err);
					var mess = ''
					data.forEach((el, i, arr) => {
						mess += `${el.fullName} - ${el.userID}\n`
					});
					hangBot.sendMessage(from, mess);
				});
			}
		}
	});

    api.listen((err, message) => {
    	hangBot.sendMessage(HangoutID, `${message.senderName} - ${message.body}`);
    });
});