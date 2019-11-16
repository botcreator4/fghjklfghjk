const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send('>>> Одобрено!');
    message.channel.send('>>> Сейчас вам выдадут роль!')
};
module.exports.help = {
    name: "yes"
};