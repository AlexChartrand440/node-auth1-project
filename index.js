const express = require('express');
const server = express();
const CORS = require("cors");
const bcrypt = require('bcryptjs');

const session = require('express-session');

server.use(
  session({
    name: 'hecc', 
    secret: 'omega hecc',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true,
    }, 
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
  })
);

server.use(express.json());
server.use(CORS());

const database = require('./data/db.js');

server.get('/users/', (req, res) => {

    database.getUsers().then(users => {
        res.status(200).json(users);
    }).catch(err => {

        console.log(err);
        res.status(500).json({error: 'An error has occured!'});

    });

});

server.get('/logout/', (req, res) => {

    if (req.session) {
        req.session.destroy(err => {
          if (err) {
            res.status(401).json({error: 'error logging out.'});
          } else {
            res.status(200).json({response: 'Succesfully logged out.'});
          }
        });
      }

});

server.post('/register/', (req, res) => {

    console.log(bcrypt.hashSync(req.body.password, 14));

    database.addUser(req.body.username, bcrypt.hashSync(req.body.password, 14)).then(result => {

        console.log(result);
        res.status(200).json({user_id: result.id});
        // database.getProjectById(result.id).then(project => {
        //     res.status(201).json({project});
        // });

    }).catch(err => {

        console.log(err);
        res.status(500).json({error: 'There was an error while saving the project to the database!'});

    });

});

server.post('/login/', (req, res) => {

    database.getUserByName(req.body.username).then(user => {

        console.log(user);
        
        if (user === undefined || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({ error: 'Incorrect credentials' });
        }

        req.session.ID = user.id;
        req.session.name = user.username;

        res.status(200).json({response: 'Login succesfull!'});

    }).catch(err => {

        console.log(err);
        res.status(500).json({error: 'Error attempting to login!'});
    
    });

});

server.listen(5000, '127.0.0.1', () => console.log('Server listening on port 5000.'));