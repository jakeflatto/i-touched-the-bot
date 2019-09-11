const fs = require('fs');

const imgMap = require('../imgmap.json')

const { prefix } = require('../config.json')

function currentImgList(){
	return imgMap.images.map(img => img.name).join(', ')
}

module.exports = {
	name: 'addquickimg',
	description: `Adds a new quick image command. Here are the currently recognized quick images:\n\`${currentImgList()}\``,
	args: true,
	numArgs: 2,
	usage: '[Name] [URL]',
	example: 'pika https://cdn.discordapp.com/attachments/620157693163864064/620817586233409547/Screen_Shot_2018-10-25_at_11.png',
	execute(msg, args) {
		name = args[0];
		url = args[1];
		fs.readFile('./imgmap.json', 'utf8', function readFileCallback(err, data){
		    if (err){
		        console.log(err);
		    } else {
		    obj = JSON.parse(data);
		    if (obj.images.map(img => img.name).includes(name)) {
		    	msg.reply(`sorry, that image name is already taken.\n${prefix}${name} sends: ${obj.images.filter(img => img.name == name)[0].url}`);
		    };
		    obj.images.push({name: name, url: url}); //add some data
		    json = JSON.stringify(obj); //convert it back to json
		    fs.writeFile('./imgmap.json', json, 'utf8', function(err) {
		    	if (err) throw err;
		    	msg.channel.send(`Added ${name}`);
		    }); // write it back 
		}});	
	}
}