const config = require('./config.json')

var AWS = require('aws-sdk');

var DynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: process.env[config.AWS_DYNAMODB_API_VERSION], accessKeyId: process.env[config.AWS_ACCESS_KEY_ID], secretAccessKey: process.env[config.AWS_SECRET_ACCESS_KEY], region: process.env[config.AWS_REGION]});

module.exports = DynamoDB
	

// const data = (async function () {
// 	dbData = await DynamoDB.scan({TableName: 'i-touched-the-bot-quick-images'}).promise().then((data) => data.Items);
// 	console.log(dbData);
// })();
// var params = {
//   Item: {
//    "name": "die?", 
//    "url": "https://cdn.discordapp.com/attachments/620157693163864064/621187588681629696/CZiql_eUEAEAk0a.png"
//   }, 
//   TableName: "i-touched-the-bot-quick-images"
//  };
//  DynamoDB.put(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(data);           // successful response
//  });




// require('dotenv').config();

// var AWS = require('aws-sdk');

// var DynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: 'us-west-2'});
//  var params = {TableName: 'i-touched-the-bot-quick-images', Key: {name: 'andy'}};
 
//  DynamoDB.get(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(data);           // successful response
//  });