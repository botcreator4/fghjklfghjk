const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send('>>> 1) Сколько вам лет? - ');
    message.channel.send('>>> 2) Ваше имя - ')
    message.channel.send('>>> 3) Сколько вы готовы уделять серверу? - ')
    message.channel.send('>>> 4) Немного о себе - ')
    message.channel.send('>>> **ОТКРЫТО!** ')
};
module.exports.help = {
    name: "nab"
};