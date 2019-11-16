const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send('>>> **Доступ к каналу nsfw. Нажмите на смайлик.**').then(msg => {
        msg.react('🔞');
        let filter = (react, user) => react.emoji.name === '🔞' && user.id === message.author.id;
        let collector = msg.createReactionCollector(filter);
        let role = message.guild.roles.find(r => r.name === 'NSFW').id;
        collector.on('collect', () => {message.member.addRole(role)})
        })
};
module.exports.help = {
    name: "rolensfw"
};