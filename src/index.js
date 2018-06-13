'use strict';

const Keycloak = require('keycloak-connect');
const express = require('express');
const session = require('express-session');
const expressHbs = require('express-handlebars');
const fs = require('fs');

const app = express();


// Register 'handelbars' extension with The Mustache Express
app.engine('hbs', expressHbs({
    extname: 'hbs',
    defaultLayout: 'layout.hbs',
    relativeTo: __dirname
}));
app.set('view engine', 'hbs');




//session
app.use(session({
    secret: 'thisShouldBeLongAndSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });


app.use(keycloak.middleware());

//route protected with Keycloak
app.get('/test', keycloak.protect(), function (req, res) {
    res.json({
        success: true,
        protected: true
    });
});

//unprotected route
app.get('/', function (req, res) {
    res.json({
        success: true,
        protected : false
    });
});

app.use(keycloak.middleware({ logout: '/' }));

app.listen(8000, function () {
    console.log('Listening at http://localhost:8000');
});
