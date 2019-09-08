require('dotenv').config()

const config = require('./config.json');

const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

const imgflipUsername = process.env[config.imgflipUsername]
const imgflipPassword = process.env[config.imgflipPassword]

module.exports = {
	generateMemeById: function(msg,template_id,text0,text1) {
		params = new URLSearchParams();
		params.append('template_id',template_id);
		params.append('username',imgflipUsername);
		params.append('password',imgflipPassword);
		params.append('text0',text0);
		params.append('text1',text1);
		method = {method:'POST',body:params};
		fetch('https://api.imgflip.com/caption_image',method).then(res => res.json()).then(json => msg.channel.send(json.data.url))
	}
}