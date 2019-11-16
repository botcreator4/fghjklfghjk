const { RichEmbed } = require("discord.js"),
  config = require("../botconfig.json");
const { colors } = config;
module.exports.run = async (client, message, args) => {
  const rUser = message.guild.member(
    //Переменная которая ловит и ID юзера и пинг.
    message.mentions.users.first() ||
      message.guild.members.get(args[0]) ||
      message.author
  );
  message.channel.send(
    new RichEmbed()
      .setColor(colors)
      .setDescription(`Аватар ${rUser}`)
      .setImage(`${rUser.user.displayAvatarURL}?size=2048`) //Получаем максимальное качество.
      .setTimestamp()
      .setFooter(message.author.username, message.author.displayAvatarURL)
  );
};
module.exports.help = {
  name: "avatar"
};
