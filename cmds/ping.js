const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
        let embed = new Discord.RichEmbed()
        .setDescription("Помощь. Префикс бота - !")
        .setColor('#10c7e2')
        .addField("!avatar","аватарка пользователя")
        .addField("!ban","заблокировать пользователя")
        .addField("!kick","кикнуть пользователя")
        .addField("!clear","очистить чат")
        .addField("!report","подать жалобу на пользователя. Администрация возьмет ее на рассмотрение")
        .addField("!warn","выдать предупреждение пользователю")
        .addField("!unwarn","снять предупреждение пользователю")
        .addField("!serverinfo","информация о сервере")
        .addField("!userinfo","информация о пользователе")
        .setThumbnail(message.guild.iconURL)
    
        bot.send(embed);
};
module.exports.help = {
    name: "help"
};