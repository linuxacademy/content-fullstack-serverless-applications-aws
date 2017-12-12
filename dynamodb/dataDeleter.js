var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
var documentClient = new AWS.DynamoDB.DocumentClient();

var fs = require("fs");

var sleep = require("sleep");

var counter = 0

while (counter < 15) {
    console.log("Deleting item with SongTitle of test" + counter.toString())

    var params = {
        TableName : "PrometheonMusic",
        Key: {
            Artist: "Stephen James",
            SongTitle: "test"+counter.toString()
        }
    };

    documentClient.delete(params, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
    sleep.msleep(300)
    counter++
}