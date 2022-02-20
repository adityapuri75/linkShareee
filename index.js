const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const path = require('path');
const passportLocal = require('./config/passport-local-strategy');
const findorcreate = require('mongoose-findorcreate');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const customMware = require('./config/middleware');
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.set("trust proxy", 1); // trust first proxy

  app.use(session({
    name: 'linkshare',
    //change the secret before deployment in production mode
    secret:'adityapuri',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);


app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});