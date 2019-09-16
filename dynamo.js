const config = require('./config.json')

var AWS = require('aws-sdk');

var DynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: process.env[config.AWS_DYNAMODB_API_VERSION], accessKeyId: process.env[config.AWS_ACCESS_KEY_ID], secretAccessKey: process.env[config.AWS_SECRET_ACCESS_KEY], region: process.env[config.AWS_REGION]});

module.exports = DynamoDB