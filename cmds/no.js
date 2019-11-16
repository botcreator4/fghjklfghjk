const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send('>>> Отказано!');
    message.channel.send('>>> Попробуйте позже!')
};
module.exports.help = {
    name: "no"
};