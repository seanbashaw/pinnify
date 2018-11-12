const Discord = require('discord.js');
const client = new Discord.Client();
client.once('ready', () => {
    console.log('Ready!');
});
client.login(/*Insert Authentication Token Here*/);
client.on('message', message => {
    if (message.type === "PINS_ADD" && message.author.bot === true) {
        message.delete();
    }
});
client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.pinned && reaction.count >= 4 && reaction.emoji.name === '📌') {
        console.log("SUCCESS!");
        reaction.message.react('✔️')
        reaction.message.pin();
    }
});
client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.count < 4 && reaction.emoji.name === '📌') {
        var check = reaction.message.reactions.find(em => em.emoji.name === '✔️');
        if (check.me) {
            reaction.message.unpin();
            check.remove();
        }
    }
});