const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});
client.login(process.env.auth);
client.on('message', message => {
    if (message.type === "PINS_ADD" && message.author.bot === true) {
        message.delete();
    }else{
    	if (message.isMemberMentioned(client.user)){
    		message.react('👋');
    	}
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.pinned && reaction.count >= process.env.pin_trigger && reaction.emoji.name === '📌') {
        reaction.message.react('✅')
        reaction.message.pin();
    }
});
client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.count <= process.env.unpin_trigger && reaction.emoji.name === '📌') {
        var check = reaction.message.reactions.find(em => em.emoji.name === '✅');
        if (check !== null)
        	if (check.me) {
            	reaction.message.unpin();
            	check.remove();
        	}
    }
});
