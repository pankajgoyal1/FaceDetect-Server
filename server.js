const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
app.use(bodyParser.json());
const cors = require('cors');
const knex = require('knex');
const register=require('./controllers/register.js');
const signin=require('./controllers/signin.js')
const profile=require('./controllers/profile.js')
const image=require('./controllers/image.js')
const db =knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		password:'',
		user:'postgres',
		database:'first'
	}
});
db.select('*').from('users').then(data=>{
	console.log(data);
})
app.use(cors());
app.get('/',(req,res)=>{
	 res.json(db.users);
})
app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)})


app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})


app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})


app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})


app.listen(3000,()=>{
	console.log('Good');
})

