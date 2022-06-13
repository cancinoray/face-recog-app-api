const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({	//using knexjs to connect the server to the postgres database
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '1234567890',
    database : 'facerecogapp'
  }
});


db.select('*').from ('users').then(data => {
	// console.log(data);
})

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 3000;



//ROOT
app.get('/' , (req , res) => {
	// res.json(database.users);
	console.log('This is perfectly working!')
  res.json('This is perfectly working!')
})
//ROOT

//SIGNIN
app.post('/signin' , signin.handleSignin(db, bcrypt));
//SIGNIN

//REGISTER
app.post('/register' ,register.handleRegister(db, bcrypt));

//REGISTER

//PROFILE
app.get('/profile/:id', profile.handleProfileGet(db));
//PROFILE

//IMAGE
app.put('/image', image.handleImage(db));
//IMAGE

//IMAGEURL
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
//IMAGEURL

app.listen(port , () => {
	console.log('App is running on port 3000');
})