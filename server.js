const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
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
    host : process.env.DATABASE_URL,
    ssl: true,
  }
});


db.select('*').from ('users').then(data => {
	// console.log(data);
})

const app = express();

app.use(cors());
app.use(express.json());

// const port = 3000;



//ROOT
app.get('/' , (req , res) => {
	// res.json(database.users);
  res.json('This is perfectly working!')
})
//ROOT

//SIGNIN
app.post('/signin', signin.handleSignin(db, bcrypt));
//SIGNIN

//REGISTER
// app.post('/register' ,register.handleRegister(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
//REGISTER

//PROFILE
// app.get('/profile/:id', profile.handleProfileGet(db));
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
//PROFILE

//IMAGE
// app.put('/image', image.handleImage(db));
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
//IMAGE

//IMAGEURL
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
//IMAGEURL

app.listen(process.env.PORT || 3000 , () => {
	console.log(`App is running on port ${process.env.PORT}`);
})