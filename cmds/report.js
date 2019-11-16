const { RichEmbed } = require('discord.js') //Модуль discord.js
const config = require('../botconfig.json')
const { channelReport, serverID, colors } = config;
module.exports.run = async (client, message, args) => { //Думаю тут рассказывать не нужно.
  if(message.guild.id !== serverID) return //Будет работать только на одном сервере.
  try{ //Идите читайте JavaScript учебники.
const User = message.guild.member( //Переменная которая ловит и ID юзера и пинг.
  message.mentions.users.first()
    ||
  message.guild.members.get(args[0])
);
if(!User) { //Проверяет указал ли пользователь юзера.
  message.channel.send(
    new RichEmbed()
    .setColor(colors)
    .setDescription(`Укажите пользователя/ID на которого вы хотите подать жалобу.\nПример команды: \`.report @Участник Описание_Жалобы`)
    .setTimestamp()
    .setFooter(`Вызвал: ${message.author.tag}`, message.author.displayAvatarURL)
  )
  return
}
if(User.id == message.author.id) { //Проверяет чтобы пользователь не указал себя.
  message.channel.send(
    new RichEmbed()
    .setColor(colors)
    .setDescription(`Вы не можете подать жалобу на самого себя!`)
    .setFooter(`Вызвал: ${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp()
  )
  return
}
if(User.id == client.user.id) { //Проверяет чтобы пользователь не указывал клиента.
  message.channel.send(
    new RichEmbed()
    .setColor(colors)
    .setDescription(`Вы не можете подать жалобу на меня!`)
    .setFooter(`Вызвал: ${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp()
  )
  return
}
const reason = args.slice(1).join(' ') //Возвращает причину жалобы.
if(!reason) { //Проверяет чтобы юзер указал причину.
  message.channel.send(
    new RichEmbed()
    .setColor(colors)
    .setDescription(`Укажите причину жалобы!`)
    .setTimestamp()
    .setFooter(`Вызвал: ${message.author.tag}`, message.author.displayAvatarURL)
  )
  return
}
message.channel.send( //Отправляет сообщение.
  new RichEmbed()
  .setColor(colors)
  .setDescription(`Вы успешно подали жалобу на игрока ${User}`)
  .setFooter(client.user.username, client.user.displayAvatarURL)
  .setTimestamp()
)
let embed = new RichEmbed()
.setDescription("Рассмотрите жалобу.")
.addField("📕 | Жалоба на:", `${User}\nID: ${User.id}`, true)
.addField("📝 | Жалоба от:", `${message.author}\nID: ${message.author.id}`, true)
.addField("📢 | Канал:", `${message.channel}`, true)
.addField("📄 | Причина:", `${reason}`)
.setFooter(client.user.username, client.user.displayAvatarURL)
.setTimestamp()
client.channels.get(channelReport).send(embed).then(msg => { //Отправляем сообщение в определённый канал.
    msg.react('🚫').then(r => { //Ставим реакции.
        msg.react('❓')
        msg.react('✅')
        const a = (reaction, user) => reaction.emoji.name === '🚫' && user.id === message.author.id; //Делаем проверку на юзера для них.
        const b = (reaction, user) => reaction.emoji.name === '❓' && user.id === message.author.id;
        const h = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
        const d = msg.createReactionCollector(a); //Создаём сами коллекторы.
        const z = msg.createReactionCollector(b);
        const l = msg.createReactionCollector(h);
        d.on('collect', r => { //Обращаемся самим коллекторам.
          let embed = new RichEmbed()
          .setColor("#FF0000")
          .setDescription(`Жалоба была отклонена.`)
          .addField("📕 | Жалоба на:", `${User}\nID: ${User.id}`, true)
          .addField("📝 | Жалоба от:", `${message.author}\nID: ${message.author.id}`, true)
          .addField("📢 | Канал:", `${message.channel}`, true)
          .addField("📄 | Причина:", `${reason}`)
          .setFooter(client.user.username, client.user.displayAvatarURL)
          .setTimestamp()
          msg.edit(embed).then(msg => { //Меняем сообщение.
              msg.clearReactions() //Удаляем все реакции.
          })
          d.stop() //Останавливаем коллекторы.
          z.stop()
          l.stop()
        })
        z.on('collect', r => {
          let embed = new RichEmbed()
          .setColor("#FFFF00")
          .setDescription(`Жалоба была поставлена под вопросом.`)
          .addField("📕 | Жалоба на:", `${User}\nID: ${User.id}`, true)
          .addField("📝 | Жалоба от:", `${message.author}\nID: ${message.author.id}`, true)
          .addField("📢 | Канал:", `${message.channel}`, true)
          .addField("📄 | Причина:", `${reason}`)
          .setFooter(client.user.username, client.user.displayAvatarURL)
          .setTimestamp()
          msg.edit(embed).then(msg => {
              msg.clearReactions()
          })
          d.stop()
          z.stop()
          l.stop()
        })
        l.on('collect', r => {
          let embed = new RichEmbed()
          .setColor("#ADFF2F")
          .setDescription(`Жалоба была принята.`)
          .addField("📕 | Жалоба на:", `${User}\nID: ${User.id}`, true)
          .addField("📝 | Жалоба от:", `${message.author}\nID: ${message.author.id}`, true)
          .addField("📢 | Канал:", `${message.channel}`, true)
          .addField("📄 | Причина:", `${reason}`)
          .setFooter(client.user.username, client.user.displayAvatarURL)
          .setTimestamp()
          msg.edit(embed).then(msg => {
              msg.clearReactions()
          })
          d.stop()
          z.stop()
          l.stop()
        })
      })
})
}catch(err) { //В случае ошибки, бот отправит сообщение в определённый канал.
  message.channel.send(
    new RichEmbed()
    .setColor('RED')
    .setTimestamp()
    .setFooter('Обратитесь к создателем бота для устранения проблемы.')
    .setDescription(`Произошла ошибка при выполнения команды! \`${err.name}\``)
  )
  client.channels.get('621354439034404874').send(
    new RichEmbed()
    .setColor('RED')
    .addField(`Произошла ошибка при выполнении команды: \`report\`\nВыполнил команду: ${message.author} (\`${message.author.id}\`)\n[Контент:](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}) ${message.content}`, err)
    .setTimestamp()
    .setFooter('Ошибка...')
  )
}
}
module.exports.help = { //Иницилизируем команду.
  name: "report"
}
