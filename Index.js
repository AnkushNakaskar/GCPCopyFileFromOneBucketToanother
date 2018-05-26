const PubSub = require('@google-cloud/pubsub');
const Storage = require('@google-cloud/storage');
var express = require('express');

var app = express();

const projectId = 'content-eng-qa';
const pubsubClient = new PubSub({
    projectId: projectId,
    keyFilename: 'keyfile.json'

});

const storageclient = new Storage({
    projectId: projectId,
    keyFilename: 'keyfile.json'
});



app.get('/', function (req, res) {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("Home controller...!!"));

});
app.get('/copyfile', function (req, res) {

    const srcBucketName = 'testsource';
    const srcFilename = 'myzip.zip';
    const destBucketName = 'ankushteststorage';
    const destFilename = 'cloudfunctions/helloWorld/myzip';

    const bucketName ="ankushteststorage";
    storageclient.bucket(srcBucketName).file(srcFilename).copy(storageclient.bucket(destBucketName).file(destFilename)).then(()=>{
        console.log("Copying file from one bucket to another..!!")
        console.log(
            `gs://${srcBucketName}/${srcFilename} copied to gs://${destBucketName}/${destFilename}.`
        );
    }).catch(err => {
        console.log("Exception occure while copying from one bucket to another..!!");
        console.error('ERROR:', err);
    });
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("In copy controller...!!"));

});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
});


// npm install --save @google-cloud/storage
// npm install --save @google-cloud/pubsub
// --more info https://cloud.google.com/nodejs/docs/reference/libraries

