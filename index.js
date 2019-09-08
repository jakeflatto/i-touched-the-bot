require('dotenv').config()

const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
	if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

	const args = msg.content.slice(config.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) {
		// msg.reply(`Sorry, no command found for: "${config.prefix + command}" ...`);
		return;
	}

	try {
		client.commands.get(command).execute(msg,args);
	} catch (error) {
		console.error(error);
		msg.reply(`There was an error trying to execute the command: "${config.prefix + command}" ...`)
	}
})

// client.on('message', msg => {

//   if (msg.content.startsWith('!adny')) {
//   	msg.channel.send('https://cdn.discordapp.com/attachments/614693287567163397/616480211160268830/andyyoda.png')
//   }

//   if (msg.content.startsWith('!affleck')) {
//   	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/616478220593922069/tumblr_pd6cl8M6Lx1sof983_540.png')
//   }

//   if (msg.content.startsWith('!andy')) {
//   	msg.channel.send('https://cdn.discordapp.com/attachments/164498523142881280/497998758416482304/Untitled-1.png')
//   }

//   if (msg.content.startsWith('!costanza')) {
//   	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/616480004267704350/1300044776986_1.jpg')
//   }

//   if (msg.content.startsWith('!crabthread')) {
//   	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/618668121611304970/image0.png')
//   }  

//   if (msg.content.startsWith('!crycat') || msg.content.startsWith('!syadcat')) {
//   	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/616480111000158228/image0-25.jpg')
//   }

//   if (msg.content.startsWith('!culture')) {
//   	msg.channel.send('https://archive-media.nyafuu.org/wsr/image/1451/88/1451882173413.jpg')
//   }

//   if (msg.content.toLowerCase().includes('hubert') || msg.content.toLowerCase().includes('he\'s a vish') || msg.content.toLowerCase().includes('hes a vish')) {
//     msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/599073906623512598/source.png')
//   }

//   if (msg.content.startsWith('!knifecat')) {
//   	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/616483873412612099/image0.jpg')
//   }  

//   if (msg.content.startsWith('!poe')) {
//   	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/616480057250283521/1c3.jpg')
//   }

// })



client.login(process.env[config.botToken]) 