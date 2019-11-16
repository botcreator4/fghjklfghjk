const { RichEmbed } = require('discord.js'),
config = require('../botconfig.json')
const { colors } = config
module.exports.run = async (client, message, args) => {
 if(!message.member.hasPermission("MANAGE_MESSAGES")) {
   message.channel.send(
     new RichEmbed()
     .setColor("RED")
     .setDescription(`У вас недостаточно прав!`)
     .setTimestamp()
   )
   return
 }
 if(!args[0]) {
   message.channel.send(
     new RichEmbed()
     .setColor("RED")
     .setDescription(`Укажите количество сообщений которые надо удалить!`)
     .setTimestamp()
     .setFooter('Внимание, вы можете удалить только 100 сообщений.')
   )
   return
 }
 if(args[0] < 1) {
   message.channel.send(
     new RichEmbed()
     .setColor("RED")
     .setDescription(`Укажите значения больше одного!`)
     .setTimestamp()
   )
   return
 }
 if(args[0] > 100) {
     let embed = new RichEmbed()
     .setColor("RED")
     .setDescription("По правилам Дискорда я не могу удалить больше 100 сообщений за раз.\nМне удалить 100 сообщений?")
     .setTimestamp()
     message.channel.send(embed).then(msg => {
         msg.react('✅').then(r => {
             msg.react('❎') //Ставим реакции.
             const a = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
             const b = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
             const d = msg.createReactionCollector(a);
             const z = msg.createReactionCollector(b);
             d.on('collect', r => {
               let embed = new RichEmbed()
               .setColor(colors)
               .setDescription("✅ | Удалено 100 сообщений.")
               .setTimestamp()
               msg.edit(embed).then(msg => { //Изменяем сообщение.
                   msg.clearReactions() //Удалем реакции.
               })
               d.stop() //Закиываем коллекторы.
               z.stop()
               message.channel.bulkDelete(100)
             })
             z.on("collect", r => {
               let embed = new RichEmbed()
               .setColor("RED")
               .setDescription("❎ | Операция удалений сообщений отменена.")
               .setTimestamp()
               msg.edit(embed).then(msg => {
                   msg.clearReactions()
               })
               d.stop()
               z.stop()
             })
           })
         })
         return
 }
 message.channel.bulkDelete(args[0]).then(() =>{
     let embed = new RichEmbed()
     .setDescription(`🗑 | **Удалено** \`${args[0]}\` **сообщений!**`)
     .setColor(colors)
     .setTimestamp()
     .setFooter(`${message.author.username}`, message.author.displaydisplayAvatarURL);
     message.channel.send(embed).then(m => {
       m.delete(5500);
});
 })
 }
module.exports.help = {
 name: 'clear'
}
