const { RichEmbed } = require("discord.js");
const config = require("../botconfig.json");
const { colors, channelLogs } = config;
module.exports.run = async (client, message, args) => {
  const rUser = message.guild.member(
    //Переменная которая ловит и ID юзера и пинг.
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  var reason = args.slice(1).join(" ");
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    message.channel.send(
      new RichEmbed()
        .setColor("RED")
        .setDescription("У вас должны быть права Администратора!")
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setTimestamp()
    );
    return;
  }
  if (!rUser) {
    message.channel.send(
      new RichEmbed()
        .setColor("RED")
        .setDescription(`Укажите участника!`)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
    );
    return;
  }
  if (rUser.id === message.author.id) {
    message.channel.send(
      new RichEmbed()
        .setColor("RED")
        .setDescription(`Нельзя кикнуть самого себя!`)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
    );
    return;
  }
  if (rUser.id === message.guild.owner.id) {
    message.channel.send(
      new RichEmbed()
        .setColor("RED")
        .setDescription(`Нельзя кикнуть создателя сервера!`)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
    );
    return;
  }
  if (rUser.hasPermission("ADMINISTRATOR")) {
    message.channel.send(
      new RichEmbed()
        .setColor("RED")
        .setTimestamp()
        .setDescription("Нельзя кикнуть Администратора!")
        .setFooter(message.author.username, message.author.displayAvatarURL)
    );
    return;
  }
  if (!reason) {
    message.channel.send(
      new RichEmbed()
        .setColor("RED")
        .setDescription(`Укажите причину!`)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
    );
    return;
  }
  let embed = new RichEmbed()
    .setColor(colors)
    .setTimestamp()
    .setAuthor("Kick")
    .addField(`Кто кикнул:`, message.author, true)
    .addField(`Кому:`, rUser, true)
    .addField(`Причина:`, reason, true)
    .setFooter(client.user.username, client.user.displayAvatarURL);
  message.channel.send(embed);
  client.channels.get(channelLogs).send(embed);
  message.guild.members.get(rUser.id).kick(reason);
};
module.exports.help = {
  name: "kick"
};
