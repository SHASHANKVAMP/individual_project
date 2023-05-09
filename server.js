const express = require('express');
const bodyParser = require('body-parser');
const { initializingPassport, protected } = require('./passportc');
const mongoose = require('mongoose');
const helmet = require('helmet');
const User = require('./user');
const passport = require('passport');
const expressSession = require("express-session");
const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://shashank:shashank@cluster0.sveooag.mongodb.net/mydb",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to the database'))
.catch(err => console.log(err));

const web = `${__dirname}/web`;
const resources = `${__dirname}/resources`;

app.use(express.static(web));
app.use(express.static(resources));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.originAgentCluster());
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

initializingPassport(passport);



app.get('/',(req,res)=>{
    res.sendFile(`${web}/welcome.html`);
})

app.get('/add',protected,(req,res)=>{
    res.sendFile(`${web}/add.html`);
})

app.get('/lightning',protected,(req,res)=>{
  res.sendFile(`${web}/lightning.html`);
})
app.get('/ac',protected,(req,res)=>{
  res.sendFile(`${web}/ac.html`);
})
app.get('/security',protected,(req,res)=>{
  res.sendFile(`${web}/security.html`);
})
app.get('/charts',protected,(req,res)=>{
  res.sendFile(`${web}/chart.html`);
})
app.get('/login',(req,res)=>{
  res.sendFile(`${web}/login.html`);
})
app.get('/register',(req,res)=>{
  res.sendFile(`${web}/register.html`);
})




app.post('/register', async(req, res) => {
  const user = await User.findOne({username:req.body.username});

  if(user) return res.status(400).send("user already exist! ");

  const newUser = await User.create(req.body);
  res.redirect('/login');
})

app.post('/login', passport.authenticate('local', {
  failureFlash: true,failureRedirect: "/register"
}), function(req, res) {
  res.redirect('/');
});


app.listen(port, () => {
  console.log('App listening on port 3000!');
});
