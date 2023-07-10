const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); //* connect backend to frontend.
const knex = require('knex'); //* connect database to backend/server. to work with it read the documentation.
const db = knex({
    client: 'pg', //* pg stands for postgres
    connection: {
        host: '127.0.0.1', //* ip address of localhost
        port: 5432, //* port of the database
        user: 'postgres',
        password: 'password',
        database: 'smart-brain'
    }
});
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
// const imageURL = require('./controllers/imageURL');

// db.select('*').from('users').then(data => {
//     console.log(data)
// })

const app = express();
app.use(express.json()); //! so we can reqcieve what usrs send us with json format
app.use(cors()); //! to tell the google chrome that our server is trusted on localhost

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db))

app.put('/image', (req, res) => image.handleImage(req, res, db))

app.post('/imageurl', (req, res) => image.handleApiCall(req, res))


app.listen(3000, () => {
    console.log('app is running on port 3000');
});