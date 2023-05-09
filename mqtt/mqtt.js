const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const mongoose = require('mongoose');
const sensor = require('./models/ard');
const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://shashank:shashank@cluster0.sveooag.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
    client.subscribe('/shashank');
});


app.get('/sensors',(req,res)=>{
    sensor.find({})
    .then((sensor) => {
        res.send(sensor);
    })
    .catch((error)=>{
        res.send(error);
        console.log(error);
    })
})

client.on('message', (topic,message) => {
    if(topic=="/shashank"){
        const data = message.toString();
        const sensorData = {
            value:data
        }
        const NewSensor = new sensor(sensorData);
        console.log(NewSensor);
        NewSensor.save();
    }
})

app.listen(port);