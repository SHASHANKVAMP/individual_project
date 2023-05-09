const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Light = require('./models/light');
const Ac = require('./models/ac');
const Security = require("./models/security");

mongoose.connect("mongodb+srv://shashank:shashank@cluster0.sveooag.mongodb.net/mydb",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to the database'))
.catch(err => console.log(err));

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('The api is not working');
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
* @api {get} /light GET light
* @apiGroup Light
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "deviceName": "light3",
*        "location": "room1",
*        "state": "On",
*        "color": "#0095c7"
*    }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/light',(req,res)=>{
  Light.find({})
  .then(lights=>{
    res.send(lights);
  })
  .catch(error=>{
    res.send(error);
  })
});

/**
* @api {post} /light POST light
* @apiGroup Light
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "deviceName": "light3",
*        "location": "room1",
*        "state": "On",
*        "color": "#0095c7"
*    }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/light',(req,res)=>{
  console.log(req.body);
  const {deviceName,location, state, color} = req.body;

  const newLight = new Light({
    deviceName,
    location,
    state,
    color});
    newLight.save()
});


/**
* @api {get} /ac GET ac
* @apiGroup Ac
* @apiSuccessExample {json} Success-Response:
[
  {
    "deviceName": "Ac1",
    "location": "room1",
    "state": "On",
    "temperature": 96
  }
]  
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/ac',(req,res)=>{
  Ac.find({})
  .then(acs=>{
    res.send(acs);
  })
  .catch(error=>{
    res.send(error);
  })
});


/**
* @api {post} /ac POST ac
* @apiGroup Ac
* @apiSuccessExample {json} Success-Response:
[
  {
    "deviceName": "Ac1",
    "location": "room1",
    "state": "On",
    "temperature": 96
  }
]  
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/
app.post('/ac',(req,res)=>{
  console.log(req.body);
  const {deviceName,location, state, temperature} = req.body;

  const newAc = new Ac({
    deviceName,
    location,
    state,
    temperature});
    newAc.save()
});


/**
* @api {get} /security GET security
* @apiGroup Security
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "deviceName": "Camera1",
*        "location": "room1",
*        "camera": "Off",
*        "access": "Deny"
*    }
*] 
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/
app.get('/security',(req,res)=>{
  Security.find({})
  .then(security=>{
    res.send(security);
  })
  .catch(error=>{
    res.send(error);
  })
});


/**
* @api {post} /security POST security
* @apiGroup Security
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "deviceName": "Camera1",
*        "location": "room1",
*        "camera": "Off",
*        "access": "Deny"
*    }
*] 
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/
app.post('/security',(req,res)=>{
  console.log(req.body);
  const {deviceName,location, camera, access} = req.body;

  const newSec = new Security({
    deviceName,
    location,
    camera,
    access});
    
    newSec.save()
});



/**
* @api {put} /light PUT light
* @apiGroup Light
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "deviceName": "light3"
*    }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/
app.put('/light',async(req,res)=>{
  const {deviceName,state,color}=req.body;

  const check ={deviceName:deviceName}
  const update = {state:state,color:color}

  try{
    const updated= await Light.findOneAndUpdate(check,update).exec();
    // console.log(updated);
  }
  catch(error){
    console.log(error);
  }
})

/**
* @api {put} /ac PUT ac
* @apiGroup Ac
* @apiSuccessExample {json} Success-Response:
[
  {
    "deviceName": "Ac1",
    "location": "room1",
    "state": "On",
    "temperature": 96
  }
]  
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.put('/ac',async(req,res)=>{
  const {deviceName,state,temperature}=req.body;
  console.log(req.body)
  const check ={deviceName:deviceName}
  const update = {state:state,temperature:temperature}

  try{
    const updated= await Ac.findOneAndUpdate(check,update).exec();
    // console.log(updated);
  }
  catch(error){
    console.log(error);
  }
})

/**
* @api {put} /security PUT security
* @apiGroup Security
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "deviceName": "Camera1",
*        "location": "room1",
*        "camera": "Off",
*        "access": "Deny"
*    }
*] 
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.put('/security',async(req,res)=>{
  const {deviceName,camera,access}=req.body;
  console.log(req.body)
  const check ={deviceName:deviceName}
  const update = {camera:camera,access:access}

  try{
    const updated= await Security.findOneAndUpdate(check,update).exec();
    // console.log(updated);
  }
  catch(error){
    console.log(error);
  }
})

/**
* @api {delete} /light DELETE light
* @apiGroup Light
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "deviceName": "light3"
*    }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.delete('/light',async(req,res)=>{
  const {deviceName}=req.body;
  console.log(req.body)
  const check ={deviceName:deviceName}

  try{
    const updated= await Light.deleteOne({deviceName:deviceName}).exec();
    // console.log(updated);
  }
  catch(error){
    console.log(error);
  }
})


/**
* @api {delete} /ac DELETE ac
* @apiGroup Ac
* @apiSuccessExample {json} Success-Response:
[
  {
    "deviceName": "Ac1"
  }
]  
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/
app.delete('/ac',async(req,res)=>{
  const {deviceName}=req.body;
  console.log(req.body)
  const check ={deviceName:deviceName}

  try{
    const updated= await Ac.deleteOne({deviceName:deviceName}).exec();
    // console.log(updated);
  }
  catch(error){
    console.log(error);
  }
})



/**
* @api {delete} /security DELETE security
* @apiGroup Security
* @apiSuccessExample {json} Success-Response:
*[
*    {
*        "deviceName": "Camera1"
*    }
*] 
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/
app.delete('/security',async(req,res)=>{
  const {deviceName}=req.body;
  console.log(req.body)
  const check ={deviceName:deviceName}

  try{
    const updated= await Security.deleteOne(check);
    // console.log(updated);
  }
  catch(error){
    // console.log(error);
  }
})

app.listen(port, () => {
  console.log('App listening on port 4000!');
});
